import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, FileDown, MessageSquare } from 'lucide-react';
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
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full grid place-items-center bg-primary-50 mb-4">
          <CheckCircle2 size={32} className="text-primary" aria-hidden />
        </div>
        <h1 className="fb-h1">{CONFIRM.headline}</h1>
        <p className="fb-body mt-3 max-w-xl text-neutral-700">{CONFIRM.body(confirmId, email)}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {CONFIRM.actions.map((action, i) => {
          const Icon = CONFIRM_ICONS[i];
          const handler = i === 0 ? () => setScheduleOpen(true) : i === 1 ? () => window.print() : undefined;
          return (
            <div key={action.title} className="card p-5 flex flex-col">
              <Icon size={22} className="text-secondary-600 mb-3" aria-hidden />
              <h3 className="fb-h4">{action.title}</h3>
              <p className="fb-caption mt-1 flex-1">{action.desc}</p>
              <button
                type="button"
                onClick={handler}
                className="btn btn-primary mt-4 self-start"
                disabled={!handler}
              >
                {action.cta}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        <Link to="/" className="btn btn-ghost">
          Back to start
        </Link>
        <Link to="/build/review" className="btn btn-ghost">
          Review my quote
        </Link>
      </div>

      <ScheduleCallCTA open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </div>
  );
}
