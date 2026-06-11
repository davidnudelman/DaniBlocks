import React from 'react';
import { useGameStore } from '../game/state';
import { Cell } from './Piece';

const Grid = ({ activePiece, ghostPos, gridRef }) => {
  const grid = useGameStore((state) => state.grid);
  const size = grid.length;

  return (
    <div ref={gridRef} className="bg-white/10 backdrop-blur-md p-3 rounded-[2rem] shadow-2xl border border-white/20 relative touch-none ring-8 ring-black/5">
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {grid.map((row, r) => row.map((cell, c) => {
          const isGhost = activePiece && ghostPos && activePiece.cells.some(([dr, dc]) => ghostPos.row + dr === r && ghostPos.col + dc === c);

          return (
            <div
              key={`${r}-${c}`}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-black/5 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center shadow-inner"
            >
              {cell && (
                <div className="w-full h-full p-0.5">
                   <Cell color={cell} />
                </div>
              )}
              {isGhost && (
                <div className="absolute inset-0 rounded-xl bg-white/30 border-2 border-white/50 z-0 scale-90 animate-pulse" />
              )}
            </div>
          );
        }))}
      </div>
    </div>
  );
};

export default Grid;
