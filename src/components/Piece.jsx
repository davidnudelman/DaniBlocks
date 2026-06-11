import React from 'react';
const Piece = ({ cells, color, size = 30, className = "" }) => {
  const minR = Math.min(...cells.map(([r]) => r)); const maxR = Math.max(...cells.map(([r]) => r));
  const minC = Math.min(...cells.map(([c]) => c)); const maxC = Math.max(...cells.map(([c]) => c));
  const rows = maxR - minR + 1; const cols = maxC - minC + 1;
  return (
    <div className={`relative ${className}`} style={{ width: cols * size, height: rows * size }}>
      {cells.map(([r, c], i) => (
        <div key={i} className="absolute rounded-cell shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-1px_-1px_2px_rgba(0,0,0,0.2)]"
          style={{ width: size - 2, height: size - 2, left: (c - minC) * size + 1, top: (r - minR) * size + 1, backgroundColor: color }} />
      ))}
    </div>
  );
};
export default Piece;
