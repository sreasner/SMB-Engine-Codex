/* eslint-disable react/prop-types */
// Top-level tab navigator. Mounts tabs + all wireframe pages.

const { useState: useStateRoot, useEffect: useEffectRoot } = React;

const TABS = [
  { id: 'overview', label: 'Overview', icon: '✦' },
  { id: 'landing', label: 'Landing', icon: '01' },
  { id: 'intake', label: 'Intake', icon: '02' },
  { id: 'flowa', label: 'Flow A · Linear', icon: '03' },
  { id: 'flowb', label: 'Flow B · Configurator', icon: '04' },
  { id: 'flowc', label: 'Flow C · Pathfinder', icon: '05' },
  { id: 'review', label: 'Review + Confirm', icon: '06' },
  { id: 'admin', label: 'Admin', icon: '07' },
  { id: 'mobile', label: 'Mobile', icon: '08' },
  { id: 'spec', label: 'Build Spec', icon: '09' },
];

function OverviewPage() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">Future Bridge · SMB Self-Service</div>
        <h1 className="page-title">Wireframes for a self-serve ordering experience.</h1>
        <p className="page-lede">
          Three distinct flow directions, a full landing/intake/review/confirm/admin/mobile set, and a Replit-ready build spec. Designed so a single Claude 4.7 generation can produce a working prototype.
        </p>
      </div>

      <div className="sec-label"><h2>What's inside</h2><span className="tag">read top to bottom</span></div>
      <div className="wf-grid cols-3">
        {[
          ['01 · Landing', '3 doorways', 'Hero · Playground · Industry'],
          ['02 · Intake', '2 styles', 'All-in-one · Conversational'],
          ['03 · Flow A', 'Linear stepper', 'One decision per step, 7 steps. Safe baseline.'],
          ['04 · Flow B', 'Configurator', 'All services, one page. Power users.'],
          ['05 · Flow C', 'AI Pathfinder', 'Quiz → drafted bundle → tweak. On-brand.'],
          ['06 · Review', 'The close', 'Bundle, savings, timeline, submit.'],
          ['07 · Admin', 'FBS inbox', 'Read-only v1, activity log.'],
          ['08 · Mobile', 'Responsive', 'Bottom-drawer cart, thumb-reach CTA.'],
          ['09 · Build spec', 'Replit-ready', 'State, pricing, copy, prompt seed.'],
        ].map(([t, s, d], k) => (
          <div key={k} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: 18 }}>
            <div className="t-micro" style={{ color: 'var(--tertiary-500)' }}>{t}</div>
            <div className="h-ui" style={{ fontSize: 16, marginTop: 4 }}>{s}</div>
            <div className="t-body" style={{ fontSize: 13, marginTop: 6 }}>{d}</div>
          </div>
        ))}
      </div>

      <div className="sec-label"><h2>Recommended direction</h2><span className="tag">our bet</span></div>
      <div className="intro-block">
        <div>
          <span className="approach-tag rec">Ship this</span>
          <h3 style={{ marginTop: 8 }}>Landing C · Industry picker + Flow C · Pathfinder</h3>
          <p className="t-body">
            It's the most on-brand (it literally <i>is</i> AI Pathfinder), has the lowest friction, and demos the hardest. Keep Flow A as the "start from scratch" fallback so skeptics still have an escape route.
          </p>
        </div>
        <div>
          <dl className="meta-grid">
            <dt>Core loop</dt><dd>Industry → 3-q quiz → drafted bundle → review → submit</dd>
            <dt>Hero moment</dt><dd>The rationale notes ("we flagged HIPAA because healthcare")</dd>
            <dt>Ship time</dt><dd>One Claude 4.7 generation should handle it end-to-end</dd>
          </dl>
        </div>
      </div>

      <div className="sec-label"><h2>Service scope</h2><span className="tag">from PRD + your clarifications</span></div>
      <div className="wf-grid cols-3">
        {[
          ['⚡', 'Energy', 'One-time audit $2,000 → 10–30% monthly savings. Address-driven estimate.'],
          ['🌐', 'Internet', '500 Mbps / 1 Gig / 2 Gig. +LTE failover, +static IP. Recommended tier by team size.'],
          ['☎', 'Phones + CC', 'Line count slider. Optional small or full contact center with agent slider + add-ons.'],
          ['📶', 'Wi-Fi', 'Access point count. Self or pro install.'],
          ['🛡', 'Cybersecurity', 'Basic / HIPAA / PCI packs. HIPAA auto-flagged for healthcare.'],
          ['🤖', 'AI Pathfinder™', 'Readiness eval + per-seat coaching. Opt-in.'],
        ].map(([i, t, d], k) => (
          <div key={k} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 24 }}>{i}</div>
            <div className="h-ui" style={{ fontSize: 15, marginTop: 8 }}>{t}</div>
            <div className="t-body" style={{ fontSize: 13, marginTop: 6 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const hash = (typeof window !== 'undefined' && window.location.hash.slice(1)) || 'overview';
  const init = TABS.some(t => t.id === hash) ? hash : 'overview';
  const [tab, setTab] = useStateRoot(init);

  useEffectRoot(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (TABS.some(t => t.id === h)) setTab(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffectRoot(() => {
    if (window.location.hash.slice(1) !== tab) {
      history.replaceState(null, '', `#${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [tab]);

  const tabProps = (id) => ({
    className: `app-tab ${tab === id ? 'active' : ''}`,
    onClick: () => setTab(id),
  });

  return (
    <>
      <RoughDefs />
      <nav className="app-nav">
        <div className="app-nav-inner">
          <a href="#overview" onClick={(e) => { e.preventDefault(); setTab('overview'); }} className="app-brand">
            <img src="assets/logo.png" alt="FBS" />
            <span>Future Bridge</span>
            <span className="sub">· SMB self-serve wireframes</span>
          </a>
          <div className="app-tabs">
            {TABS.map(t => (
              <button key={t.id} {...tabProps(t.id)} data-screen-label={t.label}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {tab === 'overview' && <OverviewPage />}
      {tab === 'landing'  && <WfLanding />}
      {tab === 'intake'   && <WfIntake />}
      {tab === 'flowa'    && <WfFlowA />}
      {tab === 'flowb'    && <WfFlowB />}
      {tab === 'flowc'    && <WfFlowC />}
      {tab === 'review'   && <WfReview />}
      {tab === 'admin'    && <WfAdmin />}
      {tab === 'mobile'   && <WfMobile />}
      {tab === 'spec'     && <WfBuildSpec />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
