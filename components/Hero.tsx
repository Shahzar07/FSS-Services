
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, CheckCircle, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a2f]">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover scale-105"
          alt="Premium Office Space"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a2f]/90 via-[#0a1a2f]/70 to-[#0a1a2f]"></div>
        <div className="absolute inset-0 bg-[#0a1a2f]/40"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full px-4 sm:px-6 py-2 mb-8 sm:mb-10 shadow-xl">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Commercial Cleaning Specialists</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/20 mx-2"></div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] sm:leading-[0.85] mb-8 sm:mb-10 tracking-tighter max-w-[1400px]">
            EXCELLENCE IN <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 italic">
              COMMERCIAL
            </span> CLEANING
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-slate-300 leading-relaxed mb-10 sm:mb-14 max-w-4xl font-light px-4">
            Providing bespoke, reliable, and premium cleaning services across London and the South East. 
            We set the industry standard for offices, schools, and medical practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16 sm:mb-24 w-full sm:w-auto px-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#/contact"
              className="bg-amber-500 hover:bg-amber-400 text-[#0a1a2f] px-10 sm:px-12 py-5 sm:py-6 rounded-2xl text-lg sm:text-xl font-black flex items-center justify-center transition-all shadow-[0_20px_50px_rgba(245,158,11,0.3)] group"
            >
              Get a Free Quote
              <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              href="#/services"
              className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 sm:px-12 py-5 sm:py-6 rounded-2xl text-lg sm:text-xl font-black flex items-center justify-center transition-all"
            >
              Our Expertise
            </motion.a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 w-full max-w-5xl px-4">
            {[
              { label: 'CQC Compliant', value: 'Healthcare' },
              { label: 'Full Insurance', value: '£10m Cover' },
              { label: 'Vetted Staff', value: 'DBS Checked' },
              { label: 'Reliability', value: '100% Rate' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center sm:text-left hover:border-amber-500/30 transition-colors"
              >
                <p className="text-amber-500 text-[8px] sm:text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-white font-bold text-sm sm:text-lg">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
