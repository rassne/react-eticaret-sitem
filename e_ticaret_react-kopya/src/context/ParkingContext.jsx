import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_TARIFF, loadParkingState, recordReading, saveParkingState } from '../lib/parking';

const ParkingContext = createContext(null);

export const ParkingProvider = ({ children }) => {
  const [state, setState] = useState(loadParkingState);
  useEffect(() => saveParkingState(state), [state]);

  const value = useMemo(() => ({
    ...state,
    submitReading: (reading, options) => {
      const result = recordReading(state, reading, options);
      setState(result.state);
      return result;
    },
    updateTariff: (tariff) => setState((current) => ({ ...current, tariff: { ...DEFAULT_TARIFF, ...tariff } })),
    markPaid: (sessionId) => setState((current) => ({
      ...current,
      sessions: current.sessions.map((session) => session.id === sessionId ? { ...session, paymentStatus: 'paid' } : session)
    })),
    resolveReview: (reviewId, status) => setState((current) => ({
      ...current,
      reviews: current.reviews.map((review) => review.id === reviewId ? { ...review, status } : review)
    }))
  }), [state]);

  return <ParkingContext.Provider value={value}>{children}</ParkingContext.Provider>;
};

export const useParking = () => useContext(ParkingContext);
