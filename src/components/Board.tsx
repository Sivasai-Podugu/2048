import { GameState } from '../types/game';
import { Tile } from './Tile';

interface BoardProps {
  gameState: GameState;
}

export const Board = ({ gameState }: BoardProps) => {
  const getBoardSize = () => {
    switch (gameState.size) {
      case 4:
        return 'w-[360px] h-[360px]';
      case 5:
        return 'w-[380px] h-[380px]';
      case 6:
        return 'w-[400px] h-[400px]';
      default:
        return 'w-[360px] h-[360px]';
    }
  };

  return (
    <div className={`${getBoardSize()} bg-gray-300 rounded-xl p-2 relative`}>
      <div
        className="grid gap-2 w-full h-full"
        style={{
          gridTemplateRows: `repeat(${gameState.size}, 1fr)`,
          gridTemplateColumns: `repeat(${gameState.size}, 1fr)`,
        }}
      >
        {Array(gameState.size)
          .fill(null)
          .map((_, row) =>
            Array(gameState.size)
              .fill(null)
              .map((_, col) => (
                <div
                  key={`cell-${row}-${col}`}
                  className="bg-gray-200 rounded-lg"
                />
              ))
          )}
      </div>

      <div
        className="absolute top-2 left-2 right-2 bottom-2 grid gap-2"
        style={{
          gridTemplateRows: `repeat(${gameState.size}, 1fr)`,
          gridTemplateColumns: `repeat(${gameState.size}, 1fr)`,
        }}
      >
        {gameState.tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} size={gameState.size} />
        ))}
      </div>
    </div>
  );
};
