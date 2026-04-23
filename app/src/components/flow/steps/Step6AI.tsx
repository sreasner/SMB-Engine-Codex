import { Bot } from 'lucide-react';
import { useBuildStore } from '@/store/useBuildStore';
import { Toggle } from '@/components/inputs/Toggle';
import { Slider } from '@/components/inputs/Slider';

export function Step6AI() {
  const ai = useBuildStore((s) => s.services.ai);
  const employees = useBuildStore((s) => s.business.employees);
  const setServices = useBuildStore((s) => s.setServices);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-4 rounded-md bg-primary-50">
        <Bot size={24} className="text-primary" aria-hidden />
        <div>
          <p className="fb-label">AI Pathfinder™</p>
          <p className="fb-caption mt-1">
            Readiness evaluation + design guide + monthly coaching. $15 per seat per month.
          </p>
        </div>
      </div>

      <Toggle
        checked={ai.enabled}
        onChange={(v) =>
          setServices((s) => ({
            ...s,
            ai: { enabled: v, seats: v ? Math.max(s.ai.seats, employees) : 0 },
          }))
        }
        label="Enable AI Pathfinder"
        description="Activate for your whole team — scales per seat."
      />

      {ai.enabled && (
        <Slider
          label="Seats"
          min={1}
          max={Math.max(100, employees)}
          value={ai.seats}
          onChange={(v) => setServices((s) => ({ ...s, ai: { ...s.ai, seats: v } }))}
          suffix="seats"
          helper={`Default is your team size (${employees}). Tune up/down to taste.`}
        />
      )}
    </div>
  );
}
