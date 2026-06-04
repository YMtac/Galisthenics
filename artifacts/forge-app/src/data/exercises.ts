export interface Exercise {
  id: string;
  name: string;
  icon: string;
  video?: string;
  image?: string;
  sub: string;
  sets: number;
  work: number;
  rest: number;
  cues: string[];
  weight?: string;
  reps?: number;
}

export const cardioAbsExercises: Exercise[] = [
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    icon: '⭐',
    video: '/videos/jumping-jacks.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '🦵 Land softly, arms reach fully overhead',
      '💨 Breathe rhythmically with each rep',
      '🎯 Keep core engaged throughout',
    ],
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    icon: '🦵',
    video: '/videos/leg-raises.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '📏 Press your lower back flat to the floor',
      '🦵 Lower legs slowly — control the descent',
      '💪 Raise with your core, not momentum',
    ],
  },
  {
    id: 'butt-kicks',
    name: 'Butt Kicks',
    icon: '🏃',
    video: '/videos/butt-kicks.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '👟 Drive heels up to your glutes on each step',
      '💪 Pump your arms in sync with your legs',
      '⬆️ Stay tall — light and quick on your feet',
    ],
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    icon: '🧗',
    video: '/videos/mountain-climbers.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '📐 Keep hips level in plank position',
      '🚀 Drive knees toward your chest explosively',
      '💨 Breathe — don\'t hold your breath',
    ],
  },
  {
    id: 'high-knee-taps',
    name: 'High Knee Taps',
    icon: '🦵',
    video: '/videos/high-knee-taps.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '⬆️ Drive knees above hip height on each step',
      '👐 Hold palms at chest level to tap against',
      '🎯 Quick, light steps — stay on your toes',
    ],
  },
  {
    id: 'bicycles',
    name: 'Bicycles',
    icon: '🚲',
    video: '/videos/bicycles.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '🔄 Full rotation — elbow to opposite knee',
      '🦵 Extend the opposite leg fully each rep',
      '🐢 Controlled pace, feel every ab contraction',
    ],
  },
  {
    id: 'squat-taps',
    name: 'Squat Taps',
    icon: '🏋️',
    video: '/videos/squat-taps.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '📉 Sit back and down — hip crease below knees',
      '👐 Tap the floor with both hands at the bottom',
      '⬆️ Drive through heels to stand explosively',
    ],
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    icon: '🔄',
    video: '/videos/russian-twists.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '🦶 Lift feet for extra core challenge',
      '📐 Rotate fully side to side each rep',
      '💪 Slow and controlled — no swinging',
    ],
  },
  {
    id: 'knee-raises',
    name: 'Knee Raises',
    icon: '🦿',
    video: '/videos/knee-raises.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '⬆️ Pull knees up to chest height each rep',
      '💪 Brace your core before every raise',
      '🐢 Lower slowly for more time under tension',
    ],
  },
  {
    id: 'burpees',
    name: 'Burpees (no push-up)',
    icon: '💥',
    video: '/videos/burpees.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '⬇️ Drop hands to floor, jump feet back to plank',
      '🚀 Jump feet back in, then explode up overhead',
      '💨 Find a steady rhythm — quality over speed',
    ],
  },
  {
    id: 'plank-side-to-side',
    name: 'Plank Side to Side',
    icon: '⬅️',
    video: '/videos/plank-side-to-side.mp4',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '📐 Hips stay stable — no rocking or dipping',
      '💪 Tap feet out wide to each side alternately',
      '🎯 Squeeze your core tight the entire time',
    ],
  },
  {
    id: 'plank-hold',
    name: 'Plank Hold',
    icon: '🧱',
    image: '/images/plank-hold.jpg',
    sub: '30s on · 30s off',
    sets: 1,
    work: 30,
    rest: 30,
    cues: [
      '📐 Body in a straight line — head to heels',
      '💪 Squeeze glutes and brace your core hard',
      '👁️ Eyes down, neutral neck — breathe steadily',
    ],
  },
];
