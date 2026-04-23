import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Globe, Phone, Wifi, Shield, Bot, CheckCircle2 } from 'lucide-react';
import { useBuildStore } from '@/store/useBuildStore';
import { BUNDLE } from '@/content/copy';
import { formatMoney, PRICES } from '@/lib/pricing';
import { BundleLineItem } from '@/components/summary/BundleLineItem';
import { SummaryPanel } from '@/components/summary/SummaryPanel';
import { MobileCartDrawer } from '@/components/summary/MobileCartDrawer';
import { PathfinderChat } from '@/components/pathfinder/PathfinderChat';
import { ScheduleCallCTA } from '@/components/flow/ScheduleCallCTA';
import { getVertical } from '@/lib/verticals';

export function BuildBundle() {
  const navigate = useNavigate();
  const business = useBuildStore((s) => s.business);
  const services = useBuildStore((s) => s.services);
  const setServices = useBuildStore((s) => s.setServices);
  const setLastRoute = useBuildStore((s) => s.setLastRoute);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const vertical = getVertical(business.industry);
  const customFeatures = services.custom ?? [];

  useEffect(() => {
    setLastRoute('/build/bundle');
  }, [setLastRoute]);

  return (
    <div className="relative overflow-hidden bg-[#f5f6f8] pb-32 lg:pb-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(251,191,36,0.14),transparent_24%),linear-gradient(180deg,#eef2f6_0%,#f8fafb_38%,#f5f6f8_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="overflow-hidden rounded-[36px] border border-white/70 bg-white/78 shadow-[0_35px_80px_rgba(15,23,42,0.10)] backdrop-blur">
          <div className={`bg-gradient-to-br ${vertical.accent} p-6 sm:p-8 lg:p-10`}>
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-2xl">
                <p className="fb-eyebrow flex items-center gap-2">
                  <Sparkles size={14} aria-hidden />
                  Recommended for {vertical.label}
                </p>
                <h1 className="fb-h1 mt-3 max-w-3xl">{vertical.bundleHeading} for a team of {business.employees}.</h1>
                <p className="fb-body mt-4 max-w-2xl text-neutral-700">
                  {vertical.bundleSummary} {vertical.heroDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {vertical.proofPoints.map((point) => (
                    <span
                      key={point}
                      className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-neutral-700"
                    >
                      <CheckCircle2 size={14} className="text-neutral-950" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/70 bg-white/76 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                  How this page works
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
                  Start with the recommended setup, then adjust anything you want.
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  We already loaded the services and add-ons that typically fit this kind of business. You only need to review, toggle, and submit.
                </p>

                <div className="mt-6 space-y-3 rounded-[24px] bg-neutral-950 px-5 py-5 text-white">
                  <ol className="space-y-3 text-sm text-white/88">
                    <li>1. Review the core services below.</li>
                    <li>2. Add any recommended extras for your business.</li>
                    <li>3. Finalize the quote when it looks right.</li>
                  </ol>
                  <button type="button" onClick={() => setScheduleOpen(true)} className="btn bg-white text-neutral-950 hover:bg-white/90">
                    Talk to an advisor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section>
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="fb-eyebrow">{BUNDLE.eyebrow}</p>
                  <h2 className="fb-h2 mt-2">Core infrastructure</h2>
                </div>
                <p className="hidden text-sm text-neutral-500 md:block">
                  Every item can still be tuned before checkout.
                </p>
              </div>

              <div className="space-y-3">
                <BundleLineItem
                  Icon={Zap}
                  title="Energy audit"
                  description="One-time setup, savings are yours"
                  price={`${formatMoney(PRICES.energy.oneTime)} once`}
                  enabled={services.energy.enabled}
                  onToggle={(v) => setServices((s) => ({ ...s, energy: { ...s.energy, enabled: v } }))}
                />
                <BundleLineItem
                  Icon={Globe}
                  title={`Internet · ${tierLabel(services.internet.tier)}`}
                  description={`Sized for ${business.employees} people with room to grow`}
                  price={`${formatMoney(internetMonthly(services))} /mo`}
                  enabled
                  onEdit={() => navigate('/build/step/3')}
                />
                <BundleLineItem
                  Icon={Phone}
                  title={`Phones × ${services.phones.lines}`}
                  description={services.phones.cc.type === 'none' ? 'Phone lines only' : `${ccLabel(services.phones.cc.type)} · ${services.phones.cc.agents} agents`}
                  price={`${formatMoney(phonesMonthly(services))} /mo`}
                  enabled
                  onEdit={() => navigate('/build/step/4')}
                />
                <BundleLineItem
                  Icon={Wifi}
                  title={`Wi-Fi · ${services.wifi.aps} AP${services.wifi.aps === 1 ? '' : 's'}`}
                  description="Guest network + staff network"
                  price={`${formatMoney(services.wifi.aps * PRICES.wifi.ap)} /mo`}
                  enabled={services.wifi.enabled}
                  onToggle={(v) => setServices((s) => ({ ...s, wifi: { ...s.wifi, enabled: v } }))}
                  onEdit={() => navigate('/build/step/5')}
                />
                <BundleLineItem
                  Icon={Shield}
                  title={`Security · ${secLabel(services.security.pack)}`}
                  description={services.security.flagged ? 'Required for your industry' : '24/7 monitoring + audits'}
                  price={`${formatMoney(PRICES.security[services.security.pack])} /mo`}
                  enabled={services.security.enabled}
                  flagged={services.security.flagged}
                  onToggle={(v) => setServices((s) => ({ ...s, security: { ...s.security, enabled: v } }))}
                  onEdit={() => navigate('/build/step/5')}
                />
                <BundleLineItem
                  Icon={Bot}
                  title="AI Pathfinder"
                  description={services.ai.enabled ? `${services.ai.seats} seats · coaching + design` : 'Add anytime from your account'}
                  price={services.ai.enabled ? `${formatMoney(services.ai.seats * PRICES.ai.perSeat)} /mo` : '$15/seat/mo'}
                  enabled={services.ai.enabled}
                  onToggle={(v) =>
                    setServices((s) => ({
                      ...s,
                      ai: { enabled: v, seats: v ? Math.max(s.ai.seats, business.employees) : 0 },
                    }))
                  }
                />
              </div>
            </section>

            <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/78 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                    Unique to {vertical.label}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                    Recommended add-ons
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    These extras are shown because they often matter for this type of business.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {customFeatures.length === 0 && (
                  <div className="rounded-[24px] border border-dashed border-neutral-300 bg-neutral-50 px-5 py-8 text-sm text-neutral-500">
                    No custom modules configured for this vertical yet.
                  </div>
                )}

                {customFeatures.map((feature) => (
                  <div key={feature.id} className="rounded-[28px] border border-neutral-200 bg-white px-5 py-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-neutral-950">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">{feature.description}</p>
                      </div>
                      {feature.badge && (
                        <span className="rounded-full bg-neutral-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                          {feature.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">
                          {feature.monthly > 0 ? `${formatMoney(feature.monthly)}/mo` : 'Included monthly'}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-neutral-400">
                          {feature.oneTime > 0 ? `${formatMoney(feature.oneTime)} once` : 'No setup fee'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setServices((s) => ({
                            ...s,
                            custom: (s.custom ?? []).map((item) =>
                              item.id === feature.id ? { ...item, enabled: !item.enabled } : item,
                            ),
                          }))
                        }
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                          feature.enabled
                            ? 'bg-neutral-950 text-white hover:bg-neutral-800'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {feature.enabled ? 'Included' : 'Add module'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[32px] border border-white/70 bg-white/78 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                    Guidance
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                    Pathfinder support
                  </h2>
                </div>
              </div>

              <PathfinderChat onScheduleCall={() => setScheduleOpen(true)} />

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn btn-lg btn-primary" onClick={() => navigate('/build/review')}>
                  {BUNDLE.ctaFinalize} <ArrowRight size={16} />
                </button>
                <button type="button" className="btn btn-lg btn-ghost" onClick={() => navigate('/build/from-scratch')}>
                  {BUNDLE.ctaScratch}
                </button>
              </div>
            </section>
          </div>

          <div className="hidden lg:block">
            <SummaryPanel />
          </div>
        </div>
      </div>

      <MobileCartDrawer />
      <ScheduleCallCTA open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </div>
  );
}

function tierLabel(tier: '500mbps' | '1gig' | '2gig') {
  return tier === '500mbps' ? '500 Mbps' : tier === '1gig' ? '1 Gig' : '2 Gig';
}

function ccLabel(type: 'small' | 'full' | 'none') {
  return type === 'small' ? 'Small contact center' : type === 'full' ? 'Full contact center' : '—';
}

function secLabel(pack: 'basic' | 'hipaa' | 'pci') {
  return pack === 'basic' ? 'Basic' : pack === 'hipaa' ? 'HIPAA' : 'PCI';
}

function internetMonthly(services: ReturnType<typeof useBuildStore.getState>['services']) {
  return (
    PRICES.internet[services.internet.tier] +
    (services.internet.failover ? PRICES.internet.failover : 0) +
    (services.internet.staticIP ? PRICES.internet.staticIP : 0)
  );
}

function phonesMonthly(services: ReturnType<typeof useBuildStore.getState>['services']) {
  const base = services.phones.lines * PRICES.phones.line;
  const cc = services.phones.cc;
  if (cc.type === 'none' || cc.agents === 0) return base;
  const tier = cc.type === 'small' ? PRICES.cc.small.perAgent : PRICES.cc.full.perAgent;
  const addons = (cc.analytics ? PRICES.cc.analytics : 0) + (cc.recording ? PRICES.cc.recording : 0);
  return base + cc.agents * (tier + addons);
}
