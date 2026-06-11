import React, { useRef, useEffect, useState } from 'react';
import { useGameStore } from './game/state';
import Grid from './components/Grid';
import Piece from './components/Piece';
import Mascot from './components/Mascot';
import { useDragAndDrop } from './ui/DragDrop';
import { audioManager } from './ui/Audio';
import { WORLDS } from './game/Worlds';
import { LEVELS } from './game/Levels';

function App() {
  const { screen, setScreen, startLevel, score, stars, queue, holder, level, world, undosLeft, undo, gameOver, resetGame, toggleHolder, progress } = useGameStore();
  const gridRef = useRef(null);
  const [mascotText, setMascotText] = useState("Let's play!");
  const { activePiece, dragPos, ghostPos, startDrag, onDragMove, endDrag } = useDragAndDrop(gridRef);

  useEffect(() => {
    if (activePiece) {
      const handleMove = (e) => onDragMove(e);
      const handleEnd = () => { if (endDrag()) audioManager.playClick(); };
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [activePiece, onDragMove, endDrag]);

  const worldData = WORLDS[world];

  if (screen === 'menu') return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 safe-top safe-bottom" style={{ background: WORLDS.candy.theme.bg }}>
      <Mascot mood="idle" bubbleText="Welcome!" />
      <h1 className="text-6xl font-fredoka font-bold text-candy-pink mt-8 mb-4 drop-shadow-xl tracking-tight">DaniBlocks</h1>
      <p className="text-xl text-candy-pink/60 mb-12 text-center max-w-xs font-medium">A magical puzzle adventure!</p>
      <button
        onClick={() => setScreen('levelSelect')}
        className="bg-candy-pink text-white px-12 py-5 rounded-full text-2xl font-black shadow-[0_10px_0_rgb(230,80,140)] active:shadow-none active:translate-y-2 transition-all hover:scale-105"
      >
        PLAY NOW
      </button>
    </div>
  );

  if (screen === 'levelSelect') return (
    <div className="flex flex-col items-center min-h-screen w-full p-6 safe-top safe-bottom overflow-y-auto" style={{ background: WORLDS.candy.theme.bg }}>
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <button onClick={() => setScreen('menu')} className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl font-bold text-candy-pink shadow-sm">← Back</button>
        <h2 className="text-3xl font-fredoka font-bold text-candy-pink">Worlds</h2>
        <div className="w-12" />
      </div>
      <div className="grid grid-cols-4 gap-4 w-full max-w-md pb-12">
        {Object.keys(LEVELS).map((lvl) => {
          const lvlStars = progress[lvl]?.stars || 0;
          const isLocked = lvl > 1 && !progress[lvl - 1] && lvl !== "1"; // Simplified locking logic
          return (
            <button
              key={lvl}
              onClick={() => startLevel(parseInt(lvl))}
              className={`aspect-square bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex flex-col items-center justify-center font-bold text-candy-pink active:scale-90 transition-all relative border border-white/40 ${isLocked ? 'opacity-50 grayscale' : 'hover:scale-105'}`}
            >
              <span className="text-2xl">{lvl}</span>
              <div className="flex gap-0.5 mt-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={`text-[10px] ${i < lvlStars ? 'text-candy-star drop-shadow-[0_0_2px_rgba(255,215,0,0.5)]' : 'text-candy-empty opacity-30'}`}>★</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full text-candy-pink safe-top safe-bottom p-4 overflow-hidden touch-none" style={{ background: worldData.theme.bg }}>
      {/* Top Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-4 bg-white/30 backdrop-blur-md px-4 py-3 rounded-[2rem] border border-white/20 shadow-xl">
        <button onClick={() => setScreen('levelSelect')} className="font-bold bg-white/40 p-2 rounded-xl">←</button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-candy-pink/80 font-black">Level {level}</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`text-2xl transition-all duration-500 ${i < stars ? 'text-candy-star scale-110 drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]' : 'text-candy-empty opacity-30 scale-90'}`}>★</span>
            ))}
          </div>
        </div>
        <div className="bg-white/80 px-5 py-2 rounded-2xl shadow-inner font-black text-xl min-w-[90px] text-center text-candy-pink">
          {score.toLocaleString()}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full gap-6">
        <Grid gridRef={gridRef} activePiece={activePiece} ghostPos={ghostPos} />

        <div className="w-full max-w-md flex justify-between items-end px-4">
          <button
            onClick={() => { undo(); audioManager.playPop(); }}
            disabled={undosLeft === 0}
            className={`flex flex-col items-center gap-1 p-3 rounded-3xl font-bold shadow-xl transition-all border-b-4 ${undosLeft > 0 ? 'bg-white border-gray-200 active:border-b-0 active:translate-y-1' : 'bg-gray-200 opacity-50 cursor-not-allowed border-gray-300'}`}
          >
            <span className="text-2xl">↩</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-xs transition-opacity ${i < undosLeft ? 'opacity-100' : 'opacity-20'}`}>❤️</span>
              ))}
            </div>
          </button>

          {level >= 11 && (
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-40 mb-2">Saved Piece</span>
              <div
                className={`w-20 h-20 bg-white/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-candy-pink/30 flex items-center justify-center transition-all shadow-xl group overflow-hidden ${!holder ? 'opacity-60' : 'shadow-inner'}`}
                onClick={() => activePiece && toggleHolder(activePiece.index)}
              >
                {holder && <Piece cells={holder.cells} color={holder.color} size={14} className="group-hover:scale-110 transition-transform" />}
              </div>
            </div>
          )}

          <Mascot mood={gameOver ? 'sad' : 'idle'} bubbleText={mascotText} />
        </div>
      </div>

      {/* Piece Tray */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl p-6 rounded-[3rem] mt-6 flex justify-around items-center min-h-[160px] relative border border-white/30 shadow-2xl ring-4 ring-black/5">
        {queue.map((piece, i) => (
          <div
            key={piece?.id || i}
            className="flex-1 flex justify-center items-center h-full"
            onMouseDown={(e) => piece && startDrag(piece, i, e)}
            onTouchStart={(e) => piece && startDrag(piece, i, e)}
          >
            {piece && (
              <div className={`transition-all duration-300 ${activePiece?.index === i ? 'opacity-0 scale-50' : 'opacity-100 scale-100 hover:scale-115 active:scale-90 cursor-grab'}`}>
                <Piece cells={piece.cells} color={piece.color} size={24} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Dragging Piece */}
      {activePiece && (
        <div
          className="fixed pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: dragPos.x, top: dragPos.y - 100 }}
        >
          <div className="scale-[1.7] opacity-100 drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] transition-transform">
            <Piece cells={activePiece.cells} color={activePiece.color} size={30} />
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 z-[200] animate-in fade-in duration-300">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-sm w-full border-4 border-candy-pink/20 animate-bounce-short">
            <div className="mb-6"><Mascot mood="sad" /></div>
            <h2 className="text-4xl font-fredoka font-black mb-2 text-candy-pink">Out of moves!</h2>
            <p className="text-xl mb-8 font-medium text-gray-500">You scored <span className="text-candy-pink font-bold">{score.toLocaleString()}</span></p>
            <button
              onClick={() => { resetGame(); audioManager.playPop(); }}
              className="w-full bg-candy-pink text-white px-8 py-5 rounded-full text-2xl font-black shadow-[0_8px_0_rgb(230,80,140)] active:shadow-none active:translate-y-2 transition-all"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
