
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero.tsx';
import Services from '../components/Services.tsx';
import WhyChooseUs from '../components/WhyChooseUs.tsx';
import Process from '../components/Process.tsx';
import Testimonials from '../components/Testimonials.tsx';
import Coverage from '../components/Coverage.tsx';
import ContactForm from '../components/ContactForm.tsx';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Services />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <Coverage />
      <ContactForm />
    </motion.div>
  );
};

export default Home;
