
import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, ShieldCheck, MapPin } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'office',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your enquiry! A Five Star Support Services representative will contact you shortly.');
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/5">
            <h2 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4">Request a Proposal</h2>
            <h3 className="text-4xl md:text-6xl font-black text-[#0a1a2f] mb-8 tracking-tight">Connect With Our Team.</h3>
            <p className="text-slate-600 text-lg mb-12 font-light leading-relaxed">
              We provide tailored proposals for facilities of all sizes. Let's discuss how Five Star Support Services can enhance your professional environment.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a1a2f] border border-slate-100 group-hover:bg-amber-500 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Direct Support</p>
                  <p className="text-[#0a1a2f] font-black text-xl hover:text-amber-600 transition-colors cursor-pointer">+44 7917 157506</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a1a2f] border border-slate-100 group-hover:bg-amber-500 transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Headquarters</p>
                  <p className="text-[#0a1a2f] font-bold text-lg leading-snug">680 Green Lanes Ilford, London,<br />IG3 9RX, United Kingdom</p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a1a2f] border border-slate-100 group-hover:bg-amber-500 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Enquiries</p>
                  <p className="text-[#0a1a2f] font-black text-lg hover:text-amber-600 transition-colors cursor-pointer">info@commercialcleaningfss.co.uk</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-[#0a1a2f] rounded-[2.5rem] relative overflow-hidden shadow-2xl">
               <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
               <p className="text-amber-500 font-black text-xs uppercase tracking-widest mb-2 relative z-10">Trusted Partner</p>
               <p className="text-white font-bold text-lg mb-2 relative z-10">Professional Liability</p>
               <p className="text-slate-400 text-sm relative z-10">We carry comprehensive £10m public and employer's liability insurance for your complete peace of mind.</p>
            </div>
          </div>

          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-[#0a1a2f] text-xs font-black uppercase tracking-widest mb-3">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                    placeholder="John Smith"
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[#0a1a2f] text-xs font-black uppercase tracking-widest mb-3">Company Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                    placeholder="Enterprise Ltd"
                    onChange={(e) => setFormState({...formState, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-[#0a1a2f] text-xs font-black uppercase tracking-widest mb-3">Work Email</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                    placeholder="john@enterprise.com"
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[#0a1a2f] text-xs font-black uppercase tracking-widest mb-3">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                    placeholder="+44 7000 000000"
                    onChange={(e) => setFormState({...formState, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-[#0a1a2f] text-xs font-black uppercase tracking-widest mb-3">Service Required</label>
                <select
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium appearance-none"
                  onChange={(e) => setFormState({...formState, service: e.target.value})}
                >
                  <option value="office">Office Cleaning</option>
                  <option value="education">School/Education Cleaning</option>
                  <option value="medical">Medical/Healthcare Cleaning</option>
                  <option value="retail">Retail/Leisure Cleaning</option>
                  <option value="deep">One-off Deep Clean</option>
                  <option value="window">Window Cleaning</option>
                </select>
              </div>

              <div className="mb-10">
                <label className="block text-[#0a1a2f] text-xs font-black uppercase tracking-widest mb-3">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                  placeholder="Tell us about your facility and cleaning frequency requirements..."
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-[#0a1a2f] font-black py-6 rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 group text-xl"
              >
                Request My Quote
                <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
