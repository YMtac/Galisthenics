export interface HistoryItem {
  date: string;
  dateObj: Date;
  name: string;
  chips: string[];
}

export const history: HistoryItem[] = [];
export const workoutDays = new Set<number>([]);
