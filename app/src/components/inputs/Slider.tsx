interface SliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  helper?: string;
  suffix?: string;
}

export function Slider({ label, min, max, step = 1, value, onChange, helper, suffix }: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="fb-label">{label}</span>
        <span className="font-display text-2xl font-bold text-primary">
          {value}
          {suffix && <span className="fb-small font-body ml-1">{suffix}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full accent-secondary"
      />
      <div className="flex justify-between fb-caption mt-1">
        <span>{min}</span>
        <span>{max === 100 ? '100+' : max}</span>
      </div>
      {helper && <p className="fb-caption mt-2">{helper}</p>}
    </div>
  );
}
