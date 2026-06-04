import { useState } from 'react';
import { plans, tagColors, type PlanTag } from '../data/plans';

const filterOptions: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'strength', label: 'Strength' },
  { id: 'hypertrophy', label: 'Hypertrophy' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
];

interface Props {
  activePlanId: string | null;
  onSelectPlan: (id: string | null) => void;
}

export default function ExplorePage({ activePlanId, onSelectPlan }: Props) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = plans.filter((p) => {
    const matchesFilter = filter === 'all' || p.tags.includes(filter as PlanTag);
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sub.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fade-up" style={{ paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ padding: '48px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: '0.04em', lineHeight: 1 }}>
          Explore<br />Plans
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '4px 8px', borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          {filtered.length} Plans
        </span>
      </div>

      {/* Search */}
      <div
        style={{ margin: '0 24px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', transition: 'border-color 0.2s' }}
        onFocusCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
        onBlurCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" width={18} height={18} style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search plans…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}
        />
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 24px 20px', overflowX: 'auto' }}>
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setFilter(opt.id)}
            style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${filter === opt.id ? 'var(--accent)' : 'var(--border)'}`,
              background: filter === opt.id ? 'var(--accent)' : 'var(--surface)',
              color: filter === opt.id ? '#0a0a0a' : 'var(--muted)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Plan cards */}
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
            No plans match your search
          </div>
        )}
        {filtered.map((plan) => {
          const isActive = activePlanId === plan.id;
          return (
            <div
              key={plan.id}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 18, overflow: 'hidden',
                transition: 'all 0.2s', position: 'relative',
              }}
            >
              {/* Active badge */}
              {isActive && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'var(--accent)', borderRadius: 6,
                  padding: '3px 8px',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  letterSpacing: '0.08em', color: '#0a0a0a', fontWeight: 700,
                }}>
                  ACTIVE
                </div>
              )}

              {/* Header */}
              <div style={{ padding: '20px 20px 0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28, lineHeight: 1, marginTop: 2 }}>{plan.emoji}</span>
                <div style={{ flex: 1, paddingRight: isActive ? 64 : 0 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}>
                    {plan.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>{plan.sub}</div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '12px 20px' }}>
                {plan.tags.map((tag) => (
                  <span key={tag} className={`font-mono-app ${tagColors[tag]}`} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--border)' }}>
                {[
                  [plan.weeks, 'Weeks'],
                  [plan.daysPerWeek, 'Days/wk'],
                  [`${plan.sessionMinutes}'`, 'Per session'],
                ].map(([val, lbl], idx) => (
                  <div key={String(lbl)} style={{ padding: 12, textAlign: 'center', borderRight: idx < 2 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: 'var(--text)', lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{lbl}</div>
                  </div>
                ))}
              </div>

              {/* Select / Deselect button */}
              <button
                onClick={() => onSelectPlan(isActive ? null : plan.id)}
                style={{
                  margin: '0 20px 20px',
                  width: 'calc(100% - 40px)',
                  padding: 11,
                  borderRadius: 10,
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                  background: isActive ? 'var(--accent)' : 'none',
                  color: isActive ? '#0a0a0a' : 'var(--muted)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'block',
                }}
              >
                {isActive ? '✓ Active Plan' : 'Select Plan'}
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
