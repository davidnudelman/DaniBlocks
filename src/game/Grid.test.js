import { describe, it, expect } from 'vitest';
import { canPlace, placePiece, clearLines } from './Grid';

describe('Grid Logic', () => {
  const emptyGrid = (size) => Array(size).fill(null).map(() => Array(size).fill(null));

  it('should allow placing a piece in an empty grid', () => {
    const grid = emptyGrid(8);
    const cells = [[0, 0], [0, 1]];
    expect(canPlace(grid, cells, 0, 0)).toBe(true);
  });

  it('should not allow placing a piece outside the grid', () => {
    const grid = emptyGrid(8);
    const cells = [[0, 0], [0, 1]];
    expect(canPlace(grid, cells, 0, 7)).toBe(false);
  });

  it('should clear full rows and columns', () => {
    let grid = emptyGrid(3);
    grid[0] = ['red', 'red', 'red'];
    grid[1][0] = 'blue';
    grid[2][0] = 'blue';

    const { newGrid, linesCleared } = clearLines(grid);
    expect(linesCleared).toBe(2); // 1 row, 1 column
    expect(newGrid[0][0]).toBe(null);
    expect(newGrid[1][1]).toBe(null);
  });
});
