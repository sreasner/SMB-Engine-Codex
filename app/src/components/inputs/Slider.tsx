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
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="fb-label">{label}</span>
        <span className="font-display text-2xl font-bold text-primary tabular-nums">
          {value}
          {suffix && <span className="fb-small font-body ml-1">{suffix}</span>}
        </span>
      </div>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 rounded-pill bg-neutral-200 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-secondary rounded-pill transition-all duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="relative w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-secondary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-secondary [&::-moz-range-thumb]:shadow-md"
          style={{ height: '20px' }}
        />
      </div>
      <div className="flex justify-between fb-caption mt-1">
        <span>{min}</span>
        <span>{max === 100 ? '100+' : max}</span>
      </div>
      {helper && <p className="fb-caption mt-2">{helper}</p>}
    </div>
  );
}
