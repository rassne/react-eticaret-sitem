const STORAGE_KEY = 'parkingSystem';
const DEDUPE_WINDOW_MS = 30_000;

export const DEFAULT_TARIFF = {
  baseFee: 50,
  includedMinutes: 60,
  hourlyFee: 25,
  currency: 'TRY'
};

export const normalizePlate = (plate = '') => plate
  .toLocaleUpperCase('tr-TR')
  .replace(/[^A-Z0-9]/g, '');

export const isValidPlate = (plate) => /^\d{2}[A-Z]{1,3}\d{2,4}$/.test(plate);

export const calculateCharge = (enteredAt, exitedAt, tariff = DEFAULT_TARIFF) => {
  const durationMinutes = Math.max(0, Math.ceil((new Date(exitedAt) - new Date(enteredAt)) / 60_000));
  const additionalHours = Math.max(0, Math.ceil((durationMinutes - tariff.includedMinutes) / 60));
  return {
    durationMinutes,
    amount: tariff.baseFee + (additionalHours * tariff.hourlyFee),
    currency: tariff.currency
  };
};

const initialState = () => ({
  sessions: [],
  events: [],
  reviews: [],
  auditLog: [],
  tariff: DEFAULT_TARIFF
});

const identifier = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
const audit = (state, action, details) => ({
  ...state,
  auditLog: [{ id: identifier(), action, details, occurredAt: new Date().toISOString() }, ...state.auditLog]
});

export const loadParkingState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && Array.isArray(saved.sessions) ? { ...initialState(), ...saved } : initialState();
  } catch {
    return initialState();
  }
};

export const saveParkingState = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

export const recordReading = (state, reading, { force = false } = {}) => {
  const occurredAt = reading.occurredAt ?? new Date().toISOString();
  const plate = normalizePlate(reading.plate);
  const base = {
    id: identifier(),
    plate,
    direction: reading.direction,
    cameraId: reading.cameraId,
    confidence: Number(reading.confidence),
    photoRef: reading.photoRef || null,
    occurredAt
  };
  const reject = (reason) => ({
    state: audit({
      ...state,
      reviews: [{ ...base, reason, status: 'pending' }, ...state.reviews]
    }, 'review_created', { reason, plate, cameraId: base.cameraId }),
    outcome: 'review'
  });

  if (!force && (!isValidPlate(plate) || base.confidence < 0.8)) return reject('low_confidence_or_invalid_plate');

  const recent = state.events.find((event) =>
    event.plate === plate &&
    event.direction === base.direction &&
    event.cameraId === base.cameraId &&
    new Date(occurredAt) - new Date(event.occurredAt) < DEDUPE_WINDOW_MS
  );
  if (!force && recent) {
    return { state: audit(state, 'reading_ignored', { reason: 'duplicate_frame', plate }), outcome: 'duplicate' };
  }

  const activeSession = state.sessions.find((session) => session.plate === plate && session.status === 'active');
  if (base.direction === 'entry') {
    if (activeSession) return reject('duplicate_entry');
    const session = {
      id: identifier(), plate, enteredAt: occurredAt, entryCameraId: base.cameraId,
      status: 'active', paymentStatus: 'unpaid'
    };
    return {
      state: audit({ ...state, sessions: [session, ...state.sessions], events: [base, ...state.events] }, 'session_opened', { plate, sessionId: session.id }),
      outcome: 'entered'
    };
  }

  if (!activeSession) return reject('unmatched_exit');
  const charge = calculateCharge(activeSession.enteredAt, occurredAt, state.tariff);
  const closedSession = {
    ...activeSession, exitedAt: occurredAt, exitCameraId: base.cameraId, status: 'completed',
    paymentStatus: 'pending', ...charge
  };
  return {
    state: audit({
      ...state,
      sessions: state.sessions.map((session) => session.id === activeSession.id ? closedSession : session),
      events: [base, ...state.events]
    }, 'session_closed', { plate, sessionId: activeSession.id, amount: charge.amount }),
    outcome: 'exited',
    session: closedSession
  };
};
