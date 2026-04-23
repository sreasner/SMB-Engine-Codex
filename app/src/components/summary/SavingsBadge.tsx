import { Wallet } from 'lucide-react';
import { formatMoney } from '@/lib/pricing';

export function SavingsBadge({ amount }: { amount: number }) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 border"
      style={{ background: 'var(--success-bg)', borderColor: 'transparent' }}
    >
      <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--success)' }}>
        <Wallet size={16} aria-hidden />
        Save vs current
      </span>
      <span className="font-display font-bold text-lg" style={{ color: 'var(--success)' }}>
        −{formatMoney(Math.round(amount))}/mo
      </span>
    </div>
  );
}
