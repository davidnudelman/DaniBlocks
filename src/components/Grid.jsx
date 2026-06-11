import React from 'react';
import { useGameStore } from '../game/state';
const Grid = ({ activePiece, ghostPos, gridRef }) => {
  const grid = useGameStore((state) => state.grid);
  const size = grid.length;
  return (
    <div ref={gridRef} className="bg-candy-grid p-2 rounded-grid shadow-lg relative touch-none">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {grid.map((row, r) => row.map((cell, c) => {
          const isGhost = activePiece && ghostPos && activePiece.cells.some(([dr, dc]) => ghostPos.row + dr === r && ghostPos.col + dc === c);
          return (
            <div key={`${r}-${c}`} className="w-10 h-10 sm:w-12 sm:h-12 bg-candy-bg/50 rounded-cell border border-candy-grid/20 relative">
              {cell && <div className="absolute inset-0 rounded-cell shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-1px_-1px_2px_rgba(0,0,0,0.2)] z-10" style={{ backgroundColor: cell }} />}
              {isGhost && <div className="absolute inset-0 rounded-cell bg-white/40 border-2 border-white/60 z-0 scale-90" />}
            </div>
          );
        }))}
      </div>
    </div>
  );
};
export default Grid;
