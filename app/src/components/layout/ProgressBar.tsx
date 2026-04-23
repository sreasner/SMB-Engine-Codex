interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="lg:hidden px-1">
      <div className="flex items-center justify-between fb-caption mb-1.5">
        <span>Step {current} of {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 bg-neutral-100 rounded-pill overflow-hidden">
        <div className="h-full bg-secondary rounded-pill transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
