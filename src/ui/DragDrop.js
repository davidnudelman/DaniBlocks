import { useState, useCallback } from 'react';
import { useGameStore } from '../game/state';
import { canPlace } from '../game/Grid';
export const useDragAndDrop = (gridRef) => {
  const [activePiece, setActivePiece] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [ghostPos, setGhostPos] = useState(null);
  const grid = useGameStore((state) => state.grid);
  const placePieceAt = useGameStore((state) => state.placePieceAt);
  const startDrag = useCallback((piece, index, e) => {
    e.preventDefault(); const pos = e.touches ? e.touches[0] : e;
    setActivePiece({ ...piece, index }); setDragPos({ x: pos.clientX, y: pos.clientY });
  }, []);
  const onDragMove = useCallback((e) => {
    if (!activePiece) return;
    const pos = e.touches ? e.touches[0] : e; setDragPos({ x: pos.clientX, y: pos.clientY });
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const style = window.getComputedStyle(gridRef.current);
    const padding = parseFloat(style.paddingLeft);
    const innerGrid = gridRef.current.querySelector('.grid');
    const gap = innerGrid ? parseFloat(window.getComputedStyle(innerGrid).gap) : 0;

    const gridSize = grid.length;
    const cellSize = (rect.width - 2 * padding - (gridSize - 1) * gap) / gridSize;

    // The dragged piece is offset by -80px vertically in App.jsx
    const visualX = pos.clientX - rect.left - padding;
    const visualY = (pos.clientY - 80) - rect.top - padding;

    const minR = Math.min(...activePiece.cells.map(([r]) => r));
    const maxR = Math.max(...activePiece.cells.map(([r]) => r));
    const minC = Math.min(...activePiece.cells.map(([c]) => c));
    const maxC = Math.max(...activePiece.cells.map(([c]) => c));

    const centerCol = (visualX - cellSize / 2) / (cellSize + gap);
    const centerRow = (visualY - cellSize / 2) / (cellSize + gap);

    const col = Math.round(centerCol - (minC + maxC) / 2);
    const row = Math.round(centerRow - (minR + maxR) / 2);

    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      if (canPlace(grid, activePiece.cells, row, col)) setGhostPos({ row, col }); else setGhostPos(null);
    } else setGhostPos(null);
  }, [activePiece, grid, gridRef]);
  const endDrag = useCallback(() => {
    let placed = false; if (activePiece && ghostPos) { placePieceAt(activePiece.index, ghostPos.row, ghostPos.col); placed = true; }
    setActivePiece(null); setGhostPos(null); return placed;
  }, [activePiece, ghostPos, placePieceAt]);
  return { activePiece, dragPos, ghostPos, startDrag, onDragMove, endDrag };
};
