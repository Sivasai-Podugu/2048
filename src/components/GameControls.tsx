import { RotateCcw, Trophy, Gamepad2 } from 'lucide-react';

interface GameControlsProps {
  score: number;
  bestScore: number;
  onReset: () => void;
  size: number;
  onSizeChange: (size: number) => void;
}

export const GameControls = ({ score, bestScore, onReset, size, onSizeChange }: GameControlsProps) => {
  const sizes = [4, 5, 6];

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-orange-600" />
          <h1 className="text-4xl font-bold text-gray-800">2048</h1>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-orange-100 rounded-lg p-4 text-center">
          <div className="text-sm font-medium text-orange-800 uppercase tracking-wide">Score</div>
          <div className="text-2xl font-bold text-orange-600">{score}</div>
        </div>
        <div className="flex-1 bg-yellow-100 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-sm font-medium text-yellow-800 uppercase tracking-wide">
            <Trophy className="w-4 h-4" />
            Best
          </div>
          <div className="text-2xl font-bold text-yellow-600">{bestScore}</div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Board Size</div>
        <div className="flex gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => onSizeChange(s)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                size === s
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {s}x{s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">How to play:</span> Use arrow keys or WASD to move tiles. Tiles with the same number merge into one when they touch. Reach 2048 to win!
        </p>
      </div>
    </div>
  );
};
