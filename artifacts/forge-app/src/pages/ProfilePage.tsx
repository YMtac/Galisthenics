import { useState } from 'react';
import { history, workoutDays } from '../data/history';

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function ProfilePage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);

  const cells = buildCalendar(year, month);
  const isToday = (d: number) =>
    d === now.getDate() && month === now.getMonth() && year === now.getFullYear();

  const changeMonth = (dir: number) => {
    let m = month + dir, y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m); setYear(y);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => { setLoginLoading(false); setShowLogin(false); }, 1200);
  };

  return (
    <>
      <div className="fade-up" style={{ paddingBottom: 96, minHeight: '100vh' }}>
        {/* Profile Hero */}
        <div style={{ padding: '20px 20px 20px', display: 'flex', gap: 14, alignItems: 'center' }} className="page-top">
          <div style={{
            width: 58, height: 58, borderRadius: 16,
            background: 'var(--surface2)', border: '2px dashed var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, flexShrink: 0,
          }}>
            👤
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '0.04em', lineHeight: 1, color: 'var(--muted)' }}>
              New Athlete
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", marginTop: 3 }}>
              No sessions yet
            </div>
          </div>
          {/* Login button */}
          <button
            onClick={() => setShowLogin(true)}
            style={{
              padding: '8px 16px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              color: 'var(--text)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
              flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={14} height={14}>
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Log In
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, margin: '0 20px 20px' }}>
          {[['0', 'Sessions'], ['0', 'Hours'], ['0', 'Volume']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 10px', textAlign: 'center' }}>
              <div className="stat-val" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--muted2)', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, fontFamily: "'JetBrains Mono', monospace" }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '0 20px 10px' }}>
          Training Calendar
        </div>
        <div style={{ margin: '0 20px 8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.06em' }}>
              {MONTHS[month]} {year}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['‹', '›'].map((arrow, i) => (
                <button key={arrow} onClick={() => changeMonth(i === 0 ? -1 : 1)} style={{
                  background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8,
                  width: 28, height: 28, color: 'var(--muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                }}>
                  {arrow}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '10px 8px', gap: 2 }}>
            {DOW.map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.06em', color: 'var(--muted)', padding: '3px 0 6px' }}>{d}</div>
            ))}
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const isTod = isToday(d);
              const hasWorkout = workoutDays.has(d);
              return (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 7,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, cursor: 'default', position: 'relative',
                  color: isTod ? '#0a0a0a' : hasWorkout ? 'var(--text)' : 'var(--muted)',
                  background: isTod ? 'var(--accent)' : 'transparent',
                  fontWeight: isTod ? 700 : 400,
                }}>
                  {d}
                  {hasWorkout && !isTod && (
                    <span style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'var(--accent2)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* History */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '14px 20px 10px' }}>
          Recent History
        </div>
        {history.length === 0 ? (
          <div style={{
            margin: '0 20px',
            background: 'var(--surface)', border: '1px dashed var(--border)',
            borderRadius: 16, padding: '32px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10,
          }}>
            <div style={{ fontSize: 28 }}>📋</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>No sessions yet</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 220 }}>
              Complete your first workout and it will appear here.
            </div>
          </div>
        ) : (
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {history.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent2)', flexShrink: 0, marginTop: 4 }} />
                  {i < history.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 4, minHeight: 30 }} />}
                </div>
                <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 14px', marginBottom: 4 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', marginBottom: 4 }}>{item.date}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{item.name}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {item.chips.map((chip) => (
                      <span key={chip} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '3px 7px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)' }}>{chip}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>

      {/* ── Login Modal ── */}
      {showLogin && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowLogin(false); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            className="fade-up"
            style={{
              width: '100%', maxWidth: 380,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 24,
              padding: '32px 28px',
            }}
          >
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: '0.06em', color: 'var(--accent)', lineHeight: 1 }}>
                  Galisthenics
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>Sign in to your account</div>
              </div>
              <button
                onClick={() => setShowLogin(false)}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  color: 'var(--muted)', cursor: 'pointer', fontSize: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                  required
                  style={{
                    width: '100%', padding: '12px 14px',
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    borderRadius: 10, color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                  required
                  style={{
                    width: '100%', padding: '12px 14px',
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    borderRadius: 10, color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; }}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  marginTop: 4, width: '100%', padding: '14px',
                  background: loginLoading ? 'rgba(200,241,53,0.5)' : 'var(--accent)',
                  color: '#0a0a0a', border: 'none', borderRadius: 12,
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.1em',
                  cursor: loginLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {loginLoading ? 'Signing in…' : 'Sign In'}
              </button>

              <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)' }}>
                Don't have an account?{' '}
                <span style={{ color: 'var(--accent)', cursor: 'pointer' }}>Sign up</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
