import { describe, it, expect } from 'vitest';
import { calculateTotal, estimateSavings, PRICES } from '@/lib/pricing';
import { DEFAULT_STATE } from '@/store/useBuildStore';
import type { Services } from '@/store/useBuildStore';

const emptyServices = (): Services => ({
  energy: { enabled: false, oneTimeFee: 2000, projMonthlySaving: 168 },
  internet: { tier: '500mbps', failover: false, staticIP: false },
  phones: { lines: 0, cc: { type: 'none', agents: 0, analytics: false, recording: false } },
  wifi: { enabled: false, aps: 0, proInstall: false },
  security: { enabled: false, pack: 'basic', flagged: false },
  ai: { enabled: false, seats: 0 },
});

describe('calculateTotal', () => {
  it('returns base internet only when all other services off', () => {
    const s = emptyServices();
    // Internet tier always enabled — base 500mbps = 99
    expect(calculateTotal(s)).toEqual({ monthly: 99, oneTime: 0 });
  });

  it('adds $2,000 one-time for energy, zero monthly', () => {
    const s = emptyServices();
    s.energy.enabled = true;
    const r = calculateTotal(s);
    expect(r.oneTime).toBe(2000);
    expect(r.monthly).toBe(99);
  });

  it('prices internet tiers correctly', () => {
    const s = emptyServices();
    s.internet.tier = '1gig';
    expect(calculateTotal(s).monthly).toBe(149);
    s.internet.tier = '2gig';
    expect(calculateTotal(s).monthly).toBe(229);
  });

  it('adds failover and staticIP surcharges', () => {
    const s = emptyServices();
    s.internet.tier = '1gig';
    s.internet.failover = true;
    s.internet.staticIP = true;
    expect(calculateTotal(s).monthly).toBe(149 + 25 + 15);
  });

  it('prices phone lines at $20 each', () => {
    const s = emptyServices();
    s.phones.lines = 5;
    expect(calculateTotal(s).monthly).toBe(99 + 5 * 20);
  });

  it('adds small CC only when type!=none and agents>0', () => {
    const s = emptyServices();
    s.phones.cc = { type: 'small', agents: 0, analytics: false, recording: false };
    expect(calculateTotal(s).monthly).toBe(99);

    s.phones.cc.agents = 3;
    expect(calculateTotal(s).monthly).toBe(99 + 3 * 45);
  });

  it('applies CC analytics and recording per-agent', () => {
    const s = emptyServices();
    s.phones.cc = { type: 'small', agents: 3, analytics: true, recording: true };
    const expected = 99 + 3 * (45 + 12 + 8);
    expect(calculateTotal(s).monthly).toBe(expected);
  });

  it('does not apply CC addons when type is none', () => {
    const s = emptyServices();
    s.phones.cc = { type: 'none', agents: 0, analytics: true, recording: true };
    expect(calculateTotal(s).monthly).toBe(99);
  });

  it('prices wifi APs at $15/mo and proInstall as $150 one-time', () => {
    const s = emptyServices();
    s.wifi.enabled = true;
    s.wifi.aps = 3;
    s.wifi.proInstall = true;
    const r = calculateTotal(s);
    expect(r.monthly).toBe(99 + 3 * 15);
    expect(r.oneTime).toBe(150);
  });

  it('prices security packs correctly', () => {
    const s = emptyServices();
    s.security.enabled = true;
    s.security.pack = 'basic';
    expect(calculateTotal(s).monthly).toBe(99 + 99);
    s.security.pack = 'hipaa';
    expect(calculateTotal(s).monthly).toBe(99 + 180);
    s.security.pack = 'pci';
    expect(calculateTotal(s).monthly).toBe(99 + 150);
  });

  it('prices AI per seat', () => {
    const s = emptyServices();
    s.ai = { enabled: true, seats: 12 };
    expect(calculateTotal(s).monthly).toBe(99 + 12 * 15);
  });

  it('full healthcare bundle produces expected totals', () => {
    const s: Services = {
      energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 168 },
      internet: { tier: '1gig', failover: true, staticIP: false },
      phones: { lines: 5, cc: { type: 'small', agents: 3, analytics: false, recording: false } },
      wifi: { enabled: true, aps: 3, proInstall: false },
      security: { enabled: true, pack: 'hipaa', flagged: true },
      ai: { enabled: true, seats: 12 },
    };
    const r = calculateTotal(s);
    // 174 internet + 100 phones + 135 cc + 45 wifi + 180 hipaa + 180 ai = 814
    expect(r.monthly).toBe(814);
    expect(r.oneTime).toBe(2000);
  });
});

describe('estimateSavings', () => {
  it('returns null total when currentMonthlyBill is not set', () => {
    const state = { business: { ...DEFAULT_STATE.business, currentMonthlyBill: null }, services: DEFAULT_STATE.services };
    expect(estimateSavings(state).total).toBeNull();
  });

  it('subtracts proposed from current and adds energy savings', () => {
    const state = {
      business: { ...DEFAULT_STATE.business, currentMonthlyBill: 1774 },
      services: { ...DEFAULT_STATE.services },
    };
    const r = estimateSavings(state);
    const proposed = calculateTotal(state.services).monthly;
    expect(r.total).toBe(1774 - proposed + 168);
  });

  it('ignores energy savings when energy disabled', () => {
    const svcs: Services = { ...DEFAULT_STATE.services, energy: { ...DEFAULT_STATE.services.energy, enabled: false } };
    const state = { business: { ...DEFAULT_STATE.business, currentMonthlyBill: 1000 }, services: svcs };
    const r = estimateSavings(state);
    expect(r.energySavings).toBe(0);
    expect(r.total).toBe(1000 - calculateTotal(svcs).monthly);
  });
});

describe('PRICES constant', () => {
  it('matches the wireframe build spec', () => {
    expect(PRICES.energy.oneTime).toBe(2000);
    expect(PRICES.internet['1gig']).toBe(149);
    expect(PRICES.security.hipaa).toBe(180);
    expect(PRICES.cc.small.perAgent).toBe(45);
  });
});
