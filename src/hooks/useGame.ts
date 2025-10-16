import { useState, useCallback, useEffect } from 'react';
import { GameState, Direction, GameConfig } from '../types/game';
import { initializeGame, move } from '../utils/gameLogic';

const DEFAULT_CONFIG: GameConfig = {
  size: 4,
  winningValue: 2048,
};

export const useGame = (config: GameConfig = DEFAULT_CONFIG) => {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame(config));
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setGameState(initializeGame(config));
    setIsAnimating(false);
  }, [config.size]);

  const handleMove = useCallback(
    (direction: Direction) => {
      if (gameState.gameOver || isAnimating) return;

      setIsAnimating(true);
      const { newState, moved } = move(gameState, direction);

      if (moved) {
        setGameState(newState);
      }

      setTimeout(() => setIsAnimating(false), 150);
    },
    [gameState, isAnimating]
  );

  const resetGame = useCallback(() => {
    setGameState(initializeGame(config));
    setIsAnimating(false);
  }, [config]);

  const continueGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, gameWon: false }));
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isAnimating) return;

      const keyMap: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right',
      };

      const direction = keyMap[e.key];
      if (direction) {
        e.preventDefault();
        handleMove(direction);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMove, isAnimating]);

  return {
    gameState,
    handleMove,
    resetGame,
    continueGame,
    isAnimating,
  };
};
