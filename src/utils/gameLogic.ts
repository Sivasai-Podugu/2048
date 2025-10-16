import { Board, Tile, Direction, GameState, GameConfig } from '../types/game';

export const createEmptyBoard = (size: number): Board => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));
};

export const generateTileId = (): string => {
  return `tile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getEmptyPositions = (board: Board): { row: number; col: number }[] => {
  const empty: { row: number; col: number }[] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === null) {
        empty.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  return empty;
};

export const addRandomTile = (board: Board): Tile | null => {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) return null;

  const position = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  return {
    id: generateTileId(),
    value,
    position,
    isNew: true,
  };
};

export const initializeGame = (config: GameConfig): GameState => {
  const board = createEmptyBoard(config.size);
  const tiles: Tile[] = [];

  const tile1 = addRandomTile(board);
  if (tile1) {
    board[tile1.position.row][tile1.position.col] = tile1;
    tiles.push(tile1);
  }

  const tile2 = addRandomTile(board);
  if (tile2) {
    board[tile2.position.row][tile2.position.col] = tile2;
    tiles.push(tile2);
  }

  return {
    board,
    score: 0,
    size: config.size,
    gameOver: false,
    gameWon: false,
    tiles,
  };
};

const extractTilesFromBoard = (board: Board): Tile[] => {
  const tiles: Tile[] = [];
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell) tiles.push(cell);
    });
  });
  return tiles;
};

const moveTilesInLine = (line: (Tile | null)[]): (Tile | null)[] => {
  const nonEmpty = line.filter((tile) => tile !== null) as Tile[];
  const merged: (Tile | null)[] = [];
  let scoreGained = 0;
  let i = 0;

  while (i < nonEmpty.length) {
    if (i + 1 < nonEmpty.length && nonEmpty[i].value === nonEmpty[i + 1].value) {
      const newTile: Tile = {
        id: generateTileId(),
        value: nonEmpty[i].value * 2,
        position: nonEmpty[i].position,
        mergedFrom: [nonEmpty[i], nonEmpty[i + 1]],
      };
      merged.push(newTile);
      scoreGained += newTile.value;
      i += 2;
    } else {
      merged.push(nonEmpty[i]);
      i += 1;
    }
  }

  while (merged.length < line.length) {
    merged.push(null);
  }

  return merged;
};

const rotateBoard = (board: Board): Board => {
  const size = board.length;
  const rotated = createEmptyBoard(size);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotated[col][size - 1 - row] = board[row][col];
      if (rotated[col][size - 1 - row]) {
        rotated[col][size - 1 - row] = {
          ...rotated[col][size - 1 - row]!,
          position: { row: col, col: size - 1 - row },
        };
      }
    }
  }
  return rotated;
};

const moveLeft = (board: Board): { board: Board; moved: boolean } => {
  let moved = false;
  const newBoard = createEmptyBoard(board.length);

  board.forEach((row, rowIndex) => {
    const line = moveTilesInLine(row);

    line.forEach((tile, colIndex) => {
      if (tile) {
        const newTile = {
          ...tile,
          position: { row: rowIndex, col: colIndex },
        };
        newBoard[rowIndex][colIndex] = newTile;

        if (row[colIndex]?.id !== tile.id || row[colIndex]?.position.col !== colIndex) {
          moved = true;
        }
      }
    });
  });

  if (!moved) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j]?.id !== newBoard[i][j]?.id) {
          moved = true;
          break;
        }
      }
    }
  }

  return { board: newBoard, moved };
};

export const move = (
  state: GameState,
  direction: Direction
): { newState: GameState; moved: boolean } => {
  let board = state.board.map((row) => [...row]);
  let rotations = 0;

  switch (direction) {
    case 'left':
      rotations = 0;
      break;
    case 'down':
      rotations = 1;
      break;
    case 'right':
      rotations = 2;
      break;
    case 'up':
      rotations = 3;
      break;
  }

  for (let i = 0; i < rotations; i++) {
    board = rotateBoard(board);
  }

  const { board: movedBoard, moved } = moveLeft(board);
  let finalBoard = movedBoard;

  for (let i = 0; i < 4 - rotations; i++) {
    finalBoard = rotateBoard(finalBoard);
  }

  if (!moved) {
    return { newState: state, moved: false };
  }

  const newTile = addRandomTile(finalBoard);
  if (newTile) {
    finalBoard[newTile.position.row][newTile.position.col] = newTile;
  }

  const tiles = extractTilesFromBoard(finalBoard);
  const gameWon = tiles.some((tile) => tile.value >= 2048);
  const gameOver = !canMove(finalBoard);

  function getMaxTile(board: Board): number {
    let max = 0;
    board.forEach(row => {
      row.forEach(cell => {
        if (cell && cell.value > max) {
          max = cell.value;
        }
      });
    });
    return max;
  }

  const maxTile = getMaxTile(finalBoard);

  const newState: GameState = {
    ...state,
    board: finalBoard,
    score: maxTile, // <-- set score to max tile value
    size: state.size,
    gameOver,
    gameWon: state.gameWon || gameWon,
    tiles,
  };

  return {
    newState,
    moved: true,
  };
};

export const canMove = (board: Board): boolean => {
  const size = board.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === null) return true;

      const current = board[row][col];
      if (col < size - 1 && board[row][col + 1]?.value === current?.value) return true;
      if (row < size - 1 && board[row + 1][col]?.value === current?.value) return true;
    }
  }

  return false;
};
