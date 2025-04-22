
import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import LatestBlog from '@/components/sections/LatestBlog';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <HowItWorks />
          <Features />
          <Pricing />
          <Testimonials />
          <LatestBlog />
          <FAQ />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
