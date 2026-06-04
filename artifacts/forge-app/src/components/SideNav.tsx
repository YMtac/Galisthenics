import { plans } from '../data/plans';
import type { Page } from '../App';

interface Props {
  current: Page;
  onChange: (p: Page) => void;
  activePlanId: string | null;
}

const items: { id: Page; label: string; icon: React.ReactNode }[] = [
  {
    id: 'plan',
    label: 'Plan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: 'explore',
    label: 'Explore',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function SideNav({ current, onChange, activePlanId }: Props) {
  const activePlan = activePlanId ? plans.find((p) => p.id === activePlanId) : null;

  return (
    <aside
      style={{
        width: 220,
        minHeight: '100vh',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 16px',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
      }}
      className="hidden lg:flex"
    >
      {/* Logo */}
      <div style={{ padding: '0 12px 32px' }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22,
          letterSpacing: '0.06em',
          color: 'var(--accent)',
          lineHeight: 1,
        }}>
          Galisthenics
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>
          Training OS
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item) => {
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 12, border: 'none',
                background: active ? 'rgba(200,241,53,0.1)' : 'none',
                cursor: 'pointer',
                color: active ? 'var(--accent)' : 'var(--muted)',
                fontSize: 14, fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s', textAlign: 'left', width: '100%',
              }}
            >
              <span style={{ filter: active ? 'drop-shadow(0 0 4px var(--accent))' : 'none', flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Active plan status */}
      <div style={{ marginTop: 'auto', padding: '0 12px' }}>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
          {activePlan ? (
            <>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 6, textTransform: 'uppercase' }}>
                Active Plan
              </div>
              <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, marginBottom: 2 }}>{activePlan.emoji} {activePlan.title}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{activePlan.daysPerWeek}×/week · {activePlan.sessionMinutes} min</div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 6, textTransform: 'uppercase' }}>
                No plan active
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted2)' }}>Select a plan to start training</div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
