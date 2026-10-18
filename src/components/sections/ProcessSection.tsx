'use client';

import React, { useState } from 'react';
import { PROCESS_STEPS } from '@/data/content';
import { sound } from '@/utils/audio';
import { Compass, Layers, Terminal, Shield, Rocket, CheckCircle2, Clock, GitCommit } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      default:
        return <GitCommit className="w-5 h-5" />;
    }
  };

  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <GitCommit className="w-3.5 h-3.5" />
          <span>ENGINEERING LIFECYCLE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
          From Strategic Vision to <span className="text-gradient-hybrid">Global Deployment</span>.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
          We treat development as an exact science. Our five-phase methodology eliminates surprises, 
          guarantees weekly delivery visibility, and ensures flawless production launches.
        </p>
      </div>

      {/* Interactive Process Stepper Navigation */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {PROCESS_STEPS.map((step, idx) => {
          const isActive = activeStepIndex === idx;
          return (
            <button
              key={step.step}
              onClick={() => {
                sound.playClick();
                setActiveStepIndex(idx);
              }}
              className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                isActive
                  ? 'glass-panel-gold border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.02]'
                  : 'glass-panel border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono ${isActive ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                  PHASE {step.step}
                </span>
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-amber-400/20 text-amber-300' : 'text-slate-500'}`}>
                  {getStepIcon(step.icon)}
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-white leading-tight">
                  {step.phase}
                </div>
                <div className="text-[11px] font-mono text-cyan-400/80 mt-1">
                  {step.duration}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive Card */}
      <div className="mt-8 p-6 sm:p-10 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Number */}
        <div className="absolute right-4 bottom-0 text-[180px] font-black text-white/[0.02] pointer-events-none select-none leading-none">
          {activeStep.step}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
              <span>Phase {activeStep.step} Detailed Specifications</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyan-400">
                <Clock className="w-3.5 h-3.5" />
                {activeStep.duration}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {activeStep.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-4">
              {activeStep.summary}
            </p>
          </div>

          {/* Deliverables Checklist for this phase */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-white/10">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
              Key Phase Deliverables & Artifacts
            </div>
            <div className="space-y-3">
              {activeStep.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
