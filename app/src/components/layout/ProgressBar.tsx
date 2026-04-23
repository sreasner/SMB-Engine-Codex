interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="lg:hidden px-1">
      <div className="flex items-center justify-between fb-caption mb-1.5">
        <span className="font-medium text-neutral-700">Step {current} of {total}</span>
        <span className="tabular-nums">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-neutral-100 rounded-pill overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-secondary to-secondary-400 rounded-pill transition-all duration-500 ease-standard"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
