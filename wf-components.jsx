/* eslint-disable react/prop-types */
// Shared wireframe primitives — sketchy low-fi building blocks.
// Exports to window so other script files can use them.

const { useState, useMemo } = React;

// ────────── SVG roughness filter (hand-drawn border feel) ──────────
function RoughDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="sketchy-rough" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.2" />
        </filter>
      </defs>
    </svg>
  );
}

// ────────── Browser frame ──────────
function Browser({ url = 'futurebridgesolutions.com', children, height }) {
  return (
    <div className="frame">
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">🔒 {url}</span>
      </div>
      <div style={{ background: 'white', minHeight: height || 520 }}>{children}</div>
    </div>
  );
}

// ────────── Phone frame ──────────
function Phone({ children }) {
  return (
    <div className="phone">
      <div className="screen">
        <div className="phone-bar">
          <span>9:41</span>
          <span>● ● ●</span>
        </div>
        {children}
      </div>
    </div>
  );
}

// ────────── FBS Header (for wireframes of the product) ──────────
function FbsHeader({ compact = false, step, total, cta = true, helpChat = true }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: compact ? '10px 14px' : '14px 22px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        background: 'white',
        gap: 12,
      }}
    >
      <div className="row items-center gap-8">
        <img src="assets/logo.png" alt="FBS" style={{ height: compact ? 20 : 24, width: 'auto' }} />
        {!compact && (
          <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 13, color: 'var(--primary-700)' }}>
            Future Bridge
          </span>
        )}
      </div>
      {step && (
        <div style={{ flex: 1, maxWidth: 320, margin: '0 16px' }}>
          <div className="t-micro" style={{ marginBottom: 4 }}>Step {step} of {total}</div>
          <div className="sk-progress"><i style={{ width: `${(step / total) * 100}%` }} /></div>
        </div>
      )}
      <div className="row items-center gap-8">
        {helpChat && <span className="sk-chip">💬 Help</span>}
        {cta && <span className="sk-btn primary sm">Save &amp; resume</span>}
      </div>
    </div>
  );
}

// ────────── Summary / Cart panel (sticky side) ──────────
function SummaryPanel({ items = [], monthly = 0, oneTime = 0, size = 'md' }) {
  return (
    <div
      style={{
        background: 'white',
        borderLeft: '3px solid var(--primary-600)',
        padding: size === 'sm' ? 14 : 18,
        borderRadius: 8,
        minWidth: size === 'sm' ? 180 : 220,
      }}
    >
      <div className="t-micro" style={{ color: 'var(--primary-600)' }}>Your Build</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, alignItems: 'baseline' }}>
        <span className="t-small">Monthly</span>
        <span className="t-money" style={{ fontSize: size === 'sm' ? 18 : 22 }}>${monthly}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="t-small">One-time</span>
        <span className="t-money" style={{ fontSize: size === 'sm' ? 13 : 15, color: 'var(--ink-2)' }}>${oneTime}</span>
      </div>
      <hr className="hr-dashed" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span style={{ color: 'var(--ink-2)' }}>{it.label}</span>
            <span style={{ color: 'var(--primary-700)', fontWeight: 600 }}>{it.price}</span>
          </div>
        ))}
        {items.length === 0 && (
          <div className="t-small" style={{ fontStyle: 'italic', opacity: 0.6 }}>Add services to see prices</div>
        )}
      </div>
      {size !== 'sm' && (
        <>
          <hr className="hr-dashed" />
          <span className="sk-btn accent sm w-full" style={{ justifyContent: 'center', width: '100%' }}>
            Review &amp; Finalize →
          </span>
        </>
      )}
    </div>
  );
}

// ────────── Step sidebar (for linear stepper) ──────────
function StepSidebar({ current = 0, steps }) {
  return (
    <div style={{ padding: '18px 14px', background: '#fafaf7', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="t-micro" style={{ marginBottom: 12 }}>Your Journey</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 8px', borderRadius: 6,
              background: i === current ? 'var(--primary-50, #EEF2F8)' : 'transparent',
              color: i === current ? 'var(--primary-700)' : i < current ? 'var(--ink-2)' : 'var(--ink-3)',
              fontSize: 12,
              fontWeight: i === current ? 700 : 500,
            }}
          >
            <span
              style={{
                width: 18, height: 18, borderRadius: '50%',
                background: i < current ? 'var(--secondary-400)' : i === current ? 'var(--primary-600)' : 'white',
                color: i < current || i === current ? 'white' : 'var(--ink-3)',
                border: i > current ? '1.5px solid var(--pencil)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {i < current ? '✓' : i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────── Service tile ──────────
function ServiceTile({ icon = '●', title, desc, price, selected = false, variant = 'default', badge }) {
  return (
    <div
      style={{
        border: selected ? '2px solid var(--secondary-400)' : '1.5px solid var(--pencil)',
        borderRadius: 10,
        padding: 14,
        background: selected ? 'var(--secondary-50, #ECF7FC)' : 'white',
        position: 'relative',
        minHeight: 110,
      }}
    >
      {badge && (
        <span
          style={{
            position: 'absolute', top: -8, right: 10,
            background: 'var(--tertiary-500)', color: 'white',
            fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
            fontFamily: 'var(--sans)', letterSpacing: '0.04em',
          }}
        >
          {badge}
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ fontSize: 22 }}>{icon}</div>
        {selected && (
          <span style={{
            width: 18, height: 18, borderRadius: 999,
            background: 'var(--secondary-400)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
          }}>✓</span>
        )}
      </div>
      <div className="h-ui" style={{ fontSize: 14, marginTop: 8 }}>{title}</div>
      {desc && <div className="t-body" style={{ marginTop: 4, fontSize: 11 }}>{desc}</div>}
      {price && (
        <div style={{ marginTop: 10, color: 'var(--primary-700)', fontWeight: 700, fontSize: 13, fontFamily: 'var(--display)' }}>
          {price}
        </div>
      )}
    </div>
  );
}

// ────────── Callout (hand-drawn pointer + text) ──────────
function Callout({ children }) {
  return (
    <div className="callout">
      <span className="arrow">↑</span>
      <span className="txt">{children}</span>
    </div>
  );
}

// ────────── Note (sticky) ──────────
function Note({ children, color = 'yellow', style }) {
  const cls = color === 'yellow' ? 'note' : `note ${color}`;
  return <div className={cls} style={style}>{children}</div>;
}

// ────────── WireCard — wraps a frame with a title + notes column ──────────
function WireCard({ n, title, subtitle, notes, children, full = false }) {
  return (
    <div className="wf-card">
      <div className="wf-card-head">
        <span className="n">{n}</span>
        <span className="t">{title}</span>
        {subtitle && <span className="s">· {subtitle}</span>}
      </div>
      {full ? (
        children
      ) : (
        <div className="wf-note-row">
          <div>{children}</div>
          {notes && <div className="notes-col">{notes}</div>}
        </div>
      )}
    </div>
  );
}

// ────────── Simple flow map (horizontal steps with arrows) ──────────
function FlowMap({ steps }) {
  return (
    <div className="flow-map">
      {steps.map((s, i) => (
        <div key={i} className={`flow-step ${s.branch ? 'bifurcate' : ''}`}>
          <div className="step-n">{String(i + 1).padStart(2, '0')}</div>
          <div className="step-t">{s.title}</div>
          <div className="step-d">{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

// ────────── Intro block for each flow variant ──────────
function FlowIntro({ tag, tagLabel, title, description, bestFor, tradeoffs, steps }) {
  return (
    <div className="intro-block">
      <div>
        <span className={`approach-tag ${tag}`}>{tagLabel}</span>
        <h3 style={{ marginTop: 8 }}>{title}</h3>
        <p className="t-body" style={{ fontSize: 14, color: 'var(--ink-2)' }}>{description}</p>
      </div>
      <div>
        <dl className="meta-grid">
          <dt>Best for</dt><dd>{bestFor}</dd>
          <dt>Trade-offs</dt><dd>{tradeoffs}</dd>
          <dt>Steps</dt><dd>{steps}</dd>
        </dl>
      </div>
    </div>
  );
}

// Expose to global scope so other script files can use them
Object.assign(window, {
  RoughDefs, Browser, Phone, FbsHeader, SummaryPanel, StepSidebar,
  ServiceTile, Callout, Note, WireCard, FlowMap, FlowIntro,
});
