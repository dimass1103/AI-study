export interface Ring {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

export interface Balloon {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

export interface Player {
  name: string;
  score: number;
  date: string;
}

export interface GameState {
  score: number;
  missedRings: number;
  missedBalloons: number;
  isPlaying: boolean;
  isGameOver: boolean;
}

export type Screen = 'start' | 'game' | 'gameover' | 'leaderboard';
