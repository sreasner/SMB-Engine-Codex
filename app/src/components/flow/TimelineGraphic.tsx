import { TIMELINE_STEPS, REVIEW } from '@/content/copy';

export function TimelineGraphic() {
  return (
    <section className="card p-5 sm:p-6">
      <h3 className="fb-h4 mb-4">{REVIEW.timelineTitle}</h3>
      <ol className="relative border-l-2 border-secondary-200 pl-6 space-y-5 sm:border-l-0 sm:pl-0 sm:grid sm:grid-cols-6 sm:gap-3">
        {TIMELINE_STEPS.map((s, i) => (
          <li key={s.day} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[32px] sm:static sm:mb-3 sm:block w-4 h-4 rounded-full ${
                i === 0 ? 'bg-accent' : 'bg-secondary'
              } ring-4 ring-white`}
            />
            <p className="fb-eyebrow !text-[10px]">{s.day}</p>
            <p className="fb-label mt-0.5">{s.title}</p>
            <p className="fb-caption mt-0.5">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
