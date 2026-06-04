import { useState, useEffect, useRef } from 'react';
import type { Exercise } from '../data/exercises';

const TOTAL_ROUNDS = 2;

interface Props {
  exercises: Exercise[];
  planTitle: string;
  onClose: () => void;
  onComplete: () => void;
}

export default function TrainingOverlay({ exercises, planTitle, onClose, onComplete }: Props) {
  const [round, setRound] = useState(0);
  const [exIdx, setExIdx] = useState(0);
  const [isRest, setIsRest] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [timerVal, setTimerVal] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Ref always points to latest advancePhase — avoids stale-closure in setTimeout
  const advancePhaseRef = useRef<() => void>(() => {});

  // Double-beep via Web Audio API — no extra files needed
  const playBeep = () => {
    try {
      const ctx = new AudioContext();
      [0, 0.22].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.18);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.18);
      });
      setTimeout(() => ctx.close(), 1200);
    } catch {}
  };

  // Fire beep + auto-advance when countdown ends
  useEffect(() => {
    if (timerVal === timerMax && timerMax > 0) {
      playBeep();
      const t = setTimeout(() => advancePhaseRef.current(), 700);
      return () => clearTimeout(t);
    }
  }, [timerVal]);

  const ex = exercises[exIdx];
  const timerMax = isRest ? ex.rest : ex.work;

  // Reset timer on each phase change
  useEffect(() => {
    setTimerVal(0);
    setIsRunning(true);
  }, [round, exIdx, isRest]);

  // Countdown
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerVal((v) => {
          if (v >= timerMax) { clearInterval(intervalRef.current!); return timerMax; }
          return v + 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timerMax]);

  // Video: reload when exercise changes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !ex.video) return;
    vid.load();
    if (!isRest) vid.play().catch(() => {});
  }, [exIdx, round]);

  // Video: pause/play on rest toggle
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !ex.video) return;
    if (isRest) vid.pause();
    else vid.play().catch(() => {});
  }, [isRest]);

  // Video: sync with pause/resume
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !ex.video) return;
    if (!isRunning) vid.pause();
    else if (!isRest) vid.play().catch(() => {});
  }, [isRunning]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const adjustTime = (d: number) => setTimerVal((v) => Math.max(0, Math.min(timerMax, v + d)));
  const progress = timerMax > 0 ? (timerVal / timerMax) * 100 : 0;

  // What's next label
  const nextLabel = () => {
    if (!isRest) {
      const nextEx = exIdx + 1 < exercises.length ? exercises[exIdx + 1].name : null;
      return nextEx ? `next: Rest → ${nextEx}` : 'next: Rest — last exercise!';
    }
    const nextEx = exIdx + 1 < exercises.length ? exercises[exIdx + 1].name : null;
    if (nextEx) return `next: ${nextEx}`;
    if (round + 1 < TOTAL_ROUNDS) return `next: Round ${round + 2} — starting over`;
    return 'last rest — finish strong!';
  };

  // Keep ref in sync so the auto-advance timeout always calls the latest version
  advancePhaseRef.current = advancePhase;

  function advancePhase() {
    if (!isRest) {
      // work done → go to rest
      setIsRest(true);
      return;
    }
    // rest done → next exercise or next round or complete
    const nextExIdx = exIdx + 1;
    if (nextExIdx < exercises.length) {
      setExIdx(nextExIdx);
      setIsRest(false);
    } else {
      const nextRound = round + 1;
      if (nextRound < TOTAL_ROUNDS) {
        setRound(nextRound);
        setExIdx(0);
        setIsRest(false);
      } else {
        onComplete();
      }
    }
  };

  // Round progress dots (one per exercise per round)
  const totalSteps = exercises.length * TOTAL_ROUNDS;
  const doneSteps = round * exercises.length + exIdx;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#000', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Video zone — 50 vh ── */}
      <div style={{ height: '50vh', flexShrink: 0, position: 'relative', background: '#000', overflow: 'hidden' }}>
        {ex.video ? (
          <video
            ref={videoRef}
            src={ex.video}
            muted
            playsInline
            loop
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: isRest ? 0.2 : 1,
              transition: 'opacity 0.4s',
            }}
          />
        ) : ex.image ? (
          <img
            src={ex.image}
            alt={ex.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: isRest ? 0.2 : 1,
              transition: 'opacity 0.4s',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #0d1a0d, #1a1a0d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 80,
            animation: isRest ? 'none' : 'breathe 2.5s ease-in-out infinite',
          }}>
            {isRest ? '⏳' : ex.icon}
          </div>
        )}

        {/* Rest overlay */}
        {isRest && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 6,
            background: 'rgba(0,0,0,0.55)',
          }}>
            <div style={{ fontSize: 52 }}>⏳</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '0.12em', color: '#4488ff' }}>REST</div>
          </div>
        )}

        {/* Top HUD */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '48px 20px 16px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
          pointerEvents: 'none',
        }}>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(255,255,255,0.12)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', fontSize: 16,
              backdropFilter: 'blur(8px)', pointerEvents: 'all',
            }}
          >✕</button>

          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em',
            background: 'rgba(0,0,0,0.45)', padding: '5px 10px', borderRadius: 6,
          }}>
            {exIdx + 1} / {exercises.length}
          </div>

          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            background: 'var(--accent2)', color: '#fff',
            padding: '5px 10px', borderRadius: 6, letterSpacing: '0.06em',
          }}>
            ROUND {round + 1}/{TOTAL_ROUNDS}
          </div>
        </div>

        {/* Session progress bar at bottom of video */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
          <div style={{
            height: '100%',
            width: `${(doneSteps / totalSteps) * 100}%`,
            background: 'var(--accent)',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* ── Bottom sheet ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: 'var(--bg)', borderRadius: '20px 20px 0 0',
        marginTop: -16, position: 'relative', zIndex: 2,
        overflow: 'hidden', minHeight: 0,
      }}>
        <div style={{ flex: 1, padding: '18px 20px 0', overflowY: 'auto', minHeight: 0 }}>
          {/* Exercise name */}
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28, letterSpacing: '0.04em', lineHeight: 1,
            color: isRest ? 'var(--muted)' : 'var(--text)',
            marginBottom: 3, transition: 'color 0.3s',
          }}>
            {isRest ? 'Rest' : ex.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>
            {nextLabel()}
          </div>

          {/* Cues */}
          {!isRest && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {ex.cues.map((cue, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '9px 12px',
                }}>
                  <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>{cue.slice(0, 2)}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{cue.slice(2).trim()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Timer Controls ── */}
        <div style={{
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          padding: '12px 20px 28px',
          flexShrink: 0,
        }}>
          {/* Timer + progress bar */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 42,
                letterSpacing: '0.04em', lineHeight: 1,
                color: isRest ? '#4488ff' : 'var(--accent)',
                transition: 'color 0.3s',
              }}>
                {formatTime(timerVal)}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>
                {isRest ? 'RESTING' : 'WORKING'}
              </div>
            </div>
            <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3, width: `${progress}%`,
                background: isRest ? 'linear-gradient(90deg,#4488ff,#88aaff)' : 'linear-gradient(90deg,var(--accent2),var(--accent))',
                transition: 'width 0.1s linear',
              }} />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => adjustTime(-5)} style={{
              height: 46, borderRadius: 12, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              cursor: 'pointer', padding: '0 12px', flexShrink: 0,
            }}>−5</button>

            <button
              onClick={() => setIsRunning((r) => !r)}
              style={{
                flex: 1, height: 46, borderRadius: 12,
                background: isRest ? '#4488ff' : 'var(--accent)',
                border: 'none', color: '#0a0a0a',
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.1em',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {isRunning ? '⏸ Pause' : '▶ Resume'}
            </button>

            <button onClick={() => adjustTime(5)} style={{
              height: 46, borderRadius: 12, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              cursor: 'pointer', padding: '0 12px', flexShrink: 0,
            }}>+5</button>

            <button
              onClick={advancePhase}
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
