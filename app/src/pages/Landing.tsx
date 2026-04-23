import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { IndustryCard } from '@/components/inputs/IndustryCard';
import { getIndustries } from '@/content/industries';
import { LANDING } from '@/content/copy';
import { useBuildStore } from '@/store/useBuildStore';
import { getPresetForIndustry } from '@/lib/presets';
import type { Industry } from '@/store/useBuildStore';

const PATHFINDER_ENABLED = (import.meta.env.VITE_PATHFINDER_ENABLED ?? 'true') === 'true';

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(251,191,36,0.14),transparent_24%),linear-gradient(180deg,#eef2f6_0%,#f8fafb_38%,#f4f6f8_100%)]" />

      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-3xl">
          <p className="fb-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 backdrop-blur">
            <Sparkles size={14} aria-hidden />
            Step 1
          </p>
          <h1 className="fb-display">Choose your business type.</h1>
          <p className="fb-body-lg mt-5 max-w-2xl text-neutral-600">
            Pick the one that matches your business. We’ll immediately open the right setup with the features that fit that type of business.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((ind) => (
            <IndustryCard
              key={ind.id}
              Icon={ind.Icon}
              label={ind.label}
              subtitle={ind.subtitle}
              onSelect={() => pickIndustry(ind.id)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          {LANDING.trust.map((t) => (
            <span key={t} className="flex items-center gap-2 text-sm text-neutral-600">
              <CheckCircle2 size={16} className="text-neutral-950" aria-hidden />
              {t}
            </span>
          ))}
        </div>

        {PATHFINDER_ENABLED && (
          <div className="mt-12 rounded-[32px] border border-white/70 bg-white/78 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-7">
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
        )}
      </section>
    </div>
  );
}
