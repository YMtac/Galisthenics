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
  const [month, setMonth] = useState(5); // June (0-indexed)
  const [year, setYear] = useState(2025);

  const cells = buildCalendar(year, month);
  const today = new Date(2025, 5, 4);
  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const changeMonth = (dir: number) => {
    let m = month + dir;
    let y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m);
    setYear(y);
  };

  return (
    <div className="fade-up" style={{ paddingBottom: 96 }}>
      {/* Profile Hero */}
      <div style={{ padding: '48px 24px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{
          width: 62, height: 62, borderRadius: 18,
          background: 'linear-gradient(135deg, var(--accent2), var(--accent))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#0a0a0a', flexShrink: 0,
        }}>L</div>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: '0.04em', lineHeight: 1 }}>Luo</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", marginTop: 3 }}>
            Training since Jan 2024 · 17-month streak
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, margin: '0 24px 24px' }}>
        {[['142', 'Sessions'], ['87', 'Hours'], ['4.8t', 'Volume']].map(([val, lbl]) => (
          <div key={lbl} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 12px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3, fontFamily: "'JetBrains Mono', monospace" }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '4px 24px 10px' }}>
        Training Calendar
      </div>
      <div style={{ margin: '0 24px 8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: '0.06em' }}>
            {MONTHS[month]} {year}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['‹', '›'].map((arrow, i) => (
              <button key={arrow} onClick={() => changeMonth(i === 0 ? -1 : 1)} style={{
                background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8,
                width: 30, height: 30, color: 'var(--muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>
                {arrow}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: 12, gap: 4 }}>
          {DOW.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.08em', color: 'var(--muted)', padding: '4px 0 8px' }}>
              {d}
            </div>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const isTod = isToday(d);
            const hasWorkout = workoutDays.has(d) || isTod;
            return (
              <div key={i} style={{
                aspectRatio: '1',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                cursor: 'pointer',
                position: 'relative',
                color: isTod ? '#0a0a0a' : hasWorkout ? 'var(--text)' : 'var(--muted)',
                background: isTod ? 'var(--accent)' : 'transparent',
                fontWeight: isTod ? 700 : 400,
                transition: 'background 0.15s',
              }}>
                {d}
                {hasWorkout && (
                  <span style={{
                    position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)',
                    width: 4, height: 4, borderRadius: '50%',
                    background: isTod ? '#0a0a0a' : 'var(--accent2)',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* History */}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', padding: '16px 24px 10px' }}>
        Recent History
      </div>
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {history.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent2)', flexShrink: 0, marginTop: 4 }} />
              {i < history.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 4, minHeight: 30 }} />}
            </div>
            <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px', marginBottom: i < history.length - 1 ? 0 : 0 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 4 }}>
                {item.date}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{item.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.chips.map((chip) => (
                  <span key={chip} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '3px 8px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)' }}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
