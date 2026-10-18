'use client';

import React from 'react';

interface OrbitlaneLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
}

export const OrbitlaneLogo: React.FC<OrbitlaneLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  animated = true,
}) => {
  const sizeMap = {
    sm: { icon: 32, text: 'text-base', subtext: 'text-[9px]' },
    md: { icon: 42, text: 'text-xl', subtext: 'text-[10px]' },
    lg: { icon: 54, text: 'text-2xl', subtext: 'text-xs' },
    xl: { icon: 72, text: 'text-3xl', subtext: 'text-sm' },
  };

  const { icon: iconSize, text: textSize, subtext: subtextSize } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D-styled SVG Orbital Emblem */}
      <div className="relative flex items-center justify-center" style={{ width: iconSize, height: iconSize }}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full relative z-10 overflow-visible ${animated ? 'transition-transform duration-500 hover:rotate-12' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="orbitGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF0A0" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>

            <linearGradient id="orbitCyan" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0070F3" />
              <stop offset="50%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#A5F3FC" />
            </linearGradient>

            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="1" />
              <stop offset="50%" stopColor="#0070F3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#020409" stopOpacity="0" />
            </radialGradient>

            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Orbital Ring (Electric Cyan) */}
          <ellipse
            cx="50"
            cy="50"
            rx="43"
            ry="18"
            transform="rotate(-28 50 50)"
            stroke="url(#orbitCyan)"
            strokeWidth="2.5"
            strokeDasharray="4 2 12 2"
            opacity="0.9"
            filter="url(#glowFilter)"
          />

          {/* Satellite Node on Outer Orbit */}
          <circle
            cx="86"
            cy="36"
            r="3.5"
            fill="#00F0FF"
            filter="url(#glowFilter)"
          />

          {/* Inner Orbital Ring (Metallic Gold) */}
          <ellipse
            cx="50"
            cy="50"
            rx="34"
            ry="14"
            transform="rotate(45 50 50)"
            stroke="url(#orbitGold)"
            strokeWidth="2.5"
            opacity="0.95"
            filter="url(#glowFilter)"
          />

          {/* Satellite Node on Inner Orbit */}
          <circle
            cx="72"
            cy="70"
            r="3"
            fill="#FFDF00"
            filter="url(#glowFilter)"
          />

          {/* Core Energy Aura */}
          <circle cx="50" cy="50" r="14" fill="url(#coreGlow)" />

          {/* Central Cybernetic Nucleus */}
          <polygon
            points="50,38 60,45 60,55 50,62 40,55 40,45"
            fill="#050B1A"
            stroke="url(#orbitGold)"
            strokeWidth="1.8"
          />

          {/* Center Pulsing Light */}
          <circle cx="50" cy="50" r="4" fill="#00F0FF" />
          <circle cx="50" cy="50" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className={`font-black ${textSize} tracking-[0.16em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,240,255,0.3)]`}>
              ORBIT<span className="text-gradient-gold">LANE</span>
            </span>
          </div>
          <span className={`font-semibold ${subtextSize} tracking-[0.38em] uppercase text-cyan-400/80 -mt-0.5`}>
            TECHNOLOGIES
          </span>
        </div>
      )}
    </div>
  );
};
