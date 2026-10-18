'use client';

import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES_DATA } from '@/data/content';
import { sound } from '@/utils/audio';
import confetti from 'canvas-confetti';
import { 
  Mail, Phone, MapPin, Send, MessageCircle, Clock, 
  CheckCircle2, Sparkles, Copy, Check, ArrowUpRight 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    service: SERVICES_DATA[0].title,
    budget: '$5,000 – $15,000 / KES 650k – 2M',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();

    // Trigger Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#D4AF37', '#38BDF8', '#FFDF00'],
      });
    } catch {}

    setSubmitted(true);
  };

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(COMPANY_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Background Accent Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Mail className="w-3.5 h-3.5" />
          <span>PROJECT INITIATION PROTOCOL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
          Let’s Build Something <span className="text-gradient-hybrid">Extraordinary</span>.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
          Ready to elevate your digital operations? Speak directly with our senior engineering architects. 
          We guarantee a comprehensive technical response and project blueprint within 24 hours.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Business Contacts & Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-gold border border-amber-500/40 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                  // INSTANT DIRECT CHANNEL
                </span>
                <h3 className="text-xl font-bold text-white">Direct WhatsApp Inquiry</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Connect instantly with Orbitlane’s engineering desk. Send us your project scope, questions, or RFP document for rapid review.
            </p>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Message on WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
            </a>
          </div>

          {/* Business Details Grid */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
            {/* Email */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Official Inquiries
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Direct Line & WhatsApp
                </span>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Geographic Base
                </span>
                <div className="text-sm font-bold text-white">
                  Nairobi, Kenya
                </div>
                <div className="text-xs text-slate-400">
                  Engineering Hub for East Africa & Global Clients
                </div>
              </div>
            </div>

            {/* SLA Response Guarantee */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Guaranteed Technical Response & Blueprint &lt; 24h</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Consultation & Scope Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Inquiry Transmitted Successfully
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Our senior solutions architect has 
                received your specifications. We will review your requirements and respond to{' '}
                <strong className="text-cyan-400">{formData.email}</strong> within 24 hours.
              </p>

              <div className="pt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    sound.playClick();
                    setSubmitted(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                  // PROJECT INQUIRY FORM
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Tell Us About Your Project
                </h3>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. David Mwangi"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. david@enterprise.ke"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              {/* Phone & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. +254 7XX XXX XXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    Organization / Company Name
                  </label>
                  <input
                    type="text"
                    name="organization"
                    placeholder="e.g. Apex Holdings Ltd"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              {/* Service & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    Service Required
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title} className="bg-slate-900 text-white">
                        {s.title}
                      </option>
                    ))}
                    <option value="Educational ERP (MyShule)" className="bg-slate-900 text-white">
                      Educational ERP (MyShule)
                    </option>
                    <option value="Other Bespoke System" className="bg-slate-900 text-white">
                      Other Bespoke System
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    Target Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                  >
                    <option value="< $3,000 / < KES 400k" className="bg-slate-900 text-white">
                      &lt; $3,000 / &lt; KES 400k (Proof of Concept)
                    </option>
                    <option value="$3,000 – $8,000 / KES 400k – 1M" className="bg-slate-900 text-white">
                      $3,000 – $8,000 / KES 400k – 1M (Growth Platform)
                    </option>
                    <option value="$8,000 – $20,000 / KES 1M – 2.5M" className="bg-slate-900 text-white">
                      $8,000 – $20,000 / KES 1M – 2.5M (Enterprise Tier)
                    </option>
                    <option value="$20,000+ / KES 2.5M+" className="bg-slate-900 text-white">
                      $20,000+ / KES 2.5M+ (Large Scale Infrastructure)
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">
                  Project Description & Objectives *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your current challenge, target user base, key features, and any integrations needed (e.g. M-Pesa, Cloudflare, CRM)..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Technical Project Inquiry</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400 text-center pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Non-Disclosure & Data Protection Protected (KDPA Compliant)</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
