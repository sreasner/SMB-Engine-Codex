import { useParams, Link } from 'react-router-dom';
import { CircleCheck as CheckCircle2, Calendar, FileDown, MessageSquare, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useBuildStore } from '@/store/useBuildStore';
import { CONFIRM } from '@/content/copy';
import { ScheduleCallCTA } from '@/components/flow/ScheduleCallCTA';

const CONFIRM_ICONS = [Calendar, FileDown, MessageSquare];

export function BuildConfirm() {
  const { id } = useParams<{ id: string }>();
  const business = useBuildStore((s) => s.business);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const confirmId = id ?? 'FBS-DEMO';
  const email = business.email || 'your inbox';

  return (
    <div className="relative overflow-hidden bg-[#f4f6f8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(65,163,216,0.15),transparent_50%),linear-gradient(180deg,#eef2f6_0%,#f8fafb_38%,#f4f6f8_100%)]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex flex-col items-center text-center animate-scale-in">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-secondary/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-16 h-16 rounded-full grid place-items-center bg-gradient-to-br from-secondary-50 to-primary-50 border border-secondary-200/50 shadow-[0_0_0_8px_rgba(65,163,216,0.08)]">
              <CheckCircle2 size={36} className="text-secondary" aria-hidden />
            </div>
          </div>
          <h1 className="fb-h1 animate-fade-in-up stagger-1">{CONFIRM.headline}</h1>
          <p className="fb-body mt-3 max-w-xl text-neutral-700 animate-fade-in-up stagger-2">
            {CONFIRM.body(confirmId, email)}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary animate-fade-in-up stagger-3">
            Quote #{confirmId}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {CONFIRM.actions.map((action, i) => {
            const Icon = CONFIRM_ICONS[i];
            const handler = i === 0 ? () => setScheduleOpen(true) : i === 1 ? () => window.print() : undefined;
            return (
              <div
                key={action.title}
                className={`animate-fade-in-up stagger-${i + 4} group card p-5 flex flex-col hover:shadow-md transition-all duration-300`}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                  <Icon size={20} aria-hidden />
                </div>
                <h3 className="fb-h4">{action.title}</h3>
                <p className="fb-caption mt-1 flex-1">{action.desc}</p>
                <button
                  type="button"
                  onClick={handler}
                  className="btn btn-primary mt-4 self-start"
                  disabled={!handler}
                >
                  {action.cta}
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 animate-fade-in stagger-8">
          <Link to="/" className="btn btn-ghost">
            Back to start
          </Link>
          <Link to="/build/review" className="btn btn-ghost">
            Review my quote
          </Link>
        </div>

        <ScheduleCallCTA open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
      </div>
    </div>
  );
}
