import { useMemo, useState } from 'react';
import { Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { getVerticalCatalog, getDefaultVerticalCatalog, saveVerticalCatalog, type VerticalDefinition } from '@/lib/verticals';
import type { Industry } from '@/store/useBuildStore';

const ORDER: Industry[] = ['healthcare', 'retail', 'proservices', 'trades', 'hospitality', 'schools', 'manufacturing', 'other'];

export function VerticalStudio() {
  const [catalog, setCatalog] = useState(() => getVerticalCatalog());
  const [activeIndustry, setActiveIndustry] = useState<Industry>('healthcare');
  const active = catalog[activeIndustry];

  const previewFeatures = useMemo(
    () => active.customFeatures.filter((feature) => feature.title.trim().length > 0),
    [active.customFeatures],
  );

  function updateVertical(patch: Partial<VerticalDefinition>) {
    const next = {
      ...catalog,
      [activeIndustry]: {
        ...catalog[activeIndustry],
        ...patch,
      },
    };
    setCatalog(next);
    saveVerticalCatalog(next);
  }

  function updateFeature(
    featureId: string,
    patch: Partial<VerticalDefinition['customFeatures'][number]>,
  ) {
    const next = {
      ...catalog,
      [activeIndustry]: {
        ...active,
        customFeatures: active.customFeatures.map((feature) =>
          feature.id === featureId ? { ...feature, ...patch } : feature,
        ),
      },
    };
    setCatalog(next);
    saveVerticalCatalog(next);
  }

  function addFeature() {
    const id = `${activeIndustry}-${Date.now()}`;
    updateVertical({
      customFeatures: [
        ...active.customFeatures,
        { id, title: 'New module', description: '', monthly: 0, oneTime: 0 },
      ],
    });
  }

  function removeFeature(featureId: string) {
    updateVertical({
      customFeatures: active.customFeatures.filter((feature) => feature.id !== featureId),
    });
  }

  function resetIndustry() {
    const defaults = getDefaultVerticalCatalog();
    const next = { ...catalog, [activeIndustry]: defaults[activeIndustry] };
    setCatalog(next);
    saveVerticalCatalog(next);
  }

  return (
    <section className="rounded-[32px] border border-white/70 bg-white/82 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">Catalog database</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">Vertical studio</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Edit the copy, positioning, and custom modules for each vertical. These changes persist locally and feed the live quote pathways.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={addFeature} className="btn btn-ghost">
            <Plus size={14} /> Add module
          </button>
          <button type="button" onClick={resetIndustry} className="btn btn-ghost">
            <RotateCcw size={14} /> Reset vertical
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[220px_1fr_320px]">
        <aside className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-3">
          <ul className="space-y-2">
            {ORDER.map((industry) => (
              <li key={industry}>
                <button
                  type="button"
                  onClick={() => setActiveIndustry(industry)}
                  className={`w-full rounded-2xl px-4 py-3 text-left transition-colors ${
                    activeIndustry === industry
                      ? 'bg-neutral-950 text-white'
                      : 'bg-white text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <div className="text-sm font-semibold">{catalog[industry].label}</div>
                  <div className={`mt-1 text-xs ${activeIndustry === industry ? 'text-white/70' : 'text-neutral-500'}`}>
                    {catalog[industry].subtitle}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Vertical label"
              value={active.label}
              onChange={(value) => updateVertical({ label: value })}
            />
            <Field
              label="Subtitle"
              value={active.subtitle}
              onChange={(value) => updateVertical({ subtitle: value })}
            />
          </div>

          <Field
            label="Hero eyebrow"
            value={active.heroEyebrow}
            onChange={(value) => updateVertical({ heroEyebrow: value })}
          />
          <Field
            label="Hero headline"
            value={active.heroHeadline}
            onChange={(value) => updateVertical({ heroHeadline: value })}
          />
          <TextArea
            label="Hero description"
            value={active.heroDescription}
            onChange={(value) => updateVertical({ heroDescription: value })}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Bundle heading"
              value={active.bundleHeading}
              onChange={(value) => updateVertical({ bundleHeading: value })}
            />
            <Field
              label="Ambiance"
              value={active.ambiance}
              onChange={(value) => updateVertical({ ambiance: value })}
            />
          </div>

          <TextArea
            label="Bundle summary"
            value={active.bundleSummary}
            onChange={(value) => updateVertical({ bundleSummary: value })}
          />

          <div className="grid gap-4 md:grid-cols-3">
            {active.proofPoints.map((point, index) => (
              <Field
                key={`${activeIndustry}-proof-${index}`}
                label={`Proof point ${index + 1}`}
                value={point}
                onChange={(value) => {
                  const next = [...active.proofPoints];
                  next[index] = value;
                  updateVertical({ proofPoints: next });
                }}
              />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Spotlight label"
              value={active.featureSpotlight.label}
              onChange={(value) =>
                updateVertical({ featureSpotlight: { ...active.featureSpotlight, label: value } })
              }
            />
            <Field
              label="Spotlight title"
              value={active.featureSpotlight.title}
              onChange={(value) =>
                updateVertical({ featureSpotlight: { ...active.featureSpotlight, title: value } })
              }
            />
          </div>

          <TextArea
            label="Spotlight description"
            value={active.featureSpotlight.description}
            onChange={(value) =>
              updateVertical({ featureSpotlight: { ...active.featureSpotlight, description: value } })
            }
          />

          <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-950">Custom modules</h3>
                <p className="mt-1 text-sm text-neutral-500">These appear only on this vertical’s pathway and quote.</p>
              </div>
              <button type="button" onClick={addFeature} className="btn btn-primary">
                <Plus size={14} /> Add module
              </button>
            </div>

            <div className="space-y-4">
              {active.customFeatures.map((feature, index) => (
                <div key={feature.id} className="rounded-[24px] border border-neutral-200 bg-white p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label={`Module ${index + 1} title`}
                      value={feature.title}
                      onChange={(value) => updateFeature(feature.id, { title: value })}
                    />
                    <Field
                      label="Badge"
                      value={feature.badge ?? ''}
                      onChange={(value) => updateFeature(feature.id, { badge: value || undefined })}
                    />
                  </div>

                  <div className="mt-4">
                    <TextArea
                      label="Description"
                      value={feature.description}
                      onChange={(value) => updateFeature(feature.id, { description: value })}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                    <NumberField
                      label="Monthly price"
                      value={feature.monthly}
                      onChange={(value) => updateFeature(feature.id, { monthly: value })}
                    />
                    <NumberField
                      label="One-time fee"
                      value={feature.oneTime}
                      onChange={(value) => updateFeature(feature.id, { oneTime: value })}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(feature.id)}
                      className="btn btn-ghost self-end"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-[28px] border border-neutral-200 bg-neutral-950 p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            <Save size={12} />
            Live preview
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">{active.heroHeadline}</h3>
          <p className="mt-3 text-sm leading-6 text-white/72">{active.heroDescription}</p>

          <div className="mt-6 rounded-[24px] bg-white/6 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Bundle heading
            </p>
            <p className="mt-2 text-lg font-semibold">{active.bundleHeading}</p>
            <p className="mt-2 text-sm leading-6 text-white/70">{active.bundleSummary}</p>
          </div>

          <div className="mt-6 space-y-3">
            {previewFeatures.map((feature) => (
              <div key={feature.id} className="rounded-[20px] border border-white/10 bg-white/6 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{feature.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">{feature.description}</p>
                  </div>
                  {feature.badge && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-950">
                      {feature.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-700">{label}</span>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-700">{label}</span>
      <textarea className="input min-h-[104px] resize-y" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-700">{label}</span>
      <input
        type="number"
        className="input"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </label>
  );
}
