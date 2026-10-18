'use client';

import React, { useState } from 'react';
import { COMPANY_INFO } from '@/data/content';
import { sound } from '@/utils/audio';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip / Badge on Hover */}
      {hovered && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel-gold border border-amber-500/40 text-xs font-semibold text-slate-100 shadow-xl animate-fade-in pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Chat on WhatsApp: {COMPANY_INFO.phoneDisplay}</span>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        onClick={() => sound.playClick()}
        className="relative group p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
        aria-label="Direct WhatsApp Chat"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
};
