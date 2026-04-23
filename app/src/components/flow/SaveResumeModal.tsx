import { Mail, X, Copy, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SAVE_RESUME } from '@/content/copy';
import { useBuildStore } from '@/store/useBuildStore';
import { encodeResumeToken } from '@/lib/resume';

interface SaveResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function SaveResumeModal({ open, onClose }: SaveResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const state = useBuildStore();
  const [email, setEmail] = useState(state.business.email);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setCopied(false);
      setLink(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  function send() {
    const token = encodeResumeToken({
      business: { ...state.business, email: email || state.business.email },
      services: state.services,
      meta: state.meta,
    });
    const url = `${window.location.origin}/build/resume/${token}`;
    setLink(url);
    state.setBusiness({ email: email || state.business.email });
    setSent(true);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Save and resume"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary-50 flex items-center justify-center">
              <Mail size={18} className="text-primary" aria-hidden />
            </div>
            <h3 className="fb-h3 !text-xl">{SAVE_RESUME.title}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 hover:bg-neutral-50 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>
        <p className="fb-body mt-3">{SAVE_RESUME.body}</p>

        {!sent ? (
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <label className="block fb-label">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input mt-1"
                autoFocus
              />
            </label>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="btn btn-ghost">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {SAVE_RESUME.cta}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 space-y-3 animate-fade-in-up">
            <div className="p-3 rounded-lg" style={{ background: 'var(--success-bg)' }}>
              <p className="fb-small" style={{ color: 'var(--success)' }}>
                <strong>Link generated.</strong> We would email this to {email}. For demo, copy it below.
              </p>
            </div>
            <div className="flex gap-2">
              <input readOnly value={link ?? ''} className="input flex-1 fb-caption" />
              <button
                type="button"
                onClick={() => {
                  if (!link) return;
                  navigator.clipboard.writeText(link);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="btn btn-ghost"
                aria-label="Copy link"
              >
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="btn btn-primary">
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
