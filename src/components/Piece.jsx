import React from 'react';

const Cell = ({ color, size, className = "" }) => (
  <div
    className={`relative rounded-lg shadow-md overflow-hidden w-full h-full ${className}`}
    style={{
      backgroundColor: color,
      aspectRatio: '1/1'
    }}
  >
    {/* Main 3D effect gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20" />

    {/* Top highlight shine */}
    <div className="absolute top-0.5 left-0.5 right-0.5 h-1/3 bg-gradient-to-b from-white/60 to-transparent rounded-t-sm" />

    {/* Bottom inner shadow */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 blur-[1px]" />

    {/* Left inner highlight */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 blur-[0.5px]" />

    {/* Glossy overlay */}
    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-45 pointer-events-none" />
  </div>
);

const Piece = ({ cells, color, size = 30, className = "" }) => {
  const minR = Math.min(...cells.map(([r]) => r));
  const maxR = Math.max(...cells.map(([r]) => r));
  const minC = Math.min(...cells.map(([c]) => c));
  const maxC = Math.max(...cells.map(([c]) => c));
  const rows = maxR - minR + 1;
  const cols = maxC - minC + 1;

  return (
    <div className={`relative ${className}`} style={{ width: cols * size, height: rows * size }}>
      {cells.map(([r, c], i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: (c - minC) * size + 1,
            top: (r - minR) * size + 1,
            width: size - 2,
            height: size - 2
          }}
        >
          <Cell color={color} />
        </div>
      ))}
    </div>
  );
};

export { Cell };
export default Piece;
