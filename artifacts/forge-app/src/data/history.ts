export interface HistoryItem {
  date: string;
  dateObj: Date;
  name: string;
  chips: string[];
}

export const history: HistoryItem[] = [
  {
    date: 'Wed, Jun 4, 2025',
    dateObj: new Date(2025, 5, 4),
    name: 'Push Day A — Chest & Shoulders',
    chips: ['6 exercises', '19 sets', '58 min', 'PPL Plan'],
  },
  {
    date: 'Tue, Jun 3, 2025',
    dateObj: new Date(2025, 5, 3),
    name: 'Pull Day A — Back & Biceps',
    chips: ['7 exercises', '21 sets', '62 min', 'PPL Plan'],
  },
  {
    date: 'Mon, Jun 2, 2025',
    dateObj: new Date(2025, 5, 2),
    name: 'Leg Day A — Quads & Calves',
    chips: ['6 exercises', '20 sets', '65 min', 'PPL Plan'],
  },
  {
    date: 'Sat, May 31, 2025',
    dateObj: new Date(2025, 4, 31),
    name: 'Push Day B — Triceps Focus',
    chips: ['6 exercises', '18 sets', '55 min', 'PPL Plan'],
  },
  {
    date: 'Fri, May 30, 2025',
    dateObj: new Date(2025, 4, 30),
    name: 'Pull Day B — Arms & Rear Delt',
    chips: ['7 exercises', '20 sets', '60 min', 'PPL Plan'],
  },
  {
    date: 'Thu, May 29, 2025',
    dateObj: new Date(2025, 4, 29),
    name: 'Leg Day B — Hamstrings & Glutes',
    chips: ['5 exercises', '17 sets', '50 min', 'PPL Plan'],
  },
];

export const workoutDays = new Set([2, 3, 4, 7, 9, 10, 11, 14, 16, 17, 18, 21, 23, 24]);
