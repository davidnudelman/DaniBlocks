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
  const gridRef = useRef(null); const [mascotText, setMascotText] = useState("Let's play!");
  const { activePiece, dragPos, ghostPos, startDrag, onDragMove, endDrag } = useDragAndDrop(gridRef);
  useEffect(() => {
    if (activePiece) {
      const handleMove = (e) => onDragMove(e);
      const handleEnd = () => { if (endDrag()) audioManager.playClick(); };
      window.addEventListener('mousemove', handleMove); window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false }); window.addEventListener('touchend', handleEnd);
      return () => {
        window.removeEventListener('mousemove', handleMove); window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', handleMove); window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [activePiece, onDragMove, endDrag]);
  if (screen === 'menu') return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-candy-bg p-8 safe-top safe-bottom">
      <Mascot mood="idle" bubbleText="Welcome!" /><h1 className="text-5xl font-fredoka font-bold text-candy-pink mt-8 mb-4 drop-shadow-sm">DaniBlocks</h1>
      <p className="text-xl text-candy-pink/60 mb-12 text-center max-w-xs">A fun puzzle game for kids!</p>
      <button onClick={() => setScreen('levelSelect')} className="bg-candy-pink text-white px-12 py-4 rounded-full text-2xl font-bold shadow-xl active:scale-95 transition-transform">Play Game</button>
    </div>
  );
  if (screen === 'levelSelect') return (
    <div className="flex flex-col items-center min-h-screen w-full bg-candy-bg p-6 safe-top safe-bottom overflow-y-auto">
      <div className="w-full max-w-md flex justify-between items-center mb-8"><button onClick={() => setScreen('menu')} className="text-candy-pink font-bold text-lg">← Back</button><h2 className="text-2xl font-fredoka font-bold text-candy-pink">Select Level</h2><div className="w-8" /></div>
      <div className="grid grid-cols-4 gap-4 w-full max-w-md">{Object.keys(LEVELS).map((lvl) => {
        const lvlStars = progress[lvl]?.stars || 0;
        return (
          <button key={lvl} onClick={() => startLevel(parseInt(lvl))} className="aspect-square bg-white rounded-2xl shadow-md flex flex-col items-center justify-center font-bold text-candy-pink active:scale-90 transition-transform relative">
            <span className="text-xl">{lvl}</span>
            <div className="flex gap-0.5 mt-1">
              {[...Array(3)].map((_, i) => (<span key={i} className={`text-[8px] ${i < lvlStars ? 'text-candy-star' : 'text-candy-empty opacity-30'}`}>★</span>))}
            </div>
          </button>
        );
      })}</div>
    </div>
  );
  const worldData = WORLDS[world];
  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full text-candy-pink safe-top safe-bottom p-4 overflow-hidden touch-none" style={{ backgroundColor: worldData.theme.bg }}>
      <div className="w-full max-w-md flex justify-between items-center mb-2"><button onClick={() => setScreen('levelSelect')} className="font-bold">← Menu</button><div className="flex flex-col items-center"><span className="text-xs uppercase opacity-50 font-bold">Level {level}</span><div className="flex gap-1">{[...Array(3)].map((_, i) => (<span key={i} className={`text-xl ${i < stars ? 'text-candy-star' : 'text-candy-empty opacity-30'}`}>★</span>))}</div></div><div className="bg-white/80 px-4 py-1 rounded-full shadow-sm font-bold min-w-[80px] text-center">{score}</div></div>
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-4"><Grid gridRef={gridRef} activePiece={activePiece} ghostPos={ghostPos} /><div className="w-full max-w-md flex justify-between items-center px-4"><button onClick={() => { undo(); audioManager.playPop(); }} disabled={undosLeft === 0} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-md transition-all ${undosLeft > 0 ? 'bg-white active:scale-95' : 'bg-gray-200 opacity-50 cursor-not-allowed'}`}><span>↩</span><span className="flex gap-1">{[...Array(undosLeft)].map((_, i) => (<span key={i} className="text-xs">❤️</span>))}</span></button>
      {level >= 11 && (<div className="flex flex-col items-center"><span className="text-[10px] font-bold uppercase opacity-40 mb-1">Holder</span><div className={`w-14 h-14 bg-white/60 rounded-2xl border-2 border-dashed border-candy-pink/30 flex items-center justify-center transition-all ${!holder ? 'opacity-50' : 'shadow-inner'}`} onClick={() => activePiece && toggleHolder(activePiece.index)}>{holder && <Piece cells={holder.cells} color={holder.color} size={10} />}</div></div>)}
      <Mascot mood={gameOver ? 'sad' : 'idle'} bubbleText={mascotText} /></div></div>
      <div className="w-full max-w-md bg-white/40 p-4 rounded-3xl mt-4 flex justify-around items-center min-h-[140px] relative">{queue.map((piece, i) => (<div key={piece?.id || i} className="flex-1 flex justify-center items-center h-full" onMouseDown={(e) => piece && startDrag(piece, i, e)} onTouchStart={(e) => piece && startDrag(piece, i, e)}>{piece && (<div className={`transition-all ${activePiece?.index === i ? 'opacity-0 scale-50' : 'opacity-100 scale-100 hover:scale-110 active:scale-95 cursor-grab'}`}><Piece cells={piece.cells} color={piece.color} size={22} /></div>)}</div>))}</div>
      {activePiece && (<div className="fixed pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2" style={{ left: dragPos.x, top: dragPos.y - 80 }}><div className="scale-150 opacity-90 drop-shadow-2xl"><Piece cells={activePiece.cells} color={activePiece.color} size={30} /></div></div>)}
      {gameOver && (<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 z-[200]"><div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-xs w-full animate-bounce-short"><h2 className="text-3xl font-fredoka font-bold mb-2">Game Over!</h2><p className="text-lg mb-6">You earned {score} points!</p><button onClick={() => { resetGame(); audioManager.playPop(); }} className="bg-candy-pink text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg active:scale-95 transition-transform">Try Again?</button></div></div>)}
    </div>
  );
}
export default App;
