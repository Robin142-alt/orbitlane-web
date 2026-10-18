'use client';

import React from 'react';
import { OrbitHeroScene } from '../canvas/OrbitHeroScene';
import { COMPANY_INFO, STATS_DATA } from '@/data/content';
import { sound } from '@/utils/audio';
import { ArrowRight, Sparkles, Terminal, Shield, Zap, Globe, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToContact = () => {
    sound.playClick();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    sound.playClick();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 overflow-hidden bg-grid-pattern">
      {/* 3D WebGL Canvas Layer - Full Coverage & Interactive */}
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-auto">
        <OrbitHeroScene />
      </div>

      {/* Atmospheric Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Telemetry / Status Pill */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] animate-pulse-glow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">KENYAN DIGITAL FORGE</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-300 tracking-wider font-semibold">INNOVATE • BUILD • ELEVATE</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 pointer-events-none">
        <div className="max-w-3xl">
          {/* Main H1 Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Architecting The{' '}
            <span className="text-gradient-hybrid">Future Of Intelligent</span>{' '}
            Digital Systems.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl drop-shadow-md">
            Orbitlane Technologies is Kenya’s premier software engineering and systems architecture company. 
            We build high-concurrency custom platforms, sovereign enterprise ERPs, and cinematic web experiences 
            engineered for visionary organizations worldwide.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-4 pointer-events-auto">
            {/* Primary CTA */}
            <button
              onClick={scrollToContact}
              onMouseEnter={() => sound.playHover()}
              className="relative group overflow-hidden px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] transition-all duration-300 flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={scrollToProjects}
              onMouseEnter={() => sound.playHover()}
              className="px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-200 glass-panel border border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Our Work</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Quick Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Bank-Grade Encryption</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cloudflare Edge Native</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nairobi & Global Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Metrics Telemetry Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl glass-panel border border-white/10 shadow-2xl backdrop-blur-md">
          {STATS_DATA.map((stat, i) => (
            <div key={i} className="flex flex-col border-l border-white/10 pl-3 sm:pl-4 first:border-l-0">
              <div className="text-xl sm:text-2xl font-black tracking-tight text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 tracking-wide mt-0.5">
                {stat.label}
              </div>
              <div className="text-[10px] text-slate-400 hidden sm:block truncate mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="w-full flex justify-center mt-6">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              sound.playClick();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1 text-[11px] font-mono tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase cursor-pointer"
          >
            <span>DISCOVER ORBITLANE</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
