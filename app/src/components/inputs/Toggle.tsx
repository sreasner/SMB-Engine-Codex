interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  price?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, description, price, disabled }: ToggleProps) {
  return (
    <label className="flex items-start justify-between gap-3 p-3 rounded-md border border-neutral-200 bg-white cursor-pointer hover:bg-neutral-50 transition-colors">
      <span className="flex-1">
        <span className="fb-label block">{label}</span>
        {description && <span className="fb-caption block mt-0.5">{description}</span>}
      </span>
      {price && <span className="fb-small font-semibold text-primary shrink-0">{price}</span>}
      <span
        role="switch"
        aria-checked={checked}
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative shrink-0 w-10 h-6 rounded-pill transition-colors ${
          checked ? 'bg-secondary' : 'bg-neutral-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={() => {}} disabled={disabled} />
    </label>
  );
}
