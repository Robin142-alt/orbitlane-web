'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ProjectEstimatorSection } from '@/components/sections/ProjectEstimatorSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020409] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Persistent Floating WhatsApp Action */}
      <WhatsAppFloat />

      {/* Floating Navigation Header */}
      <Navbar />

      {/* 1. Cinematic 3D Hero Section */}
      <HeroSection />

      {/* 2. About Orbitlane & Engineering Manifesto */}
      <AboutSection />

      {/* 3. Specialized Capabilities & Services */}
      <ServicesSection />

      {/* 4. Production Portfolio: Featuring MyShule */}
      <ProjectsSection />

      {/* 5. Interactive Project Architect & Scope Calculator */}
      <ProjectEstimatorSection />

      {/* 6. Why Orbitlane & Architectural Benchmarks */}
      <WhyUsSection />

      {/* 7. Engineering Lifecycle & Process */}
      <ProcessSection />

      {/* 8. Frequently Asked Questions */}
      <FAQSection />

      {/* 9. Direct Contact & Project Initiation */}
      <ContactSection />

      {/* 10. Comprehensive Footer */}
      <Footer />
    </main>
  );
}
