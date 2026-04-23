import { Wifi, Shield } from 'lucide-react';
import { useBuildStore, type SecurityPack } from '@/store/useBuildStore';
import { Toggle } from '@/components/inputs/Toggle';
import { Slider } from '@/components/inputs/Slider';
import { ServiceTile } from '@/components/inputs/ServiceTile';

const PACKS: { id: SecurityPack; label: string; desc: string; price: string }[] = [
  { id: 'basic', label: 'Basic', desc: 'General SMB protection', price: '$99/mo' },
  { id: 'hipaa', label: 'HIPAA', desc: 'Required for healthcare', price: '$180/mo' },
  { id: 'pci', label: 'PCI', desc: 'Retail + payment processing', price: '$150/mo' },
];

export function Step5WifiSecurity() {
  const wifi = useBuildStore((s) => s.services.wifi);
  const security = useBuildStore((s) => s.services.security);
  const setServices = useBuildStore((s) => s.setServices);

  return (
    <div className="space-y-6">
      <section>
        <h3 className="fb-h4 flex items-center gap-2 mb-3">
          <Wifi size={18} className="text-primary" aria-hidden /> Wi-Fi
        </h3>
        <div className="space-y-3">
          <Toggle
            checked={wifi.enabled}
            onChange={(v) => setServices((s) => ({ ...s, wifi: { ...s.wifi, enabled: v } }))}
            label="Managed Wi-Fi with guest network"
            description="Self-install or pro install available."
          />
          {wifi.enabled && (
            <>
              <Slider
                label="Access points"
                min={1}
                max={12}
                value={wifi.aps}
                onChange={(v) => setServices((s) => ({ ...s, wifi: { ...s.wifi, aps: v } }))}
                suffix={wifi.aps === 1 ? 'AP' : 'APs'}
                helper="$15/AP per month."
              />
              <Toggle
                checked={wifi.proInstall}
                onChange={(v) => setServices((s) => ({ ...s, wifi: { ...s.wifi, proInstall: v } }))}
                label="Pro install"
                description="On-site setup and tuning."
                price="+$150 once"
              />
            </>
          )}
        </div>
      </section>

      <section>
        <h3 className="fb-h4 flex items-center gap-2 mb-3">
          <Shield size={18} className="text-primary" aria-hidden /> Managed cybersecurity
        </h3>
        <Toggle
          checked={security.enabled}
          onChange={(v) => setServices((s) => ({ ...s, security: { ...s.security, enabled: v } }))}
          label="24/7 monitoring + quarterly audits"
          description="Good security is boring. We make it invisible."
        />
        {security.enabled && (
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            {PACKS.map((p) => (
              <ServiceTile
                key={p.id}
                Icon={Shield}
                title={p.label}
                description={p.desc}
                price={p.price}
                selected={security.pack === p.id}
                onSelect={() => setServices((s) => ({ ...s, security: { ...s.security, pack: p.id } }))}
                badge={security.flagged && security.pack === p.id ? 'Flagged' : undefined}
                flagged={security.flagged && security.pack === p.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
