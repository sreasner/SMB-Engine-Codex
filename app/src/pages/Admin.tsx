import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Inbox, CheckCircle2, Clock, Mail, Zap, Globe, Phone, Wifi, Shield, Bot } from 'lucide-react';
import { readLocalSubmissions, updateLocalSubmission, pushLocalSubmission, type SubmissionPayload } from '@/lib/webhook';
import { DEFAULT_STATE } from '@/store/useBuildStore';
import { calculateTotal, formatMoney } from '@/lib/pricing';
import { VerticalStudio } from '@/components/admin/VerticalStudio';

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

const SEEDS: SubmissionPayload[] = [
  seed({
    id: 'FBS-DEMO-ACME',
    business: { name: 'Acme Dental', address: '1201 Main St, Denver, CO', employees: 8, industry: 'healthcare', email: 'ops@acmedental.example' },
    services: { security: { pack: 'hipaa', flagged: true } },
    daysAgo: 0,
  }),
  seed({
    id: 'FBS-DEMO-BLUEBIRD',
    business: { name: 'Bluebird Coffee', address: '340 Market St, Portland, OR', employees: 14, industry: 'retail', email: 'owner@bluebird.example' },
    services: { security: { pack: 'pci', flagged: true }, wifi: { enabled: true, aps: 4, proInstall: true } },
    daysAgo: 1,
    status: 'contacted',
  }),
  seed({
    id: 'FBS-DEMO-REDWOOD',
    business: { name: 'Redwood Law', address: '500 Oak St, Boston, MA', employees: 22, industry: 'proservices', email: 'ops@redwoodlaw.example' },
    services: { ai: { enabled: true, seats: 22 }, internet: { tier: '1gig', failover: true, staticIP: true } },
    daysAgo: 2,
  }),
  seed({
    id: 'FBS-DEMO-FIELDDAY',
    business: { name: 'FieldDay Plumbing', address: '22 Industrial Way, Austin, TX', employees: 11, industry: 'trades', email: 'dispatch@fieldday.example' },
    services: { phones: { lines: 4, cc: { type: 'small', agents: 3, analytics: false, recording: false } } },
    daysAgo: 3,
  }),
  seed({
    id: 'FBS-DEMO-PINECONE',
    business: { name: 'Pinecone Inn', address: '88 Lakeside Rd, Burlington, VT', employees: 18, industry: 'hospitality', email: 'gm@pineconeinn.example' },
    services: { internet: { tier: '2gig', failover: true, staticIP: false }, wifi: { enabled: true, aps: 8, proInstall: true }, security: { pack: 'pci', flagged: true } },
    daysAgo: 5,
    status: 'contacted',
  }),
  seed({
    id: 'FBS-DEMO-RIVEROAKS',
    business: { name: 'RiverOaks Academy', address: '12 School Ln, Raleigh, NC', employees: 35, industry: 'schools', email: 'admin@riveroaks.example' },
    services: { internet: { tier: '2gig', failover: false, staticIP: true }, wifi: { enabled: true, aps: 6, proInstall: true } },
    daysAgo: 6,
    status: 'closed',
  }),
];

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

function seed(o: {
  id: string;
  business: Partial<SubmissionPayload['business']>;
  services?: DeepPartial<SubmissionPayload['services']>;
  daysAgo: number;
  status?: SubmissionPayload['status'];
}): SubmissionPayload {
  const defaults = DEFAULT_STATE;
  const business = { ...defaults.business, ...o.business } as SubmissionPayload['business'];
  const services = {
    ...defaults.services,
    ...o.services,
    energy: { ...defaults.services.energy, ...(o.services?.energy ?? {}) },
    internet: { ...defaults.services.internet, ...(o.services?.internet ?? {}) },
    phones: {
      ...defaults.services.phones,
      ...(o.services?.phones ?? {}),
      cc: { ...defaults.services.phones.cc, ...(o.services?.phones?.cc ?? {}) },
    },
    wifi: { ...defaults.services.wifi, ...(o.services?.wifi ?? {}) },
    security: { ...defaults.services.security, ...(o.services?.security ?? {}) },
    ai: { ...defaults.services.ai, ...(o.services?.ai ?? {}) },
  } as SubmissionPayload['services'];
  const totals = calculateTotal(services);
  const submittedAt = new Date(Date.now() - o.daysAgo * 86_400_000).toISOString();
  return {
    id: o.id,
    submittedAt,
    business,
    services,
    totals: { monthly: totals.monthly, oneTime: totals.oneTime, estimatedSavings: null },
    resumeUrl: '',
    source: 'pathfinder',
    status: o.status ?? 'new',
  };
}

export function Admin() {
  const [params] = useSearchParams();
  const provided = params.get('k');
  const [submissions, setSubmissions] = useState<SubmissionPayload[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const existing = readLocalSubmissions();
    if (existing.length === 0) {
      SEEDS.forEach((s) => pushLocalSubmission(s));
      setSubmissions(SEEDS);
    } else {
      setSubmissions(existing);
    }
  }, []);

  const selected = useMemo(
    () => submissions.find((s) => s.id === selectedId) ?? submissions[0] ?? null,
    [submissions, selectedId],
  );

  if (ADMIN_KEY && provided !== ADMIN_KEY) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="fb-h2">Not available</h1>
        <p className="fb-body mt-2 text-neutral-700">
          This page requires an access key. Append <code>?k=…</code> to the URL.
        </p>
      </div>
    );
  }

  function markContacted(id: string) {
    updateLocalSubmission(id, { status: 'contacted' });
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'contacted' } : s)));
  }

  return (
    <div className="bg-[#f5f6f8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <header className="mb-6">
          <p className="fb-eyebrow flex items-center gap-1.5">
            <Inbox size={14} aria-hidden /> Internal · Admin
          </p>
          <h1 className="fb-h1 mt-2">Sales engine admin</h1>
          <p className="fb-caption mt-2">
            Local-first control center for the vertical catalog and submissions inbox.
          </p>
        </header>

        <VerticalStudio />

        <div className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-[28px] border border-white/70 bg-white/82 p-2 shadow-[0_20px_50px_rgba(15,23,42,0.08)] max-h-[70vh] overflow-y-auto">
            <ul>
              {submissions.length === 0 && <li className="p-4 fb-caption">No submissions yet.</li>}
              {submissions.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(s.id)}
                    className={`w-full text-left p-3 rounded-md ${
                      selected?.id === s.id ? 'bg-primary-50' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="fb-label truncate">{s.business.name || s.id}</span>
                      <StatusDot status={s.status} />
                    </div>
                    <p className="fb-caption mt-0.5 truncate">
                      {formatMoney(s.totals.monthly)} /mo · {timeAgo(s.submittedAt)}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {selected ? (
            <section className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h2 className="fb-h3">{selected.business.name || 'Untitled'}</h2>
                  <p className="fb-caption">
                    {selected.id} · {new Date(selected.submittedAt).toLocaleString()} · {selected.source}
                  </p>
                </div>
                <StatusPill status={selected.status} />
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 fb-body mb-5">
                <dt className="text-neutral-600">Email</dt>
                <dd>
                  <a href={`mailto:${selected.business.email}`} className="text-secondary-700 hover:underline inline-flex items-center gap-1">
                    <Mail size={12} /> {selected.business.email || '—'}
                  </a>
                </dd>
                <dt className="text-neutral-600">Address</dt>
                <dd className="truncate">{selected.business.address || '—'}</dd>
                <dt className="text-neutral-600">Industry</dt>
                <dd className="capitalize">{selected.business.industry}</dd>
                <dt className="text-neutral-600">Team</dt>
                <dd>{selected.business.employees} people</dd>
                <dt className="text-neutral-600">Monthly</dt>
                <dd className="font-semibold">{formatMoney(selected.totals.monthly)}</dd>
                <dt className="text-neutral-600">One-time</dt>
                <dd className="font-semibold">{formatMoney(selected.totals.oneTime)}</dd>
              </dl>

              <h3 className="fb-h4 mb-2">Services</h3>
              <ul className="grid sm:grid-cols-2 gap-2 mb-5">
                <ServiceChip enabled={selected.services.energy.enabled} label="Energy audit" Icon={Zap} />
                <ServiceChip enabled label={`Internet ${selected.services.internet.tier}`} Icon={Globe} />
                <ServiceChip enabled label={`Phones × ${selected.services.phones.lines}`} Icon={Phone} />
                <ServiceChip enabled={selected.services.wifi.enabled} label={`Wi-Fi · ${selected.services.wifi.aps} APs`} Icon={Wifi} />
                <ServiceChip enabled={selected.services.security.enabled} label={`Security · ${selected.services.security.pack}`} Icon={Shield} />
                <ServiceChip enabled={selected.services.ai.enabled} label={`AI · ${selected.services.ai.seats} seats`} Icon={Bot} />
                {(selected.services.custom ?? []).map((feature) => (
                  <ServiceChip key={feature.id} enabled={feature.enabled} label={feature.title} Icon={Bot} />
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => markContacted(selected.id)}
                  disabled={selected.status === 'contacted' || selected.status === 'closed'}
                  className="btn btn-primary disabled:opacity-50"
                >
                  <CheckCircle2 size={14} /> Mark contacted
                </button>
                {selected.resumeUrl && (
                  <a className="btn btn-ghost" href={selected.resumeUrl} target="_blank" rel="noreferrer">
                    Open resume link
                  </a>
                )}
              </div>
            </section>
          ) : (
            <section className="rounded-[28px] border border-white/70 bg-white/82 p-6 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <p className="fb-body text-neutral-600">Select a submission to see details.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status?: SubmissionPayload['status'] }) {
  const color = status === 'new' ? 'bg-accent' : status === 'contacted' ? 'bg-secondary' : 'bg-neutral-400';
  return <span className={`w-2 h-2 rounded-full ${color}`} aria-label={status ?? 'new'} />;
}

function StatusPill({ status }: { status?: SubmissionPayload['status'] }) {
  const s = status ?? 'new';
  const style =
    s === 'new'
      ? 'bg-accent text-white'
      : s === 'contacted'
      ? 'bg-secondary text-white'
      : 'bg-neutral-200 text-neutral-700';
  const Icon = s === 'new' ? Clock : CheckCircle2;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-pill text-[11px] font-semibold uppercase tracking-wide ${style}`}>
      <Icon size={12} /> {s}
    </span>
  );
}

function ServiceChip({ Icon, label, enabled }: { Icon: typeof Zap; label: string; enabled: boolean }) {
  return (
    <li
      className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm ${
        enabled ? 'border-secondary-200 bg-secondary-50 text-neutral-900' : 'border-neutral-200 bg-white text-neutral-500'
      }`}
    >
      <Icon size={14} aria-hidden />
      <span>{label}</span>
    </li>
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  return `${Math.floor(days / 7)}w ago`;
}
