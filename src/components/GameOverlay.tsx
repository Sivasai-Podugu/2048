import { Trophy, X } from 'lucide-react';

interface GameOverlayProps {
  type: 'win' | 'lose';
  score: number;
  onRestart: () => void;
  onContinue?: () => void;
}

export const GameOverlay = ({ type, score, onRestart, onContinue }: GameOverlayProps) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 transform animate-scale-in">
        <div className="text-center space-y-4">
          {type === 'win' ? (
            <>
              <div className="flex justify-center">
                <div className="bg-yellow-100 rounded-full p-4">
                  <Trophy className="w-12 h-12 text-yellow-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">You Win!</h2>
              <p className="text-gray-600">Congratulations! You reached 2048!</p>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="bg-red-100 rounded-full p-4">
                  <X className="w-12 h-12 text-red-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Game Over</h2>
              <p className="text-gray-600">No more moves available!</p>
            </>
          )}

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-sm text-gray-600">Final Score</div>
            <div className="text-3xl font-bold text-gray-800">{score}</div>
          </div>

          <div className="space-y-2 pt-2">
            {type === 'win' && onContinue && (
              <button
                onClick={onContinue}
                className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md"
              >
                Keep Playing
              </button>
            )}
            <button
              onClick={onRestart}
              className="w-full py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
