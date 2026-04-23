import { Phone, Headphones, Building2 } from 'lucide-react';
import { useBuildStore, type CcType } from '@/store/useBuildStore';
import { ServiceTile } from '@/components/inputs/ServiceTile';
import { Slider } from '@/components/inputs/Slider';
import { Toggle } from '@/components/inputs/Toggle';

const CC_OPTIONS: { id: CcType; Icon: typeof Phone; label: string; desc: string; price: string }[] = [
  { id: 'none', Icon: Phone, label: 'Just phone lines', desc: 'Everyone handles their own calls', price: 'from $20/line' },
  { id: 'small', Icon: Headphones, label: 'Small contact center', desc: '2–10 agents, shared queue', price: '$45/agent' },
  { id: 'full', Icon: Building2, label: 'Full contact center', desc: '10+ agents, routing, analytics', price: '$79/agent' },
];

export function Step4Phones() {
  const phones = useBuildStore((s) => s.services.phones);
  const setServices = useBuildStore((s) => s.setServices);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-3">
        {CC_OPTIONS.map((opt) => (
          <ServiceTile
            key={opt.id}
            Icon={opt.Icon}
            title={opt.label}
            description={opt.desc}
            price={opt.price}
            selected={phones.cc.type === opt.id}
            onSelect={() =>
              setServices((s) => ({
                ...s,
                phones: {
                  ...s.phones,
                  cc: {
                    ...s.phones.cc,
                    type: opt.id,
                    agents: opt.id === 'none' ? 0 : Math.max(s.phones.cc.agents, opt.id === 'full' ? 10 : 2),
                  },
                },
              }))
            }
          />
        ))}
      </div>

      <div className="card p-4 bg-secondary-50 border-secondary-200 space-y-4">
        <h4 className="fb-h4 !text-base">Configure your phone setup</h4>

        <Slider
          label="Phone lines"
          min={1}
          max={30}
          value={phones.lines}
          onChange={(v) => setServices((s) => ({ ...s, phones: { ...s.phones, lines: v } }))}
          suffix="lines"
        />

        {phones.cc.type !== 'none' && (
          <>
            <Slider
              label="Contact-center agents"
              min={phones.cc.type === 'full' ? 10 : 1}
              max={phones.cc.type === 'full' ? 50 : 10}
              value={phones.cc.agents}
              onChange={(v) =>
                setServices((s) => ({ ...s, phones: { ...s.phones, cc: { ...s.phones.cc, agents: v } } }))
              }
              suffix="agents"
            />
            <div className="space-y-2">
              <Toggle
                checked={phones.cc.analytics}
                onChange={(v) =>
                  setServices((s) => ({ ...s, phones: { ...s.phones, cc: { ...s.phones.cc, analytics: v } } }))
                }
                label="Call analytics"
                description="Per-agent reporting and trends."
                price="+$12/agent/mo"
              />
              <Toggle
                checked={phones.cc.recording}
                onChange={(v) =>
                  setServices((s) => ({ ...s, phones: { ...s.phones, cc: { ...s.phones.cc, recording: v } } }))
                }
                label="Call recording"
                description="Compliance-ready, 90-day retention."
                price="+$8/agent/mo"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
