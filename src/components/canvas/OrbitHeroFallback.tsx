'use client';

import React from 'react';

export const OrbitHeroFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[80px]" />

      {/* SVG Multi-Layer Orbital Simulation */}
      <svg
        className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] relative z-10"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fallbackGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0A0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6710" />
          </linearGradient>
          <linearGradient id="fallbackCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Outer Ring */}
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="90"
          transform="rotate(-30 250 250)"
          stroke="url(#fallbackCyan)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="animate-spin-slow origin-center opacity-70"
        />

        {/* Middle Ring */}
        <ellipse
          cx="250"
          cy="250"
          rx="160"
          ry="70"
          transform="rotate(45 250 250)"
          stroke="url(#fallbackGold)"
          strokeWidth="2"
          className="animate-spin-reverse-slow origin-center opacity-85"
        />

        {/* Inner Ring */}
        <ellipse
          cx="250"
          cy="250"
          rx="110"
          ry="48"
          transform="rotate(-15 250 250)"
          stroke="url(#fallbackCyan)"
          strokeWidth="1.5"
          className="animate-spin-slow origin-center opacity-80"
        />

        {/* Center Geometric Core */}
        <polygon
          points="250,215 285,235 285,265 250,285 215,265 215,235"
          fill="#050B1A"
          stroke="url(#fallbackGold)"
          strokeWidth="2.5"
          className="animate-pulse-glow origin-center"
        />

        {/* Glowing Center Point */}
        <circle cx="250" cy="250" r="16" fill="#00F0FF" opacity="0.4" className="animate-ping" />
        <circle cx="250" cy="250" r="8" fill="#00F0FF" />
        <circle cx="250" cy="250" r="3" fill="#FFFFFF" />

        {/* Orbiting Satellites */}
        <circle cx="120" cy="210" r="5" fill="#FFDF00" />
        <circle cx="390" cy="280" r="4" fill="#00F0FF" />
        <circle cx="290" cy="140" r="4" fill="#38BDF8" />
      </svg>
    </div>
  );
};
