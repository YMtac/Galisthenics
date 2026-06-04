import { todayExercises } from '../data/exercises';

const today = new Date(2025, 5, 4); // June 4, 2025

const weekDays = [
  { name: 'Mon', num: 2, hasWorkout: true, done: true },
  { name: 'Tue', num: 3, hasWorkout: true, done: true },
  { name: 'Wed', num: 4, hasWorkout: true, today: true },
  { name: 'Thu', num: 5, hasWorkout: true, done: false },
  { name: 'Fri', num: 6, hasWorkout: false, rest: true },
  { name: 'Sat', num: 7, hasWorkout: true, done: false },
  { name: 'Sun', num: 8, hasWorkout: true, done: false },
];

interface Props {
  onStartPreview: () => void;
}

export default function PlanPage({ onStartPreview }: Props) {
  return (
    <div className="fade-up" style={{ paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ padding: '48px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
            Week 4 / Day 3
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: '0.04em', lineHeight: 1 }}>
            Today's<br />Session
          </div>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '4px 8px', borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--accent2)', color: '#fff' }}>
          ACTIVE
        </span>
      </div>

      {/* Plan Banner */}
      <div style={{ margin: '0 24px 20px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 42, height: 42, background: 'var(--surface)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
          🔥
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>PPL Hypertrophy 6-Day</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", marginBottom: 6 }}>Week 4 of 8 · 58% complete</div>
          <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '58%', background: 'var(--accent)', borderRadius: 2 }} />
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <div style={{
        margin: '0 24px 20px',
        background: 'var(--accent)',
        borderRadius: 20,
        padding: '28px 28px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: 'rgba(0,0,0,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 20, width: 120, height: 120, background: 'rgba(0,0,0,0.06)', borderRadius: '50%' }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 6 }}>
          Today · Push Day A
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, letterSpacing: '0.04em', color: '#0a0a0a', lineHeight: 1, marginBottom: 6 }}>
          Chest &<br />Shoulders
        </div>
        <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)', marginBottom: 24 }}>
          6 exercises · Upper Push Focus
        </div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
          {[['55', 'Min est.'], ['6', 'Exercises'], ['19', 'Total Sets']].map(([val, lbl]) => (
            <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#0a0a0a', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>{lbl}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onStartPreview}
          style={{
            width: '100%',
            background: '#0a0a0a',
            color: 'var(--accent)',
            border: 'none',
            borderRadius: 12,
            padding: 16,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative',
            zIndex: 1,
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
        >
          ▶  Start Training
        </button>
      </div>

      {/* Week Strip */}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '20px 24px 10px' }}>
        This Week
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '0 24px 20px', overflowX: 'auto' }}>
        {weekDays.map((d) => (
          <div
            key={d.name}
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '10px 12px',
              borderRadius: 14,
              border: `1px solid ${d.today ? 'var(--accent)' : 'var(--border)'}`,
              background: d.today ? 'var(--accent)' : 'var(--surface)',
              cursor: 'pointer',
              minWidth: 54,
              opacity: d.rest ? 0.5 : 1,
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: d.today ? '#0a0a0a' : 'var(--muted)' }}>
              {d.name}
            </span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: d.today ? '#0a0a0a' : 'var(--text)', lineHeight: 1 }}>
              {d.num}
            </span>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: d.today ? '#0a0a0a' : d.hasWorkout ? 'var(--accent2)' : 'var(--muted2)',
            }} />
          </div>
        ))}
      </div>

      {/* Exercise List */}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '4px 24px 10px' }}>
        Today's Exercises
      </div>
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {todayExercises.map((ex, i) => (
          <div
            key={ex.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '14px 16px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).closest('[data-ex]')?.setAttribute('style', 'border-color: var(--muted2)'); }}
          >
            {i < 3 && (
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--accent2)', borderRadius: '3px 0 0 3px' }} />
            )}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', minWidth: 20 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{ex.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace" }}>{ex.sets}×{ex.reps} · {ex.weight} · {ex.rest >= 120 ? '2 min' : ex.rest + 's'} rest</div>
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: 'var(--accent2)', letterSpacing: '0.04em' }}>
              {ex.sets}×{ex.reps}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
