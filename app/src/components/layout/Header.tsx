import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Save } from 'lucide-react';
import { useBuildStore } from '@/store/useBuildStore';
import { useState } from 'react';
import { SaveResumeModal } from '@/components/flow/SaveResumeModal';
import { getVertical } from '@/lib/verticals';

const LINEAR_STEP_COUNT = 7;

export function Header() {
  const location = useLocation();
  const [saveOpen, setSaveOpen] = useState(false);
  const meta = useBuildStore((s) => s.meta);
  const industry = useBuildStore((s) => s.business.industry);
  const vertical = getVertical(industry);

  const linearMatch = location.pathname.match(/^\/build\/step\/(\d+)$/);
  const stepNum = linearMatch ? Math.min(Math.max(parseInt(linearMatch[1], 10), 1), LINEAR_STEP_COUNT) : null;
  const showProgress =
    stepNum !== null ||
    location.pathname === '/build' ||
    location.pathname === '/build/bundle' ||
    location.pathname === '/build/review';
  const inBuild = location.pathname.startsWith('/build');

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Future Bridge Solutions home">
          <img src="/assets/logo.png" alt="" className="h-8 w-auto" />
          <span className="font-display font-extrabold text-primary text-lg tracking-tight hidden sm:inline">
            Future Bridge
          </span>
        </Link>

        {showProgress && (
          <div className="flex-1 min-w-0 hidden md:flex items-center gap-3">
            <span className="fb-small shrink-0">
              {stepNum !== null ? `Step ${stepNum} of ${LINEAR_STEP_COUNT}` : meta.source === 'pathfinder' ? 'AI Pathfinder' : 'Build your stack'}
            </span>
            {inBuild && industry !== 'other' && (
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                {vertical.label}
              </span>
            )}
            <div className="flex-1 h-1.5 bg-neutral-100 rounded-pill overflow-hidden max-w-xs">
              <div
                className="h-full bg-secondary rounded-pill transition-all"
                style={{
                  width:
                    stepNum !== null
                      ? `${(stepNum / LINEAR_STEP_COUNT) * 100}%`
                      : location.pathname === '/build/review'
                        ? '100%'
                        : location.pathname === '/build/bundle'
                          ? '66%'
                          : '33%',
                }}
              />
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {inBuild && (
            <button
              type="button"
              onClick={() => setSaveOpen(true)}
              className="chip hidden sm:inline-flex"
              aria-label="Save and resume later"
            >
              <Save size={14} aria-hidden />
              Save & resume
            </button>
          )}
          <a href="#help" className="chip" aria-label="Help and chat">
            <MessageCircle size={14} aria-hidden />
            Help
          </a>
        </div>
      </div>
      <SaveResumeModal open={saveOpen} onClose={() => setSaveOpen(false)} />
    </header>
  );
}
