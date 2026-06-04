interface Props {
  planTitle: string;
  exerciseCount: number;
  totalSets: number;
  totalMinutes: number;
  onBack: () => void;
}

export default function CompleteOverlay({ planTitle, exerciseCount, totalSets, totalMinutes, onBack }: Props) {
  return (
    <div
      className="fade-up"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '40px 32px',
        overflow: 'hidden',
      }}
    >
      {/* Ring */}
      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        background: 'conic-gradient(var(--accent) 0% 100%, transparent 0%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28, position: 'relative',
        animation: 'ringPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
        boxShadow: '0 0 60px rgba(200,241,53,0.2)',
      }}>
        <div style={{ position: 'absolute', inset: 6, background: 'var(--bg)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1, fontSize: 48, animation: 'ringPop 0.7s 0.1s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          🏆
        </div>
      </div>

      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: '0.06em',
        color: 'var(--accent)', lineHeight: 1, marginBottom: 8,
        animation: 'fadeUp 0.5s 0.2s both',
      }}>
        Session<br />Complete!
      </div>
      <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 36, animation: 'fadeUp 0.5s 0.3s both' }}>
        {planTitle}<br />
        Great work — you crushed it! 🔥
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        width: '100%', marginBottom: 36, maxWidth: 380,
        animation: 'fadeUp 0.5s 0.35s both',
      }}>
        {[[String(totalMinutes), 'Minutes'], [String(totalSets), 'Sets Done'], [String(exerciseCount), 'Exercises']].map(([val, lbl]) => (
          <div key={lbl} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', marginTop: 3, letterSpacing: '0.06em' }}>{lbl}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        style={{
          width: '100%', maxWidth: 380, padding: 18,
          background: 'var(--accent)', color: '#0a0a0a',
          border: 'none', borderRadius: 14,
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: '0.1em',
          cursor: 'pointer', transition: 'all 0.2s',
          animation: 'fadeUp 0.5s 0.45s both',
        }}
        onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.02)'; (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(200,241,53,0.25)'; }}
        onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.boxShadow = 'none'; }}
      >
        ← Back to Plan
      </button>

      <style>{`
        @keyframes ringPop {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
