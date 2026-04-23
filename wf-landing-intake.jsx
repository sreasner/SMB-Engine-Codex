/* eslint-disable react/prop-types */
// Landing page variants + Business intake form variants

function LandingA() {
  // Hero-driven marketing — warm, big photo, bold headline
  return (
    <Browser url="futurebridgesolutions.com/build" height={560}>
      <FbsHeader helpChat={true} cta={false} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 36, padding: '40px 40px 24px' }}>
        <div>
          <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>For growing businesses</span>
          <div className="h-ui-xl" style={{ marginTop: 8, fontSize: 34 }}>
            One platform.<br/>Everything your<br/>business runs on.
          </div>
          <div className="t-body" style={{ marginTop: 14, fontSize: 13, maxWidth: 360 }}>
            Internet, phones, Wi-Fi, security, AI tools and energy savings — configured to your team in under 10 minutes. No sales call required.
          </div>
          <div className="row gap-8 mt-24">
            <span className="sk-btn accent lg">Build my solution →</span>
            <span className="sk-btn ghost lg">See a sample quote</span>
          </div>
          <div className="row gap-12 mt-16" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
            <span>✓ No credit card</span>
            <span>✓ Instant pricing</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
        <div className="sk-img" style={{ minHeight: 260, borderRadius: 14 }}>
          <span className="lbl">hero photo · open road / bridge</span>
        </div>
      </div>
      <div style={{ background: 'var(--primary-600)', color: 'white', padding: '22px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {[['⚡', 'Energy savings', '10–30% off'], ['🌐', 'Connectivity', 'Gig & beyond'], ['🛡️', 'Cybersecurity', 'Managed 24/7'], ['🤖', 'AI Pathfinder™', 'Guided rollout']].map(([i, t, s], k) => (
          <div key={k}>
            <div style={{ fontSize: 22 }}>{i}</div>
            <div className="h-ui" style={{ color: 'white', fontSize: 13, marginTop: 6 }}>{t}</div>
            <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>
    </Browser>
  );
}

function LandingB() {
  // Interactive hero — live price simulator on the homepage itself
  return (
    <Browser url="futurebridgesolutions.com/build" height={560}>
      <FbsHeader helpChat={true} cta={false} />
      <div style={{ padding: '36px 40px' }}>
        <div className="h-ui-xl" style={{ textAlign: 'center', fontSize: 32, maxWidth: 680, margin: '0 auto' }}>
          See what your business tech should actually cost.
        </div>
        <div className="t-body" style={{ textAlign: 'center', marginTop: 10, color: 'var(--ink-2)' }}>
          Drag the sliders. We'll price a bundle in real time.
        </div>

        <div style={{ marginTop: 28, background: 'var(--neutral-50)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: 24, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
          <div className="col gap-16">
            <div>
              <div className="row justify-between"><span className="t-small">Employees</span><span className="t-money">12</span></div>
              <div style={{ height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 999, marginTop: 6 }}>
                <div style={{ width: '22%', height: '100%', background: 'var(--secondary-400)', borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div className="row justify-between"><span className="t-small">Phone lines</span><span className="t-money">5</span></div>
              <div style={{ height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 999, marginTop: 6 }}>
                <div style={{ width: '15%', height: '100%', background: 'var(--secondary-400)', borderRadius: 999 }} />
              </div>
            </div>
            <div className="row gap-6" style={{ flexWrap: 'wrap' }}>
              <span className="sk-chip selected">⚡ Energy</span>
              <span className="sk-chip selected">🌐 1 Gig</span>
              <span className="sk-chip">🤖 AI tools</span>
              <span className="sk-chip selected">🛡️ Security</span>
              <span className="sk-chip">☎ Contact center</span>
            </div>
          </div>
          <div style={{ background: 'white', border: '2px solid var(--primary-600)', borderRadius: 12, padding: 18 }}>
            <div className="t-micro" style={{ color: 'var(--primary-600)' }}>Estimated bundle</div>
            <div className="t-money" style={{ fontSize: 36, marginTop: 6 }}>$649<span style={{ fontSize: 14, color: 'var(--ink-3)', fontWeight: 500 }}>/mo</span></div>
            <div className="t-small">+ $2,000 one-time (energy audit)</div>
            <hr className="hr-dashed" />
            <div className="t-small" style={{ color: 'var(--success, #2F8A5C)', fontWeight: 600 }}>
              ≈ $1,140/mo vs 4 vendors today
            </div>
            <span className="sk-btn accent mt-12" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
              Finalize this quote →
            </span>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function LandingC() {
  // Industry-first — pick who you are, see a preset
  return (
    <Browser url="futurebridgesolutions.com/build" height={560}>
      <FbsHeader helpChat={true} cta={false} />
      <div style={{ padding: '40px', background: '#fafaf7' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>Tell us who you are</span>
          <div className="h-ui-xl" style={{ marginTop: 8, fontSize: 30 }}>
            We've built this for businesses like yours.
          </div>
          <div className="t-body" style={{ marginTop: 10 }}>
            Pick your industry. We'll pre-fill a bundle you can tweak in minutes.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 28 }}>
          {[
            ['🏥', 'Healthcare', 'Clinics, dental, therapy'],
            ['🛍️', 'Retail & Restaurant', 'POS, Wi-Fi, phones'],
            ['⚖️', 'Professional Services', 'Law, accounting, agency'],
            ['🏗️', 'Trades & Field', 'Contractors, dispatch'],
            ['🏨', 'Hospitality', 'Hotels, venues'],
            ['🏫', 'Schools & Nonprofits', 'Districts, orgs'],
            ['🏭', 'Light Manufacturing', 'Shops, warehouse'],
            ['✨', 'Something else', 'We\'ll customize'],
          ].map(([i, t, s], k) => (
            <div key={k} style={{
              background: 'white', border: '1.5px solid var(--pencil)', borderRadius: 12,
              padding: 14, minHeight: 110,
            }}>
              <div style={{ fontSize: 24 }}>{i}</div>
              <div className="h-ui" style={{ fontSize: 13, marginTop: 8 }}>{t}</div>
              <div className="t-small" style={{ marginTop: 4 }}>{s}</div>
            </div>
          ))}
        </div>

        <div className="row items-center gap-12" style={{ justifyContent: 'center', marginTop: 22 }}>
          <span className="sk-btn ghost">I'd rather start from scratch</span>
          <span className="sk-btn primary">AI Pathfinder: suggest a bundle →</span>
        </div>
      </div>
    </Browser>
  );
}

function WfLanding() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">01 · Landing</div>
        <h1 className="page-title">How does a visitor start?</h1>
        <p className="page-lede">
          Three doorways into the self-serve flow. Each is a real viable direction — the user picks one (or we A/B). All three end at the same service wizard.
        </p>
      </div>

      <div className="wf-grid cols-3">
        <WireCard
          n="A"
          title="Hero + Big CTA"
          subtitle="Safe / familiar"
          notes={
            <>
              <Note color="yellow"><b>Why:</b> Closest to the existing marketing tone. Zero risk. Big benefit row anchors it to the four pillars.</Note>
              <Note color="blue"><b>Watch:</b> One CTA only. "See a sample quote" is a low-commit escape hatch.</Note>
            </>
          }
        >
          <LandingA />
        </WireCard>

        <WireCard
          n="B"
          title="Live Price Playground"
          subtitle="Bold / novel"
          notes={
            <>
              <Note color="teal"><b>Why:</b> Transparency = trust. SMBs hate "contact us for pricing". Let them move sliders on the homepage.</Note>
              <Note color="red"><b>Watch:</b> Price must be believable. Show disclaimer + link to full wizard for accurate quote.</Note>
            </>
          }
        >
          <LandingB />
        </WireCard>

        <WireCard
          n="C"
          title="Pick Your Industry"
          subtitle="Personalized"
          notes={
            <>
              <Note color="yellow"><b>Why:</b> "This is for businesses like mine" kills decision paralysis. Each industry unlocks a preset bundle.</Note>
              <Note color="blue"><b>Next:</b> Card click → wizard starts on step 2 with ~70% pre-filled.</Note>
            </>
          }
        >
          <LandingC />
        </WireCard>
      </div>

      <div className="sec-label">
        <h2>Landing → Wizard handoff</h2>
        <span className="tag">flow map</span>
      </div>
      <FlowMap
        steps={[
          { title: 'Landing', desc: 'Hero / playground / industry' },
          { title: 'Business basics', desc: 'Name, address, size' },
          { title: 'Service wizard', desc: 'One decision per step' },
          { title: 'Review + quote', desc: 'Timeline, totals, edits' },
          { title: 'Submit', desc: 'Email PDF, schedule call' },
        ]}
      />
    </div>
  );
}

// ────────── Intake form variants ──────────

function IntakeA() {
  // Classic 3-field card
  return (
    <Browser url="futurebridgesolutions.com/build/about-you" height={520}>
      <FbsHeader step={1} total={7} cta={false} />
      <div style={{ padding: 40, maxWidth: 640, margin: '0 auto' }}>
        <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>Step 1 · About you</span>
        <div className="h-ui-lg" style={{ marginTop: 6 }}>Let's start with the basics.</div>
        <div className="t-body" style={{ marginTop: 6 }}>We use this to tailor pricing and delivery timelines. Takes 30 seconds.</div>

        <div className="col gap-16 mt-24">
          <div>
            <div className="t-micro" style={{ marginBottom: 6 }}>Business name</div>
            <div className="sk-input lg">Acme Dental Group</div>
          </div>
          <div>
            <div className="t-micro" style={{ marginBottom: 6 }}>Business address</div>
            <div className="sk-input lg">_______________________________</div>
            <div className="t-small" style={{ marginTop: 4 }}>Google Places autocomplete · used for service availability</div>
          </div>
          <div>
            <div className="t-micro" style={{ marginBottom: 6 }}>Team size · 12 people</div>
            <div style={{ height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 999, marginTop: 6 }}>
              <div style={{ width: '22%', height: '100%', background: 'var(--secondary-400)', borderRadius: 999 }} />
            </div>
            <div className="row justify-between t-small" style={{ marginTop: 4 }}>
              <span>1</span><span>10</span><span>25</span><span>50</span><span>100+</span>
            </div>
          </div>
          <div>
            <div className="t-micro" style={{ marginBottom: 6 }}>Your role</div>
            <div className="row gap-6" style={{ flexWrap: 'wrap' }}>
              <span className="sk-chip selected">Owner</span>
              <span className="sk-chip">Operations</span>
              <span className="sk-chip">IT</span>
              <span className="sk-chip">Finance</span>
              <span className="sk-chip">Other</span>
            </div>
          </div>
        </div>

        <div className="row justify-between mt-24" style={{ marginTop: 28 }}>
          <span className="sk-btn ghost">← Back</span>
          <span className="sk-btn primary lg">Start building →</span>
        </div>
      </div>
    </Browser>
  );
}

function IntakeB() {
  // Conversational / interview style — one question, big
  return (
    <Browser url="futurebridgesolutions.com/build/about-you" height={520}>
      <FbsHeader step={1} total={7} cta={false} />
      <div style={{ padding: 60, maxWidth: 720, margin: '0 auto', textAlign: 'left' }}>
        <div className="t-small" style={{ color: 'var(--ink-3)' }}>Question 1 of 3 · about 30 sec</div>
        <div className="h-ui-xl" style={{ marginTop: 10, fontSize: 30 }}>
          What's your business called?
        </div>
        <div className="t-body" style={{ marginTop: 8, color: 'var(--ink-2)' }}>
          Just the name your customers know. We'll ask for the legal name later if you submit.
        </div>
        <div className="sk-input lg mt-24" style={{ marginTop: 20, height: 56, fontSize: 18, color: 'var(--primary-700)', borderWidth: 2 }}>
          Acme Dental Group |
        </div>
        <div className="row gap-8 mt-16" style={{ marginTop: 16 }}>
          <span className="sk-btn primary lg">Continue →</span>
          <span className="t-small" style={{ marginLeft: 8, marginTop: 10 }}>or press <b>Enter</b></span>
        </div>
      </div>
    </Browser>
  );
}

function WfIntake() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">02 · Business intake</div>
        <h1 className="page-title">Collect just enough to personalize.</h1>
        <p className="page-lede">
          Keep it short: <b>name, address, team size, role</b>. Role drives microcopy (an Owner reads different hints than IT). Address unlocks real pricing (fiber availability, energy-market data).
        </p>
      </div>

      <div className="wf-grid cols-2">
        <WireCard
          n="A"
          title="All fields, one card"
          subtitle="Standard · recommended"
          notes={
            <>
              <Note><b>Pros:</b> Fast. Users see the whole ask up front.</Note>
              <Note color="blue"><b>Address is the unlock.</b> Pre-fills ISP availability + energy rates before the wizard starts.</Note>
            </>
          }
        >
          <IntakeA />
        </WireCard>

        <WireCard
          n="B"
          title="One question at a time"
          subtitle="Warmer · slower"
          notes={
            <>
              <Note color="teal"><b>Pros:</b> Feels like a conversation, low-intimidation.</Note>
              <Note color="red"><b>Cons:</b> 3 screens vs 1. Adds ~20 seconds. Use only if the tone testing prefers it.</Note>
            </>
          }
        >
          <IntakeB />
        </WireCard>
      </div>

      <div className="sec-label">
        <h2>Fields collected</h2>
        <span className="tag">data shape</span>
      </div>
      <div className="intro-block" style={{ gridTemplateColumns: '1fr' }}>
        <div>
          <dl className="meta-grid">
            <dt>business.name</dt><dd>Required · string · shown on the quote</dd>
            <dt>business.address</dt><dd>Required · Google Places · drives availability & energy pricing</dd>
            <dt>business.employees</dt><dd>Required · 1–500 · drives AI seat count + per-head pricing</dd>
            <dt>business.industry</dt><dd>Optional · pre-filled if arrived from Landing C</dd>
            <dt>business.role</dt><dd>Required · enum(Owner, Ops, IT, Finance, Other) · drives microcopy</dd>
            <dt>business.email</dt><dd>Captured at Save &amp; Resume or at the Review step, not now</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WfLanding, WfIntake });
