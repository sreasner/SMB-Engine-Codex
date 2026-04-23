import { type ReactNode } from 'react';

interface StepCardProps {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  children: ReactNode;
}

export function StepCard({ eyebrow, headline, subhead, children }: StepCardProps) {
  return (
    <section className="card p-6 sm:p-8 overflow-hidden">
      {eyebrow && <p className="fb-eyebrow mb-2">{eyebrow}</p>}
      <h2 className="fb-h2 mb-2">{headline}</h2>
      {subhead && <p className="fb-body-lg text-neutral-600 mb-6">{subhead}</p>}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
