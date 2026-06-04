export type PlanTag = 'strength' | 'cardio' | 'hypertrophy' | 'beginner' | 'intermediate';

export interface Plan {
  id: string;
  emoji: string;
  title: string;
  sub: string;
  tags: PlanTag[];
  weeks: number;
  daysPerWeek: number;
  sessionMinutes: number;
}

export const plans: Plan[] = [
  {
    id: 'cardio-abs',
    emoji: '🔥',
    title: 'Abs+Cardio (Beginner)',
    sub: '12 exercises · 2 rounds · 30s on / 30s off · 3–5 sessions/week',
    tags: ['cardio', 'beginner'],
    weeks: 8,
    daysPerWeek: 4,
    sessionMinutes: 24,
  },
  {
    id: 'ppl',
    emoji: '💪',
    title: 'PPL Hypertrophy 6-Day',
    sub: 'Push · Pull · Legs split for maximum volume and muscle growth',
    tags: ['hypertrophy', 'strength', 'intermediate'],
    weeks: 8,
    daysPerWeek: 6,
    sessionMinutes: 55,
  },
  {
    id: '531',
    emoji: '🏋️',
    title: '5/3/1 Powerlifting',
    sub: 'Classic strength program by Jim Wendler',
    tags: ['strength', 'intermediate'],
    weeks: 16,
    daysPerWeek: 4,
    sessionMinutes: 60,
  },
  {
    id: 'sl5x5',
    emoji: '🌱',
    title: 'StrongLifts 5×5',
    sub: 'Best beginner program. Full body 3 days a week',
    tags: ['strength', 'beginner'],
    weeks: 12,
    daysPerWeek: 3,
    sessionMinutes: 45,
  },
  {
    id: 'hiit',
    emoji: '⚡',
    title: 'HIIT Fat Burner',
    sub: 'High intensity interval training. Burn fat, keep muscle',
    tags: ['cardio', 'beginner'],
    weeks: 6,
    daysPerWeek: 4,
    sessionMinutes: 30,
  },
  {
    id: 'cbum',
    emoji: '🏆',
    title: 'CBUM Evolved',
    sub: "Chris Bumstead's competition prep program — pure aesthetics",
    tags: ['hypertrophy', 'intermediate'],
    weeks: 12,
    daysPerWeek: 5,
    sessionMinutes: 70,
  },
  {
    id: 'greyskull',
    emoji: '💀',
    title: 'Greyskull LP',
    sub: 'Linear progression with AMRAP sets. Best novice strength builder',
    tags: ['strength', 'beginner'],
    weeks: 16,
    daysPerWeek: 3,
    sessionMinutes: 50,
  },
];

export const tagColors: Record<PlanTag, string> = {
  strength: 'bg-[rgba(255,107,53,0.15)] text-[#ff6b35]',
  cardio: 'bg-[rgba(200,241,53,0.15)] text-[#c8f135]',
  hypertrophy: 'bg-[rgba(68,136,255,0.15)] text-[#4488ff]',
  beginner: 'bg-[rgba(102,102,102,0.2)] text-[#888888]',
  intermediate: 'bg-[rgba(255,68,68,0.12)] text-[#ff4444]',
};
