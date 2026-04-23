import { Rocket, Zap, Flame } from 'lucide-react';
import { useBuildStore, type InternetTier } from '@/store/useBuildStore';
import { ServiceTile } from '@/components/inputs/ServiceTile';
import { Toggle } from '@/components/inputs/Toggle';
import { recommendInternetTier } from '@/lib/presets';

const TIERS: { id: InternetTier; Icon: typeof Rocket; label: string; desc: string; price: string }[] = [
  { id: '500mbps', Icon: Rocket, label: '500 Mbps', desc: 'Solo + small team', price: '$99/mo' },
  { id: '1gig', Icon: Zap, label: '1 Gig', desc: 'Recommended', price: '$149/mo' },
  { id: '2gig', Icon: Flame, label: '2 Gig', desc: 'Heavy video / cloud', price: '$229/mo' },
];

export function Step3Internet() {
  const internet = useBuildStore((s) => s.services.internet);
  const employees = useBuildStore((s) => s.business.employees);
  const setServices = useBuildStore((s) => s.setServices);

  const recommended = recommendInternetTier(employees);

  return (
    <div className="space-y-4">
      <p className="fb-small text-neutral-600">
        For a team of {employees}, we recommend <strong>{TIERS.find((t) => t.id === recommended)?.label}</strong>.
        Enough for video calls, cloud apps and a guest Wi-Fi in parallel.
      </p>

      <div className="grid sm:grid-cols-3 gap-3">
        {TIERS.map((t) => (
          <ServiceTile
            key={t.id}
            Icon={t.Icon}
            title={t.label}
            description={t.desc}
            price={t.price}
            selected={internet.tier === t.id}
            onSelect={() => setServices((s) => ({ ...s, internet: { ...s.internet, tier: t.id } }))}
            badge={t.id === recommended ? 'Recommended' : undefined}
          />
        ))}
      </div>

      <div className="space-y-2">
        <Toggle
          checked={internet.failover}
          onChange={(v) => setServices((s) => ({ ...s, internet: { ...s.internet, failover: v } }))}
          label="4G LTE failover"
          description="Automatic backup connection if fiber drops."
          price="+$25/mo"
        />
        <Toggle
          checked={internet.staticIP}
          onChange={(v) => setServices((s) => ({ ...s, internet: { ...s.internet, staticIP: v } }))}
          label="Static IP address"
          description="For VPN, servers, remote access."
          price="+$15/mo"
        />
      </div>

      <p className="fb-caption">Availability check: fiber confirmed. Install window 5–9 business days.</p>
    </div>
  );
}
