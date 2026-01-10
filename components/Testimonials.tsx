
import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../constants.tsx';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-black tracking-widest uppercase text-sm mb-4 block"
          >
            Client Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-[#0a1a2f] tracking-tight"
          >
            Five Star Reviews.
          </motion.h2>
        </div>

        <div className="relative h-[450px] md:h-[400px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full max-w-4xl"
            >
              <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] relative group border border-slate-100 mx-auto">
                <div className="absolute top-8 right-10 text-slate-100">
                  <Quote className="w-20 h-20 md:w-32 md:h-32" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-8">
                    {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  
                  <p className="text-[#0a1a2f] text-2xl md:text-3xl font-medium mb-12 leading-relaxed italic">
                    "{TESTIMONIALS[currentIndex].content}"
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#0a1a2f] rounded-2xl flex items-center justify-center text-amber-500 font-black text-2xl shadow-lg shadow-blue-900/10">
                      {TESTIMONIALS[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-black text-[#0a1a2f] text-xl leading-none mb-1">
                        {TESTIMONIALS[currentIndex].name}
                      </h5>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">
                        {TESTIMONIALS[currentIndex].role}
                      </p>
                      <p className="text-amber-600 text-xs font-black tracking-wide">
                        {TESTIMONIALS[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-xl text-[#0a1a2f] hover:bg-amber-500 transition-colors pointer-events-auto"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-xl text-[#0a1a2f] hover:bg-amber-500 transition-colors pointer-events-auto"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 transition-all duration-300 rounded-full ${
                currentIndex === idx ? 'w-12 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
