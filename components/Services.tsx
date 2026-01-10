
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants.tsx';
import { ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              Professional Cleaning Services
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-[#0a1a2f] leading-tight tracking-tight"
            >
              Leading Commercial <br /> Sector Expertise.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-lg max-w-md leading-relaxed"
          >
            Delivering high-specification cleaning solutions for London and South East businesses. We pride ourselves on reliability and quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_50px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 border border-slate-100 p-2"
            >
              <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0a1a2f]/20 group-hover:bg-[#0a1a2f]/40 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-amber-500 p-4 rounded-2xl shadow-xl text-[#0a1a2f] transition-transform group-hover:scale-110">
                  {service.icon}
                </div>
              </div>
              
              <div className="px-6 pb-8">
                <h4 className="text-2xl font-bold text-[#0a1a2f] mb-3 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-500 leading-relaxed mb-8 h-20 overflow-hidden line-clamp-3">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-50 group-hover:bg-amber-500 group-hover:text-[#0a1a2f] transition-all font-bold text-[#0a1a2f]"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
