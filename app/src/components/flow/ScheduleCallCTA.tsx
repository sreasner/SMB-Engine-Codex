import { Calendar, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { SCHEDULE } from '@/content/copy';

interface ScheduleCallCTAProps {
  open: boolean;
  onClose: () => void;
}

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

export function ScheduleCallCTA({ open, onClose }: ScheduleCallCTAProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a call"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary-50 flex items-center justify-center">
              <Calendar size={18} className="text-primary" aria-hidden />
            </div>
            <h3 className="fb-h3 !text-xl">{SCHEDULE.title}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 hover:bg-neutral-50 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>
        <p className="fb-body mt-3">{SCHEDULE.body}</p>
        {CALENDLY_URL ? (
          <div className="mt-4 h-96 rounded-xl overflow-hidden border border-neutral-200">
            <iframe src={CALENDLY_URL} className="w-full h-full" title="Schedule a call" />
          </div>
        ) : (
          <div className="mt-4 p-5 bg-neutral-50 rounded-xl text-center">
            <Calendar size={32} className="mx-auto text-neutral-400 mb-3" />
            <p className="fb-label">Scheduling is not configured yet</p>
            <p className="fb-caption mt-1">
              In production, this opens a Calendly embed where prospects can book a 15-minute call with their assigned success manager.
            </p>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
