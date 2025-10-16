import { Tile as TileType } from '../types/game';

interface TileProps {
  tile: TileType;
  size: number;
}

const getTileColor = (value: number): string => {
  const colors: Record<number, string> = {
    2: 'bg-amber-100 text-gray-800',
    4: 'bg-amber-200 text-gray-800',
    8: 'bg-orange-400 text-white',
    16: 'bg-orange-500 text-white',
    32: 'bg-orange-600 text-white',
    64: 'bg-red-500 text-white',
    128: 'bg-yellow-400 text-white',
    256: 'bg-yellow-500 text-white',
    512: 'bg-yellow-600 text-white',
    1024: 'bg-yellow-700 text-white',
    2048: 'bg-yellow-800 text-white',
  };
  return colors[value] || 'bg-gray-800 text-white';
};

export const Tile = ({ tile, size }: TileProps) => {
  const getTileClasses = () => {
    switch (size) {
      case 4:
        return 'text-3xl';
      case 5:
        return 'text-2xl';
      case 6:
        return 'text-xl';
      default:
        return 'text-3xl';
    }
  };

  const colorClass = getTileColor(tile.value);

  return (
    <div
      className={`${getTileClasses()} ${colorClass} rounded-lg flex items-center justify-center font-bold shadow-md transition-all duration-150 ${
        tile.isNew ? 'animate-scale-in' : ''
      }`}
      style={{
        gridRow: tile.position.row + 1,
        gridColumn: tile.position.col + 1,
      }}
    >
      {tile.value}
    </div>
  );
};
