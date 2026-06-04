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
    <div className="fade-up" style={{ paddingBottom: 96, overflowX: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: '0.08em', color: 'var(--accent)', lineHeight: 1, marginBottom: 4 }}>
            Galisthenics
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, letterSpacing: '0.04em', lineHeight: 1 }}>
            Explore Plans
          </div>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          padding: '4px 8px', borderRadius: 6,
          border: '1px solid var(--border)', color: 'var(--muted)',
          flexShrink: 0, letterSpacing: '0.08em',
        }}>
          {filtered.length}
        </span>
      </div>

      {/* Search */}
      <div
        style={{
          margin: '0 20px 14px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 14px', transition: 'border-color 0.2s',
        }}
        onFocusCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
        onBlurCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" width={16} height={16} style={{ flexShrink: 0 }}>
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
      <div style={{ display: 'flex', gap: 7, padding: '0 20px 18px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setFilter(opt.id)}
            style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${filter === opt.id ? 'var(--accent)' : 'var(--border)'}`,
              background: filter === opt.id ? 'var(--accent)' : 'var(--surface)',
              color: filter === opt.id ? '#0a0a0a' : 'var(--muted)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Plan cards */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                borderRadius: 16, overflow: 'hidden',
                width: '100%', boxSizing: 'border-box',
              }}
            >
              {/* Card header row */}
              <div style={{ padding: '16px 16px 0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 26, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{plan.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                    letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 3,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {plan.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
                    {plan.sub}
                  </div>
                </div>
                {isActive && (
                  <div style={{
                    flexShrink: 0,
                    background: 'var(--accent)', borderRadius: 6,
                    padding: '3px 7px',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    letterSpacing: '0.08em', color: '#0a0a0a', fontWeight: 700,
                  }}>
                    ACTIVE
                  </div>
                )}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, padding: '10px 16px' }}>
                {plan.tags.map((tag) => (
                  <span key={tag} className={`font-mono-app ${tagColors[tag]}`} style={{ fontSize: 10, padding: '3px 7px', borderRadius: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats — 3 equal cols, no overflow */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--border)', width: '100%' }}>
                {[
                  [plan.weeks, 'Weeks'],
                  [plan.daysPerWeek, 'Days/wk'],
                  [`${plan.sessionMinutes}'`, 'Per session'],
                ].map(([val, lbl], idx) => (
                  <div key={String(lbl)} style={{ padding: '10px 6px', textAlign: 'center', borderRight: idx < 2 ? '1px solid var(--border)' : 'none', minWidth: 0 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, color: 'var(--text)', lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{ String(lbl) }</div>
                  </div>
                ))}
              </div>

              {/* Action button */}
              <div style={{ padding: '0 16px 16px' }}>
                <button
                  onClick={() => onSelectPlan(isActive ? null : plan.id)}
                  style={{
                    width: '100%', padding: '11px 0',
                    borderRadius: 10,
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    background: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#0a0a0a' : 'var(--muted)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {isActive ? '✓ Active Plan' : 'Select Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
