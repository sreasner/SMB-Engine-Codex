import type { Business, Industry, Services } from '@/store/useBuildStore';
import { buildCustomSelections, DEFAULT_VERTICALS, getVertical } from '@/lib/verticals';

export interface IndustryPreset {
  name: string;
  business: Partial<Business>;
  services: Partial<Services>;
}

export const PRESETS: Record<Industry, IndustryPreset> = (Object.keys(DEFAULT_VERTICALS) as Industry[]).reduce(
  (acc, industry) => {
    const vertical = DEFAULT_VERTICALS[industry];
    acc[industry] = {
      name: vertical.label,
      business: { ...vertical.preset.business },
      services: {
        ...vertical.preset.services,
        custom: vertical.customFeatures.map((feature) => ({ ...feature, enabled: true })),
      },
    };
    return acc;
  },
  {} as Record<Industry, IndustryPreset>,
);

export function getPresetForIndustry(industry: Industry): IndustryPreset {
  const vertical = getVertical(industry);
  return {
    name: vertical.label,
    business: { ...vertical.preset.business, industry },
    services: {
      ...vertical.preset.services,
      custom: buildCustomSelections(industry),
    },
  };
}

export function recommendInternetTier(employees: number): '500mbps' | '1gig' | '2gig' {
  if (employees < 5) return '500mbps';
  if (employees < 25) return '1gig';
  return '2gig';
}

export function recommendPhoneLines(employees: number): number {
  return Math.max(1, Math.round(employees / 2.5));
}

export function recommendWifiAps(employees: number): number {
  if (employees < 5) return 1;
  if (employees < 15) return 2;
  if (employees < 30) return 3;
  return Math.ceil(employees / 10);
}
