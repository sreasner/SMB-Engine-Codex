import { describe, it, expect } from 'vitest';
import { encodeResumeToken, decodeResumeToken } from '@/lib/resume';
import { DEFAULT_STATE } from '@/store/useBuildStore';

describe('resume token', () => {
  it('round-trips identical state', () => {
    const token = encodeResumeToken(DEFAULT_STATE);
    const back = decodeResumeToken(token);
    expect(back).toEqual(DEFAULT_STATE);
  });

  it('rejects tampered payloads', () => {
    const token = encodeResumeToken(DEFAULT_STATE);
    const [payload, fp] = token.split('.');
    // Flip the fingerprint — any byte mutation in the payload that LZString tolerates
    // should still be caught by a fingerprint mismatch.
    const tampered = `${payload}.${fp.split('').reverse().join('')}x`;
    expect(decodeResumeToken(tampered)).toBeNull();
  });

  it('rejects tokens missing the fingerprint', () => {
    expect(decodeResumeToken('notatoken')).toBeNull();
  });

  it('rejects corrupted compressed data', () => {
    expect(decodeResumeToken('!!!.abc')).toBeNull();
  });
});
