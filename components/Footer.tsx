
import React from 'react';
import { ShieldCheck, Facebook, Twitter, Linkedin, Instagram, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a1a2f] pt-16 sm:pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 sm:mb-20">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <div className="p-2 rounded-xl bg-amber-500 text-[#0a1a2f]">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-white leading-none tracking-tight">FSS</span>
                <span className="text-[8px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em]">Five Star Support Services</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 font-light text-sm sm:text-base">
              East London's premier facility management and cleaning partner. Delivering professional reliability and bespoke cleaning excellence since 2008.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <span className="text-sm">680 Green Lanes Ilford, London, IG3 9RX, UK</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm">+44 7917 157506</span>
              </div>
            </div>
            <div className="flex gap-4">
              {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-[#0a1a2f] transition-all border border-white/5">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="sm:pt-4">
            <h4 className="text-base sm:text-lg font-black mb-6 sm:mb-8 text-amber-400 uppercase tracking-widest">Our Sectors</h4>
            <ul className="space-y-3 sm:space-y-4 text-slate-400 font-light text-sm sm:text-base">
              <li><a href="#/services" className="hover:text-white transition-colors">Corporate Offices</a></li>
              <li><a href="#/services" className="hover:text-white transition-colors">Educational Facilities</a></li>
              <li><a href="#/services" className="hover:text-white transition-colors">Healthcare & Medical</a></li>
              <li><a href="#/services" className="hover:text-white transition-colors">Retail & Leisure</a></li>
              <li><a href="#/services" className="hover:text-white transition-colors">Post-Construction</a></li>
            </ul>
          </div>

          <div className="sm:pt-4">
            <h4 className="text-base sm:text-lg font-black mb-6 sm:mb-8 text-amber-400 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 sm:space-y-4 text-slate-400 font-light text-sm sm:text-base">
              <li><a href="#/" className="hover:text-white transition-colors">Why Five Star?</a></li>
              <li><a href="#/" className="hover:text-white transition-colors">Our Process</a></li>
              <li><a href="#/contact" className="hover:text-white transition-colors">Service Locations</a></li>
              <li><a href="#/contact" className="hover:text-white transition-colors">Request Quote</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="sm:pt-4">
            <h4 className="text-base sm:text-lg font-black mb-6 sm:mb-8 text-amber-400 uppercase tracking-widest">Certifications</h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {['ISO 9001', 'CHAS', 'BICSc', 'SAFE CONTRACTOR'].map((tag, i) => (
                <div key={i} className="bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/5">
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-center text-slate-400">{tag}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/5">
               <p className="text-[8px] sm:text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">CQC COMPLIANT</p>
               <p className="text-[10px] sm:text-xs text-slate-500">Certified for Medical Hygiene Standards</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-slate-500 text-[10px] sm:text-xs font-light">© {new Date().getFullYear()} Five Star Support Services Ltd. Registered in England & Wales.</p>
          <div className="flex gap-6 sm:gap-8 text-[10px] sm:text-xs font-light text-slate-500">
             <a href="#" className="hover:text-white">Privacy Centre</a>
             <a href="#" className="hover:text-white">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
