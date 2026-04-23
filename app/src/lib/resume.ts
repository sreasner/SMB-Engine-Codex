import LZString from 'lz-string';
import type { BuildState } from '@/store/useBuildStore';

type Snapshot = Pick<BuildState, 'business' | 'services' | 'meta'>;

// Tiny non-cryptographic fingerprint (sufficient for tamper detection, not security).
function fingerprint(payload: string): string {
  let hash = 2166136261 >>> 0;
  for (let i = 0; i < payload.length; i++) {
    hash ^= payload.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash.toString(36);
}

export function encodeResumeToken(state: Snapshot): string {
  const json = JSON.stringify(state);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return `${compressed}.${fingerprint(json)}`;
}

export function decodeResumeToken(token: string): Snapshot | null {
  try {
    const dot = token.lastIndexOf('.');
    if (dot < 0) return null;
    const compressed = token.slice(0, dot);
    const expectedFingerprint = token.slice(dot + 1);
    const json = LZString.decompressFromEncodedURIComponent(compressed);
    if (!json) return null;
    if (fingerprint(json) !== expectedFingerprint) return null;
    const parsed = JSON.parse(json) as Snapshot;
    if (!parsed.business || !parsed.services || !parsed.meta) return null;
    return parsed;
  } catch {
    return null;
  }
}
