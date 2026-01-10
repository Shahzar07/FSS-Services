
import React from 'react';
import { PROCESS_STEPS } from '../constants.tsx';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 sm:py-32 bg-[#0a1a2f] overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-amber-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">Seamless Integration</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Our Professional Onboarding</h3>
          <p className="text-slate-400 text-base sm:text-lg font-light px-4">
            We make switching to FSS simple. Our proven onboarding process ensures a smooth transition and immediate quality improvements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 relative">
          {/* Connector line (Desktop only) */}
          <div className="hidden lg:block absolute top-14 left-0 w-full h-px bg-white/10"></div>

          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="relative group text-center lg:text-left">
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 sm:mb-8 transition-all duration-500 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <span className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#0a1a2f] transition-colors">
                  {step.number}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{step.title}</h4>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light px-4 sm:px-0">
                {step.description}
              </p>
              
              {/* Connector dot (Desktop only) */}
              <div className="hidden lg:block absolute top-14 right-[-1.5rem] w-3 h-3 bg-[#0a1a2f] border-2 border-white/20 rounded-full group-hover:border-amber-500 transition-colors z-20 last:hidden"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
