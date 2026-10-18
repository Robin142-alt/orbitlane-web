'use client';

import React, { useState } from 'react';
import { SERVICES_DATA } from '@/data/content';
import { ServiceItem } from '@/types';
import { sound } from '@/utils/audio';
import { Code2, Globe, Layers, Palette, Cpu, ShieldCheck, ArrowRight, X, CheckCircle, Clock, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6" />;
      case 'Globe':
        return <Globe className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'Palette':
        return <Palette className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleOpenModal = (service: ServiceItem) => {
    sound.playClick();
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setSelectedService(null);
  };

  const handleInquireService = (service: ServiceItem) => {
    sound.playClick();
    setSelectedService(null);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Select the service in the contact form
    const serviceSelect = document.getElementById('contact-service') as HTMLSelectElement | null;
    if (serviceSelect) {
      serviceSelect.value = service.title;
    }
  };

  return (
    <section id="services" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-amber-500/30 text-xs font-mono text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENGINEERING CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
          Specialized Disciplines. <span className="text-gradient-hybrid">Unrivaled Execution</span>.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
          From sovereign enterprise software architectures to high-concurrency SaaS applications and 
          Awwwards-tier interactive web platforms, we engineer solutions designed to dominate their categories.
        </p>
      </div>

      {/* Services Grid (6 Cards) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service) => {
          const isGold = service.accentColor === 'gold';
          return (
            <div
              key={service.id}
              onMouseEnter={() => sound.playHover()}
              className={`p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                isGold
                  ? 'glass-panel-gold glass-card-gold-hover'
                  : 'glass-panel glass-card-hover'
              }`}
            >
              <div>
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isGold
                        ? 'bg-amber-950/60 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    }`}
                  >
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                    {service.timeline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/80 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900/80 text-cyan-400 border border-white/5">
                      +{service.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenModal(service)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isGold
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-500/30 hover:bg-amber-400 hover:text-slate-950'
                    : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-400 hover:text-slate-950'
                }`}
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Service Deep-Dive Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel-gold border border-amber-500/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  // Deep Dive Architecture
                </span>
                <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-3">
              {selectedService.fullDescription}
            </p>

            {/* Timeline & Tech */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/70 border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Estimated Velocity: <strong className="text-white">{selectedService.timeline}</strong></span>
              </div>
              <div className="text-xs font-mono text-amber-400">
                100% IP & Code Ownership
              </div>
            </div>

            {/* Deliverables */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Included Milestone Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Benefits */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Key Strategic Value
              </h4>
              <div className="flex flex-col gap-2">
                {selectedService.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquire Action */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => handleInquireService(selectedService)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
              >
                <span>Request Project Proposal for This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
