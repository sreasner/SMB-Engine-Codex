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
      <ol className="space-y-1">
        {STEPS.map((s) => {
          const state: 'past' | 'current' | 'future' =
            s.n < current ? 'past' : s.n === current ? 'current' : 'future';
          return (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => onJump && s.n <= current && onJump(s.n)}
                disabled={!onJump || s.n > current}
                className={`w-full flex items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors ${
                  state === 'current' ? 'bg-secondary-50' : 'hover:bg-neutral-50'
                } disabled:cursor-default`}
              >
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    state === 'past'
                      ? 'bg-secondary text-white'
                      : state === 'current'
                        ? 'bg-primary text-white'
                        : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {state === 'past' ? <Check size={12} /> : s.n}
                </span>
                <span
                  className={`fb-label !font-medium ${
                    state === 'current' ? 'text-primary' : state === 'past' ? 'text-neutral-600' : 'text-neutral-500'
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
