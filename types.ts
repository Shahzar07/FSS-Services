
import { ReactNode } from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  imageUrl: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}
