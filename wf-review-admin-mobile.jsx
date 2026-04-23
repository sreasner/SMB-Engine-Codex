/* eslint-disable react/prop-types */
// Review/quote, confirm, admin inbox, mobile screens

function ReviewScreen() {
  return (
    <Browser url="futurebridgesolutions.com/build/review" height={680}>
      <FbsHeader step={7} total={7} cta={true} />
      <div style={{ padding: '28px 40px' }}>
        <div className="row justify-between" style={{ alignItems: 'flex-end' }}>
          <div>
            <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>Last step</span>
            <div className="h-ui-xl" style={{ fontSize: 28, marginTop: 4 }}>Review your quote</div>
            <div className="t-body" style={{ marginTop: 6 }}>Acme Dental Group · 12 people · Atlanta, GA</div>
          </div>
          <div className="row gap-8">
            <span className="sk-btn sm">📧 Email me this quote</span>
            <span className="sk-btn sm">📄 Download PDF</span>
            <span className="sk-btn sm">🔗 Share with colleague</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginTop: 24 }}>
          <div>
            {/* Line items — grouped, with edit */}
            <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: 20 }}>
              <div className="h-ui" style={{ fontSize: 14, color: 'var(--primary-700)' }}>Your bundle</div>
              <div className="col gap-8 mt-12" style={{ marginTop: 12 }}>
                {[
                  ['⚡', 'Energy audit & supplier switch', '$2,000 one-time', 'Projected $168/mo savings'],
                  ['🌐', '1 Gig fiber + LTE failover', '$174 /mo', 'Install 5–9 business days'],
                  ['☎', '5 phone lines + 3 contact-center agents', '$235 /mo', 'Includes call routing + voicemail'],
                  ['📶', 'Wi-Fi: 3 access points + guest network', '$45 /mo', 'Self-install kit or pro install +$150'],
                  ['🛡', 'Managed cybersecurity — HIPAA pack', '$180 /mo', '24/7 monitoring + quarterly audits'],
                  ['🤖', 'AI Pathfinder™ · 12 seats', '$180 /mo', 'Readiness eval + monthly coaching'],
                ].map(([i, t, p, sub], k) => (
                  <div key={k} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 14, alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: 20 }}>{i}</div>
                    <div>
                      <div className="h-ui" style={{ fontSize: 13 }}>{t}</div>
                      <div className="t-small">{sub}</div>
                    </div>
                    <div className="t-money" style={{ fontSize: 14 }}>{p}</div>
                    <span className="sk-btn sm ghost">Edit</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings band */}
            <div style={{ background: 'var(--success-bg, #E6F4EC)', border: '1px solid var(--success, #2F8A5C)', borderRadius: 12, padding: 16, marginTop: 16 }}>
              <div className="row justify-between">
                <div>
                  <div className="t-micro" style={{ color: 'var(--success, #2F8A5C)' }}>💰 Savings vs your current vendors</div>
                  <div className="t-small" style={{ marginTop: 4 }}>You told us you pay ~$1,774/mo today across 4 providers.</div>
                </div>
                <div className="t-money" style={{ color: 'var(--success, #2F8A5C)', fontSize: 22 }}>−$1,140/mo</div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: 20, marginTop: 16 }}>
              <div className="h-ui" style={{ fontSize: 14, color: 'var(--primary-700)' }}>What happens after you submit</div>
              <div style={{ display: 'flex', marginTop: 14, gap: 0, position: 'relative' }}>
                {[
                  ['Day 0', 'Submit', 'We confirm via email + Slack/SMS'],
                  ['Day 1–2', 'Pre-flight call', '15 min with your success manager'],
                  ['Day 3–5', 'Fiber + phones install', 'Self-scheduled window'],
                  ['Day 7', 'Energy audit', 'Remote — we pull your bill'],
                  ['Day 10', 'Security & AI onboarding', 'Kickoff workshop'],
                  ['Day 30', 'First savings report', 'Monthly afterward'],
                ].map(([d, t, s], k, a) => (
                  <div key={k} style={{ flex: 1, textAlign: 'center', position: 'relative', paddingTop: 28 }}>
                    <div style={{ position: 'absolute', top: 10, left: '50%', width: 12, height: 12, borderRadius: 999, background: k === 0 ? 'var(--tertiary-500)' : 'var(--secondary-400)', transform: 'translateX(-50%)', zIndex: 2 }} />
                    {k < a.length - 1 && (
                      <div style={{ position: 'absolute', top: 15, left: '50%', right: '-50%', height: 2, background: 'var(--secondary-200)', zIndex: 1 }} />
                    )}
                    <div className="t-micro" style={{ color: 'var(--tertiary-500)', fontSize: 10 }}>{d}</div>
                    <div className="h-ui" style={{ fontSize: 12, marginTop: 2 }}>{t}</div>
                    <div className="t-small" style={{ fontSize: 10, marginTop: 2 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right rail — totals + submit */}
          <div>
            <div style={{ background: 'var(--primary-600)', color: 'white', borderRadius: 12, padding: 22, position: 'sticky', top: 16 }}>
              <div className="t-micro" style={{ color: 'rgba(255,255,255,0.75)' }}>Your total</div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 44, letterSpacing: '-0.02em', lineHeight: 1, marginTop: 6 }}>
                $814<span style={{ fontSize: 16, opacity: 0.8, fontWeight: 500 }}>/mo</span>
              </div>
              <div className="t-small" style={{ color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>+ $2,000 one-time (energy audit)</div>
              <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.2)', margin: '16px 0' }} />

              <div className="t-small" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>Email quote to</div>
              <div style={{ background: 'white', color: 'var(--ink)', borderRadius: 6, padding: '10px 12px', fontSize: 13 }}>you@acmedental.com</div>

              <span className="sk-btn accent lg" style={{ width: '100%', justifyContent: 'center', marginTop: 14, padding: '14px' }}>
                Submit order →
              </span>
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <span className="t-small" style={{ color: 'rgba(255,255,255,0.7)' }}>or</span>
              </div>
              <span className="sk-btn ghost" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', width: '100%', justifyContent: 'center', marginTop: 8 }}>
                📅 Schedule a 15-min call first
              </span>

              <div style={{ marginTop: 14, fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                By submitting, you confirm this quote for 14 days. No charges until contracts are signed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function ConfirmScreen() {
  return (
    <Browser url="futurebridgesolutions.com/build/confirmed" height={520}>
      <FbsHeader cta={false} helpChat={true} />
      <div style={{ padding: '48px 40px', textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 56 }}>🎉</div>
        <div className="h-ui-xl" style={{ fontSize: 30, marginTop: 10 }}>You're on your way.</div>
        <div className="t-body" style={{ marginTop: 8 }}>
          Quote #FBS-2417 sent to <b>you@acmedental.com</b>. Your success manager, Priya, will reach out within one business day.
        </div>
        <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: 18, marginTop: 24, textAlign: 'left' }}>
          <div className="t-micro" style={{ color: 'var(--primary-600)' }}>While you wait…</div>
          <div className="col gap-10 mt-8" style={{ marginTop: 10 }}>
            {[
              ['📅', 'Book your pre-flight call', 'Pick a 15-min slot on Priya\'s calendar'],
              ['📄', 'Download your signed quote PDF', 'Share with your team for internal approval'],
              ['📲', 'Get SMS updates', 'We\'ll text when each service goes live'],
            ].map(([i, t, s], k) => (
              <div key={k} className="row gap-12 items-center">
                <div style={{ fontSize: 18 }}>{i}</div>
                <div>
                  <div className="h-ui" style={{ fontSize: 13 }}>{t}</div>
                  <div className="t-small">{s}</div>
                </div>
                <span className="sk-btn sm" style={{ marginLeft: 'auto' }}>Do it</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

function WfReview() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">06 · Review, submit, confirm</div>
        <h1 className="page-title">Close the deal.</h1>
        <p className="page-lede">
          All three flows converge here. Show a transparent bundle breakdown, the savings story, a realistic timeline, and make submitting low-friction. Include a <b>Schedule a call</b> escape for anyone still unsure.
        </p>
      </div>

      <div className="sec-label"><h2>Review & quote</h2><span className="tag">the big one</span></div>
      <ReviewScreen />

      <div className="wf-note-row mt-16" style={{ marginTop: 20 }}>
        <div />
        <div className="notes-col">
          <Note color="yellow"><b>Timeline visualization</b> is a huge trust moment. Shows FBS is prepared, not just a form.</Note>
          <Note color="blue"><b>Three exits:</b> Submit, Schedule a call, Email quote. Never dead-end.</Note>
          <Note color="red"><b>Edit-in-place</b> on every line item. User shouldn't have to go back through steps to change one number.</Note>
        </div>
      </div>

      <div className="sec-label"><h2>Confirmation</h2><span className="tag">post-submit</span></div>
      <ConfirmScreen />
    </div>
  );
}

// ────────── ADMIN INBOX ──────────
function AdminInbox() {
  return (
    <Browser url="fbs.internal/orders" height={620}>
      <div style={{ background: 'var(--primary-800)', color: 'white', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src="assets/logo.png" style={{ height: 20, filter: 'brightness(0) invert(1)' }} />
        <span className="h-ui" style={{ color: 'white', fontSize: 13 }}>FBS Admin</span>
        <span className="sk-chip" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Orders</span>
        <span className="sk-chip" style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>Quotes</span>
        <span className="sk-chip" style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>Customers</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.7 }}>Priya M · CSM</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 560 }}>
        {/* Left: order list */}
        <div style={{ background: '#fafaf7', borderRight: '1px solid rgba(0,0,0,0.06)', padding: 12 }}>
          <div className="row gap-6 mb-8">
            <span className="sk-chip primary">All (24)</span>
            <span className="sk-chip">Submitted (12)</span>
            <span className="sk-chip">Draft (8)</span>
          </div>
          <div className="sk-input sm" style={{ marginTop: 10, marginBottom: 10, height: 30, fontSize: 11 }}>🔎 Search by name, ID…</div>
          <div className="col gap-6">
            {[
              { n: 'Acme Dental Group', id: 'FBS-2417', amt: '$814/mo', s: 'new', when: '12 min ago' },
              { n: 'Bluebird Coffee', id: 'FBS-2416', amt: '$422/mo', s: 'new', when: '1 hr ago' },
              { n: 'Stanton & Moore Law', id: 'FBS-2415', amt: '$1,209/mo', s: 'scheduled', when: 'today' },
              { n: 'Gable Kitchens', id: 'FBS-2414', amt: '$287/mo', s: 'draft', when: 'yesterday' },
              { n: 'Riverline Clinic', id: 'FBS-2413', amt: '$950/mo', s: 'won', when: '2 days ago' },
            ].map((r, k) => (
              <div key={k} style={{
                background: k === 0 ? 'white' : 'transparent',
                border: k === 0 ? '1.5px solid var(--primary-600)' : '1px solid transparent',
                borderRadius: 8, padding: '10px 12px',
              }}>
                <div className="row justify-between">
                  <div className="h-ui" style={{ fontSize: 13 }}>{r.n}</div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 999,
                    background: r.s === 'new' ? 'var(--tertiary-50, #FCEEED)' : r.s === 'scheduled' ? 'var(--secondary-50, #ECF7FC)' : r.s === 'won' ? 'var(--success-bg, #E6F4EC)' : '#eee',
                    color: r.s === 'new' ? 'var(--tertiary-600)' : r.s === 'scheduled' ? 'var(--secondary-600)' : r.s === 'won' ? 'var(--success, #2F8A5C)' : 'var(--ink-3)',
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>{r.s}</span>
                </div>
                <div className="row justify-between t-small" style={{ marginTop: 2 }}>
                  <span>{r.id} · {r.amt}</span>
                  <span>{r.when}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: order detail */}
        <div style={{ padding: 22 }}>
          <div className="row justify-between items-center">
            <div>
              <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>FBS-2417 · submitted 12 min ago</span>
              <div className="h-ui-xl" style={{ fontSize: 22, marginTop: 2 }}>Acme Dental Group</div>
              <div className="t-small">12 people · Atlanta, GA · Healthcare · Built via AI Pathfinder</div>
            </div>
            <div className="row gap-6">
              <span className="sk-btn sm">📧 Email customer</span>
              <span className="sk-btn primary sm">Mark as contacted</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 16 }}>
            {[
              ['Monthly', '$814'],
              ['One-time', '$2,000'],
              ['ARR est.', '$11,768'],
              ['Savings claim', '$1,140/mo'],
            ].map(([l, v], k) => (
              <div key={k} style={{ background: '#fafaf7', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8, padding: 10 }}>
                <div className="t-micro">{l}</div>
                <div className="t-money" style={{ fontSize: 18, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>

          <div className="sec-label" style={{ margin: '22px 0 10px' }}><h2 style={{ fontSize: 14 }}>Line items</h2></div>
          <div className="col gap-6">
            {['⚡ Energy audit · $2,000', '🌐 1 Gig + LTE · $174/mo', '☎ 5 lines + 3 agents · $235/mo', '📶 Wi-Fi × 3 APs · $45/mo', '🛡 Managed security (HIPAA) · $180/mo', '🤖 AI Pathfinder × 12 · $180/mo'].map((x, k) => (
              <div key={k} className="sk-box" style={{ fontSize: 12 }}>{x}</div>
            ))}
          </div>

          <div className="sec-label" style={{ margin: '22px 0 10px' }}><h2 style={{ fontSize: 14 }}>Activity</h2></div>
          <div className="col gap-6 t-small">
            <div>12:41 — Quote submitted</div>
            <div>12:40 — Quote PDF emailed to you@acmedental.com</div>
            <div>12:28 — Started via AI Pathfinder (Healthcare · 12 people · "Too many vendors")</div>
            <div>12:26 — Landed from /ads/google/dental-tech</div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function WfAdmin() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">07 · Admin</div>
        <h1 className="page-title">What FBS sees when an order comes in.</h1>
        <p className="page-lede">
          Minimal internal dashboard — the point is to <b>act fast</b>, not to be a full CRM. Inbox on the left, order detail on the right, one "Mark as contacted" button.
        </p>
      </div>
      <AdminInbox />
      <div className="wf-note-row mt-16" style={{ marginTop: 20 }}>
        <div />
        <div className="notes-col">
          <Note color="yellow"><b>Scope:</b> v1 is just an inbox. No pipeline, no forecasting. Add later.</Note>
          <Note color="blue"><b>Activity log</b> captures source + wizard path — gold for understanding what's converting.</Note>
        </div>
      </div>
    </div>
  );
}

// ────────── MOBILE ──────────
function WfMobile() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">08 · Mobile</div>
        <h1 className="page-title">Mobile is a first-class citizen.</h1>
        <p className="page-lede">
          A plurality of SMB owners will start on a phone. Same flow, collapsed layout, <b>summary is a bottom drawer</b> (pull up or tap a pill). Everything remains thumb-reachable.
        </p>
      </div>

      <div className="wf-grid cols-3">
        <WireCard n="M1" title="Landing (mobile)" subtitle="Hero + CTA" notes={<Note>Sticky "Build my solution" at bottom, never scrolls out of reach.</Note>}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Phone>
              <div style={{ padding: 16 }}>
                <img src="assets/logo.png" style={{ height: 20 }} />
                <div className="h-ui-lg" style={{ fontSize: 20, marginTop: 18 }}>Everything your business runs on.</div>
                <div className="t-body" style={{ fontSize: 12, marginTop: 8 }}>Internet, phones, AI, security. Priced in 10 minutes.</div>
                <div className="sk-img" style={{ minHeight: 120, marginTop: 14 }}><span className="lbl">hero photo</span></div>
                <div className="col gap-6 mt-16" style={{ marginTop: 16 }}>
                  <span className="sk-btn accent lg" style={{ width: '100%', justifyContent: 'center' }}>Build my solution →</span>
                  <span className="sk-btn ghost" style={{ width: '100%', justifyContent: 'center' }}>See a sample quote</span>
                </div>
                <div className="col gap-8 mt-16" style={{ marginTop: 18 }}>
                  {['⚡ Energy savings', '🌐 Connectivity', '🛡 Security', '🤖 AI Pathfinder'].map((x, k) => (
                    <div key={k} className="row items-center gap-8 t-body" style={{ fontSize: 12 }}>{x}</div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'sticky', bottom: 0, background: 'white', borderTop: '1px solid rgba(0,0,0,0.08)', padding: 10, display: 'flex', gap: 6 }}>
                <span className="sk-btn accent" style={{ flex: 1, justifyContent: 'center' }}>Build my solution →</span>
              </div>
            </Phone>
          </div>
        </WireCard>

        <WireCard n="M2" title="Wizard step (internet)" subtitle="One decision, drawer" notes={<Note color="blue">Price pill at bottom pulls up the full cart drawer.</Note>}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Phone>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="row justify-between items-center">
                  <span className="t-small">← Back</span>
                  <span className="t-micro">Step 3 of 7</span>
                  <span className="t-small">💬</span>
                </div>
                <div className="sk-progress" style={{ marginTop: 6 }}><i style={{ width: '43%' }} /></div>
              </div>
              <div style={{ padding: 14 }}>
                <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>🌐 Internet</span>
                <div className="h-ui-lg" style={{ fontSize: 19, marginTop: 4 }}>How much do you need?</div>
                <div className="t-body" style={{ fontSize: 11, marginTop: 6 }}>We suggest 1 Gig for 12 people.</div>
                <div className="col gap-8 mt-12" style={{ marginTop: 12 }}>
                  <ServiceTile icon="🚀" title="500 Mbps" desc="Solo + small team" price="$99/mo" />
                  <ServiceTile icon="⚡" title="1 Gig" desc="Recommended" price="$149/mo" selected badge="REC" />
                  <ServiceTile icon="🔥" title="2 Gig" desc="Heavy video" price="$229/mo" />
                </div>
                <div className="row gap-8 items-center mt-16" style={{ marginTop: 14 }}>
                  <span className="sk-toggle on" />
                  <span className="t-body" style={{ fontSize: 11 }}>4G failover +$25</span>
                </div>
              </div>
              {/* Bottom cart drawer handle */}
              <div style={{ position: 'sticky', bottom: 0, background: 'var(--primary-600)', color: 'white', padding: 12 }}>
                <div className="row justify-between items-center">
                  <div>
                    <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Your build</div>
                    <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 18 }}>$354/mo ▲</div>
                  </div>
                  <span className="sk-btn accent sm">Next →</span>
                </div>
              </div>
            </Phone>
          </div>
        </WireCard>

        <WireCard n="M3" title="Review (mobile)" subtitle="Stacked, not side-by-side" notes={<Note color="teal">Total at top, line items below, CTA sticky at bottom.</Note>}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Phone>
              <div style={{ padding: 14 }}>
                <span className="t-micro" style={{ color: 'var(--tertiary-500)' }}>Review</span>
                <div className="h-ui-lg" style={{ fontSize: 19, marginTop: 4 }}>Your quote</div>
                <div style={{ background: 'var(--primary-600)', color: 'white', borderRadius: 10, padding: 14, marginTop: 12 }}>
                  <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Monthly</div>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 32 }}>$814/mo</div>
                  <div style={{ fontSize: 10, opacity: 0.8 }}>+ $2,000 one-time</div>
                </div>
                <div className="col gap-6 mt-12" style={{ marginTop: 12 }}>
                  {['⚡ Energy · $2,000', '🌐 Internet · $174/mo', '☎ Phones+CC · $235/mo', '📶 Wi-Fi · $45/mo', '🛡 Security · $180/mo', '🤖 AI × 12 · $180/mo'].map((x, k) => (
                    <div key={k} className="row justify-between t-body" style={{ fontSize: 11, padding: '6px 0', borderBottom: '1px dashed rgba(0,0,0,0.08)' }}>
                      <span>{x.split(' · ')[0]}</span>
                      <span className="t-money" style={{ fontSize: 12 }}>{x.split(' · ')[1]}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--success-bg, #E6F4EC)', border: '1px solid var(--success, #2F8A5C)', borderRadius: 8, padding: 10, marginTop: 10, fontSize: 11, color: 'var(--success, #2F8A5C)', fontWeight: 600 }}>
                  Saving $1,140/mo vs 4 vendors
                </div>
              </div>
              <div style={{ position: 'sticky', bottom: 0, background: 'white', borderTop: '1px solid rgba(0,0,0,0.08)', padding: 10 }}>
                <span className="sk-btn accent" style={{ width: '100%', justifyContent: 'center' }}>Submit →</span>
                <div className="text-center mt-4"><span className="t-small">or 📅 schedule a call</span></div>
              </div>
            </Phone>
          </div>
        </WireCard>
      </div>
    </div>
  );
}

Object.assign(window, { WfReview, WfAdmin, WfMobile });
