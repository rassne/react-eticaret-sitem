import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_TARIFF, calculateCharge, normalizePlate, recordReading } from '../src/lib/parking.js';

const state = () => ({ sessions: [], events: [], reviews: [], auditLog: [], tariff: DEFAULT_TARIFF });

test('normalizes a Turkish plate and opens a parking session', () => {
  const result = recordReading(state(), { plate: '34 abc 123', direction: 'entry', cameraId: 'ENTRY-01', confidence: 0.95, occurredAt: '2026-01-01T10:00:00Z' });
  assert.equal(normalizePlate('34 abc 123'), '34ABC123');
  assert.equal(result.outcome, 'entered');
  assert.equal(result.state.sessions[0].status, 'active');
});

test('deduplicates successive camera frames', () => {
  const first = recordReading(state(), { plate: '34ABC123', direction: 'entry', cameraId: 'ENTRY-01', confidence: 0.95, occurredAt: '2026-01-01T10:00:00Z' });
  const second = recordReading(first.state, { plate: '34ABC123', direction: 'entry', cameraId: 'ENTRY-01', confidence: 0.95, occurredAt: '2026-01-01T10:00:20Z' });
  assert.equal(second.outcome, 'duplicate');
  assert.equal(second.state.sessions.length, 1);
});

test('routes uncertain reads to staff review', () => {
  const result = recordReading(state(), { plate: '34ABC123', direction: 'entry', cameraId: 'ENTRY-01', confidence: 0.4 });
  assert.equal(result.outcome, 'review');
  assert.equal(result.state.reviews[0].reason, 'low_confidence_or_invalid_plate');
});

test('calculates an hourly overage and closes the active session', () => {
  const first = recordReading(state(), { plate: '34ABC123', direction: 'entry', cameraId: 'ENTRY-01', confidence: 0.99, occurredAt: '2026-01-01T10:00:00Z' });
  const result = recordReading(first.state, { plate: '34ABC123', direction: 'exit', cameraId: 'EXIT-01', confidence: 0.99, occurredAt: '2026-01-01T11:01:00Z' });
  assert.deepEqual(calculateCharge('2026-01-01T10:00:00Z', '2026-01-01T11:01:00Z'), { durationMinutes: 61, amount: 75, currency: 'TRY' });
  assert.equal(result.outcome, 'exited');
  assert.equal(result.session.paymentStatus, 'pending');
});
