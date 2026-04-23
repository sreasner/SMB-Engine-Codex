import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useBuildStore } from '@/store/useBuildStore';
import { calculateTotal, formatMoney } from '@/lib/pricing';
import { SummaryPanel } from './SummaryPanel';

export function MobileCartDrawer() {
  const [open, setOpen] = useState(false);
  const services = useBuildStore((s) => s.services);
  const totals = calculateTotal(services);

  return (
    <>
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity ${
          open ? 'bg-black/40 opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        className={`lg:hidden fixed left-0 right-0 bottom-0 z-40 bg-white rounded-t-2xl shadow-lg transition-transform ${
          open ? 'translate-y-0' : 'translate-y-[calc(100%-64px)]'
        }`}
        role="region"
        aria-label="Build summary"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-4 h-16 border-b border-neutral-100"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2">
            <span className="fb-small text-neutral-600">Your build</span>
            <span className="font-display text-xl font-bold text-primary">{formatMoney(totals.monthly)}</span>
            <span className="fb-small">/mo</span>
          </span>
          {open ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
        <div className={`overflow-y-auto max-h-[60vh] p-4 ${open ? 'block' : 'hidden'}`}>
          <SummaryPanel />
        </div>
      </div>
    </>
  );
}
