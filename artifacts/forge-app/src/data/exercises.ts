export interface Exercise {
  name: string;
  icon: string;
  sub: string;
  sets: number;
  work: number;
  rest: number;
  cues: string[];
  weight: string;
  reps: number;
}

export const todayExercises: Exercise[] = [
  {
    name: 'Bench Press',
    icon: '🏋️',
    sub: '70 kg · 8 reps · 2 min rest',
    sets: 4,
    work: 45,
    rest: 120,
    weight: '70 kg',
    reps: 8,
    cues: [
      '🎯 Grip shoulder-width apart, slight elbow tuck',
      '💨 Inhale down, exhale on press',
      "📐 Touch chest lightly, don't bounce",
    ],
  },
  {
    name: 'Incline DB Press',
    icon: '💪',
    sub: '30 kg · 10 reps · 90s rest',
    sets: 3,
    work: 40,
    rest: 90,
    weight: '30 kg',
    reps: 10,
    cues: [
      '📐 45° incline bench, dumbbells at chest level',
      '🔄 Squeeze chest at top, controlled descent',
      '💨 Keep core braced throughout',
    ],
  },
  {
    name: 'OHP (Barbell)',
    icon: '🔝',
    sub: '50 kg · 6 reps · 2 min rest',
    sets: 4,
    work: 40,
    rest: 120,
    weight: '50 kg',
    reps: 6,
    cues: [
      '🦵 Glutes tight, core locked in',
      '📏 Bar just in front of face as you press',
      '⬆️ Lock out elbows fully at top',
    ],
  },
  {
    name: 'Lateral Raises',
    icon: '↔️',
    sub: '12 kg · 15 reps · 60s rest',
    sets: 3,
    work: 35,
    rest: 60,
    weight: '12 kg',
    reps: 15,
    cues: [
      '🦅 Lead with elbows, not wrists',
      '📉 Stop at shoulder height, no higher',
      '🐢 Slow eccentric (3 seconds down)',
    ],
  },
  {
    name: 'Cable Flyes',
    icon: '🔄',
    sub: '15 kg · 12 reps · 60s rest',
    sets: 3,
    work: 35,
    rest: 60,
    weight: '15 kg',
    reps: 12,
    cues: [
      '🤗 Wide arc, like hugging a tree',
      '🎯 Feel the chest stretch at bottom',
      '🔥 Squeeze hard at center peak',
    ],
  },
  {
    name: 'Tricep Pushdown',
    icon: '⬇️',
    sub: '20 kg · 12 reps · 60s rest',
    sets: 3,
    work: 30,
    rest: 60,
    weight: '20 kg',
    reps: 12,
    cues: [
      '📌 Elbows pinned to sides throughout',
      '⬇️ Full extension, flex tricep hard',
      '🚫 No shoulder swing — strict form',
    ],
  },
];
