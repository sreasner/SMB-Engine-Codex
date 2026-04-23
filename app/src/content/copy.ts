// Verbatim microcopy from the Future Bridge wireframes — do not invent copy.

export const LANDING = {
  eyebrow: 'Tell us who you are',
  headline: "We've built this for businesses like yours.",
  subhead: "Pick your industry. We'll pre-fill a bundle you can tweak in minutes.",
  ctaPrimary: 'AI Pathfinder: suggest a bundle',
  ctaSecondary: "I'd rather start from scratch",
  trust: ['No credit card', 'Instant pricing', 'Cancel anytime'],
};

export const QUIZ = {
  header: 'AI Pathfinder',
  headline: "3 questions. We'll draft your whole tech stack.",
  q1: {
    label: 'What industry are you in?',
  },
  q2: {
    label: 'How many people on your team?',
  },
  q3: {
    label: "What's your biggest pain right now?",
    options: [
      { id: 'vendor-sprawl', label: 'Too many vendors' },
      { id: 'slow-internet', label: 'Internet too slow' },
      { id: 'old-phones', label: 'Phone system old' },
      { id: 'security-risk', label: 'Getting hacked / HIPAA' },
      { id: 'want-ai', label: 'Want to use AI' },
      { id: 'high-cost', label: 'Costs too high' },
    ] as const,
  },
  cta: 'Draft my bundle',
};

export const BUNDLE = {
  eyebrow: 'AI Pathfinder suggests',
  chatPrompt: 'Not sure about something?',
  chatExamples: `Ask the Pathfinder: "Do we actually need a contact center for a dental clinic?" · "What if I grow to 20 people?"`,
  chatPlaceholder: 'Ask anything…',
  ctaFinalize: 'Finalize this bundle',
  ctaScratch: 'Start from scratch instead',
};

export const STEPS = {
  1: {
    eyebrow: 'Step 1 · About you',
    headline: "Let's start with the basics.",
    subhead: 'We use this to tailor pricing and delivery timelines. Takes 30 seconds.',
  },
  2: {
    eyebrow: 'Step 2 · Energy savings',
    headline: 'Cut your energy bill 10–30%.',
    subhead:
      'We audit your utility rate + usage once, then switch you to a pre-negotiated supplier. You pay a one-time setup; the monthly savings are yours forever.',
    yes: 'Yes, run my audit',
    yesHelp: '$2,000 one-time · includes contract review',
    skip: 'Skip for now',
    skipHelp: 'You can add energy later from your account.',
  },
  3: {
    eyebrow: 'Step 3 · Internet',
    headline: 'How much internet do you need?',
    subhead:
      "For a team of {n}, we recommend {tier}. Enough for video calls, cloud apps and a guest Wi-Fi in parallel.",
  },
  4: {
    eyebrow: 'Step 4 · Phones + contact center',
    headline: 'How does your team answer calls?',
    subhead: 'Pick phone lines only, or add a contact center for shared queues and routing.',
  },
  5: {
    eyebrow: 'Step 5 · Wi-Fi & Security',
    headline: 'Coverage + protection.',
    subhead: 'Good security is boring. We make it invisible.',
  },
  6: {
    eyebrow: 'Step 6 · AI tools',
    headline: 'Ready to use AI?',
    subhead:
      'AI Pathfinder™ evaluates your readiness, ships a design guide, and coaches your team monthly.',
  },
  7: {
    eyebrow: 'Step 7 · Review',
    headline: 'Review your quote',
    subhead: 'Everything is editable. Submit when you are ready.',
  },
} as const;

export const REVIEW = {
  savingsTitle: 'Savings vs your current vendors',
  savingsLead: 'You told us you pay ~${current}/mo today across 4 providers.',
  timelineTitle: 'What happens after you submit',
  submit: 'Submit order',
  fine: 'By submitting, you confirm this quote for 14 days. No charges until contracts are signed.',
  ctaEmail: 'Email me this quote',
  ctaPdf: 'Download PDF',
  ctaShare: 'Share with colleague',
  ctaScheduleFallback: 'Schedule a 15-min call first',
};

export const CONFIRM = {
  headline: "You're on your way.",
  body: (id: string, email: string) =>
    `Quote #${id} sent to ${email}. Your success manager, Priya, will reach out within one business day.`,
  actions: [
    { title: 'Book your pre-flight call', desc: "Pick a 15-min slot on Priya's calendar", cta: 'Do it' },
    { title: 'Download your signed quote PDF', desc: 'Share with your team for internal approval', cta: 'Do it' },
    { title: 'Get SMS updates', desc: "We'll text when each service goes live", cta: 'Do it' },
  ],
};

export const SAVE_RESUME = {
  title: 'Email me a link to finish this quote',
  body: "We'll send a one-click resume link so you can pick up from any device.",
  cta: 'Send me the link',
};

export const SCHEDULE = {
  title: 'Not ready? Schedule a 15-min call',
  body: 'A Future Bridge advisor will walk you through your options and answer every question.',
  cta: 'Pick a time',
};

export const TIMELINE_STEPS = [
  { day: 'Day 0',      title: 'Submit',                    desc: 'We confirm via email + Slack/SMS' },
  { day: 'Day 1–2',    title: 'Pre-flight call',           desc: '15 min with your success manager' },
  { day: 'Day 3–5',    title: 'Fiber + phones install',    desc: 'Self-scheduled window' },
  { day: 'Day 7',      title: 'Energy audit',              desc: 'Remote — we pull your bill' },
  { day: 'Day 10',     title: 'Security & AI onboarding',  desc: 'Kickoff workshop' },
  { day: 'Day 30',     title: 'First savings report',      desc: 'Monthly afterward' },
];
