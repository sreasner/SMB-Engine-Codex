import type { Services, BuildState } from '@/store/useBuildStore';

export const PRICES = {
  energy: { oneTime: 2000 },
  internet: {
    '500mbps': 99,
    '1gig': 149,
    '2gig': 229,
    failover: 25,
    staticIP: 15,
  },
  phones: { line: 20 },
  cc: {
    small: { perAgent: 45 },
    full: { perAgent: 79 },
    analytics: 12,
    recording: 8,
  },
  wifi: { ap: 15, proInstall: 150 },
  security: { basic: 99, hipaa: 180, pci: 150 },
  ai: { perSeat: 15 },
} as const;

export interface Totals {
  monthly: number;
  oneTime: number;
}

export function calculateTotal(services: Services): Totals {
  let monthly = 0;
  let oneTime = 0;

  if (services.energy.enabled) oneTime += PRICES.energy.oneTime;

  monthly += PRICES.internet[services.internet.tier];
  if (services.internet.failover) monthly += PRICES.internet.failover;
  if (services.internet.staticIP) monthly += PRICES.internet.staticIP;

  monthly += services.phones.lines * PRICES.phones.line;
  const cc = services.phones.cc;
  if (cc.type !== 'none' && cc.agents > 0) {
    const tier = cc.type === 'small' ? PRICES.cc.small : PRICES.cc.full;
    monthly += cc.agents * tier.perAgent;
    if (cc.analytics) monthly += cc.agents * PRICES.cc.analytics;
    if (cc.recording) monthly += cc.agents * PRICES.cc.recording;
  }

  if (services.wifi.enabled) {
    monthly += services.wifi.aps * PRICES.wifi.ap;
    if (services.wifi.proInstall) oneTime += PRICES.wifi.proInstall;
  }

  if (services.security.enabled) monthly += PRICES.security[services.security.pack];

  if (services.ai.enabled) monthly += services.ai.seats * PRICES.ai.perSeat;

  for (const feature of services.custom ?? []) {
    if (!feature.enabled) continue;
    monthly += feature.monthly;
    oneTime += feature.oneTime;
  }

  return { monthly: Math.round(monthly), oneTime };
}

export interface SavingsEstimate {
  monthlyDelta: number | null;
  energySavings: number;
  total: number | null;
}

export function estimateSavings(state: Pick<BuildState, 'business' | 'services'>): SavingsEstimate {
  const current = state.business.currentMonthlyBill;
  const proposed = calculateTotal(state.services).monthly;
  const energySavings = state.services.energy.enabled ? state.services.energy.projMonthlySaving : 0;
  if (current == null) return { monthlyDelta: null, energySavings, total: null };
  return {
    monthlyDelta: current - proposed,
    energySavings,
    total: current - proposed + energySavings,
  };
}

export function formatMoney(n: number): string {
  return `$${n.toLocaleString('en-US')}`;
}
