import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Send, Download, Mail, Share2 } from 'lucide-react';
import { useBuildStore } from '@/store/useBuildStore';
import { calculateTotal, formatMoney, estimateSavings, PRICES } from '@/lib/pricing';
import { REVIEW } from '@/content/copy';
import { TimelineGraphic } from '@/components/flow/TimelineGraphic';
import { SavingsBadge } from '@/components/summary/SavingsBadge';
import { SaveResumeModal } from '@/components/flow/SaveResumeModal';
import { ScheduleCallCTA } from '@/components/flow/ScheduleCallCTA';
import { submit } from '@/lib/webhook';

export function BuildReview() {
  const navigate = useNavigate();
  const services = useBuildStore((s) => s.services);
  const business = useBuildStore((s) => s.business);
  const setServices = useBuildStore((s) => s.setServices);
  const setBusiness = useBuildStore((s) => s.setBusiness);
  const setLastRoute = useBuildStore((s) => s.setLastRoute);
  const setConfirmationId = useBuildStore((s) => s.setConfirmationId);
  const [email, setEmail] = useState(business.email);
  const [submitting, setSubmitting] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const customFeatures = services.custom ?? [];

  useEffect(() => {
    setLastRoute('/build/review');
  }, [setLastRoute]);

  const totals = calculateTotal(services);
  const savings = estimateSavings({ business, services });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setBusiness({ email });
    const { id } = await submit({
      business: { ...business, email },
      services,
      meta: useBuildStore.getState().meta,
    });
    setConfirmationId(id);
    navigate(`/build/confirm/${id}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 pb-32 lg:pb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="fb-eyebrow">Step 7 · Review</p>
          <h1 className="fb-h2 mt-1">Review your quote</h1>
          <p className="fb-body mt-1 text-neutral-700">Everything is editable. Submit when you are ready.</p>
        </div>
        <button type="button" className="btn btn-ghost hidden sm:inline-flex" onClick={() => navigate('/build/step/6')}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="fb-h3">About your business</h2>
              <button className="btn btn-ghost text-sm" onClick={() => navigate('/build/step/1')}>
                <Edit3 size={14} /> Edit
              </button>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 fb-body">
              <dt className="text-neutral-600">Business</dt>
              <dd>{business.name || <span className="text-neutral-500">—</span>}</dd>
              <dt className="text-neutral-600">Address</dt>
              <dd className="truncate">{business.address || <span className="text-neutral-500">—</span>}</dd>
              <dt className="text-neutral-600">Team</dt>
              <dd>{business.employees} people</dd>
              <dt className="text-neutral-600">Industry</dt>
              <dd className="capitalize">{business.industry}</dd>
            </dl>
          </section>

          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="fb-h3">Your bundle</h2>
              <button className="btn btn-ghost text-sm" onClick={() => navigate('/build/step/3')}>
                <Edit3 size={14} /> Edit services
              </button>
            </div>
            <ul className="divide-y divide-neutral-100">
              <LineRow
                title="Energy audit"
                desc="One-time supplier switch + contract review"
                price={services.energy.enabled ? `${formatMoney(PRICES.energy.oneTime)} once` : '—'}
                enabled={services.energy.enabled}
                onToggle={(v) => setServices((s) => ({ ...s, energy: { ...s.energy, enabled: v } }))}
              />
              <LineRow
                title={`Internet · ${tierLabel(services.internet.tier)}`}
                desc={internetBlurb(services.internet.failover, services.internet.staticIP)}
                price={`${formatMoney(internetMonthly(services))} /mo`}
                enabled
                editHref="/build/step/3"
                onEdit={() => navigate('/build/step/3')}
              />
              <LineRow
                title={`Phones × ${services.phones.lines}`}
                desc={
                  services.phones.cc.type === 'none'
                    ? 'Phone lines only'
                    : `${ccLabel(services.phones.cc.type)} · ${services.phones.cc.agents} agents`
                }
                price={`${formatMoney(phonesMonthly(services))} /mo`}
                enabled
                editHref="/build/step/4"
                onEdit={() => navigate('/build/step/4')}
              />
              <LineRow
                title="Wi-Fi"
                desc={`${services.wifi.aps} access point${services.wifi.aps === 1 ? '' : 's'}${services.wifi.proInstall ? ' · pro install' : ''}`}
                price={
                  services.wifi.enabled
                    ? `${formatMoney(services.wifi.aps * PRICES.wifi.ap)} /mo${services.wifi.proInstall ? ` + ${formatMoney(PRICES.wifi.proInstall)} once` : ''}`
                    : '—'
                }
                enabled={services.wifi.enabled}
                onToggle={(v) => setServices((s) => ({ ...s, wifi: { ...s.wifi, enabled: v } }))}
              />
              <LineRow
                title={`Security · ${secLabel(services.security.pack)}`}
                desc={services.security.flagged ? 'Required for your industry' : '24/7 monitoring + quarterly audits'}
                price={
                  services.security.enabled
                    ? `${formatMoney(PRICES.security[services.security.pack])} /mo`
                    : '—'
                }
                enabled={services.security.enabled}
                onToggle={(v) => setServices((s) => ({ ...s, security: { ...s.security, enabled: v } }))}
                flagged={services.security.flagged}
              />
              <LineRow
                title="AI Pathfinder"
                desc={services.ai.enabled ? `${services.ai.seats} seats · readiness + coaching` : 'Add anytime from your account'}
                price={services.ai.enabled ? `${formatMoney(services.ai.seats * PRICES.ai.perSeat)} /mo` : '—'}
                enabled={services.ai.enabled}
                onToggle={(v) =>
                  setServices((s) => ({
                    ...s,
                    ai: { enabled: v, seats: v ? Math.max(s.ai.seats, s.ai.seats || business.employees) : 0 },
                  }))
                }
              />
              {customFeatures.map((feature) => (
                <LineRow
                  key={feature.id}
                  title={feature.title}
                  desc={feature.description}
                  price={feature.enabled ? customPrice(feature.monthly, feature.oneTime) : '—'}
                  enabled={feature.enabled}
                  flagged={feature.badge === 'Essential'}
                  onToggle={(v) =>
                    setServices((s) => ({
                      ...s,
                      custom: (s.custom ?? []).map((item) => (item.id === feature.id ? { ...item, enabled: v } : item)),
                    }))
                  }
                />
              ))}
            </ul>
          </section>

          {savings.total != null && savings.total > 0 && (
            <section className="card p-5 sm:p-6 bg-primary-50 border-primary-200">
              <h2 className="fb-h3 mb-1">{REVIEW.savingsTitle}</h2>
              <p className="fb-small text-neutral-700 mb-3">
                {REVIEW.savingsLead.replace('{current}', String(business.currentMonthlyBill ?? '—'))}
              </p>
              <SavingsBadge amount={savings.total} />
            </section>
          )}

          <TimelineGraphic />
        </div>

        <div className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="card p-5">
            <h3 className="fb-h4 mb-3">Totals</h3>
            <div className="flex items-baseline justify-between">
              <span className="fb-small">Monthly</span>
              <span className="font-display text-3xl font-bold text-primary">
                {formatMoney(totals.monthly)}
                <span className="fb-small font-body ml-1">/mo</span>
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1 pb-3 border-b border-dashed border-neutral-200">
              <span className="fb-small">One-time</span>
              <span className="font-display text-xl font-semibold text-primary">{formatMoney(totals.oneTime)}</span>
            </div>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <label className="block fb-label">
                Email for confirmation
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input mt-1"
                />
              </label>
              <button
                type="submit"
                disabled={submitting || !email}
                className="btn btn-accent w-full justify-center"
              >
                <Send size={16} />
                {submitting ? 'Submitting…' : REVIEW.submit}
              </button>
              <p className="fb-caption">{REVIEW.fine}</p>
            </form>
          </div>

          <div className="card p-4 space-y-2">
            <button type="button" onClick={() => setSaveOpen(true)} className="btn btn-ghost w-full justify-start">
              <Mail size={14} /> {REVIEW.ctaEmail}
            </button>
            <button type="button" onClick={() => window.print()} className="btn btn-ghost w-full justify-start">
              <Download size={14} /> {REVIEW.ctaPdf}
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="btn btn-ghost w-full justify-start"
            >
              <Share2 size={14} /> {REVIEW.ctaShare}
            </button>
            <button type="button" onClick={() => setScheduleOpen(true)} className="btn btn-ghost w-full justify-start">
              {REVIEW.ctaScheduleFallback}
            </button>
          </div>
        </div>
      </div>

      <SaveResumeModal open={saveOpen} onClose={() => setSaveOpen(false)} />
      <ScheduleCallCTA open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </div>
  );
}

interface LineRowProps {
  title: string;
  desc: string;
  price: string;
  enabled: boolean;
  onToggle?: (v: boolean) => void;
  onEdit?: () => void;
  editHref?: string;
  flagged?: boolean;
}

function LineRow({ title, desc, price, enabled, onToggle, onEdit, flagged }: LineRowProps) {
  return (
    <li className="py-3 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`fb-label ${enabled ? '' : 'text-neutral-500 line-through'}`}>{title}</span>
          {flagged && (
            <span className="text-[10px] uppercase tracking-wide font-semibold bg-accent text-white px-1.5 py-0.5 rounded">
              Required
            </span>
          )}
        </div>
        <p className="fb-caption mt-0.5">{desc}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={`fb-label ${enabled ? 'text-primary' : 'text-neutral-400'}`}>{price}</p>
        {onEdit && (
          <button onClick={onEdit} className="fb-caption text-secondary-600 hover:underline mt-1">
            Edit
          </button>
        )}
      </div>
      {onToggle && (
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`${enabled ? 'Disable' : 'Enable'} ${title}`}
          onClick={() => onToggle(!enabled)}
          className={`shrink-0 relative w-10 h-6 rounded-pill transition-colors ${enabled ? 'bg-secondary' : 'bg-neutral-300'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${enabled ? 'translate-x-4' : ''}`}
          />
        </button>
      )}
    </li>
  );
}

function customPrice(monthly: number, oneTime: number) {
  const parts = [];
  if (monthly > 0) parts.push(`${formatMoney(monthly)} /mo`);
  if (oneTime > 0) parts.push(`${formatMoney(oneTime)} once`);
  return parts.join(' + ') || 'Included';
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
function internetBlurb(failover: boolean, staticIP: boolean) {
  const parts: string[] = [];
  if (failover) parts.push('4G failover');
  if (staticIP) parts.push('static IP');
  return parts.length ? parts.join(' · ') : 'Standard fiber';
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
