export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Enterprise SaaS' | 'EdTech' | 'FinTech' | 'Logistics & IoT' | 'Custom Web';
  description: string;
  longDescription: string;
  client?: string;
  location?: string;
  featured: boolean;
  status: 'Production' | 'Live Deployment' | 'Enterprise Active';
  metrics: { label: string; value: string }[];
  tags: string[];
  features: string[];
  architecturalHighlights: string[];
  accentColor: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  accentColor: 'blue' | 'gold' | 'cyan';
  technologies: string[];
  deliverables: string[];
  benefits: string[];
  timeline: string;
}

export interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Engineering' | 'Pricing' | 'Support';
}

export interface TestimonialStat {
  value: string;
  label: string;
  subtext: string;
}
