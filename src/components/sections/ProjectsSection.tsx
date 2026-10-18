'use client';

import React, { useState } from 'react';
import { PROJECTS_DATA } from '@/data/content';
import { ProjectItem } from '@/types';
import { sound } from '@/utils/audio';
import { 
  Briefcase, ArrowUpRight, CheckCircle2, Server, Shield, 
  ExternalLink, Layers, GraduationCap, X, Sparkles, Terminal, Activity 
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeMyShuleTab, setActiveMyShuleTab] = useState<'attendance' | 'gate' | 'transport' | 'finance'>('attendance');

  const categories = ['All', 'EdTech', 'Enterprise SaaS', 'FinTech', 'Logistics & IoT'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const myshuleProject = PROJECTS_DATA.find((p) => p.id === 'myshule')!;

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Background Section Glow */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Briefcase className="w-3.5 h-3.5" />
          <span>PRODUCTION PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
          Engineered Systems in <span className="text-gradient-gold">Active Production</span>.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
          Explore our verified enterprise deployments. We build software that handles real organizational 
          operations, high-volume transactions, and mission-critical daily workflows across Kenya and beyond.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setActiveCategory(cat);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'glass-panel text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* FLAGSHIP SHOWCASE: MYSHULE (When category is All or EdTech) */}
      {/* ============================================================== */}
      {(activeCategory === 'All' || activeCategory === 'EdTech') && (
        <div className="mt-12 rounded-3xl glass-panel-gold border border-amber-500/40 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          {/* Ambient Corner Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Flagship Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    // FLAGSHIP CASE STUDY
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
                    LIVE SYSTEM
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  MyShule — Comprehensive School Management Operating System
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedProject(myshuleProject);
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-1.5"
            >
              <span>View System Architecture</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grid: Description & Metrics on Left, Interactive Simulation on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {myshuleProject.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {myshuleProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/20">
                      <div className="text-lg font-black text-gradient-gold">{m.value}</div>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {myshuleProject.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 text-cyan-300 border border-cyan-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Feature Highlights */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Multi-Role Workspaces
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>22 Dedicated Roles (Admin, Teacher, Gate, Transport, Finance)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Direct Safaricom M-Pesa STK Push fee reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Instant automated SMS/WhatsApp guardian alerts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive MyShule Workspace Simulator */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-950/90 border border-cyan-500/30 overflow-hidden shadow-2xl">
              {/* Workspace Mock Header */}
              <div className="px-4 py-3 bg-slate-900 border-b border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    myshule.orbitlane.ke/app/workspace
                  </span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>SESSION ACTIVE</span>
                </div>
              </div>

              {/* Workspace Tab Switcher */}
              <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto text-xs font-mono">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveMyShuleTab('attendance');
                  }}
                  className={`px-4 py-2.5 whitespace-nowrap transition-colors ${
                    activeMyShuleTab === 'attendance'
                      ? 'border-b-2 border-cyan-400 text-cyan-300 bg-cyan-950/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Roll-Call Attendance
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveMyShuleTab('gate');
                  }}
                  className={`px-4 py-2.5 whitespace-nowrap transition-colors ${
                    activeMyShuleTab === 'gate'
                      ? 'border-b-2 border-amber-400 text-amber-300 bg-amber-950/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Gate & Exit Passes
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveMyShuleTab('transport');
                  }}
                  className={`px-4 py-2.5 whitespace-nowrap transition-colors ${
                    activeMyShuleTab === 'transport'
                      ? 'border-b-2 border-cyan-400 text-cyan-300 bg-cyan-950/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Transport & Routes
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveMyShuleTab('finance');
                  }}
                  className={`px-4 py-2.5 whitespace-nowrap transition-colors ${
                    activeMyShuleTab === 'finance'
                      ? 'border-b-2 border-amber-400 text-amber-300 bg-amber-950/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  M-Pesa Fee Desk
                </button>
              </div>

              {/* Simulated Workspace Screen */}
              <div className="p-5 min-h-[300px] flex flex-col justify-between">
                {activeMyShuleTab === 'attendance' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">Learner Attendance Register</div>
                        <div className="text-[11px] font-mono text-cyan-400">Class: Grade 8 Blue · Term 2 · Class Teacher View</div>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-mono">
                        98.4% Present Today
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
                      <div className="grid grid-cols-4 bg-slate-900/80 px-3 py-2 text-slate-400 font-mono text-[11px]">
                        <span>Learner</span>
                        <span>Admission</span>
                        <span>Status</span>
                        <span className="text-right">Action</span>
                      </div>
                      <div className="grid grid-cols-4 px-3 py-2.5 border-t border-slate-800/80 items-center">
                        <span className="text-slate-200 font-medium">Kiprono K.</span>
                        <span className="text-slate-400 font-mono">ADM-4092</span>
                        <span className="text-emerald-400 font-semibold">● Present</span>
                        <span className="text-right text-slate-500 text-[10px]">Marked 07:42 AM</span>
                      </div>
                      <div className="grid grid-cols-4 px-3 py-2.5 border-t border-slate-800/80 items-center">
                        <span className="text-slate-200 font-medium">Faith Wambui</span>
                        <span className="text-slate-400 font-mono">ADM-4105</span>
                        <span className="text-emerald-400 font-semibold">● Present</span>
                        <span className="text-right text-slate-500 text-[10px]">Marked 07:44 AM</span>
                      </div>
                      <div className="grid grid-cols-4 px-3 py-2.5 border-t border-slate-800/80 items-center bg-rose-950/20">
                        <span className="text-slate-200 font-medium">Brian Omondi</span>
                        <span className="text-slate-400 font-mono">ADM-4118</span>
                        <span className="text-rose-400 font-semibold">● Absent</span>
                        <span className="text-right text-amber-400 text-[10px] font-mono">SMS Alert Sent</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeMyShuleTab === 'gate' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">Main Campus Gatekeeper Console</div>
                        <div className="text-[11px] font-mono text-amber-400">Security Gate #1 · Verified Barcode Scanner Sync</div>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[11px] font-mono">
                        Scanner Online
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-2">
                      <div className="text-xs text-slate-300 flex items-center justify-between">
                        <span>Active Exit Pass #EXP-8821</span>
                        <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded">
                          APPROVED BY DEPUTY
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white">Student: Kevin Mutua (Form 3 East)</div>
                      <div className="text-xs text-slate-400">
                        Reason: Dental Appointment · Accompanied by Guardian (ID Verified)
                      </div>
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Expected Return: Today 15:30 EAT · Auto-recheck enabled</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeMyShuleTab === 'transport' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">Fleet & School Bus Telematics</div>
                        <div className="text-[11px] font-mono text-cyan-400">Route 4: Kilimani - Kileleshwa - Lavington</div>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-mono">
                        Bus #07 On Route
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Vehicle: Isuzu FRR (KDB 492T)</span>
                        <span className="text-cyan-400 font-mono">Driver: James N.</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-400 to-amber-400 h-full w-[68%]" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Drop-off Progress: 19 of 28 Learners</span>
                        <span className="text-emerald-400">ETA Next Stop: 4 mins</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeMyShuleTab === 'finance' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">M-Pesa Automated Fee Ledger</div>
                        <div className="text-[11px] font-mono text-emerald-400">Paybill 882910 · Safaricom STK Push Gateway</div>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-mono">
                        0 Discrepancies
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-slate-400">Trans ID: QK88291A9</span>
                        <span className="text-emerald-400 font-bold">KES 45,000.00</span>
                      </div>
                      <div className="text-sm font-semibold text-white">Paid for: ADM-4012 (Term 2 Tuition)</div>
                      <div className="text-[11px] text-slate-400">
                        Payer: Grace Mwangi (254712***789) · Instant receipt dispatched via SMS
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>ORBITLANE MULTI-TENANT ARCHITECTURE</span>
                  <span className="text-amber-400">100% PRODUCTION READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* OTHER VERIFIED PROJECTS GRID */}
      {/* ============================================================== */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects
          .filter((p) => p.id !== 'myshule')
          .map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => sound.playHover()}
              className="p-6 rounded-2xl glass-panel glass-card-hover flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1.5">{project.title}</h3>
                <p className="text-xs font-mono text-amber-300 mb-3">{project.tagline}</p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                      <div className="text-sm font-black text-cyan-300">{m.value}</div>
                      <div className="text-[10px] text-slate-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {project.tags.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Architecture Modal Trigger */}
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedProject(project);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 text-slate-200 border border-white/10 hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center justify-center gap-1.5"
              >
                <span>System Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
      </div>

      {/* Project Case Study Deep-Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedProject(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 border border-amber-500/30">
                {selectedProject.category}
              </span>
              <span className="text-xs font-mono text-emerald-400">
                ● {selectedProject.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedProject.title}</h3>
            <p className="text-sm font-mono text-cyan-400 mt-1">{selectedProject.tagline}</p>

            <p className="text-sm text-slate-300 leading-relaxed mt-4">
              {selectedProject.longDescription}
            </p>

            {/* Client and Region */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Sector</span>
                <span className="text-white font-medium">{selectedProject.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Location</span>
                <span className="text-white font-medium">{selectedProject.location || 'Kenya'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Deployment</span>
                <span className="text-cyan-400 font-medium">Cloudflare Edge</span>
              </div>
              <div>
                <span className="text-slate-500 block">Security</span>
                <span className="text-amber-400 font-medium">Bank Grade</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Production Performance Telemetry
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20">
                    <div className="text-base font-bold text-gradient-gold">{m.value}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Core Architectural Modules
              </h4>
              <div className="flex flex-col gap-2">
                {selectedProject.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Highlights */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Engineering Highlights
              </h4>
              <div className="flex flex-col gap-2">
                {selectedProject.architecturalHighlights.map((h, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-cyan-200 font-mono">
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 flex gap-3">
              <a
                href="#contact"
                onClick={() => {
                  sound.playClick();
                  setSelectedProject(null);
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
              >
                <span>Request Similar Architecture For Your Organization</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
