import { useBuildStore } from '@/store/useBuildStore';
import { SummaryPanel } from '@/components/summary/SummaryPanel';
import { PRESETS } from '@/lib/presets';

export function Debug() {
  const state = useBuildStore();

  return (
    <div className="mx-auto max-w-7xl p-6 grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <h1 className="fb-h2">Debug · state & pricing</h1>
        <p className="fb-small">Mutate state and watch the summary panel update live.</p>

        <section className="card p-4 space-y-3">
          <h2 className="fb-h4">Business</h2>
          <label className="block fb-label">
            Employees
            <input
              type="number"
              className="input mt-1"
              value={state.business.employees}
              onChange={(e) => state.setBusiness({ employees: Number(e.target.value) || 0 })}
            />
          </label>
          <label className="block fb-label">
            Current monthly bill ($)
            <input
              type="number"
              className="input mt-1"
              value={state.business.currentMonthlyBill ?? ''}
              onChange={(e) =>
                state.setBusiness({
                  currentMonthlyBill: e.target.value ? Number(e.target.value) : null,
                })
              }
            />
          </label>
        </section>

        <section className="card p-4 space-y-3">
          <h2 className="fb-h4">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRESETS).map(([id, preset]) => (
              <button
                key={id}
                type="button"
                className="chip"
                onClick={() => state.applyPreset(preset)}
              >
                {preset.name}
              </button>
            ))}
            <button type="button" className="chip" onClick={() => state.reset()}>
              reset
            </button>
          </div>
        </section>

        <section className="card p-4 space-y-3">
          <h2 className="fb-h4">Services toggles</h2>
          {(['energy', 'wifi', 'security', 'ai'] as const).map((k) => (
            <label key={k} className="flex items-center gap-2 fb-label">
              <input
                type="checkbox"
                checked={state.services[k].enabled}
                onChange={(e) =>
                  state.setServices((s) => ({
                    ...s,
                    [k]: { ...s[k], enabled: e.target.checked },
                  }))
                }
              />
              {k}
            </label>
          ))}
        </section>

        <pre className="fb-caption bg-neutral-50 p-3 rounded overflow-auto max-h-80">
          {JSON.stringify({ business: state.business, services: state.services }, null, 2)}
        </pre>
      </div>

      <SummaryPanel />
    </div>
  );
}
