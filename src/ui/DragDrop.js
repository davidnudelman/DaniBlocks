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
    const rect = gridRef.current.getBoundingClientRect(); const cellSize = rect.width / grid.length;
    const x = pos.clientX - rect.left; const y = pos.clientY - rect.top;
    const col = Math.floor(x / cellSize); const row = Math.floor(y / cellSize);
    if (row >= 0 && row < grid.length && col >= 0 && col < grid.length) {
      if (canPlace(grid, activePiece.cells, row, col)) setGhostPos({ row, col }); else setGhostPos(null);
    } else setGhostPos(null);
  }, [activePiece, grid, gridRef]);
  const endDrag = useCallback(() => {
    let placed = false; if (activePiece && ghostPos) { placePieceAt(activePiece.index, ghostPos.row, ghostPos.col); placed = true; }
    setActivePiece(null); setGhostPos(null); return placed;
  }, [activePiece, ghostPos, placePieceAt]);
  return { activePiece, dragPos, ghostPos, startDrag, onDragMove, endDrag };
};
