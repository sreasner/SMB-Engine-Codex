import { type LucideIcon } from 'lucide-react';

interface IndustryCardProps {
  Icon: LucideIcon;
  label: string;
  subtitle: string;
  onSelect: () => void;
  selected?: boolean;
}

export function IndustryCard({ Icon, label, subtitle, onSelect, selected }: IndustryCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative overflow-hidden text-left rounded-[28px] border px-5 py-5 transition-all duration-300 ${
        selected
          ? 'border-white/70 bg-white text-neutral-950 shadow-[0_20px_50px_rgba(15,23,42,0.16)]'
          : 'border-white/50 bg-white/72 text-neutral-900 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.28),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72))]" />
      <div className="relative">
        <span className="mb-6 inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
          Vertical path
        </span>
      </div>
      <span
        className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 mb-4 transition-colors ${
          selected
            ? 'bg-neutral-950 text-white'
            : 'bg-white text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white'
        }`}
      >
        <Icon size={22} aria-hidden />
      </span>
      <div className="relative">
        <h3 className="fb-h4 !text-[1.15rem] mb-1">{label}</h3>
        <p className="fb-caption !text-[13px] !text-neutral-500">{subtitle}</p>
      </div>
    </button>
  );
}
