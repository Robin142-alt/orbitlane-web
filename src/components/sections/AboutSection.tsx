'use client';

import React, { useState } from 'react';
import { COMPANY_INFO } from '@/data/content';
import { FloatingTechArtifact } from '../canvas/FloatingTechArtifact';
import { sound } from '@/utils/audio';
import { Target, Compass, Code, Cpu, ShieldCheck, Zap, Server, CheckCircle2, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'manifesto' | 'techStack'>('mission');

  const techCategories = [
    {
      category: 'Frontend & Creative Web',
      techs: ['Next.js 16', 'React 19', 'TypeScript', 'Three.js / WebGL', 'Tailwind CSS', 'GSAP'],
    },
    {
      category: 'Backend & Distributed Systems',
      techs: ['Node.js', 'Go (Golang)', 'Python', 'PostgreSQL', 'Redis', 'GraphQL', 'REST'],
    },
    {
      category: 'Edge & Cloud Infrastructure',
      techs: ['Cloudflare Workers & Pages', 'Docker', 'AWS', 'Zero-Trust Architecture', 'CI/CD Pipelines'],
    },
    {
      category: 'African & Global Payments',
      techs: ['M-Pesa Daraja 2.0 API (B2B, B2C, STK)', 'Airtel Money', 'Stripe', 'Visa/Mastercard Tokenization'],
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Background Section Glows */}
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Compass className="w-3.5 h-3.5" />
          <span>ABOUT ORBITLANE TECHNOLOGIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
          Forged in Kenya. Built for the <span className="text-gradient-gold">Global Frontier</span>.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
          Orbitlane Technologies was founded on a singular conviction: that modern digital architecture 
          should be uncompromising in performance, breathtaking in aesthetics, and engineered with absolute sovereign precision.
        </p>
      </div>

      {/* Interactive Tabs Control */}
      <div className="mt-12 flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 w-fit">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('mission');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'mission'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Vision & Mission</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('manifesto');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'manifesto'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Engineering Manifesto</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('techStack');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'techStack'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Technology Radar</span>
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="mt-8">
        {activeTab === 'mission' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Mission Card */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-amber-500/30">
                <div className="text-xs font-mono text-amber-400 tracking-wider uppercase mb-1">
                  // Core Mission
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Empowering Africa’s Digital Renaissance
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {COMPANY_INFO.mission}
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/30">
                <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
                  // Long-Term Vision
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Setting the Global Standard in Software Engineering
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {COMPANY_INFO.vision}
                </p>
              </div>
            </div>

            {/* 3D Artifact Visual representation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden text-center">
              <div className="relative">
                <FloatingTechArtifact type="dodecahedron" color="#D4AF37" wireframeColor="#00F0FF" size={200} />
              </div>
              <div className="mt-4 font-bold text-lg text-white">Nairobi Innovation Hub</div>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Engineering resilient digital infrastructure capable of thriving under heavy regional workloads and global compliance demands.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
                <Award className="w-3.5 h-3.5" />
                <span>Zero Compromise on Quality</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'manifesto' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 hover:border-cyan-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Zero-Bloat Philosophy</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                We believe software should be lean, fast, and unencumbered by unnecessary third-party dependencies. 
                Clean algorithmic code ensures sub-second responses and long-term maintainability.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 hover:border-amber-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Security as a Prerequisite</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Security is not a checkbox added after deployment. We embed cryptographic hashing, strict role policies, 
                and edge-level DDoS mitigation directly into the foundational architectural blueprint.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 hover:border-cyan-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-cyan-400 mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Cloudflare Edge Native</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                We harness the world’s fastest global edge compute networks. Your users connect to data nodes geographically 
                closest to them—ensuring zero latency whether they are in Nairobi or New York.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'techStack' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((cat, i) => (
              <div key={i} className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/30 transition-all">
                <h4 className="text-sm font-bold tracking-wider uppercase text-cyan-400 mb-4 border-b border-white/10 pb-2">
                  {cat.category}
                </h4>
                <div className="flex flex-col gap-2">
                  {cat.techs.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
