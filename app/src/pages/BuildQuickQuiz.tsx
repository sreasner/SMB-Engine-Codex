import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useBuildStore, type Industry, type PainPoint } from '@/store/useBuildStore';
import { QUIZ } from '@/content/copy';
import { getIndustries } from '@/content/industries';
import { IndustryCard } from '@/components/inputs/IndustryCard';
import { Slider } from '@/components/inputs/Slider';
import { getPresetForIndustry, recommendInternetTier, recommendPhoneLines, recommendWifiAps } from '@/lib/presets';

export function BuildQuickQuiz() {
  const navigate = useNavigate();
  const business = useBuildStore((s) => s.business);
  const applyPreset = useBuildStore((s) => s.applyPreset);
  const setBusiness = useBuildStore((s) => s.setBusiness);
  const setSource = useBuildStore((s) => s.setSource);

  const [industry, setIndustry] = useState<Industry>(business.industry);
  const [employees, setEmployees] = useState<number>(business.employees);
  const [pain, setPain] = useState<PainPoint | null>(business.painPoint);
  const industries = getIndustries();

  function draft() {
    const preset = getPresetForIndustry(industry);
    const tweakedServices = {
      ...preset.services,
      internet: { ...(preset.services.internet ?? {}), tier: recommendInternetTier(employees) } as typeof preset.services.internet,
      phones: {
        ...(preset.services.phones ?? { cc: { type: 'none', agents: 0, analytics: false, recording: false } }),
        lines: recommendPhoneLines(employees),
      } as typeof preset.services.phones,
      wifi: {
        ...(preset.services.wifi ?? { enabled: true, aps: 2, proInstall: false }),
        aps: recommendWifiAps(employees),
      } as typeof preset.services.wifi,
    };
    applyPreset({ business: { ...preset.business, industry }, services: tweakedServices });
    setBusiness({ employees, painPoint: pain });
    setSource('pathfinder');
    navigate('/build/bundle');
  }

  const canContinue = !!industry && employees > 0 && !!pain;
  const answeredCount = (industry !== 'other' ? 1 : 0) + (employees !== 12 ? 1 : 0) + (pain ? 1 : 0);

  return (
    <div className="relative overflow-hidden bg-[#f4f6f8] pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-5%,rgba(65,163,216,0.12),transparent_40%),linear-gradient(180deg,#eef2f6_0%,#f8fafb_38%,#f4f6f8_100%)]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        <header className="animate-fade-in-up">
          <p className="fb-eyebrow flex items-center gap-1.5">
            <Sparkles size={14} aria-hidden /> {QUIZ.header}
          </p>
          <h1 className="fb-h1 mt-2">{QUIZ.headline}</h1>
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-pill transition-all duration-500 ${
                  n <= answeredCount ? 'bg-secondary' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </header>

        <section className="animate-fade-in-up stagger-1">
          <h2 className="fb-h4 mb-3">{QUIZ.q1.label}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {industries.map((ind) => (
              <IndustryCard
                key={ind.id}
                Icon={ind.Icon}
                label={ind.label}
                subtitle={ind.subtitle}
                selected={industry === ind.id}
                onSelect={() => setIndustry(ind.id)}
              />
            ))}
          </div>
        </section>

        <section className="animate-fade-in-up stagger-2 rounded-2xl border border-white/60 bg-white/70 p-5 backdrop-blur sm:p-6">
          <h2 className="fb-h4 mb-4">{QUIZ.q2.label}</h2>
          <Slider
            label="Team size"
            min={1}
            max={100}
            value={employees}
            onChange={setEmployees}
            suffix="people"
            helper="Include full-time, part-time and contractors who need accounts."
          />
        </section>

        <section className="animate-fade-in-up stagger-3">
          <h2 className="fb-h4 mb-3">{QUIZ.q3.label}</h2>
          <div className="flex flex-wrap gap-2">
            {QUIZ.q3.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPain(opt.id)}
                className={`chip ${pain === opt.id ? 'chip-selected' : ''}`}
                aria-pressed={pain === opt.id}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <div className="flex justify-end animate-fade-in-up stagger-4">
          <button
            type="button"
            onClick={draft}
            disabled={!canContinue}
            className="btn btn-lg btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {QUIZ.cta} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
