import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Industry =
  | 'healthcare'
  | 'retail'
  | 'proservices'
  | 'trades'
  | 'hospitality'
  | 'schools'
  | 'manufacturing'
  | 'other';

export type Role = 'owner' | 'ops' | 'it' | 'finance' | 'other';
export type InternetTier = '500mbps' | '1gig' | '2gig';
export type CcType = 'none' | 'small' | 'full';
export type SecurityPack = 'basic' | 'hipaa' | 'pci';
export type Source = 'pathfinder' | 'linear';
export type PainPoint =
  | 'vendor-sprawl'
  | 'slow-internet'
  | 'old-phones'
  | 'security-risk'
  | 'want-ai'
  | 'high-cost';

export interface CustomFeatureSelection {
  id: string;
  title: string;
  description: string;
  monthly: number;
  oneTime: number;
  badge?: string;
  enabled: boolean;
}

export interface Business {
  name: string;
  address: string;
  employees: number;
  industry: Industry;
  role: Role;
  email: string;
  currentMonthlyBill: number | null;
  painPoint: PainPoint | null;
}

export interface Services {
  energy: { enabled: boolean; oneTimeFee: number; projMonthlySaving: number };
  internet: { tier: InternetTier; failover: boolean; staticIP: boolean };
  phones: {
    lines: number;
    cc: {
      type: CcType;
      agents: number;
      analytics: boolean;
      recording: boolean;
    };
  };
  wifi: { enabled: boolean; aps: number; proInstall: boolean };
  security: { enabled: boolean; pack: SecurityPack; flagged: boolean };
  ai: { enabled: boolean; seats: number };
  custom?: CustomFeatureSelection[];
}

export interface Meta {
  source: Source;
  resumeToken: string | null;
  createdAt: string;
  updatedAt: string;
  lastRoute: string;
  confirmationId: string | null;
}

export interface BuildState {
  business: Business;
  services: Services;
  meta: Meta;

  // actions
  setBusiness: (patch: Partial<Business>) => void;
  setServices: (patch: (s: Services) => Services) => void;
  setIndustry: (industry: Industry) => void;
  applyPreset: (patch: { business?: Partial<Business>; services?: Partial<Services> }) => void;
  setLastRoute: (route: string) => void;
  setSource: (source: Source) => void;
  setConfirmationId: (id: string | null) => void;
  reset: () => void;
  hydrate: (state: Pick<BuildState, 'business' | 'services' | 'meta'>) => void;
}

export const DEFAULT_STATE: Pick<BuildState, 'business' | 'services' | 'meta'> = {
  business: {
    name: '',
    address: '',
    employees: 12,
    industry: 'other',
    role: 'owner',
    email: '',
    currentMonthlyBill: null,
    painPoint: null,
  },
  services: {
    energy: { enabled: true, oneTimeFee: 2000, projMonthlySaving: 168 },
    internet: { tier: '1gig', failover: true, staticIP: false },
    phones: { lines: 5, cc: { type: 'none', agents: 0, analytics: false, recording: false } },
    wifi: { enabled: true, aps: 3, proInstall: false },
    security: { enabled: true, pack: 'basic', flagged: false },
    ai: { enabled: false, seats: 0 },
    custom: [],
  },
  meta: {
    source: 'linear',
    resumeToken: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastRoute: '/',
    confirmationId: null,
  },
};

const touch = (meta: Meta): Meta => ({ ...meta, updatedAt: new Date().toISOString() });

export const useBuildStore = create<BuildState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      setBusiness: (patch) =>
        set((s) => ({
          business: { ...s.business, ...patch },
          meta: touch(s.meta),
        })),

      setServices: (patch) =>
        set((s) => ({
          services: patch(s.services),
          meta: touch(s.meta),
        })),

      setIndustry: (industry) =>
        set((s) => ({
          business: { ...s.business, industry },
          meta: touch(s.meta),
        })),

      applyPreset: ({ business, services }) =>
        set((s) => ({
          business: business ? { ...s.business, ...business } : s.business,
          services: services
            ? {
                ...s.services,
                ...services,
                energy: { ...s.services.energy, ...(services.energy ?? {}) },
                internet: { ...s.services.internet, ...(services.internet ?? {}) },
                phones: {
                  ...s.services.phones,
                  ...(services.phones ?? {}),
                  cc: { ...s.services.phones.cc, ...(services.phones?.cc ?? {}) },
                },
                wifi: { ...s.services.wifi, ...(services.wifi ?? {}) },
                security: { ...s.services.security, ...(services.security ?? {}) },
                ai: { ...s.services.ai, ...(services.ai ?? {}) },
                custom: services.custom ? services.custom.map((feature) => ({ ...feature })) : s.services.custom,
              }
            : s.services,
          meta: touch(s.meta),
        })),

      setLastRoute: (lastRoute) => set((s) => ({ meta: touch({ ...s.meta, lastRoute }) })),
      setSource: (source) => set((s) => ({ meta: touch({ ...s.meta, source }) })),
      setConfirmationId: (confirmationId) => set((s) => ({ meta: touch({ ...s.meta, confirmationId }) })),

      reset: () => set({ ...DEFAULT_STATE, meta: { ...DEFAULT_STATE.meta, createdAt: new Date().toISOString() } }),

      hydrate: (state) => set({ ...state }),
    }),
    {
      name: 'fbs.quote',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ business: s.business, services: s.services, meta: s.meta }),
      merge: (persistedState, currentState) => {
        const typed = persistedState as Partial<BuildState>;
        return {
          ...currentState,
          ...typed,
          business: { ...currentState.business, ...(typed.business ?? {}) },
          services: {
            ...currentState.services,
            ...(typed.services ?? {}),
            energy: { ...currentState.services.energy, ...(typed.services?.energy ?? {}) },
            internet: { ...currentState.services.internet, ...(typed.services?.internet ?? {}) },
            phones: {
              ...currentState.services.phones,
              ...(typed.services?.phones ?? {}),
              cc: { ...currentState.services.phones.cc, ...(typed.services?.phones?.cc ?? {}) },
            },
            wifi: { ...currentState.services.wifi, ...(typed.services?.wifi ?? {}) },
            security: { ...currentState.services.security, ...(typed.services?.security ?? {}) },
            ai: { ...currentState.services.ai, ...(typed.services?.ai ?? {}) },
            custom: typed.services?.custom ?? currentState.services.custom,
          },
          meta: { ...currentState.meta, ...(typed.meta ?? {}) },
        };
      },
    },
  ),
);
