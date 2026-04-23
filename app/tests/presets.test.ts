import { describe, it, expect } from 'vitest';
import { PRESETS, recommendInternetTier, recommendPhoneLines, recommendWifiAps } from '@/lib/presets';

describe('industry presets', () => {
  it('includes all 8 industries', () => {
    const ids = Object.keys(PRESETS).sort();
    expect(ids).toEqual(['healthcare', 'hospitality', 'manufacturing', 'other', 'proservices', 'retail', 'schools', 'trades'].sort());
  });

  it('healthcare flags HIPAA pack', () => {
    expect(PRESETS.healthcare.services.security?.pack).toBe('hipaa');
    expect(PRESETS.healthcare.services.security?.flagged).toBe(true);
  });

  it('retail flags PCI pack', () => {
    expect(PRESETS.retail.services.security?.pack).toBe('pci');
    expect(PRESETS.retail.services.security?.flagged).toBe(true);
  });

  it('hospitality recommends 2gig and pro-install wifi', () => {
    expect(PRESETS.hospitality.services.internet?.tier).toBe('2gig');
    expect(PRESETS.hospitality.services.wifi?.proInstall).toBe(true);
  });

  it('proservices pre-enables AI', () => {
    expect(PRESETS.proservices.services.ai?.enabled).toBe(true);
  });
});

describe('recommendations', () => {
  it('recommends internet tier by employees', () => {
    expect(recommendInternetTier(3)).toBe('500mbps');
    expect(recommendInternetTier(12)).toBe('1gig');
    expect(recommendInternetTier(50)).toBe('2gig');
  });

  it('scales phone lines to team size', () => {
    expect(recommendPhoneLines(12)).toBe(5);
    expect(recommendPhoneLines(1)).toBe(1);
  });

  it('scales wifi APs', () => {
    expect(recommendWifiAps(3)).toBe(1);
    expect(recommendWifiAps(12)).toBe(2);
    expect(recommendWifiAps(25)).toBe(3);
    expect(recommendWifiAps(80)).toBe(8);
  });
});
