import { Check } from 'lucide-react';

const STEPS = [
  { n: 1, title: 'About you' },
  { n: 2, title: 'Energy savings' },
  { n: 3, title: 'Internet' },
  { n: 4, title: 'Phones + CC' },
  { n: 5, title: 'Wi-Fi & Security' },
  { n: 6, title: 'AI tools' },
  { n: 7, title: 'Review' },
];

interface StepSidebarProps {
  current: number;
  onJump?: (n: number) => void;
}

export function StepSidebar({ current, onJump }: StepSidebarProps) {
  return (
    <nav aria-label="Wizard steps" className="card p-4 lg:sticky lg:top-24">
      <ol className="space-y-0.5">
        {STEPS.map((s) => {
          const state: 'past' | 'current' | 'future' =
            s.n < current ? 'past' : s.n === current ? 'current' : 'future';
          return (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => onJump && s.n <= current && onJump(s.n)}
                disabled={!onJump || s.n > current}
                className={`w-full flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-all duration-200 ${
                  state === 'current'
                    ? 'bg-secondary-50 shadow-[0_0_0_1px_rgba(65,163,216,0.2)]'
                    : state === 'past'
                      ? 'hover:bg-neutral-50'
                      : ''
                } disabled:cursor-default`}
              >
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    state === 'past'
                      ? 'bg-secondary text-white shadow-sm'
                      : state === 'current'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {state === 'past' ? <Check size={13} strokeWidth={2.5} /> : s.n}
                </span>
                <span
                  className={`fb-label !font-medium transition-colors duration-200 ${
                    state === 'current' ? 'text-primary' : state === 'past' ? 'text-neutral-700' : 'text-neutral-400'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
