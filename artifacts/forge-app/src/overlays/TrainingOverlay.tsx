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
    return undefined;
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

  // Next exercise to preview (skip rest — show the exercise coming after current)
  const nextEx: Exercise | null = (() => {
    if (!isRest) return exIdx + 1 < exercises.length ? exercises[exIdx + 1] : null;
    return exIdx + 1 < exercises.length ? exercises[exIdx + 1] : null;
  })();
  const nextRoundComing = !nextEx && round + 1 < TOTAL_ROUNDS;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#000', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Video zone — 42 vh ── */}
      <div style={{ height: '42vh', flexShrink: 0, position: 'relative', background: '#111', overflow: 'hidden' }}>
        {isRest ? (
          /* During rest: show next exercise video dimmed */
          nextEx ? (
            nextEx.video ? (
              <video src={nextEx.video} muted playsInline loop autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, transition: 'opacity 0.4s' }} />
            ) : nextEx.image ? (
              <img src={nextEx.image} alt={nextEx.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, transition: 'opacity 0.4s' }} />
            ) : null
          ) : null
        ) : (
          ex.video ? (
            <video ref={videoRef} src={ex.video} muted playsInline loop
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : ex.image ? (
            <img src={ex.image} alt={ex.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #0d1a0d, #1a1a0d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 80, animation: 'breathe 2.5s ease-in-out infinite',
            }}>
              {ex.icon}
            </div>
          )
        )}

        {/* Rest overlay on video */}
        {isRest && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 10,
            background: 'rgba(0,0,0,0.62)',
          }}>
            <div style={{ fontSize: 48 }}>⏳</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.18em', color: '#5599ff' }}>REST</div>
          </div>
        )}

        {/* Top HUD */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '48px 20px 16px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)',
        }}>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.14)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', fontSize: 16,
            backdropFilter: 'blur(8px)',
          }}>✕</button>

          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em',
            background: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: 6,
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

        {/* Session progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.08)' }}>
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
        background: 'var(--bg)', borderRadius: '24px 24px 0 0',
        marginTop: -20, position: 'relative', zIndex: 2,
        overflow: 'hidden', minHeight: 0,
      }}>
        {/* Drag handle */}
        <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, margin: '10px auto 0', flexShrink: 0 }} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '14px 20px 0', overflow: 'hidden', minHeight: 0 }}>

          {/* Phase label + exercise name */}
          <div style={{ flexShrink: 0, marginBottom: 10 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4,
              color: isRest ? '#5599ff' : 'var(--accent)',
              transition: 'color 0.3s',
            }}>
              {isRest ? '⏸ Resting' : '▶ Working'}
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 30, letterSpacing: '0.04em', lineHeight: 1,
              color: 'var(--text)',
            }}>
              {isRest ? 'Rest' : ex.name}
            </div>
          </div>

          {/* Timer countdown + bar */}
          <div style={{ flexShrink: 0, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 7 }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 54,
                letterSpacing: '0.04em', lineHeight: 1,
                color: isRest ? '#5599ff' : 'var(--accent)',
                transition: 'color 0.3s',
              }}>
                {formatTime(Math.max(0, timerMax - timerVal))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)' }}>
                / {formatTime(timerMax)}
              </div>
            </div>
            <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${progress}%`,
                background: isRest
                  ? 'linear-gradient(90deg,#4477dd,#5599ff)'
                  : 'linear-gradient(90deg,var(--accent2),var(--accent))',
                transition: 'width 0.1s linear',
              }} />
            </div>
          </div>

          {/* Control buttons */}
          <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginBottom: 12 }}>
            <button onClick={() => adjustTime(-5)} style={{
              height: 46, borderRadius: 12, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              cursor: 'pointer', padding: '0 14px', flexShrink: 0,
            }}>−5s</button>

            <button onClick={() => setIsRunning((r) => !r)} style={{
              flex: 1, height: 46, borderRadius: 12,
              background: isRest ? '#5599ff' : 'var(--accent)',
              border: 'none', color: isRest ? '#fff' : '#0a0a0a',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.1em',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {isRunning ? '⏸ Pause' : '▶ Resume'}
            </button>

            <button onClick={() => adjustTime(5)} style={{
              height: 46, borderRadius: 12, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              cursor: 'pointer', padding: '0 14px', flexShrink: 0,
            }}>+5s</button>

            <button onClick={advancePhase} style={{
              height: 46, borderRadius: 12,
              background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.1em',
              cursor: 'pointer', padding: '0 14px', flexShrink: 0,
            }}>
              {isRest ? 'Next ›' : 'Done ›'}
            </button>
          </div>

          {/* ── Next Exercise card ── */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'flex-end', paddingBottom: 24 }}>
            {nextEx ? (
              <div style={{
                width: '100%',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 18,
                padding: '14px 14px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                {/* Thumbnail */}
                <div style={{
                  width: 72, height: 72, borderRadius: 14,
                  overflow: 'hidden', flexShrink: 0,
                  background: '#222',
                }}>
                  {nextEx.video ? (
                    <video src={nextEx.video} muted autoPlay loop playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : nextEx.image ? (
                    <img src={nextEx.image} alt={nextEx.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 30 }}>
                      {nextEx.icon}
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase',
                    marginBottom: 4,
                  }}>
                    Next Exercise
                  </div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 22,
                    letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1,
                    marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {nextEx.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {nextEx.work}s work · {nextEx.rest}s rest
                  </div>
                </div>
              </div>
            ) : nextRoundComing ? (
              <div style={{
                width: '100%',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 18,
                padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 14,
                  background: 'rgba(200,241,53,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, flexShrink: 0,
                }}>🔁</div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                    Up Next
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}>
                    Round {round + 2} of {TOTAL_ROUNDS}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Starting over from the top</div>
                </div>
              </div>
            ) : (
              <div style={{
                width: '100%',
                background: 'rgba(200,241,53,0.06)',
                border: '1px solid rgba(200,241,53,0.2)',
                borderRadius: 18,
                padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 14,
                  background: 'rgba(200,241,53,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, flexShrink: 0,
                }}>🏁</div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                    Last Exercise
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}>
                    Finish Strong!
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Session complete after this</div>
                </div>
              </div>
            )}
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
