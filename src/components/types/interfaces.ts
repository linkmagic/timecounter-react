export interface HistoryItem {
  start: string;
  stop: string;
}

export interface TimerCounterData {
  id: string;
  name: string;
  totalSeconds: number;
  isRunning: boolean;
  currentMilisStart: number;
  currentMilisStop: number;
  history: HistoryItem[];
}

export interface TimeCounterItemProps {
  data: TimerCounterData;
}
