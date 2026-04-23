import type { BuildState } from '@/store/useBuildStore';
import { calculateTotal, estimateSavings } from '@/lib/pricing';
import { encodeResumeToken } from '@/lib/resume';

const WEBHOOK_URL = import.meta.env.VITE_SUBMIT_WEBHOOK_URL;

export interface SubmissionPayload {
  id: string;
  submittedAt: string;
  business: BuildState['business'];
  services: BuildState['services'];
  totals: { monthly: number; oneTime: number; estimatedSavings: number | null };
  resumeUrl: string;
  source: BuildState['meta']['source'];
  status?: 'new' | 'contacted' | 'closed';
}

export interface SubmissionResult {
  id: string;
  mode: 'webhook' | 'demo';
}

function genId() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FBS-${stamp}-${rand}`;
}

const LOCAL_KEY = 'fbs.submissions';

export function readLocalSubmissions(): SubmissionPayload[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((entry) => ({
          ...entry,
          services: {
            ...entry.services,
            custom: Array.isArray(entry.services?.custom) ? entry.services.custom : [],
          },
        }))
      : [];
  } catch {
    return [];
  }
}

function writeLocalSubmissions(next: SubmissionPayload[]) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(next.slice(0, 200)));
  } catch {
    // noop
  }
}

export function pushLocalSubmission(payload: SubmissionPayload) {
  const arr = readLocalSubmissions();
  writeLocalSubmissions([{ ...payload, status: 'new' }, ...arr]);
}

export function updateLocalSubmission(id: string, patch: Partial<SubmissionPayload>) {
  const arr = readLocalSubmissions();
  writeLocalSubmissions(arr.map((s) => (s.id === id ? { ...s, ...patch } : s)));
}

export async function submit(state: Pick<BuildState, 'business' | 'services' | 'meta'>): Promise<SubmissionResult> {
  const id = genId();
  const totals = calculateTotal(state.services);
  const savings = estimateSavings({ business: state.business, services: state.services });
  const token = encodeResumeToken(state);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const payload: SubmissionPayload = {
    id,
    submittedAt: new Date().toISOString(),
    business: state.business,
    services: state.services,
    totals: { monthly: totals.monthly, oneTime: totals.oneTime, estimatedSavings: savings.total },
    resumeUrl: `${origin}/build/resume/${token}`,
    source: state.meta.source,
  };

  pushLocalSubmission(payload);

  if (!WEBHOOK_URL) {
    console.info('[FBS Submit · demo mode]', payload);
    return { id, mode: 'demo' };
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { id, mode: 'webhook' };
  } catch (err) {
    console.warn('[FBS Submit · webhook failed, kept local]', err);
    return { id, mode: 'demo' };
  }
}
