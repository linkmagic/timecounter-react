export type TimeCounterRunning = {
  id: string;
  isRunning: boolean;
  currentMilisStart?: number;
  currentMilisStop?: number;
}

export type TimeCounterID = {
  id: string;
}

export type TimeCounterIdName = {
  id: string;
  name: string;
}

export type HistoryItem = {
  start: string;
  stop: string;
}

export type TimeCounterItem = {
  id: string;
  name: string;
  totalSeconds: number;
  isRunning: boolean;
  currentMilisStart: number;
  currentMilisStop: number;
  history: HistoryItem[];
}

export type TimeCounterState = {
  list: TimeCounterItem[];
};
