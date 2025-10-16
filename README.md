# 2048 Game

A production-ready implementation of the classic 2048 puzzle game built with React, TypeScript, and Tailwind CSS. This project demonstrates functional programming principles, clean architecture, and modern web development best practices.

## Features

- **Configurable Board Sizes**: Play on 4x4, 5x5, or 6x6 grids
- **Smooth Animations**: Polished UI with tile animations and transitions
- **Score Tracking**: Real-time score display with best score persistence
- **Keyboard Controls**: Full keyboard support (Arrow Keys and WASD)
- **Win/Lose Detection**: Automatic game state management
- **Continue After Win**: Keep playing after reaching 2048
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Best score persists across sessions

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd 2048
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. **Objective**: Combine tiles with the same number to reach 2048
2. **Controls**:
   - Use Arrow Keys (↑ ↓ ← →) or WASD to move tiles
   - All tiles slide in the chosen direction
3. **Merging**: When two tiles with the same number touch, they merge into one tile with their sum
4. **Scoring**: Each merge adds the new tile's value to your score
5. **New Tiles**: After each move, a new tile (2 or 4) appears randomly
6. **Winning**: Reach 2048 to win, or continue playing for a higher score
7. **Game Over**: The game ends when no more moves are possible

## Project Structure

```
src/
├── components/          # React components
│   ├── Board.tsx       # Game board grid and rendering
│   ├── Tile.tsx        # Individual tile component
│   ├── GameControls.tsx # Score display and controls
│   └── GameOverlay.tsx # Win/lose overlay screens
├── hooks/
│   └── useGame.ts      # Game state management hook
├── types/
│   └── game.ts         # TypeScript type definitions
├── utils/
│   └── gameLogic.ts    # Core game logic and algorithms
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and animations
```

## Architecture and Implementation

### Functional Programming Principles

1. **Pure Functions**: All game logic functions are pure (no side effects)
   - `createEmptyBoard`: Creates new board state
   - `addRandomTile`: Returns new tile without mutating board
   - `move`: Returns new game state based on direction

2. **Immutability**: State is never mutated directly
   - Board updates create new arrays
   - Tiles are recreated rather than modified
   - React state management ensures immutable updates

3. **Function Composition**: Complex operations built from simple functions
   - `moveTilesInLine`: Handles single line movement
   - `rotateBoard`: Transforms board for different directions
   - `move`: Composes multiple operations for complete game move

### Data Structures

1. **Board**: 2D array of Tile objects or null
   ```typescript
   type Board = (Tile | null)[][];
   ```

2. **Tile**: Object with unique ID, value, and position
   ```typescript
   type Tile = {
     id: string;
     value: number;
     position: { row: number; col: number };
     mergedFrom?: Tile[];
     isNew?: boolean;
   };
   ```

3. **GameState**: Complete game state object
   ```typescript
   type GameState = {
     board: Board;
     score: number;
     size: number;
     gameOver: boolean;
     gameWon: boolean;
     tiles: Tile[];
   };
   ```

### Algorithms

#### Tile Movement Algorithm
1. Extract non-empty tiles from line
2. Iterate and merge adjacent matching tiles
3. Fill remaining spaces with null
4. Update positions based on new indices

#### Board Rotation
- Rotates board 90° clockwise to reuse left movement logic
- All directions use the same movement algorithm after rotation
- Positions are recalculated after rotation

#### Random Tile Generation
1. Find all empty positions on board
2. Select random empty position
3. Generate tile with value 2 (90%) or 4 (10%)

#### Game Over Detection
- Check if any empty cells exist
- Check if any adjacent tiles can merge
- Game over when neither condition is true

## Key Design Decisions

### State Management
- Used React hooks (`useState`, `useEffect`) for local state
- Custom `useGame` hook encapsulates all game logic
- Separation of concerns: UI components vs game logic

### Component Architecture
- Small, focused components with single responsibility
- Props-based communication (no prop drilling)
- Reusable components (Tile, Board, GameControls, GameOverlay)

### Performance Optimizations
- `useCallback` for memoized event handlers
- Minimal re-renders with focused state updates
- Animation throttling to prevent input spam

### Extensibility
- Configurable board size through `GameConfig`
- Easy to add new features (undo, hints, etc.)
- Modular structure supports feature additions

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety and better DX
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

## Future Enhancements

### Possible Features to Add
1. **Undo/Redo**: Move history and ability to undo
2. **Hints**: Show optimal next move
3. **Themes**: Different color schemes
4. **Leaderboard**: Track high scores across users
5. **Animations**: More sophisticated tile movement animations
6. **Mobile Touch**: Swipe gestures for mobile
7. **Sound Effects**: Audio feedback for moves and merges
8. **Difficulty Modes**: Different winning values (4096, 8192)
9. **AI Player**: Auto-play mode with algorithm
10. **Multiplayer**: Competitive or cooperative modes

### Code Improvements
1. Add unit tests for game logic
2. Add integration tests for components
3. Implement performance monitoring
4. Add error boundaries
5. Optimize bundle size

## Interview Preparation Tips

### Be Ready to Discuss

1. **Design Decisions**
   - Why functional programming approach?
   - Component architecture choices
   - State management strategy
   - Data structure selection

2. **Algorithms**
   - Tile movement and merging algorithm
   - Board rotation technique
   - Random tile generation logic
   - Game over detection

3. **Data Structures**
   - 2D array for board
   - Tile objects with metadata
   - State management approach

4. **Functional Programming**
   - Pure functions in gameLogic.ts
   - Immutability patterns
   - Function composition
   - No side effects in core logic

5. **State Management**
   - React hooks usage
   - Custom hook pattern
   - State updates and re-renders
   - LocalStorage integration

6. **GUI Updates**
   - React rendering cycle
   - Component re-render optimization
   - Animation handling
   - Keyboard event management

### Common Feature Requests to Practice

1. **Add Undo Feature**
   - Maintain move history array
   - Store previous game states
   - Add undo button and logic
   - Handle edge cases (no moves to undo)

2. **Change Winning Value**
   - Modify GameConfig type
   - Update win condition check
   - Test with different values

3. **Add Touch Controls**
   - Implement touch event handlers
   - Calculate swipe direction
   - Add to useGame hook

4. **Add Animations**
   - CSS transitions for tile movement
   - Framer Motion integration
   - Stagger tile appearances

5. **Add Different Game Modes**
   - Time attack mode
   - Limited moves mode
   - Custom starting tiles

### Key Points to Emphasize

1. **Clean Code**: Modular, readable, well-organized
2. **Type Safety**: Full TypeScript usage with proper types
3. **Testability**: Pure functions, separated logic
4. **Maintainability**: Clear structure, documented decisions
5. **Scalability**: Easy to extend with new features
6. **Performance**: Optimized rendering and state updates

## License

MIT

## Author

Built for Exponent Energy technical screening round.
