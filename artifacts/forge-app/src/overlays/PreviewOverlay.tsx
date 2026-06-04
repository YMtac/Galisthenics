import { todayExercises } from '../data/exercises';

interface Props {
  onBack: () => void;
  onStart: () => void;
}

const durations = ['~12\'', '~9\'', '~11\'', '~8\'', '~7\'', '~7\''];

export default function PreviewOverlay({ onBack, onStart }: Props) {
  return (
    <div
      className="fade-up"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--bg)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '52px 24px 20px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'var(--surface)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text)', fontSize: 18,
            flexShrink: 0,
          }}
        >
          ←
        </button>
        <div style={{ flex: 1, padding: '0 14px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
            Push Day A · Week 4
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: '0.04em', lineHeight: 1 }}>
            Chest & Shoulders
          </div>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '4px 8px', borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--accent2)', color: '#fff', flexShrink: 0 }}>
          TODAY
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, margin: '0 24px 24px', flexShrink: 0 }}>
        {[['55', 'Minutes'], ['6', 'Exercises'], ['19', 'Sets']].map(([val, lbl]) => (
          <div key={lbl} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Label */}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '0 24px 10px', flexShrink: 0 }}>
        Exercise Breakdown
      </div>

      {/* Exercise list */}
      <div style={{ padding: '0 24px', flex: 1 }}>
        {todayExercises.map((ex, i) => (
          <div key={ex.name} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 0',
            borderBottom: i < todayExercises.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', minWidth: 22 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface2)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {ex.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{ex.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)' }}>
                {ex.sets} sets × {ex.reps} reps · {ex.weight} · {ex.rest >= 120 ? '2 min' : ex.rest + 's'} rest
              </div>
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: 'var(--accent2)', letterSpacing: '0.04em' }}>
              {durations[i]}
            </span>
          </div>
        ))}
      </div>

      <div style={{ height: 100, flexShrink: 0 }} />

      {/* Start bar */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        padding: '16px 24px 28px',
        flexShrink: 0,
      }}>
        <button
          onClick={onStart}
          style={{
            width: '100%', padding: 18,
            background: 'var(--accent)', color: '#0a0a0a',
            border: 'none', borderRadius: 14,
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: '0.12em',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.02)'; (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(200,241,53,0.25)'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.boxShadow = 'none'; }}
        >
          ▶  Begin Session
        </button>
      </div>
    </div>
  );
}
