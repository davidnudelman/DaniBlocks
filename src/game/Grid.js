export function canPlace(grid, cells, row, col) {
  const gridSize = grid.length;
  return cells.every(([dr, dc]) => {
    const r = row + dr; const c = col + dc;
    return r >= 0 && r < gridSize && c >= 0 && c < gridSize && grid[r][c] === null;
  });
}
export function placePiece(grid, cells, row, col, color) {
  const newGrid = grid.map(r => [...r]);
  cells.forEach(([dr, dc]) => { newGrid[row + dr][col + dc] = color; });
  return newGrid;
}
export function clearLines(grid) {
  const size = grid.length;
  let newGrid = grid.map(r => [...r]);
  const rowsToClear = []; const colsToClear = [];
  for (let r = 0; r < size; r++) { if (newGrid[r].every(cell => cell !== null)) rowsToClear.push(r); }
  for (let c = 0; c < size; c++) {
    let full = true; for (let r = 0; r < size; r++) { if (newGrid[r][c] === null) { full = false; break; } }
    if (full) colsToClear.push(c);
  }
  rowsToClear.forEach(r => { newGrid[r] = Array(size).fill(null); });
  colsToClear.forEach(c => { for (let r = 0; r < size; r++) { newGrid[r][c] = null; } });
  return { newGrid, linesCleared: rowsToClear.length + colsToClear.length };
}
export function hasValidMove(grid, queue) {
  const size = grid.length;
  return queue.some(piece => {
    if (!piece) return false;
    for (let r = 0; r < size; r++) { for (let c = 0; c < size; c++) { if (canPlace(grid, piece.cells, r, c)) return true; } }
    return false;
  });
}
