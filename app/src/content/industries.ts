import { Stethoscope, ShoppingBag, Scale, HardHat, BedDouble, GraduationCap, Factory, Sparkles, type LucideIcon } from 'lucide-react';
import type { Industry } from '@/store/useBuildStore';
import { getVerticalCatalog } from '@/lib/verticals';

export interface IndustryCardMeta {
  id: Industry;
  label: string;
  subtitle: string;
  Icon: LucideIcon;
}

const ICONS: Record<Industry, LucideIcon> = {
  healthcare: Stethoscope,
  retail: ShoppingBag,
  proservices: Scale,
  trades: HardHat,
  hospitality: BedDouble,
  schools: GraduationCap,
  manufacturing: Factory,
  other: Sparkles,
};

export function getIndustries(): IndustryCardMeta[] {
  const catalog = getVerticalCatalog();
  return (Object.keys(ICONS) as Industry[]).map((id) => ({
    id,
    label: catalog[id].label,
    subtitle: catalog[id].subtitle,
    Icon: ICONS[id],
  }));
}

export const INDUSTRIES: IndustryCardMeta[] = getIndustries();
