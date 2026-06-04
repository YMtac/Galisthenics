import { useState, useEffect, useRef } from 'react';
import { todayExercises } from '../data/exercises';

interface Props {
  onClose: () => void;
  onComplete: () => void;
}

export default function TrainingOverlay({ onClose, onComplete }: Props) {
  const [exIdx, setExIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [isRest, setIsRest] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [timerVal, setTimerVal] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ex = todayExercises[exIdx];
  const timerMax = isRest ? ex.rest : ex.work;

  useEffect(() => {
    setTimerVal(0);
    setIsRunning(true);
  }, [exIdx, setIdx, isRest]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerVal((v) => {
          if (v >= timerMax) {
            clearInterval(intervalRef.current!);
            return timerMax;
          }
          return v + 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timerMax]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const adjustTime = (delta: number) => {
    setTimerVal((v) => Math.max(0, Math.min(timerMax, v + delta)));
  };

  const nextSet = () => {
    if (isRest) {
      // After rest, move to next set or next exercise
      if (setIdx + 1 >= ex.sets) {
        if (exIdx + 1 >= todayExercises.length) {
          onComplete();
          return;
        }
        setExIdx((i) => i + 1);
        setSetIdx(0);
      } else {
        setSetIdx((s) => s + 1);
      }
      setIsRest(false);
    } else {
      // Done with work set, start rest
      setIsRest(true);
    }
  };

  const progress = timerMax > 0 ? (timerVal / timerMax) * 100 : 0;

  const totalSets = todayExercises.reduce((a, e) => a + e.sets, 0);
  const doneSets = todayExercises.slice(0, exIdx).reduce((a, e) => a + e.sets, 0) + setIdx;
  const globalStep = exIdx + 1;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Video zone */}
      <div style={{ flexShrink: 0, position: 'relative', background: '#0d0d0d', overflow: 'hidden' }}>
        <div style={{
          width: '100%',
          aspectRatio: '16/10',
          background: 'linear-gradient(135deg, #0d1a0d 0%, #1a1a0d 40%, #1a0d0d 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          maxHeight: '40vh',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 72, animation: isRest ? 'none' : 'breathe 2.5s ease-in-out infinite', filter: 'drop-shadow(0 0 30px rgba(200,241,53,0.3))' }}>
              {isRest ? '⏳' : ex.icon}
            </div>
          </div>

          {/* Top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '48px 20px 16px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
          }}>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(255,255,255,0.1)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', fontSize: 16,
                backdropFilter: 'blur(8px)',
              }}
            >
              ✕
            </button>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em',
              background: 'rgba(0,0,0,0.4)', padding: '5px 10px', borderRadius: 6,
              backdropFilter: 'blur(8px)',
            }}>
              {globalStep} / {todayExercises.length}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              background: 'var(--accent2)', color: '#fff',
              padding: '5px 10px', borderRadius: 6, letterSpacing: '0.06em',
            }}>
              SET {setIdx + 1}/{ex.sets}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: 'var(--bg)', borderRadius: '20px 20px 0 0',
        marginTop: -18, position: 'relative', zIndex: 2,
        overflow: 'hidden', minHeight: 0,
      }}>
        <div style={{ flex: 1, padding: '24px 24px 0', overflowY: 'auto', minHeight: 0 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: '0.04em', lineHeight: 1, color: 'var(--text)', marginBottom: 4 }}>
            {isRest ? 'Rest' : ex.name}
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18 }}>
            {isRest ? `${ex.rest}s rest · next: ${setIdx + 1 < ex.sets ? `Set ${setIdx + 2}` : 'Next exercise'}` : ex.sub}
          </div>

          {/* Set dots */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'center' }}>
            {Array.from({ length: ex.sets }).map((_, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%',
                border: `2px solid ${i < setIdx ? 'var(--accent2)' : i === setIdx ? 'var(--accent)' : 'var(--border)'}`,
                background: i < setIdx ? 'var(--accent2)' : i === setIdx ? 'var(--surface)' : 'var(--surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: i < setIdx ? '#fff' : i === setIdx ? 'var(--accent)' : 'var(--muted)',
                boxShadow: i === setIdx ? '0 0 10px rgba(200,241,53,0.3)' : 'none',
                transition: 'all 0.3s',
              }}>
                {i < setIdx ? '✓' : i + 1}
              </div>
            ))}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', marginLeft: 4, letterSpacing: '0.06em' }}>
              SETS
            </span>
          </div>

          {/* Coaching cues */}
          {!isRest && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              {ex.cues.map((cue, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '10px 12px',
                }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{cue.slice(0, 2)}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{cue.slice(2).trim()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timer controls */}
        <div style={{
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px 28px',
          flexShrink: 0,
        }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: '0.04em',
                color: isRest ? 'var(--blue)' : 'var(--text)', lineHeight: 1,
              }}>
                {formatTime(timerVal)}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {isRest ? 'RESTING' : 'WORKING'}
              </div>
            </div>
            <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${progress}%`,
                background: isRest
                  ? 'linear-gradient(90deg, var(--blue), #88aaff)'
                  : 'linear-gradient(90deg, var(--accent2), var(--accent))',
                transition: 'width 0.1s linear',
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => adjustTime(-10)} style={{
              height: 46, borderRadius: 12, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.04em',
              cursor: 'pointer', padding: '0 14px', flexShrink: 0,
            }}>−10</button>

            <button
              onClick={() => setIsRunning((r) => !r)}
              style={{
                flex: 1, height: 46, borderRadius: 12,
                background: 'var(--accent)', border: '1px solid var(--accent)', color: '#0a0a0a',
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.1em',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {isRunning ? '⏸ Pause' : '▶ Resume'}
            </button>

            <button onClick={() => adjustTime(10)} style={{
              height: 46, borderRadius: 12, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.04em',
              cursor: 'pointer', padding: '0 14px', flexShrink: 0,
            }}>+10</button>

            <button
              onClick={nextSet}
              style={{
                flex: 1, height: 46, borderRadius: 12,
                background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)',
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.1em',
                cursor: 'pointer',
              }}
            >
              {isRest ? 'Next ›' : 'Done ›'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
