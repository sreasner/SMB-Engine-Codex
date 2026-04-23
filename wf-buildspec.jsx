/* eslint-disable react/prop-types */
// Build-spec / handoff page for Replit + Claude 4.7

function WfBuildSpec() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">09 · Build spec</div>
        <h1 className="page-title">Handoff for Replit + Claude 4.7.</h1>
        <p className="page-lede">
          Everything a one-shot LLM needs: stack, file structure, state shape, pricing engine, copy deck, routing. Paired with the wireframes above, this should produce a working prototype in a single generation.
        </p>
      </div>

      <div className="sec-label"><h2>Recommended direction</h2><span className="tag">pick one</span></div>
      <div className="intro-block">
        <div>
          <span className="approach-tag rec">Our pick</span>
          <h3 style={{ marginTop: 8 }}>Landing C + Flow C (Industry → Pathfinder)</h3>
          <p className="t-body">
            It's the most on-brand (literally "AI Pathfinder"), lowest friction, and demos best. Build Flow A (linear) as the fallback for the "start from scratch" button.
          </p>
        </div>
        <div>
          <dl className="meta-grid">
            <dt>Primary flow</dt><dd>Industry card → 3-question quiz → drafted bundle → review → submit</dd>
            <dt>Fallback flow</dt><dd>"Start from scratch" → 7-step linear wizard → review → submit</dd>
            <dt>Ship cut</dt><dd>Energy, Internet, Phones+CC, Wi-Fi, Security, AI. Skip: Landing B playground.</dd>
          </dl>
        </div>
      </div>

      <div className="sec-label"><h2>Stack & file structure</h2><span className="tag">Replit</span></div>
      <div className="spec-grid">
        <div className="spec-block">
          <h3>Stack</h3>
          <ul>
            <li><b>React 18</b> + Vite (Replit template)</li>
            <li><b>Tailwind</b> for all styling; drop-in design-tokens plugin (see next block)</li>
            <li><b>React Router</b> for <code>/build/*</code> routes</li>
            <li><b>Zustand</b> for quote state (persisted to <code>localStorage</code> via <code>persist</code> middleware)</li>
            <li><b>No backend.</b> Submit → POST to a webhook (Zapier / Make) that emails FBS + the customer</li>
            <li>Quote PDF: client-side <code>@react-pdf/renderer</code></li>
            <li>AI chat: <code>window.claude.complete()</code> — no API keys needed</li>
          </ul>
        </div>
        <div className="spec-block">
          <h3>File structure</h3>
<pre>{`/src
  /components
    Header.jsx             # logo, progress, help, save-resume
    IndustryPicker.jsx     # landing C
    QuickQuiz.jsx          # 3-q quiz (flow C)
    BundleBuilder.jsx      # drafted bundle screen
    StepWizard.jsx         # linear fallback
    StepCard.jsx
    SummaryPanel.jsx       # sticky cart
    ReviewPage.jsx
    TimelineGraphic.jsx
    ConfirmPage.jsx
    AdminInbox.jsx         # simple read-only view
    PathfinderChat.jsx     # claude.complete wrapper
  /state
    useQuote.js            # Zustand store, persisted
    industries.js          # preset bundles
    pricing.js             # calculateTotal()
  /pages
    Landing.jsx
    Build.jsx              # hosts wizard + summary
    Review.jsx
    Confirm.jsx
    Admin.jsx
  App.jsx                  # routes + layout
  main.jsx`}</pre>
        </div>

        <div className="spec-block">
          <h3>Design tokens → Tailwind config</h3>
<pre>{`// tailwind.config.js
colors: {
  primary: '#193359',    // navy
  secondary: '#41A3D8',  // sky blue
  accent: '#CB2D27',     // coral (use sparingly)
  neutral: '#77777A',
  bg: '#F8FAFC',
}
fontFamily: {
  display: ['Manrope', 'sans-serif'],
  body:    ['Inter', 'sans-serif'],
}
borderRadius: {
  md: '10px', lg: '14px', pill: '9999px',
}`}</pre>
          <p className="t-body" style={{ fontSize: 12, marginTop: 8 }}>
            Use <code>font-display</code> for headlines, <code>font-body</code> (default) elsewhere. Never mix.
          </p>
        </div>

        <div className="spec-block">
          <h3>Zustand state shape</h3>
<pre>{`{
  business: {
    name: '', address: '', employees: 12,
    industry: 'healthcare', role: 'owner',
    email: '', currentMonthlyBill: null,
  },
  services: {
    energy:   { enabled: true,  oneTimeFee: 2000, projMonthlySaving: 168 },
    internet: { tier: '1gig', failover: true, staticIP: false },
    phones:   { lines: 5, cc: { type: 'small', agents: 3, analytics: false, recording: false } },
    wifi:     { enabled: true, aps: 3, proInstall: false },
    security: { enabled: true, pack: 'hipaa' },  // 'basic' | 'hipaa' | 'pci'
    ai:       { enabled: false, seats: 0 },
  },
  meta: {
    source: 'pathfinder' | 'linear' | 'configurator',
    resumeToken: 'uuid',   // emailed for save-resume
    createdAt, updatedAt,
  },
}`}</pre>
        </div>

        <div className="spec-block" style={{ gridColumn: '1 / -1' }}>
          <h3>Pricing engine</h3>
<pre>{`// /state/pricing.js
const PRICES = {
  energy:   { oneTime: 2000 },
  internet: { '500mbps': 99, '1gig': 149, '2gig': 229, failover: 25, staticIP: 15 },
  phones:   { line: 20 },
  cc: {
    none: 0,
    small: { base: 0, perAgent: 45 },
    full:  { base: 0, perAgent: 79 },
    analytics: 12,  // per agent
    recording: 8,   // per agent
  },
  wifi:     { ap: 15, proInstall: 150 /* once */ },
  security: { basic: 99, hipaa: 180, pci: 150 },
  ai:       { perSeat: 15 },
};

export function calculateTotal(state) {
  const s = state.services;
  let monthly = 0, oneTime = 0;

  if (s.energy.enabled) oneTime += PRICES.energy.oneTime;

  if (s.internet.tier) monthly += PRICES.internet[s.internet.tier];
  if (s.internet.failover) monthly += PRICES.internet.failover;
  if (s.internet.staticIP) monthly += PRICES.internet.staticIP;

  monthly += s.phones.lines * PRICES.phones.line;
  if (s.phones.cc.type && s.phones.cc.type !== 'none') {
    const cc = PRICES.cc[s.phones.cc.type];
    monthly += s.phones.cc.agents * cc.perAgent;
    if (s.phones.cc.analytics) monthly += s.phones.cc.agents * PRICES.cc.analytics;
    if (s.phones.cc.recording) monthly += s.phones.cc.agents * PRICES.cc.recording;
  }

  if (s.wifi.enabled) {
    monthly += s.wifi.aps * PRICES.wifi.ap;
    if (s.wifi.proInstall) oneTime += PRICES.wifi.proInstall;
  }

  if (s.security.enabled) monthly += PRICES.security[s.security.pack];

  if (s.ai.enabled) monthly += s.ai.seats * PRICES.ai.perSeat;

  return { monthly: Math.round(monthly), oneTime };
}

// Savings estimate — user self-reports current bill
export function estimateSavings(state) {
  const current = state.business.currentMonthlyBill;
  const proposed = calculateTotal(state).monthly;
  const energySave = state.services.energy.enabled ? state.services.energy.projMonthlySaving : 0;
  return current ? (current - proposed + energySave) : null;
}`}</pre>
        </div>

        <div className="spec-block">
          <h3>Industry presets</h3>
<pre>{`// /state/industries.js
export const PRESETS = {
  healthcare: {
    name: 'HealthyPractice',
    internet: { tier: '1gig', failover: true },
    phones:   { lines: 5, cc: { type: 'small', agents: 3 } },
    wifi:     { enabled: true, aps: 3 },
    security: { enabled: true, pack: 'hipaa' },   // flagged
    ai:       { enabled: false, seats: 0 },
    energy:   { enabled: true },
  },
  retail: {
    name: 'ShopFront',
    internet: { tier: '1gig' },
    phones:   { lines: 3, cc: { type: 'none' } },
    wifi:     { enabled: true, aps: 2 },
    security: { enabled: true, pack: 'pci' },
    energy:   { enabled: true },
  },
  proservices: {
    name: 'FirmStack',
    internet: { tier: '500mbps' },
    phones:   { lines: 8, cc: { type: 'small', agents: 2 } },
    wifi:     { enabled: true, aps: 2 },
    security: { enabled: true, pack: 'basic' },
    ai:       { enabled: true, seats: 8 },
    energy:   { enabled: true },
  },
  // ...trades, hospitality, other
};`}</pre>
        </div>

        <div className="spec-block">
          <h3>Routes</h3>
<pre>{`/                         → Landing (industry picker)
/build                    → Quick quiz (flow C)
/build/from-scratch       → Linear wizard (flow A)
/build/step/:n            → Individual wizard step
/build/review             → Review + submit
/build/confirm/:id        → Post-submit confirmation
/build/resume/:token      → Load from email link
/admin                    → FBS internal inbox (auth via magic link)`}</pre>
        </div>
      </div>

      <div className="sec-label"><h2>Copy deck (verbatim)</h2><span className="tag">so the LLM doesn't invent</span></div>
      <div className="spec-grid">
        <div className="spec-block">
          <h3>Landing — headline options</h3>
          <ul>
            <li><b>A:</b> "One platform. Everything your business runs on."</li>
            <li><b>B:</b> "See what your business tech should actually cost."</li>
            <li><b>C:</b> "We've built this for businesses like yours."</li>
            <li>Subhead: "Internet, phones, Wi-Fi, security, AI tools and energy savings — configured to your team in under 10 minutes. No sales call required."</li>
            <li>Primary CTA: <b>Build my solution →</b></li>
            <li>Secondary CTA: <b>See a sample quote</b></li>
          </ul>
        </div>
        <div className="spec-block">
          <h3>Step microcopy</h3>
          <ul>
            <li><b>Energy:</b> "Cut your energy bill 10–30%. One-time audit, monthly savings forever."</li>
            <li><b>Internet:</b> "For a team of {'{n}'}, we recommend {'{tier}'}. Enough for video calls, cloud apps and a guest Wi-Fi in parallel."</li>
            <li><b>Phones:</b> "How does your team answer calls?"</li>
            <li><b>Security:</b> "Good security is boring. We make it invisible." (HIPAA pack is flagged automatically for healthcare.)</li>
            <li><b>AI:</b> "AI Pathfinder™ evaluates your readiness, ships a design guide, and coaches your team monthly."</li>
            <li><b>Submit:</b> "By submitting, you confirm this quote for 14 days. No charges until contracts are signed."</li>
          </ul>
        </div>
      </div>

      <div className="sec-label"><h2>Behavior rules (non-negotiable)</h2><span className="tag">from PRD</span></div>
      <div className="spec-block" style={{ background: 'var(--primary-50, #EEF2F8)' }}>
        <ul>
          <li><b>One decision per step</b> in linear mode — never stack two category choices.</li>
          <li><b>Instant feedback.</b> Every selection must update the summary + highlight the selected element within 100ms.</li>
          <li><b>Defaults pre-selected</b> based on industry + team size. Never leave the user facing an empty choice.</li>
          <li><b>Progress always visible.</b> Step X of Y + a progress bar on every screen.</li>
          <li><b>Save &amp; resume</b> on every step. Email captures a <code>resumeToken</code>, link goes to <code>/build/resume/:token</code>.</li>
          <li><b>Schedule-a-call</b> CTA on every step as a fallback exit.</li>
          <li><b>Mobile:</b> summary collapses to a bottom drawer. Tap the price pill to expand. CTA never scrolls out of reach.</li>
          <li><b>Accent color (coral)</b> only for the final Submit button, errors, and one-time "flagged" badges. Never as a general CTA.</li>
          <li><b>No emoji in product copy</b> — only as UI affordance icons (which we should swap to Lucide SVG for production).</li>
        </ul>
      </div>

      <div className="sec-label"><h2>Component inventory</h2><span className="tag">reusable pieces</span></div>
      <div className="spec-block">
        <ul style={{ columns: 2, columnGap: 32 }}>
          <li><b>&lt;Header /&gt;</b> — logo left, step progress center, help + save right</li>
          <li><b>&lt;ProgressBar current total /&gt;</b></li>
          <li><b>&lt;StepSidebar steps current /&gt;</b> — desktop-only</li>
          <li><b>&lt;ServiceTile icon title desc price selected badge /&gt;</b> — the card users tap</li>
          <li><b>&lt;SummaryPanel state /&gt;</b> — sticky cart, derives from store</li>
          <li><b>&lt;SavingsBadge current proposed /&gt;</b> — green band</li>
          <li><b>&lt;Toggle value onChange label helperText /&gt;</b></li>
          <li><b>&lt;Slider min max step label helperText /&gt;</b></li>
          <li><b>&lt;IndustryCard icon title subtitle onClick /&gt;</b></li>
          <li><b>&lt;BundleLineItem icon title desc price on note onToggle /&gt;</b></li>
          <li><b>&lt;TimelineGraphic steps /&gt;</b> — horizontal on desktop, vertical on mobile</li>
          <li><b>&lt;PathfinderChat context /&gt;</b> — floating bubble, claude.complete</li>
          <li><b>&lt;PageFooter cta secondary /&gt;</b> — Back/Next/Skip</li>
          <li><b>&lt;MobileCartDrawer state /&gt;</b> — bottom sticky, expands</li>
          <li><b>&lt;SaveResumeModal /&gt;</b> — email captures resume link</li>
          <li><b>&lt;ScheduleCallCTA /&gt;</b> — Calendly embed on review + every step footer</li>
        </ul>
      </div>

      <div className="sec-label"><h2>"One-shot" prompt seed</h2><span className="tag">paste into Claude/Replit</span></div>
      <div className="spec-block">
        <pre>{`Build a React + Vite + Tailwind app for Future Bridge Solutions SMB Self-Service
Ordering. The design system, state shape, pricing engine, and copy are attached.

Primary user flow:
1. Landing at "/" — industry picker (8 cards). Clicking one sets business.industry
   and routes to /build with PRESETS applied.
2. /build — 3-question quick quiz (industry confirmed, team size slider,
   top pain chips). Button "Draft my bundle →" routes to /build/review with the
   preset + adjustments applied.
3. /build/review — shows the drafted bundle with per-line toggles and an inline
   edit for numeric fields (phone lines, agents, AI seats). Sticky summary with
   monthly + one-time + savings-vs-current badge. "Submit order →" posts to a
   webhook and routes to /build/confirm/:id.
4. Fallback: "Start from scratch" on landing → /build/from-scratch → 7-step
   linear wizard with the same services. Step order: basics → energy → internet
   → phones → wi-fi & security → AI → review.

Design system: brand colors #193359 (primary), #41A3D8 (secondary),
#CB2D27 (accent, Submit only), #77777A (neutral). Manrope display / Inter body.
Rounded 10px. Use shadow-sm on cards, shadow-md on hover.

Behavior rules: one decision per step in linear mode; defaults pre-selected from
industry; summary updates instantly; save-and-resume on every step (email link);
"Schedule a call" fallback on every step; mobile summary collapses to bottom
drawer.

Use window.claude.complete() for the Pathfinder chat bubble.

Admin inbox at /admin — simple list + detail, read-only v1. Magic-link auth.

Persist full state to localStorage via Zustand persist middleware.`}</pre>
      </div>
    </div>
  );
}

Object.assign(window, { WfBuildSpec });
