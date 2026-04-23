/* eslint-disable react/prop-types */
// FLOW A — Guided Linear Stepper (PRD's baseline)
// One decision per screen, sidebar, summary always visible.

function FlowAStep2_Energy() {
  return (
    <Browser url="futurebridgesolutions.com/build/step/2-energy" height={560}>
      <FbsHeader step={2} total={7} cta={true} />
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 240px', minHeight: 500 }}>
        <StepSidebar
          current={1}
          steps={['About you', 'Energy savings', 'Internet', 'Phones', 'Wi-Fi & Security', 'AI tools', 'Review']}
        />
        <div style={{ padding: 32 }}>
          <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>⚡ One-time offer</span>
          <div className="h-ui-xl" style={{ marginTop: 6, fontSize: 26 }}>Cut your energy bill 10–30%.</div>
          <div className="t-body" style={{ marginTop: 6, maxWidth: 500 }}>
            We audit your utility rate + usage once, then switch you to a pre-negotiated supplier. You pay a one-time setup; the monthly savings are yours forever.
          </div>

          <div style={{ background: 'var(--primary-50, #EEF2F8)', border: '1px solid var(--primary-200)', borderRadius: 10, padding: 16, marginTop: 20 }}>
            <div className="row justify-between items-center">
              <div>
                <div className="h-ui" style={{ fontSize: 14 }}>Based on your address in Atlanta, GA</div>
                <div className="t-small" style={{ marginTop: 2 }}>Avg SMB bill ~ $840/mo · projected savings $84–$252/mo</div>
              </div>
              <div className="t-money" style={{ fontSize: 22 }}>~$168/mo saved</div>
            </div>
          </div>

          <div className="row gap-12 mt-16" style={{ marginTop: 20 }}>
            <div style={{ flex: 1, border: '2px solid var(--secondary-400)', background: 'var(--secondary-50, #ECF7FC)', borderRadius: 10, padding: 16 }}>
              <div className="row justify-between"><span className="h-ui" style={{ fontSize: 14 }}>Yes, run my audit</span><span style={{ width: 18, height: 18, borderRadius: 999, background: 'var(--secondary-400)', color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span></div>
              <div className="t-small" style={{ marginTop: 4 }}>$2,000 one-time · includes contract review</div>
            </div>
            <div style={{ flex: 1, border: '1.5px solid var(--pencil)', borderRadius: 10, padding: 16 }}>
              <div className="h-ui" style={{ fontSize: 14 }}>Skip for now</div>
              <div className="t-small" style={{ marginTop: 4 }}>You can add energy later from your account.</div>
            </div>
          </div>

          <div className="row justify-between" style={{ marginTop: 40 }}>
            <span className="sk-btn ghost">← Back</span>
            <span className="sk-btn primary lg">Continue to Internet →</span>
          </div>
        </div>
        <div style={{ padding: 20, background: '#fafaf7', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
          <SummaryPanel
            monthly={180}
            oneTime={2000}
            items={[
              { label: '⚡ Energy audit', price: '$2,000 once' },
              { label: '(projected savings)', price: '−$168/mo' },
            ]}
          />
        </div>
      </div>
    </Browser>
  );
}

function FlowAStep3_Internet() {
  return (
    <Browser url="futurebridgesolutions.com/build/step/3-internet" height={560}>
      <FbsHeader step={3} total={7} cta={true} />
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 240px', minHeight: 500 }}>
        <StepSidebar
          current={2}
          steps={['About you', 'Energy savings', 'Internet', 'Phones', 'Wi-Fi & Security', 'AI tools', 'Review']}
        />
        <div style={{ padding: 32 }}>
          <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>🌐 Connectivity</span>
          <div className="h-ui-xl" style={{ marginTop: 6, fontSize: 26 }}>How much internet do you need?</div>
          <div className="t-body" style={{ marginTop: 6, maxWidth: 500 }}>
            For a team of 12, we recommend <b>1 Gig fiber</b>. Enough for video calls, cloud apps and a guest Wi-Fi in parallel.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
            <ServiceTile icon="🚀" title="500 Mbps" desc="Solo + small team" price="$99/mo" />
            <ServiceTile icon="⚡" title="1 Gig" desc="Recommended for 12" price="$149/mo" selected badge="RECOMMENDED" />
            <ServiceTile icon="🔥" title="2 Gig" desc="Heavy video / cloud" price="$229/mo" />
          </div>

          <div className="row gap-12 mt-16" style={{ marginTop: 20, alignItems: 'center' }}>
            <span className="sk-toggle on" /> <span className="t-body" style={{ fontSize: 13 }}>Include 4G LTE failover</span>
            <span className="t-small" style={{ marginLeft: 'auto' }}>+$25/mo</span>
          </div>
          <div className="row gap-12" style={{ marginTop: 12, alignItems: 'center' }}>
            <span className="sk-toggle" /> <span className="t-body" style={{ fontSize: 13 }}>Static IP address</span>
            <span className="t-small" style={{ marginLeft: 'auto' }}>+$15/mo</span>
          </div>

          <div style={{ background: '#f7f6f1', border: '1px dashed rgba(0,0,0,0.15)', borderRadius: 8, padding: 12, marginTop: 20 }}>
            <div className="t-small"><b style={{ color: 'var(--primary-700)' }}>Availability check:</b> Fiber confirmed at 425 Peachtree St NE. Install window: 5–9 business days.</div>
          </div>

          <div className="row justify-between" style={{ marginTop: 28 }}>
            <span className="sk-btn ghost">← Energy</span>
            <span className="sk-btn primary lg">Continue to Phones →</span>
          </div>
        </div>
        <div style={{ padding: 20, background: '#fafaf7', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
          <SummaryPanel
            monthly={354}
            oneTime={2000}
            items={[
              { label: '⚡ Energy audit', price: '$2,000' },
              { label: '🌐 1 Gig internet', price: '$149/mo' },
              { label: '└ 4G failover', price: '$25/mo' },
            ]}
          />
        </div>
      </div>
    </Browser>
  );
}

function FlowAStep5_ContactCenter() {
  // Decision-tree step with "do you need a contact center?" → if yes, show agent slider
  return (
    <Browser url="futurebridgesolutions.com/build/step/4-phones" height={560}>
      <FbsHeader step={4} total={7} cta={true} />
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 240px', minHeight: 500 }}>
        <StepSidebar
          current={3}
          steps={['About you', 'Energy savings', 'Internet', 'Phones', 'Wi-Fi & Security', 'AI tools', 'Review']}
        />
        <div style={{ padding: 32 }}>
          <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>☎ Phones & contact center</span>
          <div className="h-ui-xl" style={{ marginTop: 6, fontSize: 26 }}>How does your team answer calls?</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
            <ServiceTile icon="📱" title="Just phone lines" desc="Everyone handles their own calls" price="from $20/line" />
            <ServiceTile icon="🎧" title="Small contact center" desc="2–10 agents, shared queue" price="$45/agent" selected badge="YOUR PICK" />
            <ServiceTile icon="🏢" title="Full contact center" desc="10+ agents, routing, analytics" price="$79/agent" />
          </div>

          <div style={{ background: 'var(--secondary-50, #ECF7FC)', border: '1px solid var(--secondary-200)', borderRadius: 10, padding: 16, marginTop: 20 }}>
            <div className="h-ui" style={{ fontSize: 13 }}>Configure your small contact center</div>
            <div style={{ marginTop: 12 }}>
              <div className="row justify-between"><span className="t-small">Phone lines</span><span className="t-money">5</span></div>
              <div style={{ height: 4, background: 'white', borderRadius: 999, marginTop: 4 }}>
                <div style={{ width: '33%', height: '100%', background: 'var(--secondary-400)', borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div className="row justify-between"><span className="t-small">Contact-center agents</span><span className="t-money">3</span></div>
              <div style={{ height: 4, background: 'white', borderRadius: 999, marginTop: 4 }}>
                <div style={{ width: '20%', height: '100%', background: 'var(--secondary-400)', borderRadius: 999 }} />
              </div>
            </div>
            <div className="row gap-6 mt-12" style={{ marginTop: 14, flexWrap: 'wrap' }}>
              <span className="sk-chip selected">📞 Call routing</span>
              <span className="sk-chip selected">📧 Shared voicemail</span>
              <span className="sk-chip">📊 Call analytics (+$12/agent)</span>
              <span className="sk-chip">🎙 Recording (+$8/agent)</span>
            </div>
          </div>

          <div className="row justify-between" style={{ marginTop: 28 }}>
            <span className="sk-btn ghost">← Internet</span>
            <span className="sk-btn primary lg">Continue to Wi-Fi →</span>
          </div>
        </div>
        <div style={{ padding: 20, background: '#fafaf7', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
          <SummaryPanel
            monthly={589}
            oneTime={2000}
            items={[
              { label: '⚡ Energy audit', price: '$2,000' },
              { label: '🌐 1 Gig + failover', price: '$174/mo' },
              { label: '☎ Phones × 5', price: '$100/mo' },
              { label: '🎧 Agents × 3', price: '$135/mo' },
            ]}
          />
        </div>
      </div>
    </Browser>
  );
}

function FlowAMap() {
  return (
    <FlowMap
      steps={[
        { title: 'About you', desc: 'Name, address, size, role' },
        { title: 'Energy savings', desc: 'One-time audit · recommended' },
        { title: 'Internet', desc: '500Mbps / 1Gig / 2Gig + addons' },
        { title: 'Phones + contact center', desc: 'Lines, agent count, routing' },
        { title: 'Wi-Fi & Security', desc: 'Access points, managed cybersec' },
        { title: 'AI tools', desc: 'Pathfinder readiness + seats', branch: true },
        { title: 'Review & quote', desc: 'Timeline, totals, submit' },
      ]}
    />
  );
}

function WfFlowA() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">03 · Flow A</div>
        <h1 className="page-title">Guided linear stepper</h1>
        <p className="page-lede">
          The PRD's baseline — <b>one decision per screen</b>, step sidebar, sticky summary. Predictable, easy to QA, low ambiguity. Best default for SMB owners who want to be led.
        </p>
      </div>

      <FlowIntro
        tag="rec"
        tagLabel="Recommended baseline"
        title="Linear stepper — one thing at a time"
        description="User steps through 7 decisions. A sidebar shows where they are, a summary panel on the right updates in real time. No user is ever confused about what to do next."
        bestFor="SMB owners with little tech literacy. Teams who value clarity over speed."
        tradeoffs="Slower than a configurator for power users. Feels 'long' even though it isn't."
        steps="7 · about 4 minutes end-to-end"
      />

      <div className="sec-label"><h2>Full flow map</h2><span className="tag">7 steps</span></div>
      <FlowAMap />

      <div className="sec-label"><h2>Key screens</h2><span className="tag">branded lofi</span></div>

      <div className="wf-grid" style={{ gridTemplateColumns: '1fr' }}>
        <WireCard
          n="Step 2"
          title="Energy savings"
          subtitle="Address-aware projection"
          full
        >
          <FlowAStep2_Energy />
          <Callout>
            Projection uses <b>business.address</b> → utility rate API. If we can't pull a rate, show a range based on state averages and mark the estimate.
          </Callout>
        </WireCard>

        <WireCard
          n="Step 3"
          title="Internet with smart default"
          subtitle="Recommended tier pre-selected"
          full
        >
          <FlowAStep3_Internet />
          <Callout>
            The recommended tier is driven by employee count: <b>&lt;5 → 500Mbps, 5–25 → 1Gig, 25+ → 2Gig</b>. Show a small "why this pick?" tooltip.
          </Callout>
        </WireCard>

        <WireCard
          n="Step 4"
          title="Phones + contact center"
          subtitle="Nested configuration"
          full
        >
          <FlowAStep5_ContactCenter />
          <Callout>
            This step branches: picking "Just phone lines" hides the agent slider; picking a contact center reveals agent count + add-ons. The summary updates on every toggle.
          </Callout>
        </WireCard>
      </div>
    </div>
  );
}

Object.assign(window, { WfFlowA });
