interface Props {
  onGoExplore: () => void;
}

export default function PlanPage({ onGoExplore }: Props) {
  return (
    <div className="fade-up" style={{ paddingBottom: 96, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '48px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
            Welcome
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: '0.04em', lineHeight: 1 }}>
            Your<br />Plan
          </div>
        </div>
      </div>

      {/* Empty state */}
      <div style={{
        margin: '0 24px',
        background: 'var(--surface)',
        border: '1px dashed var(--border)',
        borderRadius: 20,
        padding: '48px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 16,
      }}>
        <div style={{ fontSize: 52, marginBottom: 4 }}>🏗️</div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 26,
          letterSpacing: '0.04em',
          color: 'var(--text)',
          lineHeight: 1,
        }}>
          No Active Plan
        </div>
        <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 260 }}>
          Pick a training plan to get started. Your daily sessions will appear here once you select one.
        </div>
        <button
          onClick={onGoExplore}
          style={{
            marginTop: 8,
            padding: '14px 28px',
            background: 'var(--accent)',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: 12,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 16,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.03)'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
        >
          Browse Plans →
        </button>
      </div>

      {/* What to expect section */}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '32px 24px 12px' }}>
        Once You Start
      </div>
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { icon: '📅', title: "Daily session view", desc: "See exactly what to lift each day" },
          { icon: '⏱️', title: "Built-in timer", desc: "Rest timers and set tracking" },
          { icon: '📈', title: "Progress tracking", desc: "Your history, volume, and streaks" },
        ].map((item) => (
          <div key={item.title} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '14px 16px',
          }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
