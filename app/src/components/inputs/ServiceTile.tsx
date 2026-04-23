import { Check, type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface ServiceTileProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  price?: string;
  selected: boolean;
  onSelect: () => void;
  badge?: string;
  flagged?: boolean;
  children?: ReactNode;
}

export function ServiceTile({
  Icon,
  title,
  description,
  price,
  selected,
  onSelect,
  badge,
  flagged,
  children,
}: ServiceTileProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? 'border-secondary bg-secondary-50 shadow-[0_0_0_1px_rgba(65,163,216,0.15),0_4px_12px_rgba(65,163,216,0.08)]'
          : 'border-neutral-200 bg-white hover:border-neutral-300 hover:-translate-y-0.5 hover:shadow-sm'
      }`}
    >
      {badge && (
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-pill ${
            flagged ? 'bg-accent text-white' : 'bg-primary text-white'
          }`}
        >
          {badge}
        </span>
      )}
      {selected && !badge && (
        <span
          aria-hidden
          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-secondary flex items-center justify-center shadow-sm"
        >
          <Check size={12} className="text-white" strokeWidth={2.5} />
        </span>
      )}
      <div className="flex items-start gap-3">
        <span
          className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
            selected ? 'bg-secondary text-white shadow-sm' : 'bg-neutral-100 text-primary'
          }`}
        >
          <Icon size={18} aria-hidden />
        </span>
        <div className="flex-1 min-w-0 pr-6">
          <h3 className="fb-h4 !text-base">{title}</h3>
          <p className="fb-caption mt-1">{description}</p>
          {price && <p className="fb-label text-primary mt-2">{price}</p>}
        </div>
      </div>
      {children && <div className="mt-3 pt-3 border-t border-secondary-100">{children}</div>}
    </button>
  );
}
