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
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-primary" aria-hidden />
            <h3 className="fb-h3">{SCHEDULE.title}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 hover:bg-neutral-50 rounded">
            <X size={18} />
          </button>
        </div>
        <p className="fb-body mt-3">{SCHEDULE.body}</p>
        {CALENDLY_URL ? (
          <div className="mt-4 h-96 rounded-md overflow-hidden border border-neutral-200">
            <iframe src={CALENDLY_URL} className="w-full h-full" title="Schedule a call" />
          </div>
        ) : (
          <div className="mt-4 p-4 bg-neutral-50 rounded-md fb-caption">
            Demo mode — Calendly not configured. Set <code className="font-mono">VITE_CALENDLY_URL</code> to enable.
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
