import { plans } from '../data/plans';
import { cardioAbsExercises } from '../data/exercises';

interface Props {
  activePlanId: string | null;
  onGoExplore: () => void;
  onStartSession: () => void;
}

export default function PlanPage({ activePlanId, onGoExplore, onStartSession }: Props) {
  const activePlan = activePlanId ? plans.find((p) => p.id === activePlanId) : null;

  if (!activePlan) {
    return (
      <div className="fade-up" style={{ paddingBottom: 96, minHeight: '100vh' }}>
        <div style={{ padding: '48px 24px 32px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
            Welcome
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: '0.04em', lineHeight: 1 }}>
            Your<br />Plan
          </div>
        </div>

        <div style={{
          margin: '0 24px',
          background: 'var(--surface)',
          border: '1px dashed var(--border)',
          borderRadius: 20,
          padding: '48px 28px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16,
        }}>
          <div style={{ fontSize: 52, marginBottom: 4 }}>🏗️</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1 }}>
            No Active Plan
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 260 }}>
            Pick a training plan to get started. Your daily sessions will appear here once you select one.
          </div>
          <button
            onClick={onGoExplore}
            style={{
              marginTop: 8, padding: '14px 28px',
              background: 'var(--accent)', color: '#0a0a0a',
              border: 'none', borderRadius: 12,
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.1em',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
          >
            Browse Plans →
          </button>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '32px 24px 12px' }}>
          Once You Start
        </div>
        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: '📅', title: 'Daily session view', desc: 'See exactly what to do each day' },
            { icon: '⏱️', title: 'Built-in timer', desc: 'Rest timers and set tracking' },
            { icon: '📈', title: 'Progress tracking', desc: 'Your history, volume, and streaks' },
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

  // Cardio-Abs: full session view
  if (activePlan.id === 'cardio-abs') {
    const totalMin = Math.round(cardioAbsExercises.reduce((a, e) => a + e.sets * (e.work + e.rest), 0) / 60);
    const totalSets = cardioAbsExercises.reduce((a, e) => a + e.sets, 0);

    return (
      <div className="fade-up" style={{ paddingBottom: 96 }}>
        {/* Header */}
        <div style={{ padding: '48px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: '0.08em', color: 'var(--accent)', lineHeight: 1, marginBottom: 6 }}>
              Galisthenics
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: '0.04em', lineHeight: 1 }}>
              Today's<br />Session
            </div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '4px 10px', borderRadius: 6, background: 'rgba(200,241,53,0.12)', color: 'var(--accent)', border: '1px solid rgba(200,241,53,0.25)', letterSpacing: '0.08em' }}>
            ACTIVE
          </div>
        </div>

        {/* Plan badge */}
        <div style={{ margin: '0 24px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 26 }}>{activePlan.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{activePlan.title}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{activePlan.daysPerWeek} days/week · {activePlan.weeks} weeks</div>
          </div>
        </div>

        {/* Session card */}
        <div style={{
          margin: '0 24px',
          background: 'var(--accent)',
          borderRadius: 22,
          padding: '28px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 130, height: 130, borderRadius: '50%',
            background: 'rgba(0,0,0,0.08)',
          }} />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Today · Full Circuit
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: '0.04em', color: '#0a0a0a', lineHeight: 1, marginBottom: 4 }}>
            {activePlan.title}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)', marginBottom: 20 }}>
            {cardioAbsExercises.length} exercises · 30s on / 30s off
          </div>

          <div style={{ display: 'flex', gap: 24, marginBottom: 22 }}>
            {[[`${totalMin}`, 'Min est.'], [String(cardioAbsExercises.length), 'Exercises'], [String(totalSets), 'Total Sets']].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#0a0a0a', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.5)', fontFamily: "'JetBrains Mono', monospace" }}>{lbl}</div>
              </div>
            ))}
          </div>

          <button
            onClick={onStartSession}
            style={{
              width: '100%', padding: '16px 0',
              background: '#0a0a0a', color: 'var(--accent)',
              border: 'none', borderRadius: 14,
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.12em',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#111'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#0a0a0a'; }}
          >
            ▶ START TRAINING
          </button>
        </div>

        {/* Exercise list preview */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '24px 24px 10px' }}>
          Today's Exercises
        </div>
        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {cardioAbsExercises.map((ex, i) => (
            <div key={ex.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 0',
              borderBottom: i < cardioAbsExercises.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', minWidth: 20 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 18, width: 28, flexShrink: 0, textAlign: 'center' }}>{ex.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', flex: 1 }}>{ex.name}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent2)' }}>
                {ex.work}s × {ex.sets}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Other plans selected but no session data yet
  return (
    <div className="fade-up" style={{ paddingBottom: 96, minHeight: '100vh' }}>
      <div style={{ padding: '48px 24px 24px' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: '0.08em', color: 'var(--accent)', lineHeight: 1, marginBottom: 6 }}>
          Galisthenics
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: '0.04em', lineHeight: 1 }}>
          Your<br />Plan
        </div>
      </div>

      <div style={{ margin: '0 24px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 30 }}>{activePlan.emoji}</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{activePlan.title}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{activePlan.sub}</div>
        </div>
      </div>

      <div style={{
        margin: '0 24px',
        background: 'var(--surface)', border: '1px dashed var(--border)',
        borderRadius: 16, padding: '36px 24px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12,
      }}>
        <div style={{ fontSize: 36 }}>🚧</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>Sessions coming soon</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 240 }}>
          Full session data for this plan is on the way. Try Cardio-Abs — it's ready to go now.
        </div>
        <button
          onClick={onGoExplore}
          style={{
            marginTop: 4, padding: '10px 22px',
            background: 'none', color: 'var(--accent)',
            border: '1px solid var(--accent)', borderRadius: 10,
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          Browse Plans
        </button>
      </div>
    </div>
  );
}
