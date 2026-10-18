'use client';

import React, { useState, useEffect } from 'react';
import { OrbitlaneLogo } from '../ui/OrbitlaneLogo';
import { COMPANY_INFO } from '@/data/content';
import { sound } from '@/utils/audio';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.playClick();
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Why Orbitlane', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sound.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 sm:py-4 px-4 sm:px-8 flex justify-center`}
      >
        <div
          className={`w-full max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'glass-panel border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl'
              : 'bg-transparent border border-white/5'
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              sound.playWarp();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer"
          >
            <OrbitlaneLogo size="md" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => sound.playHover()}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Island */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all duration-200 ${
                soundEnabled
                  ? 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60'
                  : 'border-slate-800 text-slate-500 bg-slate-900/40 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Mute Procedural Sound' : 'Enable Procedural Sound'}
            >
              {soundEnabled ? (
                <div className="flex items-center gap-0.5">
                  <Volume2 className="w-4 h-4" />
                </div>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/50 hover:border-emerald-400/60 text-xs font-semibold tracking-wider transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Primary CTA: Start Your Project */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              onMouseEnter={() => sound.playHover()}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-all duration-300 flex items-center gap-1.5"
            >
              <span className="relative z-10 flex items-center gap-1">
                Start Project
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 bg-slate-950/95 backdrop-blur-2xl border-b border-cyan-500/20">
          <div className="flex flex-col gap-4">
            <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              // Navigation Architecture
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-2xl font-bold tracking-wide text-slate-200 hover:text-cyan-400 transition-colors py-1 flex items-center justify-between border-b border-slate-900"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-slate-800">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat via WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
