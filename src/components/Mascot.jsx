import React from 'react';

const Mascot = ({ mood = 'idle', bubbleText }) => (
  <div className="relative flex flex-col items-center animate-bounce-slow group">
    {bubbleText && (
      <div className="absolute -top-16 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl text-candy-pink font-bold text-sm whitespace-nowrap animate-fade-in-up border border-white/20 z-50">
        {bubbleText}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/90" />
      </div>
    )}

    <div className="relative w-20 h-20 perspective-1000">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <radialGradient id="mascotBody" cx="50%" cy="40%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#FF8DB3" />
            <stop offset="100%" stopColor="#FF6B9D" />
          </radialGradient>
          <linearGradient id="eyeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Body */}
        <rect
          x="10" y="10" width="80" height="80" rx="24"
          fill="url(#mascotBody)"
          className="transition-all duration-500"
          filter="url(#shadow)"
        />

        {/* Glossy Reflection */}
        <path
          d="M30 15 Q 50 12 70 15 Q 85 18 85 40 Q 85 20 60 20 Q 30 20 15 40 Q 15 18 30 15"
          fill="white" opacity="0.2"
        />

        {/* Eyes */}
        <g className={`transition-transform duration-300 ${mood === 'sad' ? 'translate-y-2' : ''}`}>
          {/* Left Eye */}
          <g transform="translate(32, 45)">
            <circle r="8" fill="white" />
            <circle r="4.5" fill="black" cx={mood === 'sad' ? 0 : 1} cy={mood === 'sad' ? 2 : 0} />
            <circle r="2" fill="white" cx="-2" cy="-2" opacity="0.8" />
          </g>
          {/* Right Eye */}
          <g transform="translate(68, 45)">
            <circle r="8" fill="white" />
            <circle r="4.5" fill="black" cx={mood === 'sad' ? 0 : 1} cy={mood === 'sad' ? 2 : 0} />
            <circle r="2" fill="white" cx="-2" cy="-2" opacity="0.8" />
          </g>
        </g>

        {/* Mouth */}
        {mood === 'sad' ? (
          <path d="M40 75 Q 50 65 60 75" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        ) : (
          <path d="M40 70 Q 50 80 60 70" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" className="animate-pulse" />
        )}

        {/* Blush */}
        <circle cx="20" cy="55" r="5" fill="#FFB6C1" opacity="0.4" />
        <circle cx="80" cy="55" r="5" fill="#FFB6C1" opacity="0.4" />

        {/* Arms */}
        <path
          d="M5 45 Q -5 45 -2 55"
          fill="none" stroke="#FF6B9D" strokeWidth="4" strokeLinecap="round"
          className={mood === 'idle' ? 'animate-bounce' : ''}
        />
        <path
          d="M95 45 Q 105 45 102 55"
          fill="none" stroke="#FF6B9D" strokeWidth="4" strokeLinecap="round"
          className={mood === 'idle' ? 'animate-bounce' : ''}
        />
      </svg>
    </div>
  </div>
);

export default Mascot;
