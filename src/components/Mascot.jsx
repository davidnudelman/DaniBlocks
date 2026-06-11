import React from 'react';
const Mascot = ({ mood = 'idle', bubbleText }) => (
  <div className="relative flex flex-col items-center animate-bounce-slow">
    {bubbleText && (
      <div className="absolute -top-16 bg-white px-4 py-2 rounded-2xl shadow-md text-candy-pink font-bold text-sm whitespace-nowrap animate-fade-in-up">
        {bubbleText}<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
      </div>
    )}
    <div className="w-16 h-16 bg-candy-pink rounded-2xl relative shadow-lg flex items-center justify-center">
      <div className="flex gap-3 mt-1">
        <div className="w-3 h-3 bg-white rounded-full relative"><div className={`w-1.5 h-1.5 bg-black rounded-full absolute top-0.5 right-0.5 ${mood === 'sad' ? 'translate-y-1' : ''}`} /></div>
        <div className="w-3 h-3 bg-white rounded-full relative"><div className={`w-1.5 h-1.5 bg-black rounded-full absolute top-0.5 right-0.5 ${mood === 'sad' ? 'translate-y-1' : ''}`} /></div>
      </div>
      <div className={`absolute bottom-3 w-4 h-1.5 bg-white/40 rounded-full ${mood === 'sad' ? 'rotate-180 mb-1' : ''}`} />
      <div className="absolute -left-2 top-8 w-3 h-1 bg-candy-pink/80 rounded-full -rotate-45" /><div className="absolute -right-2 top-8 w-3 h-1 bg-candy-pink/80 rounded-full rotate-45" />
    </div>
  </div>
);
export default Mascot;
