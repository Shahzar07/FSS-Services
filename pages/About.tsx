
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ShieldCheck, Heart, Sparkles, Building2 } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Founded', value: '2008' },
    { label: 'Staff Count', value: '180+' },
    { label: 'Happy Clients', value: '500+' },
    { label: 'Service Hubs', value: '4' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-white"
    >
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-amber-600 font-black uppercase tracking-widest text-sm mb-4 block"
        >
          Our Heritage
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-[#0a1a2f] mb-8 tracking-tighter"
        >
          Excellence Built on <span className="text-amber-500">Trust</span>.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Five Star Support Services was founded in 2008 with a single mission: to provide unparalleled commercial cleaning standards across East London. Over 15 years later, we are the first choice for businesses in Ilford, Stratford, and beyond.
        </motion.p>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0a1a2f] py-20 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-5xl font-black text-amber-500 mb-2">{stat.value}</p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-amber-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800" 
              className="relative rounded-[3rem] shadow-2xl w-full h-[500px] object-cover" 
              alt="Our Team" 
            />
          </div>
          <div>
            <h2 className="text-4xl font-black text-[#0a1a2f] mb-8">Our Core Values</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0a1a2f] mb-2">Unwavering Reliability</h4>
                  <p className="text-slate-500 leading-relaxed">We understand that consistency is key. Our clients rely on us to be there, every time, delivering exactly what we promised.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0a1a2f] mb-2">Bespoke Excellence</h4>
                  <p className="text-slate-500 leading-relaxed">No two facilities are the same. We tailor our cleaning protocols to suit the specific needs of your workspace and industry.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0a1a2f] mb-2">Local Community</h4>
                  <p className="text-slate-500 leading-relaxed">By employing local professionals from Ilford, Romford, and Stratford, we support our community while ensuring rapid response times.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations Banner */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-[#0a1a2f] mb-12 uppercase tracking-widest">Fully Certified & Compliant</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {['ISO 9001', 'CHAS', 'BICSc', 'SAFE CONTRACTOR', 'CQC Compliant'].map((brand, i) => (
              <span key={i} className="text-2xl font-black text-[#0a1a2f] tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
