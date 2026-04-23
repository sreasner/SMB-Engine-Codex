import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

interface PageFooterProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  onSchedule?: () => void;
  accent?: boolean;
}

export function PageFooter({
  onBack,
  onNext,
  nextLabel = 'Next',
  nextDisabled,
  onSchedule,
  accent,
}: PageFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
      <div className="flex gap-2">
        {onBack && (
          <button type="button" onClick={onBack} className="btn btn-ghost">
            <ArrowLeft size={16} aria-hidden />
            Back
          </button>
        )}
        {onSchedule && (
          <button type="button" onClick={onSchedule} className="btn btn-ghost">
            <Calendar size={16} aria-hidden />
            Schedule a call
          </button>
        )}
      </div>
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`btn btn-lg ${accent ? 'btn-accent' : 'btn-primary'} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {nextLabel}
          <ArrowRight size={16} aria-hidden />
        </button>
      )}
    </div>
  );
}
