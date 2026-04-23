import type { BuildState, Services } from '@/store/useBuildStore';
import { calculateTotal, formatMoney, PRICES } from '@/lib/pricing';

export const PATHFINDER_ENABLED = (import.meta.env.VITE_PATHFINDER_ENABLED ?? 'true') === 'true';

interface ClaudeApi {
  complete?: (prompt: string, options?: unknown) => Promise<string>;
}

declare global {
  interface Window {
    claude?: ClaudeApi;
  }
}

export function isAvailable(): boolean {
  if (!PATHFINDER_ENABLED) return false;
  return typeof window !== 'undefined' && typeof window.claude?.complete === 'function';
}

export interface ChatTurn {
  role: 'user' | 'assistant';
  text: string;
}

const SYSTEM_PREAMBLE = `You are the Future Bridge Pathfinder — an advisor helping a small-business owner choose a bundle.
Hard rules:
- Use only the $ values from the bundle snapshot. Never invent prices.
- Keep answers to ≤3 short sentences.
- If the user asks something outside the bundle (legal, medical, contracts), reply with: "That's one for our team — let's book a 15-min call." and stop.
- If the user mentions a different team size, use the hypothetical numbers in the context, do not recompute.`;

function hypotheticalFromMessage(message: string, services: Services): { employees: number; monthly: number } | null {
  const m = message.match(/\b(\d{1,3})\s*(?:people|employees|staff|team|seats?)\b/i);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (!Number.isFinite(n) || n <= 0 || n > 500) return null;
  const scaled: Services = {
    ...services,
    ai: { ...services.ai, seats: services.ai.enabled ? Math.max(services.ai.seats, n) : services.ai.seats },
    wifi: { ...services.wifi, aps: services.wifi.enabled ? Math.max(services.wifi.aps, Math.ceil(n / 10)) : services.wifi.aps },
    phones: { ...services.phones, lines: Math.max(services.phones.lines, Math.ceil(n / 2.5)) },
  };
  return { employees: n, monthly: calculateTotal(scaled).monthly };
}

export function buildContext(
  state: Pick<BuildState, 'business' | 'services'>,
  history: ChatTurn[],
  userMessage: string,
): string {
  const totals = calculateTotal(state.services);
  const s = state.services;
  const b = state.business;
  const hypothetical = hypotheticalFromMessage(userMessage, s);

  const bundleSnapshot = [
    `Internet: ${s.internet.tier} — $${PRICES.internet[s.internet.tier]}/mo${s.internet.failover ? ' (+ $25/mo failover)' : ''}${s.internet.staticIP ? ' (+ $15/mo static IP)' : ''}`,
    `Phone lines: ${s.phones.lines} × $${PRICES.phones.line}/mo`,
    s.phones.cc.type !== 'none' ? `Contact center: ${s.phones.cc.type} · ${s.phones.cc.agents} agents` : null,
    s.wifi.enabled ? `Wi-Fi: ${s.wifi.aps} APs × $${PRICES.wifi.ap}/mo${s.wifi.proInstall ? ' + $150 once' : ''}` : null,
    s.security.enabled ? `Security: ${s.security.pack} — $${PRICES.security[s.security.pack]}/mo` : null,
    s.ai.enabled ? `AI Pathfinder: ${s.ai.seats} seats × $${PRICES.ai.perSeat}/mo` : null,
    s.energy.enabled ? `Energy audit: $2,000 once (est. savings $${s.energy.projMonthlySaving}/mo)` : null,
    `Totals: ${formatMoney(totals.monthly)}/mo · ${formatMoney(totals.oneTime)} once`,
  ]
    .filter(Boolean)
    .join('\n');

  const businessFacts = [
    `Industry: ${b.industry}`,
    `Employees: ${b.employees}`,
    `Role: ${b.role}`,
    b.currentMonthlyBill != null ? `Current monthly bill: $${b.currentMonthlyBill}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const hypotheticalBlock = hypothetical
    ? `\nHypothetical (${hypothetical.employees} employees): ${formatMoney(hypothetical.monthly)}/mo`
    : '';

  const lastTurns = history
    .slice(-4)
    .map((t) => `${t.role === 'user' ? 'User' : 'Assistant'}: ${t.text}`)
    .join('\n');

  return [
    SYSTEM_PREAMBLE,
    `\nCurrent bundle:\n${bundleSnapshot}`,
    `\nBusiness facts:\n${businessFacts}${hypotheticalBlock}`,
    lastTurns ? `\nRecent conversation:\n${lastTurns}` : '',
    `\nUser: ${userMessage}\nAssistant:`,
  ].join('');
}

export async function ask(
  state: Pick<BuildState, 'business' | 'services'>,
  history: ChatTurn[],
  userMessage: string,
): Promise<string> {
  if (!isAvailable()) {
    return "Chat is offline in this demo — I'd grab a 15-min call with our team so we can walk you through it.";
  }
  const prompt = buildContext(state, history, userMessage);
  try {
    const answer = await window.claude!.complete!(prompt);
    return (answer ?? '').toString().trim() || "Give me a moment — could you rephrase that?";
  } catch (err) {
    console.warn('[Pathfinder] complete() failed', err);
    return "I hit a snag reaching the Pathfinder brain. Want to book a quick call instead?";
  }
}
