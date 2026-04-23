/* eslint-disable react/prop-types */
// FLOW C — Smart Recommender + Bundle
// Answer 3-4 questions, AI generates a full bundle, user tweaks inline.

function FlowCQuiz() {
  return (
    <Browser url="futurebridgesolutions.com/build/pathfinder" height={540}>
      <FbsHeader cta={false} helpChat={true} />
      <div style={{ padding: '40px 60px', maxWidth: 820, margin: '0 auto' }}>
        <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>🤖 AI Pathfinder</span>
        <div className="h-ui-xl" style={{ fontSize: 28, marginTop: 6 }}>3 questions. We'll draft your whole tech stack.</div>

        <div className="col gap-16 mt-24" style={{ marginTop: 28 }}>
          <div>
            <div className="h-ui" style={{ fontSize: 14 }}>1. What industry are you in?</div>
            <div className="row gap-6 mt-8" style={{ marginTop: 8, flexWrap: 'wrap' }}>
              {['Healthcare', 'Retail', 'Professional services', 'Trades', 'Hospitality', 'Other'].map((x, i) => (
                <span key={i} className={`sk-chip ${x === 'Healthcare' ? 'selected' : ''}`}>{x}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="h-ui" style={{ fontSize: 14 }}>2. How many people on your team?</div>
            <div style={{ height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 999, marginTop: 10 }}>
              <div style={{ width: '22%', height: '100%', background: 'var(--secondary-400)', borderRadius: 999 }} />
            </div>
            <div className="row justify-between t-small" style={{ marginTop: 4 }}>
              <span>1</span><span>10</span><span style={{ color: 'var(--primary-700)', fontWeight: 700 }}>12</span><span>50</span><span>100+</span>
            </div>
          </div>
          <div>
            <div className="h-ui" style={{ fontSize: 14 }}>3. What's your biggest pain right now?</div>
            <div className="row gap-6 mt-8" style={{ marginTop: 8, flexWrap: 'wrap' }}>
              {['Too many vendors', 'Internet too slow', 'Phone system old', 'Getting hacked / HIPAA', 'Want to use AI', 'Costs too high'].map((x, i) => (
                <span key={i} className={`sk-chip ${x === 'Too many vendors' ? 'selected' : ''}`}>{x}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="row justify-end" style={{ marginTop: 32 }}>
          <span className="sk-btn accent lg">Draft my bundle →</span>
        </div>
      </div>
    </Browser>
  );
}

function FlowCResult() {
  return (
    <Browser url="futurebridgesolutions.com/build/pathfinder/bundle" height={640}>
      <FbsHeader cta={true} helpChat={true} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', minHeight: 600 }}>
        <div style={{ padding: '24px 32px' }}>
          <div style={{ background: 'var(--primary-50, #EEF2F8)', borderLeft: '3px solid var(--primary-600)', padding: 14, borderRadius: 6 }}>
            <div className="t-micro" style={{ color: 'var(--primary-600)' }}>🤖 AI Pathfinder suggests</div>
            <div className="h-ui" style={{ fontSize: 15, marginTop: 4 }}>The <b>HealthyPractice</b> bundle for a 12-person dental clinic.</div>
            <div className="t-small" style={{ marginTop: 4 }}>Built to fix vendor sprawl + hit HIPAA. Tweak anything — numbers update live.</div>
          </div>

          <div className="row gap-8 mt-12" style={{ marginTop: 14 }}>
            <span className="sk-chip primary">Good</span>
            <span className="sk-chip selected">Better (suggested)</span>
            <span className="sk-chip">Best</span>
            <span className="t-small" style={{ marginLeft: 'auto', alignSelf: 'center' }}>compare tiers ⇄</span>
          </div>

          <div className="col gap-12 mt-16" style={{ marginTop: 16 }}>
            {[
              { i: '⚡', t: 'Energy audit', d: 'One-time · ~$168/mo saved', p: '$2,000', on: true, note: 'Your Atlanta address qualifies' },
              { i: '🌐', t: '1 Gig fiber + LTE failover', d: 'Right-sized for 12 people', p: '$174/mo', on: true },
              { i: '☎', t: '5 lines + 3 contact-center agents', d: 'Covers reception + 2 billing', p: '$235/mo', on: true },
              { i: '📶', t: 'Wi-Fi: 3 access points', d: 'Coverage + guest network', p: '$45/mo', on: true },
              { i: '🛡', t: 'Managed cybersecurity (HIPAA pack)', d: 'Mandatory for healthcare', p: '$180/mo', on: true, note: 'We flagged this based on your industry' },
              { i: '🤖', t: 'AI Pathfinder™ · 12 seats', d: 'Readiness eval + monthly coaching', p: '$180/mo', on: false },
            ].map((r, k) => (
              <div key={k} style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', gap: 14,
                background: r.on ? 'white' : '#fafaf7',
                border: r.on ? '1.5px solid var(--pencil)' : '1.5px dashed rgba(0,0,0,0.18)',
                borderRadius: 10, padding: 14,
                opacity: r.on ? 1 : 0.75,
              }}>
                <div style={{ fontSize: 22 }}>{r.i}</div>
                <div>
                  <div className="h-ui" style={{ fontSize: 14 }}>{r.t}</div>
                  <div className="t-small" style={{ marginTop: 2 }}>{r.d}</div>
                  {r.note && <div className="t-small" style={{ color: 'var(--tertiary-500)', marginTop: 2, fontWeight: 600 }}>↗ {r.note}</div>}
                </div>
                <div className="t-money" style={{ fontSize: 14 }}>{r.p}</div>
                <span className={`sk-toggle ${r.on ? 'on' : ''}`} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: 'var(--neutral-50)', border: '1px dashed rgba(0,0,0,0.15)', borderRadius: 10, padding: 14 }}>
            <div className="h-ui" style={{ fontSize: 13 }}>💬 Not sure about something?</div>
            <div className="t-small" style={{ marginTop: 4 }}>
              Ask the Pathfinder: <i style={{ color: 'var(--secondary-600)' }}>"Do we actually need a contact center for a dental clinic?"</i> · <i style={{ color: 'var(--secondary-600)' }}>"What if I grow to 20 people?"</i>
            </div>
            <div className="sk-input mt-8" style={{ marginTop: 10 }}>Ask anything…</div>
          </div>

          <div className="row justify-between" style={{ marginTop: 24 }}>
            <span className="sk-btn ghost">Start from scratch instead</span>
            <span className="sk-btn accent lg">Finalize this bundle →</span>
          </div>
        </div>

        <div style={{ padding: 18, background: '#fafaf7', borderLeft: '1px solid rgba(0,0,0,0.06)', position: 'relative' }}>
          <div style={{ position: 'sticky', top: 16 }}>
            <SummaryPanel
              monthly={634}
              oneTime={2000}
              items={[
                { label: '⚡ Energy', price: '$2,000' },
                { label: '🌐 Internet', price: '$174/mo' },
                { label: '☎ Phones+CC', price: '$235/mo' },
                { label: '📶 Wi-Fi', price: '$45/mo' },
                { label: '🛡 Security', price: '$180/mo' },
              ]}
            />
            <div style={{ marginTop: 12, padding: 10, background: 'white', border: '1px solid var(--pencil)', borderRadius: 8 }}>
              <div className="t-micro">Savings calculator</div>
              <div className="t-small" style={{ marginTop: 4 }}>You're paying <b>~$1,774/mo</b> across 4 vendors today.</div>
              <div className="t-money" style={{ fontSize: 20, marginTop: 4, color: 'var(--success, #2F8A5C)' }}>Save $1,140/mo</div>
              <div className="sk-input sm" style={{ marginTop: 8, height: 28, fontSize: 11 }}>Update your current bill →</div>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function WfFlowC() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">05 · Flow C</div>
        <h1 className="page-title">Smart recommender + bundle</h1>
        <p className="page-lede">
          3-question quiz → AI Pathfinder generates a named, opinionated bundle → user toggles line items to tweak. <b>Least friction, most magic.</b> Pairs perfectly with Landing C (industry-first).
        </p>
      </div>

      <FlowIntro
        tag="novel"
        tagLabel="Lowest friction · on-brand"
        title="Answer 3 questions, get a full stack"
        description="The quiz collects industry, size, and top pain. The recommender assembles a bundle with rationales ('flagged HIPAA because healthcare'). User sees Good/Better/Best tiers and toggles individual items. Ask-the-Pathfinder chatbox handles uncertainty."
        bestFor="First-time visitors, busy owners, anyone stuck on 'what do I need?'. This is the flagship on-brand experience — it literally embodies AI Pathfinder."
        tradeoffs="Bundle quality == pricing-engine quality. Needs good presets + a real LLM behind the chat. Can feel prescriptive if presets are bad."
        steps="3 quiz answers + 1 bundle screen · under 90 seconds"
      />

      <div className="sec-label"><h2>Step 1 · The quiz</h2><span className="tag">3 questions</span></div>
      <FlowCQuiz />

      <div className="sec-label"><h2>Step 2 · The drafted bundle</h2><span className="tag">toggle to tweak</span></div>
      <FlowCResult />

      <div className="wf-note-row mt-16" style={{ marginTop: 20 }}>
        <div />
        <div className="notes-col">
          <Note color="yellow"><b>Named bundles</b> (HealthyPractice, ShopFront, FieldOps) make it memorable. Users remember "the HealthyPractice bundle" better than "Package B".</Note>
          <Note color="blue"><b>The "we flagged" notes</b> are the product. Without rationale, this is just a form. With it, it feels advised.</Note>
          <Note color="teal"><b>Chat uses claude.complete()</b> scoped to the current bundle context. Cheap, works today.</Note>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WfFlowC });
