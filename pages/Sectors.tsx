
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, School, Stethoscope, ShoppingBag, Factory, Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sectors: React.FC = () => {
  const sectors = [
    { title: 'Commercial Offices', icon: <Building2 className="w-8 h-8" />, desc: 'Corporate environments and business parks in Canary Wharf and Stratford.' },
    { title: 'Educational Facilities', icon: <School className="w-8 h-8" />, desc: 'Safe, hygienic environments for schools and colleges across Ilford and Romford.' },
    { title: 'Healthcare & Medical', icon: <Stethoscope className="w-8 h-8" />, desc: 'Clinical-grade hygiene for dental practices and GP surgeries following CQC guidelines.' },
    { title: 'Retail & Showrooms', icon: <ShoppingBag className="w-8 h-8" />, desc: 'Maintained to impress customers and provide a pristine shopping experience.' },
    { title: 'Industrial & Warehousing', icon: <Factory className="w-8 h-8" />, desc: 'Specialized industrial cleaning for large scale logistic and manufacturing sites.' },
    { title: 'Leisure & Hospitality', icon: <Hotel className="w-8 h-8" />, desc: 'Gyms, hotels, and restaurants kept spotless to meet high customer expectations.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-[#0a1a2f]"
    >
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center mb-20">
          <motion.span className="text-amber-500 font-black uppercase tracking-widest text-sm mb-4 block">Our Expertise</motion.span>
          <motion.h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Specialized Cleaning <br /> for Every <span className="text-amber-500">Sector</span>.</motion.h1>
          <motion.p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">We understand the unique cleaning challenges faced by different industries. Our teams are trained in sector-specific hygiene protocols.</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white hover:border-white transition-all duration-500"
            >
              <div className="w-16 h-16 bg-amber-500 text-[#0a1a2f] rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform">
                {sector.icon}
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-[#0a1a2f] mb-4 transition-colors">{sector.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-600 font-light leading-relaxed mb-8 transition-colors">{sector.desc}</p>
              <Link to="/contact" className="text-amber-500 font-bold group-hover:text-[#0a1a2f] flex items-center gap-2">
                Get Sector Quote
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-24 border-t border-white/10 text-center">
         <p className="text-3xl md:text-4xl font-light text-slate-300 italic leading-relaxed">
           "Five Star Support Services has a deep understanding of medical cleaning protocols. They are the only team we trust for our clinical environments."
         </p>
         <p className="mt-8 text-amber-500 font-black uppercase tracking-widest">— Clinical Director, Ilford Medical Centre</p>
      </section>
    </motion.div>
  );
};

export default Sectors;
