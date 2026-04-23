import type { Business, Industry, Services } from '@/store/useBuildStore';

export interface VerticalFeatureDefinition {
  id: string;
  title: string;
  description: string;
  monthly: number;
  oneTime: number;
  badge?: string;
}

export interface VerticalDefinition {
  id: Industry;
  label: string;
  subtitle: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  bundleHeading: string;
  bundleSummary: string;
  ambiance: string;
  proofPoints: string[];
  accent: string;
  featureSpotlight: {
    label: string;
    title: string;
    description: string;
  };
  preset: {
    business: Partial<Business>;
    services: Partial<Omit<Services, 'custom'>>;
  };
  customFeatures: VerticalFeatureDefinition[];
}

const LOCAL_KEY = 'fbs.vertical-catalog';

export const DEFAULT_VERTICALS: Record<Industry, VerticalDefinition> = {
  healthcare: {
    id: 'healthcare',
    label: 'Healthcare',
    subtitle: 'Clinics, dental, therapy',
    heroEyebrow: 'Care operations',
    heroHeadline: 'Built for fast check-ins, protected records, and reliable rooms.',
    heroDescription: 'A guided stack for clinics that need HIPAA-ready security, stable guest Wi-Fi, and phones that keep front desks moving.',
    bundleHeading: 'Clinic stack',
    bundleSummary: 'Privacy-first connectivity with calmer front-desk workflows.',
    ambiance: 'Quiet, clinical, premium',
    proofPoints: ['HIPAA-aware security', 'Front-desk call routing', 'Patient Wi-Fi separation'],
    accent: 'from-sky-500/30 via-cyan-400/10 to-white',
    featureSpotlight: {
      label: 'Patient flow',
      title: 'Reduce bottlenecks across intake, phones, and secure staff access.',
      description: 'Each recommendation is tuned around sensitive data, appointment traffic, and a smoother patient arrival experience.',
    },
    preset: {
      business: { industry: 'healthcare' },
      services: {
        energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 168 },
        internet: { tier: '1gig', failover: true, staticIP: false },
        phones: { lines: 5, cc: { type: 'small', agents: 3, analytics: false, recording: false } },
        wifi: { enabled: true, aps: 3, proInstall: false },
        security: { enabled: true, pack: 'hipaa', flagged: true },
        ai: { enabled: false, seats: 0 },
      },
    },
    customFeatures: [
      {
        id: 'patient-texting',
        title: 'Patient texting concierge',
        description: 'Two-way reminders and reschedule handoff for front desk teams.',
        monthly: 89,
        oneTime: 0,
        badge: 'Popular',
      },
      {
        id: 'secure-checkin',
        title: 'Tablet check-in kiosks',
        description: 'Self-serve arrival with secure staff approval behind the desk.',
        monthly: 49,
        oneTime: 299,
      },
    ],
  },
  retail: {
    id: 'retail',
    label: 'Retail & Restaurant',
    subtitle: 'POS, guest Wi-Fi, payments',
    heroEyebrow: 'Storefront speed',
    heroHeadline: 'Designed for fast checkouts, guest connectivity, and fewer vendor gaps.',
    heroDescription: 'A store-ready pathway for payment-heavy teams that need PCI-minded security, resilient internet, and simpler day-to-day operations.',
    bundleHeading: 'Storefront stack',
    bundleSummary: 'Everything your floor staff needs to sell, connect, and recover quickly.',
    ambiance: 'Warm, polished, retail-floor',
    proofPoints: ['PCI-minded defaults', 'Backup connectivity', 'Guest Wi-Fi journeys'],
    accent: 'from-amber-400/30 via-orange-300/10 to-white',
    featureSpotlight: {
      label: 'Floor resilience',
      title: 'Keep payments moving when lines are long and downtime is expensive.',
      description: 'This pathway emphasizes transaction uptime, customer Wi-Fi, and simpler location operations.',
    },
    preset: {
      business: { industry: 'retail' },
      services: {
        energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 142 },
        internet: { tier: '1gig', failover: true, staticIP: false },
        phones: { lines: 3, cc: { type: 'none', agents: 0, analytics: false, recording: false } },
        wifi: { enabled: true, aps: 2, proInstall: false },
        security: { enabled: true, pack: 'pci', flagged: true },
        ai: { enabled: false, seats: 0 },
      },
    },
    customFeatures: [
      {
        id: 'guest-wifi-campaigns',
        title: 'Guest Wi-Fi campaigns',
        description: 'Capture emails and launch post-visit follow-up offers automatically.',
        monthly: 59,
        oneTime: 0,
        badge: 'Growth',
      },
      {
        id: 'pos-failover',
        title: 'POS backup lane',
        description: 'Dedicated backup connectivity for payment terminals and kiosks.',
        monthly: 75,
        oneTime: 199,
      },
    ],
  },
  proservices: {
    id: 'proservices',
    label: 'Professional Services',
    subtitle: 'Law, accounting, agency',
    heroEyebrow: 'Client trust',
    heroHeadline: 'A cleaner stack for firms that run on reputation, responsiveness, and secure collaboration.',
    heroDescription: 'Built for offices that need polished call handling, dependable cloud performance, and AI tools that actually help billable teams.',
    bundleHeading: 'Firm stack',
    bundleSummary: 'A refined operating layer for client-facing teams and hybrid offices.',
    ambiance: 'Minimal, tailored, executive',
    proofPoints: ['Static IP options', 'Client-ready voice routing', 'AI seats for knowledge work'],
    accent: 'from-slate-400/25 via-blue-200/10 to-white',
    featureSpotlight: {
      label: 'Client experience',
      title: 'Sharpen response times and reduce context switching across every request.',
      description: 'Recommendations lean into white-glove communications, steady cloud apps, and AI readiness for teams that sell expertise.',
    },
    preset: {
      business: { industry: 'proservices' },
      services: {
        energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 110 },
        internet: { tier: '500mbps', failover: false, staticIP: true },
        phones: { lines: 8, cc: { type: 'small', agents: 2, analytics: false, recording: false } },
        wifi: { enabled: true, aps: 2, proInstall: false },
        security: { enabled: true, pack: 'basic', flagged: false },
        ai: { enabled: true, seats: 8 },
      },
    },
    customFeatures: [
      {
        id: 'client-intake-routing',
        title: 'Client intake routing',
        description: 'Route new matters or leads by practice area and urgency.',
        monthly: 129,
        oneTime: 0,
        badge: 'Signature',
      },
      {
        id: 'secure-doc-share',
        title: 'Secure document share',
        description: 'Private client file delivery with branded access screens.',
        monthly: 79,
        oneTime: 149,
      },
    ],
  },
  trades: {
    id: 'trades',
    label: 'Trades & Field',
    subtitle: 'Dispatch, vans, field teams',
    heroEyebrow: 'Field coordination',
    heroHeadline: 'Purpose-built for dispatch speed, rugged uptime, and crews that are rarely at a desk.',
    heroDescription: 'An operations path for contractors and field teams that need reliable phones, dispatch coverage, and better visibility from office to jobsite.',
    bundleHeading: 'Field ops stack',
    bundleSummary: 'Dispatch, internet resilience, and team coordination without excess complexity.',
    ambiance: 'Direct, durable, fast',
    proofPoints: ['Dispatch-first calling', 'Backup connectivity', 'Simple field coordination'],
    accent: 'from-emerald-400/25 via-lime-300/10 to-white',
    featureSpotlight: {
      label: 'Crew efficiency',
      title: 'Keep the office, field leads, and on-call teams in sync during busy days.',
      description: 'This route emphasizes speed, clear routing, and resilient communications for moving teams.',
    },
    preset: {
      business: { industry: 'trades' },
      services: {
        energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 95 },
        internet: { tier: '500mbps', failover: true, staticIP: false },
        phones: { lines: 4, cc: { type: 'small', agents: 2, analytics: false, recording: false } },
        wifi: { enabled: false, aps: 0, proInstall: false },
        security: { enabled: true, pack: 'basic', flagged: false },
        ai: { enabled: false, seats: 0 },
      },
    },
    customFeatures: [
      {
        id: 'dispatch-board',
        title: 'Dispatch board alerts',
        description: 'Shared queues, missed-call alerts, and after-hours escalation.',
        monthly: 69,
        oneTime: 0,
        badge: 'Ops',
      },
      {
        id: 'crew-sms-updates',
        title: 'Crew SMS updates',
        description: 'Broadcast ETAs, service delays, and route changes to teams in the field.',
        monthly: 39,
        oneTime: 0,
      },
    ],
  },
  hospitality: {
    id: 'hospitality',
    label: 'Hospitality',
    subtitle: 'Hotels, venues, stays',
    heroEyebrow: 'Guest experience',
    heroHeadline: 'Tune every arrival, room, and venue touchpoint into one seamless guest stack.',
    heroDescription: 'For properties that need premium Wi-Fi, dependable voice service, and better operational calm across front desk, events, and back office.',
    bundleHeading: 'Guest-ready stack',
    bundleSummary: 'A premium environment for guest Wi-Fi, room operations, and staff responsiveness.',
    ambiance: 'Soft, elevated, guest-centric',
    proofPoints: ['High-capacity Wi-Fi', 'Property-wide coverage', 'Guest messaging upgrades'],
    accent: 'from-rose-300/25 via-amber-200/10 to-white',
    featureSpotlight: {
      label: 'Arrival moments',
      title: 'Give guests a more polished first impression while keeping staff workflows simple.',
      description: 'Recommendations prioritize property-wide connectivity, concierge responsiveness, and operational grace under load.',
    },
    preset: {
      business: { industry: 'hospitality' },
      services: {
        energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 320 },
        internet: { tier: '2gig', failover: true, staticIP: false },
        phones: { lines: 6, cc: { type: 'small', agents: 2, analytics: false, recording: false } },
        wifi: { enabled: true, aps: 6, proInstall: true },
        security: { enabled: true, pack: 'pci', flagged: true },
        ai: { enabled: false, seats: 0 },
      },
    },
    customFeatures: [
      {
        id: 'guest-arrival-messages',
        title: 'Guest arrival messaging',
        description: 'Automated pre-arrival and on-property text flows.',
        monthly: 99,
        oneTime: 0,
        badge: 'Delight',
      },
      {
        id: 'event-wifi-zones',
        title: 'Event Wi-Fi zones',
        description: 'Temporary or branded Wi-Fi zones for meetings and weddings.',
        monthly: 89,
        oneTime: 249,
      },
    ],
  },
  schools: {
    id: 'schools',
    label: 'Schools & Nonprofits',
    subtitle: 'Districts, orgs, community teams',
    heroEyebrow: 'Community infrastructure',
    heroHeadline: 'Support students, staff, and stakeholders with a stack that feels calm and durable.',
    heroDescription: 'Built for education and nonprofit teams that need dependable coverage, secure systems, and a simpler way to operate across many users.',
    bundleHeading: 'Campus core',
    bundleSummary: 'Coverage, communications, and operational clarity for mission-driven teams.',
    ambiance: 'Open, dependable, thoughtful',
    proofPoints: ['Broad Wi-Fi coverage', 'Reliable staff systems', 'Simple stakeholder communications'],
    accent: 'from-violet-300/20 via-sky-200/10 to-white',
    featureSpotlight: {
      label: 'Mission support',
      title: 'Keep staff connected and reduce friction for the people you serve.',
      description: 'This route emphasizes broad coverage, practical security, and dependable communications across distributed users.',
    },
    preset: {
      business: { industry: 'schools' },
      services: {
        energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 240 },
        internet: { tier: '2gig', failover: false, staticIP: true },
        phones: { lines: 8, cc: { type: 'none', agents: 0, analytics: false, recording: false } },
        wifi: { enabled: true, aps: 6, proInstall: true },
        security: { enabled: true, pack: 'basic', flagged: false },
        ai: { enabled: false, seats: 0 },
      },
    },
    customFeatures: [
      {
        id: 'family-alerts',
        title: 'Family alert system',
        description: 'Broadcast closures, event reminders, and urgent notices instantly.',
        monthly: 65,
        oneTime: 0,
        badge: 'Essential',
      },
      {
        id: 'shared-campus-hotspots',
        title: 'Shared campus hotspots',
        description: 'Add temporary coverage zones for auditoriums, gyms, or outreach events.',
        monthly: 55,
        oneTime: 199,
      },
    ],
  },
  manufacturing: {
    id: 'manufacturing',
    label: 'Light Manufacturing',
    subtitle: 'Plants, shops, warehouse',
    heroEyebrow: 'Floor continuity',
    heroHeadline: 'Keep the floor moving with stronger uptime, clearer alerts, and less operational drag.',
    heroDescription: 'A more industrial pathway for shops and warehouses that need resilient internet, wide Wi-Fi footprints, and better plant communications.',
    bundleHeading: 'Shop floor stack',
    bundleSummary: 'Reliable infrastructure for production, warehousing, and operational continuity.',
    ambiance: 'Engineered, precise, industrial',
    proofPoints: ['Warehouse Wi-Fi planning', 'Resilient internet paths', 'Ops alerting'],
    accent: 'from-zinc-400/25 via-slate-300/10 to-white',
    featureSpotlight: {
      label: 'Continuity',
      title: 'Reduce downtime risk and improve line-of-sight across the floor.',
      description: 'Recommendations prioritize resilient connectivity, broad facility coverage, and faster ops communication.',
    },
    preset: {
      business: { industry: 'manufacturing' },
      services: {
        energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 410 },
        internet: { tier: '1gig', failover: true, staticIP: true },
        phones: { lines: 4, cc: { type: 'none', agents: 0, analytics: false, recording: false } },
        wifi: { enabled: true, aps: 4, proInstall: true },
        security: { enabled: true, pack: 'basic', flagged: false },
        ai: { enabled: false, seats: 0 },
      },
    },
    customFeatures: [
      {
        id: 'floor-alerting',
        title: 'Floor alerting console',
        description: 'Escalate production incidents to supervisors in seconds.',
        monthly: 109,
        oneTime: 0,
        badge: 'Ops',
      },
      {
        id: 'warehouse-handhelds',
        title: 'Warehouse handheld setup',
        description: 'Provisioning support for scanners and shared devices.',
        monthly: 45,
        oneTime: 299,
      },
    ],
  },
  other: {
    id: 'other',
    label: 'Something else',
    subtitle: "We'll tailor a path",
    heroEyebrow: 'Custom fit',
    heroHeadline: 'Start with a clean foundation, then shape a pathway around your operation.',
    heroDescription: 'For businesses that do not fit a preset mold but still want a guided, premium buying experience with thoughtful defaults.',
    bundleHeading: 'Custom stack',
    bundleSummary: 'A flexible starting point you can tune with an advisor or Pathfinder.',
    ambiance: 'Flexible, polished, open-ended',
    proofPoints: ['Flexible defaults', 'Advisor-friendly flow', 'Custom module support'],
    accent: 'from-cyan-300/20 via-slate-200/10 to-white',
    featureSpotlight: {
      label: 'Tailored path',
      title: 'Use a flexible baseline, then add the modules that fit your business model.',
      description: 'This route keeps the structure simple while leaving room for custom workflows and follow-up guidance.',
    },
    preset: {
      business: { industry: 'other' },
      services: {
        energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 150 },
        internet: { tier: '1gig', failover: true, staticIP: false },
        phones: { lines: 3, cc: { type: 'none', agents: 0, analytics: false, recording: false } },
        wifi: { enabled: true, aps: 2, proInstall: false },
        security: { enabled: true, pack: 'basic', flagged: false },
        ai: { enabled: false, seats: 0 },
      },
    },
    customFeatures: [
      {
        id: 'custom-workflow-design',
        title: 'Workflow design session',
        description: 'Map your operation and identify the right add-ons with an advisor.',
        monthly: 0,
        oneTime: 350,
        badge: 'Advisor',
      },
    ],
  },
};

export function cloneVertical(vertical: VerticalDefinition): VerticalDefinition {
  return JSON.parse(JSON.stringify(vertical)) as VerticalDefinition;
}

export function getDefaultVerticalCatalog(): Record<Industry, VerticalDefinition> {
  const entries = Object.entries(DEFAULT_VERTICALS) as Array<[Industry, VerticalDefinition]>;
  return Object.fromEntries(entries.map(([key, value]) => [key, cloneVertical(value)])) as Record<Industry, VerticalDefinition>;
}

function sanitizeFeature(feature: VerticalFeatureDefinition, fallbackId: string): VerticalFeatureDefinition {
  return {
    id: feature.id || fallbackId,
    title: feature.title || 'Untitled feature',
    description: feature.description || '',
    monthly: Number.isFinite(feature.monthly) ? feature.monthly : 0,
    oneTime: Number.isFinite(feature.oneTime) ? feature.oneTime : 0,
    badge: feature.badge || undefined,
  };
}

function mergeVertical(base: VerticalDefinition, override?: Partial<VerticalDefinition>): VerticalDefinition {
  if (!override) return cloneVertical(base);
  const customFeatures = Array.isArray(override.customFeatures)
    ? override.customFeatures.map((feature, index) => sanitizeFeature(feature, `${base.id}-feature-${index + 1}`))
    : base.customFeatures.map((feature) => ({ ...feature }));

  return {
    ...base,
    ...override,
    featureSpotlight: { ...base.featureSpotlight, ...(override.featureSpotlight ?? {}) },
    preset: {
      business: { ...base.preset.business, ...(override.preset?.business ?? {}) },
      services: { ...base.preset.services, ...(override.preset?.services ?? {}) },
    },
    customFeatures,
  };
}

export function getVerticalCatalog(): Record<Industry, VerticalDefinition> {
  const defaults = getDefaultVerticalCatalog();
  if (typeof window === 'undefined') return defaults;

  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<Record<Industry, Partial<VerticalDefinition>>>;
    const entries = Object.entries(defaults) as Array<[Industry, VerticalDefinition]>;
    return Object.fromEntries(entries.map(([key, base]) => [key, mergeVertical(base, parsed[key])])) as Record<Industry, VerticalDefinition>;
  } catch {
    return defaults;
  }
}

export function saveVerticalCatalog(catalog: Record<Industry, VerticalDefinition>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(catalog));
}

export function getVertical(industry: Industry): VerticalDefinition {
  return getVerticalCatalog()[industry] ?? getDefaultVerticalCatalog().other;
}

export function buildCustomSelections(industry: Industry) {
  return getVertical(industry).customFeatures.map((feature) => ({
    ...feature,
    enabled: true,
  }));
}
