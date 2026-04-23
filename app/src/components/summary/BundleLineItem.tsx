import { type LucideIcon, Edit3 } from 'lucide-react';

interface BundleLineItemProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  enabled: boolean;
  onToggle?: (v: boolean) => void;
  onEdit?: () => void;
  flagNote?: string;
  flagged?: boolean;
}

export function BundleLineItem({
  Icon,
  title,
  description,
  price,
  enabled,
  onToggle,
  onEdit,
  flagNote,
  flagged,
}: BundleLineItemProps) {
  return (
    <div className={`card p-4 ${enabled ? '' : 'opacity-70'}`}>
      <div className="flex items-start gap-3">
        <span
          className={`shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
            enabled ? 'bg-secondary text-white' : 'bg-neutral-100 text-neutral-500'
          }`}
        >
          <Icon size={18} aria-hidden />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <h4 className="fb-h4 !text-base">{title}</h4>
              {flagged && (
                <span className="text-[10px] uppercase tracking-wide font-semibold bg-accent text-white px-1.5 py-0.5 rounded">
                  Required
                </span>
              )}
            </div>
            <span className={`fb-label ${enabled ? 'text-primary' : 'text-neutral-500'}`}>{price}</span>
          </div>
          <p className="fb-caption mt-1">{description}</p>
          {flagNote && (
            <p
              className="fb-caption mt-2 inline-block px-2 py-0.5 rounded-pill"
              style={{ background: 'var(--tertiary-50)', color: 'var(--tertiary-600)' }}
            >
              {flagNote}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        {onToggle ? (
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={`${enabled ? 'Disable' : 'Enable'} ${title}`}
            onClick={() => onToggle(!enabled)}
            className="flex items-center gap-2"
          >
            <span className={`relative w-10 h-6 rounded-pill transition-colors ${enabled ? 'bg-secondary' : 'bg-neutral-300'}`}>
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  enabled ? 'translate-x-4' : ''
                }`}
              />
            </span>
            <span className="fb-caption">{enabled ? 'On' : 'Off'}</span>
          </button>
        ) : (
          <span className="fb-caption">Core service</span>
        )}
        {onEdit && (
          <button type="button" onClick={onEdit} className="fb-small text-secondary-600 hover:underline inline-flex items-center gap-1">
            <Edit3 size={12} /> Edit
          </button>
        )}
      </div>
    </div>
  );
}
