'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';
import { Calculator, ArrowRight, Check, Sparkles, Sliders, Shield, Zap } from 'lucide-react';

export const ProjectEstimatorSection: React.FC = () => {
  const [projectType, setProjectType] = useState<'custom-software' | 'web-app' | 'saas' | 'ai-automation'>('custom-software');
  const [scale, setScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [velocity, setVelocity] = useState<'standard' | 'accelerated'>('standard');
  const [addons, setAddons] = useState<string[]>(['mpesa', 'edge']);

  const projectTypes = [
    { id: 'custom-software', label: 'Custom Enterprise ERP / System', baseWeeks: 6, desc: 'Bespoke operational platform with role permissions' },
    { id: 'web-app', label: 'Cinematic 3D Web Platform', baseWeeks: 3, desc: 'High-conversion interactive web headquarters' },
    { id: 'saas', label: 'Multi-Tenant SaaS Architecture', baseWeeks: 8, desc: 'Subscription billing, tenant isolation, cloud native' },
    { id: 'ai-automation', label: 'AI & WhatsApp Automation', baseWeeks: 4, desc: 'Autonomous customer agents, document OCR, LLMs' },
  ];

  const addonOptions = [
    { id: 'mpesa', label: 'M-Pesa Daraja 2.0 (STK, B2B, B2C)', weeks: 1 },
    { id: 'edge', label: 'Cloudflare Zero-Trust Edge WAF', weeks: 0.5 },
    { id: 'biometrics', label: 'Biometric / QR Gate Pass Module', weeks: 1.5 },
    { id: 'whatsapp', label: 'WhatsApp Business 24/7 Bot', weeks: 1.5 },
    { id: 'offline', label: 'Offline-First Sync Engine', weeks: 1.5 },
  ];

  const toggleAddon = (id: string) => {
    sound.playClick();
    setAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Calculate Weeks
  const selectedTypeObj = projectTypes.find((p) => p.id === projectType)!;
  let totalWeeks = selectedTypeObj.baseWeeks;
  if (scale === 'mvp') totalWeeks *= 0.75;
  if (scale === 'enterprise') totalWeeks *= 1.4;
  addons.forEach((addId) => {
    const found = addonOptions.find((a) => a.id === addId);
    if (found) totalWeeks += found.weeks;
  });
  if (velocity === 'accelerated') totalWeeks *= 0.7;
  const estimatedWeeksRounded = Math.max(2, Math.round(totalWeeks));

  const handleExportToContact = () => {
    sound.playSuccess();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    const note = `[Scope Estimate]:\n- Architecture: ${selectedTypeObj.label}\n- Scale: ${scale.toUpperCase()}\n- Velocity: ${velocity.toUpperCase()}\n- Selected Addons: ${addons.join(', ')}\n- Estimated Timeline: ~${estimatedWeeksRounded} weeks`;

    const messageArea = document.getElementById('contact-message') as HTMLTextAreaElement | null;
    if (messageArea) {
      messageArea.value = note;
    }
    const serviceSelect = document.getElementById('contact-service') as HTMLSelectElement | null;
    if (serviceSelect) {
      serviceSelect.value = selectedTypeObj.label;
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Calculator className="w-3.5 h-3.5" />
          <span>REAL-TIME PROJECT ARCHITECT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-3">
          Scope Your Vision. <span className="text-gradient-hybrid">Instant Architecture Estimate</span>.
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          Configure your technical requirements to generate an immediate timeline estimate and architectural recommendation.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10">
          {/* Step 1: Project Archetype */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              1. Choose System Archetype
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectTypes.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => {
                    sound.playClick();
                    setProjectType(pt.id as any);
                  }}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    projectType === pt.id
                      ? 'bg-amber-400/15 border-amber-400 text-white shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-sm text-white">{pt.label}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{pt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: System Scale */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              2. System Scale & Audience
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mvp', label: 'Startup MVP', sub: 'Lean velocity' },
                { id: 'growth', label: 'Growth Scale', sub: '1k - 50k users' },
                { id: 'enterprise', label: 'Enterprise Tier', sub: 'High concurrency' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    sound.playClick();
                    setScale(s.id as any);
                  }}
                  className={`p-3 rounded-xl text-center transition-all border ${
                    scale === s.id
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{s.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{s.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Add-on Capabilities */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              3. Specialized Add-on Modules
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {addonOptions.map((addon) => {
                const active = addons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl flex items-center justify-between text-left text-xs font-medium border transition-all ${
                      active
                        ? 'bg-slate-800 border-amber-400/80 text-white'
                        : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span>{addon.label}</span>
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                        active
                          ? 'bg-amber-400 border-amber-400 text-slate-950'
                          : 'border-slate-700'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Velocity */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              4. Engineering Velocity
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setVelocity('standard');
                }}
                className={`p-3 rounded-xl border text-xs font-medium text-left ${
                  velocity === 'standard'
                    ? 'border-cyan-400 bg-cyan-950/30 text-white'
                    : 'border-white/5 bg-slate-900/50 text-slate-400'
                }`}
              >
                <div className="font-bold">Standard Sprints</div>
                <div className="text-[10px] text-slate-400">Balanced, bi-weekly cadence</div>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setVelocity('accelerated');
                }}
                className={`p-3 rounded-xl border text-xs font-medium text-left ${
                  velocity === 'accelerated'
                    ? 'border-amber-400 bg-amber-950/30 text-white'
                    : 'border-white/5 bg-slate-900/50 text-slate-400'
                }`}
              >
                <div className="font-bold flex items-center gap-1">
                  <span>Accelerated Sprint</span>
                  <Zap className="w-3 h-3 text-amber-400 fill-current" />
                </div>
                <div className="text-[10px] text-slate-400">Dedicated double-capacity squad</div>
              </button>
            </div>
          </div>
        </div>

        {/* Live Blueprint Summary Box */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel-gold border border-amber-500/40 flex flex-col justify-between shadow-2xl relative">
          <div>
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                  // ESTIMATION TELEMETRY
                </span>
                <h3 className="text-xl font-black text-white">System Blueprint</h3>
              </div>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>

            {/* Timeline Highlight */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 mb-6">
              <div className="text-xs font-mono text-slate-400">Estimated Project Velocity</div>
              <div className="text-4xl font-black text-gradient-gold mt-1">
                ~{estimatedWeeksRounded} Weeks
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                From initial SRS blueprinting to production edge launch.
              </div>
            </div>

            {/* Key Architectural Inclusions */}
            <div className="space-y-3 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Architecture: <strong className="text-white">{selectedTypeObj.label}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Cloud: Cloudflare Edge Global Network & Zero Trust</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Security: 100% Kenyan Data Protection Act & OWASP Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Ownership: Full Git Repository & 100% IP Transfer</span>
              </div>
            </div>
          </div>

          {/* Action to Transfer */}
          <button
            onClick={handleExportToContact}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
          >
            <span>Transfer Blueprint to Project Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
