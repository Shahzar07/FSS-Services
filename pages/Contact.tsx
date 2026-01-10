
import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm.tsx';
import Coverage from '../components/Coverage.tsx';

const Contact: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16"
    >
      {/* Header */}
      <section className="bg-[#0a1a2f] pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <span className="text-amber-500 font-black uppercase tracking-widest text-sm mb-4 block">Get In Touch</span>
           <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Contact Our <br /> Facility Experts.</h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">Whether you need a one-off deep clean or a long-term commercial contract, our team is ready to assist you.</p>
        </div>
      </section>

      {/* Main Contact Section (Includes the form and local details) */}
      <ContactForm />

      {/* Coverage Areas Map */}
      <div className="bg-slate-50">
        <Coverage />
      </div>

      {/* Quick FAQ / Info */}
      <section className="py-32 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#0a1a2f] mb-12 text-center tracking-tight">Common Questions</h2>
          <div className="space-y-12">
            <div>
              <h4 className="text-xl font-bold text-[#0a1a2f] mb-4">How quickly can you start?</h4>
              <p className="text-slate-600 font-light leading-relaxed">We typically mobilise within 72 hours of contract approval. For emergency deep cleans, we can often provide same-day or next-day service depending on team availability.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#0a1a2f] mb-4">Do you provide your own equipment?</h4>
              <p className="text-slate-600 font-light leading-relaxed">Yes, Five Star Support Services provides all specialized cleaning equipment, eco-friendly chemicals, and consumables required for your site. We also maintain a strict machine auditing schedule.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#0a1a2f] mb-4">Are your cleaners insured?</h4>
              <p className="text-slate-600 font-light leading-relaxed">Absolutely. Every team member is fully insured under our £10m public and employer's liability policy. We take full responsibility for the safety and security of your premises.</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
