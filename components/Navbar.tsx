
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Sectors', href: '/sectors' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || !isHome ? 'bg-[#0a1a2f]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-xl bg-amber-500 text-[#0a1a2f] transform group-hover:rotate-12 transition-transform shadow-lg shadow-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white leading-none tracking-tight">FSS</span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em]">Five Star Support Services</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  location.pathname === link.href ? 'text-amber-400' : 'text-white/90 hover:text-amber-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-amber-500 hover:bg-amber-400 text-[#0a1a2f] px-6 py-3 rounded-xl text-sm font-black transition-all shadow-xl shadow-amber-500/30 hover:-translate-y-0.5"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:text-amber-400 transition-colors"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`lg:hidden absolute w-full bg-[#0a1a2f] shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen py-10 border-t border-white/10' : 'max-h-0'}`}>
        <div className="flex flex-col space-y-6 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-2xl font-black transition-colors ${
                location.pathname === link.href ? 'text-amber-400' : 'text-white hover:text-amber-400'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-amber-500 text-[#0a1a2f] text-center py-5 rounded-2xl font-black text-xl shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
