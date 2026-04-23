import { Zap } from 'lucide-react';
import { useBuildStore } from '@/store/useBuildStore';
import { ServiceTile } from '@/components/inputs/ServiceTile';
import { STEPS } from '@/content/copy';

export function Step2Energy() {
  const energy = useBuildStore((s) => s.services.energy);
  const business = useBuildStore((s) => s.business);
  const setServices = useBuildStore((s) => s.setServices);

  const city = business.address ? business.address.split(',').slice(-2, -1)[0]?.trim() || 'your area' : 'your area';
  const copy = STEPS[2];

  return (
    <div className="space-y-4">
      <div className="rounded-md p-4" style={{ background: 'var(--success-bg)' }}>
        <p className="fb-small" style={{ color: 'var(--success)' }}>
          <strong>Based on your address in {city}</strong> · Avg SMB bill ~$840/mo — projected savings{' '}
          <strong>~${energy.projMonthlySaving}/mo</strong>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <ServiceTile
          Icon={Zap}
          title={copy.yes}
          description={copy.yesHelp}
          selected={energy.enabled}
          onSelect={() => setServices((s) => ({ ...s, energy: { ...s.energy, enabled: true } }))}
          price="$2,000 once"
        />
        <ServiceTile
          Icon={Zap}
          title={copy.skip}
          description={copy.skipHelp}
          selected={!energy.enabled}
          onSelect={() => setServices((s) => ({ ...s, energy: { ...s.energy, enabled: false } }))}
        />
      </div>
    </div>
  );
}
