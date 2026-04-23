import { useBuildStore } from '@/store/useBuildStore';
import { calculateTotal, formatMoney, estimateSavings } from '@/lib/pricing';
import { SavingsBadge } from './SavingsBadge';
import { Zap, Globe, Phone, Wifi, Shield, Bot, Headphones } from 'lucide-react';

export function SummaryPanel() {
  const services = useBuildStore((s) => s.services);
  const business = useBuildStore((s) => s.business);
  const totals = calculateTotal(services);
  const savings = estimateSavings({ business, services });

  const lines = buildLines(services);

  return (
    <aside className="card p-5 lg:sticky lg:top-24 border-l-4 border-l-primary" aria-label="Your build summary">
      <h3 className="fb-h4 mb-3">Your build</h3>
      <div className="space-y-1 pb-3 border-b border-dashed border-neutral-200">
        <div className="flex items-baseline justify-between">
          <span className="fb-small">Monthly</span>
          <span className="font-display text-2xl font-bold text-primary">
            {formatMoney(totals.monthly)}
            <span className="fb-small font-body ml-1">/mo</span>
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="fb-small">One-time</span>
          <span className="font-display text-lg font-semibold text-primary">
            {formatMoney(totals.oneTime)}
          </span>
        </div>
      </div>

      <ul className="mt-3 space-y-2" aria-label="Line items">
        {lines.length === 0 && (
          <li className="fb-caption">Toggle a service to see pricing.</li>
        )}
        {lines.map((line) => (
          <li key={line.key} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 fb-small text-neutral-700">
              <line.Icon size={14} aria-hidden className="text-secondary-600" />
              <span className="truncate">{line.label}</span>
            </span>
            <span className="fb-label text-primary shrink-0">{line.price}</span>
          </li>
        ))}
      </ul>

      {savings.total != null && savings.total > 0 && (
        <div className="mt-4">
          <SavingsBadge amount={savings.total} />
        </div>
      )}
    </aside>
  );
}

interface LineItem {
  key: string;
  label: string;
  price: string;
  Icon: typeof Zap;
}

function buildLines(services: ReturnType<typeof useBuildStore.getState>['services']): LineItem[] {
  const lines: LineItem[] = [];

  if (services.energy.enabled) {
    lines.push({ key: 'energy', label: 'Energy audit', price: formatMoney(2000), Icon: Zap });
  }
  const tierPrice = services.internet.tier === '500mbps' ? 99 : services.internet.tier === '1gig' ? 149 : 229;
  const internetMonthly = tierPrice + (services.internet.failover ? 25 : 0) + (services.internet.staticIP ? 15 : 0);
  const tierLabel = services.internet.tier === '500mbps' ? '500 Mbps' : services.internet.tier === '1gig' ? '1 Gig' : '2 Gig';
  lines.push({
    key: 'internet',
    label: `${tierLabel}${services.internet.failover ? ' + failover' : ''}`,
    price: `${formatMoney(internetMonthly)}/mo`,
    Icon: Globe,
  });
  if (services.phones.lines > 0) {
    lines.push({
      key: 'phones',
      label: `Phones × ${services.phones.lines}`,
      price: `${formatMoney(services.phones.lines * 20)}/mo`,
      Icon: Phone,
    });
  }
  const cc = services.phones.cc;
  if (cc.type !== 'none' && cc.agents > 0) {
    const tier = cc.type === 'small' ? 45 : 79;
    const addons = (cc.analytics ? 12 : 0) + (cc.recording ? 8 : 0);
    lines.push({
      key: 'cc',
      label: `Agents × ${cc.agents}`,
      price: `${formatMoney(cc.agents * (tier + addons))}/mo`,
      Icon: Headphones,
    });
  }
  if (services.wifi.enabled) {
    lines.push({
      key: 'wifi',
      label: `Wi-Fi · ${services.wifi.aps} AP${services.wifi.aps === 1 ? '' : 's'}`,
      price: `${formatMoney(services.wifi.aps * 15)}/mo`,
      Icon: Wifi,
    });
  }
  if (services.security.enabled) {
    const packPrice = services.security.pack === 'basic' ? 99 : services.security.pack === 'hipaa' ? 180 : 150;
    const packLabel = services.security.pack === 'basic' ? 'Security · Basic' : services.security.pack === 'hipaa' ? 'Security · HIPAA' : 'Security · PCI';
    lines.push({ key: 'security', label: packLabel, price: `${formatMoney(packPrice)}/mo`, Icon: Shield });
  }
  if (services.ai.enabled && services.ai.seats > 0) {
    lines.push({
      key: 'ai',
      label: `AI Pathfinder · ${services.ai.seats} seat${services.ai.seats === 1 ? '' : 's'}`,
      price: `${formatMoney(services.ai.seats * 15)}/mo`,
      Icon: Bot,
    });
  }
  for (const feature of services.custom ?? []) {
    if (!feature.enabled) continue;
    const priceParts = [];
    if (feature.monthly > 0) priceParts.push(`${formatMoney(feature.monthly)}/mo`);
    if (feature.oneTime > 0) priceParts.push(`${formatMoney(feature.oneTime)} once`);
    lines.push({
      key: feature.id,
      label: feature.title,
      price: priceParts.join(' + ') || 'Included',
      Icon: Bot,
    });
  }
  return lines;
}
