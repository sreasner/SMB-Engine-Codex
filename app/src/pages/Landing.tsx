import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CircleCheck as CheckCircle2, Sparkles, Zap, Clock, Shield, ChevronRight } from 'lucide-react';
import { IndustryCard } from '@/components/inputs/IndustryCard';
import { getIndustries } from '@/content/industries';
import { LANDING } from '@/content/copy';
import { useBuildStore } from '@/store/useBuildStore';
import { getPresetForIndustry } from '@/lib/presets';
import type { Industry } from '@/store/useBuildStore';

const PATHFINDER_ENABLED = (import.meta.env.VITE_PATHFINDER_ENABLED ?? 'true') === 'true';

const VALUE_PROPS = [
  { Icon: Clock, title: 'Under 10 minutes', desc: 'Configure your entire stack without a sales call.' },
  { Icon: Zap, title: 'Instant pricing', desc: 'See real monthly and one-time costs as you build.' },
  { Icon: Shield, title: 'No commitment', desc: 'Submit a quote, review with your team, sign when ready.' },
];

export function Landing() {
  const navigate = useNavigate();
  const applyPreset = useBuildStore((s) => s.applyPreset);
  const setSource = useBuildStore((s) => s.setSource);
  const industries = useMemo(() => getIndustries(), []);

  function pickIndustry(industry: Industry) {
    applyPreset(getPresetForIndustry(industry));
    setSource('pathfinder');
    navigate('/build/bundle');
  }

  return (
    <div className="relative overflow-hidden bg-[#f4f6f8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-5%,rgba(65,163,216,0.14),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(251,191,36,0.10),transparent_30%),linear-gradient(180deg,#eef2f6_0%,#f8fafb_38%,#f4f6f8_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-200/60 to-transparent" />

      <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 sm:pt-20 sm:pb-10">
        <div className="max-w-3xl animate-fade-in-up">
          <p className="fb-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 backdrop-blur">
            <Sparkles size={14} aria-hidden />
            Step 1
          </p>
          <h1 className="fb-display">Choose your business type.</h1>
          <p className="fb-body-lg mt-5 max-w-2xl text-neutral-600">
            Pick the one that matches your business. We will immediately open the right setup with the features that fit that type of business.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((ind, i) => (
            <div key={ind.id} className={`animate-fade-in-up stagger-${i + 1}`}>
              <IndustryCard
                Icon={ind.Icon}
                label={ind.label}
                subtitle={ind.subtitle}
                onSelect={() => pickIndustry(ind.id)}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 animate-fade-in-up stagger-6">
          {LANDING.trust.map((t) => (
            <span key={t} className="flex items-center gap-2 text-sm text-neutral-600">
              <CheckCircle2 size={16} className="text-secondary" aria-hidden />
              {t}
            </span>
          ))}
        </div>
      </section>

      {PATHFINDER_ENABLED && (
        <section className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-12">
          <div className="animate-fade-in-up stagger-7 rounded-[32px] border border-white/70 bg-white/78 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                  Not sure which path fits?
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                  Let Pathfinder ask 3 questions and choose for you.
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  This is only for people who are unsure. If you already know your business type, just choose it above.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSource('pathfinder');
                  navigate('/build');
                }}
                className="btn btn-lg btn-primary whitespace-nowrap"
              >
                {LANDING.ctaPrimary}
                <ArrowRight size={16} aria-hidden />
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-16">
        <div className="animate-fade-in-up stagger-8 grid gap-4 sm:grid-cols-3">
          {VALUE_PROPS.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:bg-white hover:shadow-md"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={20} aria-hidden />
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight text-neutral-950">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in stagger-8">
          <Link
            to="/build/from-scratch"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
            onClick={() => setSource('linear')}
          >
            {LANDING.ctaSecondary}
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
