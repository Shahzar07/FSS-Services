
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants.tsx';
import { ShieldCheck, Award, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 sm:py-32 bg-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4 -z-0 rounded-[100px] hidden lg:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">The FSS Advantage</span>
                <div className="hidden sm:block h-px w-24 bg-amber-500/20"></div>
              </div>
              
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#0a1a2f] mb-8 sm:mb-10 leading-[1.1] sm:leading-[1] tracking-tighter">
                Setting New <br /> 
                <span className="text-amber-500">Benchmarks</span> In <br />
                Commercial Cleaning.
              </h3>
              
              <p className="text-slate-600 text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed font-light max-w-xl">
                Since 2008, Five Star Support Services has been the benchmark for facility maintenance in East London. We don’t just clean—we curate professional environments that inspire excellence and safety.
              </p>
              
              <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
                {['Industry-leading retention rates', 'Tailored cleaning management systems', 'DBS-vetted local professionals'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#0a1a2f]" />
                    </div>
                    <span className="text-slate-700 font-bold text-base sm:text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:flex items-center gap-6 sm:gap-10 mt-auto pt-8 border-t border-slate-100 sm:border-0">
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-[#0a1a2f]">15+</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Years Experience</span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-[#0a1a2f]">500+</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Happy Clients</span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col col-span-2 sm:col-auto">
                  <span className="text-3xl sm:text-4xl font-black text-[#0a1a2f]">100%</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reliability Rate</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-full">
              {FEATURES.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-6 sm:p-8 bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-amber-500/20 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 sm:mb-8 group-hover:bg-amber-500 group-hover:text-[#0a1a2f] transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                      {React.cloneElement(feature.icon as React.ReactElement, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-[#0a1a2f] mb-3 sm:mb-4 group-hover:text-amber-600 transition-colors tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 sm:mt-8 flex items-center gap-2 text-amber-600 font-black text-[9px] sm:text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap className="w-3 h-3" />
                    Five Star Quality
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 bg-[#0a1a2f] rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-16 lg:p-20 relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-amber-500/5 rounded-full -mr-40 sm:-mr-80 -mt-40 sm:-mt-80 group-hover:bg-amber-500/10 transition-colors duration-1000"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12">
            <div className="text-center lg:text-left">
              <h4 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 tracking-tight">Ready for a spotless environment?</h4>
              <p className="text-slate-400 font-light text-lg sm:text-xl max-w-2xl">Experience the Five Star difference. Join hundreds of satisfied commercial clients in East London.</p>
            </div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#/contact" 
              className="w-full sm:w-auto shrink-0 bg-amber-500 text-[#0a1a2f] px-8 sm:px-12 py-5 sm:py-6 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-[0_20px_40px_rgba(245,158,11,0.2)] group"
            >
              Request Site Visit
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
