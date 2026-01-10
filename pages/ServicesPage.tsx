
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants.tsx';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-white"
    >
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center mb-20">
          <motion.span className="text-amber-600 font-black uppercase tracking-widest text-sm mb-4 block">Our Solutions</motion.span>
          <motion.h1 className="text-5xl md:text-7xl font-black text-[#0a1a2f] mb-8 tracking-tighter">Cleaning Services <br /> Tailored to <span className="text-amber-500">You</span>.</motion.h1>
          <motion.p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">From daily office maintenance to specialized clinical deep cleans, our expert teams deliver results that exceed expectations.</motion.p>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              <div className="lg:w-1/2 relative">
                <div className={`absolute -inset-4 bg-amber-500/10 rounded-[3rem] blur-2xl`}></div>
                <img 
                  src={service.imageUrl} 
                  className="relative rounded-[3rem] shadow-2xl w-full h-[450px] object-cover" 
                  alt={service.title} 
                />
                <div className="absolute -bottom-6 -right-6 bg-[#0a1a2f] p-8 rounded-[2rem] shadow-2xl text-amber-500 hidden lg:block">
                  {React.cloneElement(service.icon as React.ReactElement, { className: 'w-10 h-10' })}
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-black text-[#0a1a2f] mb-6">{service.title}</h2>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed font-light">{service.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {['Daily or Weekly Schedules', 'All Equipment Provided', 'Eco-Friendly Chemicals', 'Fully Vetted Staff', 'Dedicated Area Manager', 'Regular Quality Audits'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      <span className="text-slate-700 font-bold">{item}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-3 bg-[#0a1a2f] text-white px-8 py-4 rounded-2xl font-black hover:bg-amber-500 hover:text-[#0a1a2f] transition-all group"
                >
                  Get a Free Proposal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-500 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#0a1a2f] mb-8 tracking-tight">Need a customized cleaning plan?</h2>
          <p className="text-[#0a1a2f]/70 text-xl mb-12 max-w-2xl mx-auto">Tell us about your premises and we'll create a bespoke solution that fits your business perfectly.</p>
          <Link to="/contact" className="bg-[#0a1a2f] text-white px-12 py-6 rounded-2xl text-xl font-black hover:bg-white hover:text-[#0a1a2f] transition-all shadow-2xl">
            Start Your Enquiry
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;
