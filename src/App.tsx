import { useState, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { Board } from './components/Board';
import { GameControls } from './components/GameControls';
import { GameOverlay } from './components/GameOverlay';

function App() {
  const [boardSize, setBoardSize] = useState(4);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved) : 0;
  });

  const { gameState, resetGame, continueGame } = useGame({ size: boardSize, winningValue: 2048 });

  useEffect(() => {
    if (gameState.score > bestScore) {
      setBestScore(gameState.score);
      localStorage.setItem('bestScore', gameState.score.toString());
    }
  }, [gameState.score, bestScore]);

  const handleSizeChange = (newSize: number) => {
    if (newSize !== boardSize) {
      setBoardSize(newSize);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6">
        <GameControls
          score={gameState.score}
          bestScore={bestScore}
          onReset={resetGame}
          size={boardSize}
          onSizeChange={handleSizeChange}
        />

        <div className="relative">
          <Board gameState={gameState} />

          {gameState.gameWon && !gameState.gameOver && (
            <GameOverlay
              type="win"
              score={gameState.score}
              onRestart={resetGame}
              onContinue={continueGame}
            />
          )}

          {gameState.gameOver && (
            <GameOverlay
              type="lose"
              score={gameState.score}
              onRestart={resetGame}
            />
          )}
        </div>

        <div className="text-center text-sm text-gray-600 max-w-md">
          <p className="mb-2">
            <span className="font-semibold">Desktop:</span> Use Arrow Keys or WASD
          </p>
          <p className="text-xs text-gray-500">
            Join tiles with the same number to create larger numbers. Keep playing after 2048 to achieve an even higher score!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
