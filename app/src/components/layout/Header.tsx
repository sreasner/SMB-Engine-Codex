import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Save, Menu, X } from 'lucide-react';
import { useBuildStore } from '@/store/useBuildStore';
import { useState, useEffect } from 'react';
import { SaveResumeModal } from '@/components/flow/SaveResumeModal';
import { getVertical } from '@/lib/verticals';

const LINEAR_STEP_COUNT = 7;

export function Header() {
  const location = useLocation();
  const [saveOpen, setSaveOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const meta = useBuildStore((s) => s.meta);
  const industry = useBuildStore((s) => s.business.industry);
  const vertical = getVertical(industry);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const linearMatch = location.pathname.match(/^\/build\/step\/(\d+)$/);
  const stepNum = linearMatch ? Math.min(Math.max(parseInt(linearMatch[1], 10), 1), LINEAR_STEP_COUNT) : null;
  const showProgress =
    stepNum !== null ||
    location.pathname === '/build' ||
    location.pathname === '/build/bundle' ||
    location.pathname === '/build/review';
  const inBuild = location.pathname.startsWith('/build');

  const progress = stepNum !== null
    ? (stepNum / LINEAR_STEP_COUNT) * 100
    : location.pathname === '/build/review'
      ? 100
      : location.pathname === '/build/bundle'
        ? 66
        : 33;

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 shadow-[0_1px_3px_rgba(14,29,55,0.06),0_4px_16px_rgba(14,29,55,0.04)] backdrop-blur-lg'
            : 'bg-white/95 backdrop-blur border-b border-neutral-200'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Future Bridge Solutions home">
            <img
              src="/assets/logo.png"
              alt=""
              className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
            />
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
                  className="h-full bg-secondary rounded-pill transition-all duration-500 ease-standard"
                  style={{ width: `${progress}%` }}
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
            <a href="#help" className="chip hidden sm:inline-flex" aria-label="Help and chat">
              <MessageCircle size={14} aria-hidden />
              Help
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md text-neutral-600 hover:bg-neutral-50 sm:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {showProgress && (
          <div className="h-0.5 bg-neutral-100 md:hidden">
            <div
              className="h-full bg-secondary transition-all duration-500 ease-standard"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm animate-fade-in sm:hidden" onClick={() => setMobileOpen(false)}>
          <nav
            className="absolute top-16 right-0 left-0 bg-white border-b border-neutral-200 shadow-lg p-4 space-y-2 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {inBuild && (
              <button
                type="button"
                onClick={() => { setSaveOpen(true); setMobileOpen(false); }}
                className="w-full btn btn-ghost justify-start"
              >
                <Save size={14} aria-hidden />
                Save & resume
              </button>
            )}
            <a href="#help" className="w-full btn btn-ghost justify-start">
              <MessageCircle size={14} aria-hidden />
              Help
            </a>
          </nav>
        </div>
      )}

      <SaveResumeModal open={saveOpen} onClose={() => setSaveOpen(false)} />
    </>
  );
}
