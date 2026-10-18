'use client';

import React from 'react';
import { WHY_US_PILLARS } from '@/data/content';
import { sound } from '@/utils/audio';
import { ShieldCheck, Check, X, Award, Zap, Lock, Terminal, Cpu } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Codebase Quality & Origin',
      orbitlane: '100% Bespoke, handwritten, typed TypeScript/Go',
      traditional: 'Bloated third-party templates & purchased scripts',
    },
    {
      feature: 'Payment Integration Reliability',
      orbitlane: 'Direct Safaricom Daraja 2.0 with idempotent webhooks & auto-reconciliation',
      traditional: 'Standard plugins prone to dropped transactions and double debits',
    },
    {
      feature: 'Edge Deployment Speed',
      orbitlane: 'Sub-50ms via Cloudflare Global Edge Networks',
      traditional: 'Single shared VPS with high regional latency',
    },
    {
      feature: 'Intellectual Property & Code',
      orbitlane: '100% client IP transfer with full repository rights',
      traditional: 'Vendor lock-in, recurring license fees, withheld source code',
    },
    {
      feature: 'Interactive 3D / Creative UI',
      orbitlane: 'Awwwards-grade WebGL, fluid micro-interactions & custom design systems',
      traditional: 'Generic Bootstrap or cookie-cutter template blocks',
    },
  ];

  return (
    <section id="why-us" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Award className="w-3.5 h-3.5" />
          <span>THE ORBITLANE DIFFERENCE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
          Why Visionary Leaders <span className="text-gradient-gold">Choose Orbitlane</span>.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
          In an era flooded with generic software templates, we represent uncompromising engineering craft. 
          Here is how our architectural standards separate us from typical regional agencies.
        </p>
      </div>

      {/* 6 Value Pillars Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_US_PILLARS.map((pillar, idx) => (
          <div
            key={idx}
            onMouseEnter={() => sound.playHover()}
            className="p-7 rounded-2xl glass-panel glass-card-hover flex flex-col justify-between"
          >
            <div>
              {/* Pillar Number & Stat */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  // {pillar.number}
                </span>
                <div className="text-right">
                  <div className="text-lg font-black text-gradient-gold">{pillar.stat}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{pillar.statLabel}</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Architecture Matrix Table */}
      <div className="mt-16 rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="mb-6">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
            // ARCHITECTURAL BENCHMARK
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Orbitlane Technologies vs Conventional Agencies
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-xs">
                <th className="py-3 px-4">Evaluation Metric</th>
                <th className="py-3 px-4 text-amber-400 bg-amber-950/20 rounded-t-xl">
                  Orbitlane Technologies
                </th>
                <th className="py-3 px-4 text-slate-500">Typical Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-200">{row.feature}</td>
                  <td className="py-4 px-4 bg-amber-950/10 text-slate-100 font-medium border-l border-r border-amber-500/20">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{row.orbitlane}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-400">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
