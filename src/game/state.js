import { create } from 'zustand';
import { PIECES, TIER_POOLS } from './Piece';
import { clearLines, hasValidMove } from './Grid';
import { LEVELS } from './Levels';
import { WORLDS } from './Worlds';

const createEmptyGrid = (size) => Array(size).fill(null).map(() => Array(size).fill(null));

const getRandomPiece = (tier) => {
  const pool = TIER_POOLS[tier] || TIER_POOLS[1];
  const pieceKey = pool[Math.floor(Math.random() * pool.length)];
  const colors = ['#FF6B9D', '#FFC947', '#A8E6CF', '#FF8B94', '#B5A9FF'];
  return { ...PIECES[pieceKey], id: Math.random().toString(36).substr(2, 9), color: colors[Math.floor(Math.random() * colors.length)] };
};

const getSavedProgress = () => {
  try {
    const saved = localStorage.getItem('daniblocks_progress');
    return saved ? JSON.parse(saved) : {};
  } catch (e) { return {}; }
};

export const useGameStore = create((set, get) => ({
  screen: 'menu', grid: createEmptyGrid(8), queue: [], holder: null, holderUsedThisTurn: false, undosLeft: 3, score: 0, stars: 0, level: 1, world: 'candy', gameOver: false, history: [],
  progress: getSavedProgress(),

  setScreen: (screen) => set({ screen }),

  startLevel: (levelId) => {
    const levelData = LEVELS[levelId];
    const size = levelId >= 61 ? 10 : 8;
    let newGrid = createEmptyGrid(size);
    levelData.preFill.forEach(({ r, c, color }) => { newGrid[r][c] = color; });
    set({ screen: 'game', level: levelId, world: levelData.world, grid: newGrid, queue: [getRandomPiece(levelData.tier), getRandomPiece(levelData.tier), getRandomPiece(levelData.tier)], score: 0, stars: 0, undosLeft: levelId <= 30 ? 3 : levelId <= 45 ? 2 : 1, gameOver: false, history: [], holder: null, holderUsedThisTurn: false });
  },

  placePieceAt: (pieceIndex, row, col) => {
    const { grid, queue, score, history, undosLeft, level, progress } = get();
    const piece = queue[pieceIndex]; const levelData = LEVELS[level];
    const newHistory = [...history, { grid: JSON.parse(JSON.stringify(grid)), queue: [...queue], score, undosLeft }];
    let newGrid = grid.map(r => [...r]);
    piece.cells.forEach(([dr, dc]) => { newGrid[row + dr][col + dc] = piece.color; });
    const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);

    let points = 10;
    if (linesCleared === 1) points += 100; else if (linesCleared === 2) points += 250; else if (linesCleared === 3) points += 500; else if (linesCleared >= 4) points += 1000;

    const newScore = score + points;
    const newQueue = [...queue]; newQueue[pieceIndex] = null;

    let stars = 0;
    if (newScore >= levelData.targets.stars3) stars = 3;
    else if (newScore >= levelData.targets.stars2) stars = 2;
    else if (newScore >= levelData.targets.stars1) stars = 1;

    if (stars > 0) {
      const currentLevelProgress = progress[level] || { stars: 0, score: 0 };
      if (stars > currentLevelProgress.stars || newScore > currentLevelProgress.score) {
        const newProgress = { ...progress, [level]: { stars: Math.max(stars, currentLevelProgress.stars), score: Math.max(newScore, currentLevelProgress.score) } };
        localStorage.setItem('daniblocks_progress', JSON.stringify(newProgress));
        set({ progress: newProgress });
      }
    }

    const remainingInQueue = newQueue.filter(p => p !== null).length;
    let finalQueue = newQueue; if (remainingInQueue === 0) finalQueue = [getRandomPiece(levelData.tier), getRandomPiece(levelData.tier), getRandomPiece(levelData.tier)];
    const newGameOver = !hasValidMove(clearedGrid, finalQueue);
    set({ grid: clearedGrid, queue: finalQueue, score: newScore, stars, history: newHistory, gameOver: newGameOver, holderUsedThisTurn: false });
  },

  toggleHolder: (pieceIndex) => {
    const { holder, queue, holderUsedThisTurn, level } = get();
    if (level < 11 || holderUsedThisTurn) return;
    const newQueue = [...queue]; const pieceToHold = newQueue[pieceIndex];
    if (holder) { newQueue[pieceIndex] = holder; set({ holder: pieceToHold, queue: newQueue, holderUsedThisTurn: true }); }
    else { newQueue[pieceIndex] = null; set({ holder: pieceToHold, queue: newQueue, holderUsedThisTurn: true }); if (newQueue.every(p => p === null)) set({ queue: [getRandomPiece(LEVELS[level].tier), getRandomPiece(LEVELS[level].tier), getRandomPiece(LEVELS[level].tier)] }); }
  },

  undo: () => {
    const { history, undosLeft } = get();
    if (undosLeft > 0 && history.length > 0) { const lastState = history[history.length - 1]; set({ ...lastState, undosLeft: undosLeft - 1, history: history.slice(0, -1), gameOver: false }); }
  },
  resetGame: () => get().startLevel(get().level)
}));
