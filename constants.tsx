
import React from 'react';
import { 
  Building2, 
  School, 
  Stethoscope, 
  ShoppingBag, 
  Sparkles, 
  Wind,
  ShieldCheck,
  Clock,
  Leaf,
  Users,
  Award,
  CircleDollarSign
} from 'lucide-react';
import { Service, Testimonial, Step, Feature } from './types.ts';

export const SERVICES: Service[] = [
  {
    id: 'office',
    title: 'Office Cleaning',
    description: 'Expert cleaning services for corporate environments, from tech startups in Stratford to financial offices in Canary Wharf.',
    icon: <Building2 className="w-8 h-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'education',
    title: 'School & Education',
    description: 'Specialised cleaning for schools and colleges across Ilford and Romford, ensuring safe and hygienic learning spaces.',
    icon: <School className="w-8 h-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'medical',
    title: 'Medical & Healthcare',
    description: 'CQC-compliant cleaning standards for dental clinics and GP surgeries in East London and Essex.',
    icon: <Stethoscope className="w-8 h-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'retail',
    title: 'Retail & Leisure',
    description: 'Professional cleaning for retail outlets and leisure centres to maintain high standards for your customers.',
    icon: <ShoppingBag className="w-8 h-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'carpet',
    title: 'Carpet & Upholstery',
    description: 'Deep extraction cleaning to prolong the life of your flooring using professional-grade machinery.',
    icon: <Sparkles className="w-8 h-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'window',
    title: 'Window Cleaning',
    description: 'Spotless windows at any height using modern reach-and-wash pure water systems.',
    icon: <Wind className="w-8 h-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800'
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'CQC Compliant',
    description: 'Strict adherence to healthcare hygiene standards and CQC audit protocols.',
    icon: <ShieldCheck className="w-6 h-6 text-amber-500" />
  },
  {
    title: 'Sustainable Practices',
    description: 'Eco-safe chemicals and sustainable methods protecting your staff and environment.',
    icon: <Leaf className="w-6 h-6 text-amber-500" />
  },
  {
    title: 'Bespoke Management',
    description: 'Cleaning plans designed specifically for your facility’s unique traffic and needs.',
    icon: <Clock className="w-6 h-6 text-amber-500" />
  },
  {
    title: 'Expert Vetting',
    description: 'Highly trained professionals, fully insured and background-checked (DBS).',
    icon: <Users className="w-6 h-6 text-amber-500" />
  },
  {
    title: 'Quality Audits',
    description: 'Dedicated site managers conducting regular quality checks and performance reviews.',
    icon: <Award className="w-6 h-6 text-amber-500" />
  },
  {
    title: 'Value Driven',
    description: 'Competitive, transparent pricing with a focus on long-term client partnerships.',
    icon: <CircleDollarSign className="w-6 h-6 text-amber-500" />
  }
];

export const PROCESS_STEPS: Step[] = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'A free site visit to assess your specific requirements and facility challenges.'
  },
  {
    number: '02',
    title: 'Tailored Proposal',
    description: 'A comprehensive cleaning schedule with transparent, fixed-rate pricing.'
  },
  {
    number: '03',
    title: 'Deployment',
    description: 'Seamless mobilisation of your dedicated cleaning team and specialized equipment.'
  },
  {
    number: '04',
    title: 'Ongoing Quality',
    description: 'Continuous monitoring and regular audits to maintain our five-star standard.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'David Wilson',
    role: 'Operations Manager',
    company: 'Canary Wharf Tech Hub',
    content: 'Five Star Support Services has transformed our workspace. Their reliability and attention to detail are exceptional.',
    rating: 5
  },
  {
    id: 2,
    name: 'Rebecca Jones',
    role: 'Practice Manager',
    company: 'Ilford Dental Clinic',
    content: 'Very professional team. Their medical cleaning standards are top-tier and they always help us pass CQC audits.',
    rating: 5
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Facility Head',
    company: 'Romford Business Park',
    content: 'Fantastic cleaning partners. They are flexible, trustworthy, and our premises have never looked better.',
    rating: 5
  }
];

export const REGIONS = [
  { name: 'Ilford', lat: 51.5588, lng: 0.0697, staff: 45, clients: 120 },
  { name: 'Romford', lat: 51.5768, lng: 0.1813, staff: 35, clients: 95 },
  { name: 'Canary Wharf', lat: 51.5055, lng: -0.0235, staff: 60, clients: 180 },
  { name: 'Stratford', lat: 51.5417, lng: -0.0039, staff: 40, clients: 110 }
];
