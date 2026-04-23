/* eslint-disable react/prop-types */
// FLOW B — Single-Scroll Configurator
// All services visible on one long page, sticky summary panel.
// Users can jump around via a sticky section nav.

function FlowBPage() {
  return (
    <Browser url="futurebridgesolutions.com/build/configurator" height={640}>
      <FbsHeader cta={true} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', minHeight: 600 }}>
        <div style={{ padding: '24px 32px' }}>
          {/* Section nav */}
          <div style={{ position: 'sticky', top: 0, background: 'white', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: 18, display: 'flex', gap: 6, flexWrap: 'wrap', zIndex: 2 }}>
            <span className="sk-chip selected">① Basics</span>
            <span className="sk-chip">② Energy</span>
            <span className="sk-chip">③ Internet</span>
            <span className="sk-chip">④ Phones</span>
            <span className="sk-chip">⑤ Security</span>
            <span className="sk-chip">⑥ AI</span>
            <span className="sk-chip">⑦ Review</span>
          </div>

          {/* Section: Basics */}
          <div style={{ marginBottom: 32 }}>
            <div className="t-micro" style={{ color: 'var(--tertiary-500)' }}>① Basics</div>
            <div className="h-ui-lg" style={{ fontSize: 22, marginTop: 4 }}>About your business</div>
            <div className="row gap-12 mt-12" style={{ marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <div className="t-micro" style={{ marginBottom: 6 }}>Name</div>
                <div className="sk-input">Acme Dental Group</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="t-micro" style={{ marginBottom: 6 }}>Address</div>
                <div className="sk-input">425 Peachtree St NE, Atlanta</div>
              </div>
              <div style={{ width: 120 }}>
                <div className="t-micro" style={{ marginBottom: 6 }}>Team</div>
                <div className="sk-input">12</div>
              </div>
            </div>
          </div>

          {/* Section: Energy (collapsed card pattern — expanded inline) */}
          <div style={{ background: 'white', border: '1.5px solid var(--pencil)', borderRadius: 12, padding: 18, marginBottom: 14 }}>
            <div className="row justify-between items-center">
              <div>
                <div className="t-micro" style={{ color: 'var(--tertiary-500)' }}>② Energy</div>
                <div className="h-ui" style={{ fontSize: 16, marginTop: 2 }}>⚡ Cut your energy bill 10–30%</div>
              </div>
              <span className="sk-toggle on" />
            </div>
            <div className="t-body" style={{ marginTop: 8, fontSize: 12 }}>
              One-time audit, $2,000. Projected savings ~$168/mo based on Atlanta rates.
            </div>
          </div>

          {/* Section: Internet */}
          <div style={{ background: 'white', border: '1.5px solid var(--pencil)', borderRadius: 12, padding: 18, marginBottom: 14 }}>
            <div className="row justify-between">
              <div className="t-micro" style={{ color: 'var(--tertiary-500)' }}>③ Internet</div>
              <span className="t-small">Recommended: 1 Gig</span>
            </div>
            <div className="h-ui" style={{ fontSize: 16, marginTop: 2 }}>🌐 How much do you need?</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 12 }}>
              <ServiceTile icon="🚀" title="500 Mbps" price="$99/mo" />
              <ServiceTile icon="⚡" title="1 Gig" price="$149/mo" selected badge="REC" />
              <ServiceTile icon="🔥" title="2 Gig" price="$229/mo" />
            </div>
            <div className="row gap-16 mt-12" style={{ marginTop: 12 }}>
              <div className="row gap-6 items-center"><span className="sk-toggle on" /> <span className="t-body" style={{ fontSize: 12 }}>LTE failover +$25</span></div>
              <div className="row gap-6 items-center"><span className="sk-toggle" /> <span className="t-body" style={{ fontSize: 12 }}>Static IP +$15</span></div>
            </div>
          </div>

          {/* Section: Phones — collapsed */}
          <div style={{ background: 'white', border: '1.5px solid var(--pencil)', borderRadius: 12, padding: 18, marginBottom: 14 }}>
            <div className="row justify-between items-center">
              <div>
                <div className="t-micro" style={{ color: 'var(--tertiary-500)' }}>④ Phones & contact center</div>
                <div className="h-ui" style={{ fontSize: 16, marginTop: 2 }}>☎ 5 lines + 3 contact-center agents</div>
                <div className="t-small" style={{ marginTop: 2 }}>Tap to reconfigure</div>
              </div>
              <span className="sk-btn sm">Edit ▾</span>
            </div>
          </div>

          {/* Section: Security — collapsed, off */}
          <div style={{ background: 'white', border: '1.5px solid var(--pencil)', borderRadius: 12, padding: 18, marginBottom: 14, opacity: 0.85 }}>
            <div className="row justify-between items-center">
              <div>
                <div className="t-micro" style={{ color: 'var(--tertiary-500)' }}>⑤ Wi-Fi & Cybersecurity</div>
                <div className="h-ui" style={{ fontSize: 16, marginTop: 2 }}>🛡 Managed security — <span style={{ color: 'var(--ink-3)' }}>off</span></div>
              </div>
              <span className="sk-toggle" />
            </div>
          </div>

          {/* Section: AI */}
          <div style={{ background: 'var(--primary-50, #EEF2F8)', border: '1.5px solid var(--primary-300)', borderRadius: 12, padding: 18, marginBottom: 14 }}>
            <div className="row justify-between">
              <div>
                <div className="t-micro" style={{ color: 'var(--tertiary-500)' }}>⑥ AI Tools</div>
                <div className="h-ui" style={{ fontSize: 16, marginTop: 2 }}>🤖 AI Pathfinder™ — readiness + 12 seats</div>
                <div className="t-small" style={{ marginTop: 4 }}>Monthly coaching + gap analysis</div>
              </div>
              <span className="sk-btn primary sm">Edit</span>
            </div>
          </div>

          <div className="row justify-end mt-16" style={{ marginTop: 20 }}>
            <span className="sk-btn accent lg">Review &amp; Finalize →</span>
          </div>
        </div>

        {/* Sticky summary */}
        <div style={{ padding: 18, background: '#fafaf7', borderLeft: '1px solid rgba(0,0,0,0.06)', position: 'relative' }}>
          <div style={{ position: 'sticky', top: 16 }}>
            <SummaryPanel
              monthly={589}
              oneTime={2000}
              items={[
                { label: '⚡ Energy audit', price: '$2,000' },
                { label: '🌐 1 Gig + LTE', price: '$174/mo' },
                { label: '☎ Phones × 5', price: '$100/mo' },
                { label: '🎧 Agents × 3', price: '$135/mo' },
                { label: '🤖 AI × 12 seats', price: '$180/mo' },
              ]}
            />
            <div style={{ marginTop: 12, background: 'var(--success-bg, #E6F4EC)', border: '1px solid var(--success, #2F8A5C)', borderRadius: 8, padding: 10, fontSize: 11, color: 'var(--success, #2F8A5C)', fontWeight: 600 }}>
              Saving ~$1,140/mo vs 4 separate vendors
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function WfFlowB() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">04 · Flow B</div>
        <h1 className="page-title">Single-scroll configurator</h1>
        <p className="page-lede">
          Everything on one page. User scrolls top-to-bottom, sticky summary always visible, section nav lets power users jump. Fastest path for returning users and anyone who wants to see the whole shape of the order.
        </p>
      </div>

      <FlowIntro
        tag="novel"
        tagLabel="Fast / power users"
        title="One long page, everything at once"
        description="Sections are collapsible cards. Defaults pre-selected from industry + team size. Toggle on/off in place. Sticky cart + section nav make navigation instant."
        bestFor="Returning users, IT-literate owners, people who got a quote link and want to tweak."
        tradeoffs="Can feel overwhelming on first visit. Needs strong defaults. Mobile requires careful accordion UX."
        steps="1 scrolling page · 1–2 minutes for power users"
      />

      <div className="sec-label"><h2>Full configurator</h2><span className="tag">one page</span></div>
      <FlowBPage />

      <div className="wf-note-row mt-16" style={{ marginTop: 20 }}>
        <div />
        <div className="notes-col">
          <Note color="yellow"><b>Defaults are the whole UX.</b> 80% of users should be able to scroll once, glance at the cart, and hit Finalize.</Note>
          <Note color="blue"><b>Off-by-default:</b> Security and AI only pre-enable if the industry is Healthcare, Finance, or Legal. Otherwise user opts in.</Note>
          <Note color="red"><b>Risk:</b> "Paradox of choice". Use collapsed cards; show price inline only when relevant.</Note>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WfFlowB });
