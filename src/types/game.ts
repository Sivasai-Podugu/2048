export type Tile = {
  id: string;
  value: number;
  position: { row: number; col: number };
  mergedFrom?: Tile[];
  isNew?: boolean;
};

export type Board = (Tile | null)[][];

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameState = {
  board: Board;
  score: number;
  size: number;
  gameOver: boolean;
  gameWon: boolean;
  tiles: Tile[];
};

export type GameConfig = {
  size: number;
  winningValue: number;
};
