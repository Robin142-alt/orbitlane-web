'use client';

import React, { useState } from 'react';
import { FAQS_DATA } from '@/data/content';
import { sound } from '@/utils/audio';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    sound.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>TECHNICAL & ENGAGEMENT FAQS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-3">
          Frequently Answered <span className="text-gradient-gold">Questions</span>.
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          Clear answers on our architecture, deployment standards, code ownership, and regional integrations.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                isOpen
                  ? 'glass-panel-gold border-amber-500/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'glass-panel border-white/5 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${isOpen ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
