
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToNextSection = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 lg:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient -z-10 opacity-90 dark:opacity-50"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-0 h-64 w-64 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white dark:text-white animate-fade-in-up [animation-delay:0.2s] opacity-0">
              Earn Money With Every Click, <span className="text-secondary">Effortlessly</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80 dark:text-white/80 animate-fade-in-up [animation-delay:0.4s] opacity-0">
              Join thousands of users already earning daily passive income by viewing ads. 
              Simple, transparent, and reliable – start earning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up [animation-delay:0.6s] opacity-0">
              <Button className="px-8 py-6 text-base rounded-xl bg-white text-primary hover:bg-white/90 dark:bg-white dark:text-primary">
                Start Earning Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-8 py-6 text-base rounded-xl border-white text-white hover:bg-white/10 hover:text-white dark:border-white dark:text-white">
                Watch How It Works
              </Button>
            </div>
            <div className="mt-12 text-white/80 dark:text-white/80 animate-fade-in-up [animation-delay:0.8s] opacity-0">
              <p className="font-semibold">Trusted by 100,000+ users worldwide</p>
              <div className="flex justify-center lg:justify-start mt-4 space-x-4">
                <div className="h-8 w-20 bg-white/20 rounded-md"></div>
                <div className="h-8 w-20 bg-white/20 rounded-md"></div>
                <div className="h-8 w-20 bg-white/20 rounded-md"></div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md lg:max-w-none animate-fade-in-up [animation-delay:0.6s] opacity-0">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl dark:bg-gray-800/30 animate-float">
              <div className="rounded-lg overflow-hidden mb-4">
                <div className="bg-primary/30 h-48 w-full rounded-lg flex items-center justify-center">
                  <p className="text-white text-lg">Ad Preview Placeholder</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/20 dark:bg-white/5 h-10 rounded-lg"></div>
                <div className="flex justify-between">
                  <div className="bg-white/20 dark:bg-white/5 h-10 w-28 rounded-lg"></div>
                  <div className="bg-secondary/30 h-10 w-28 rounded-lg flex items-center justify-center text-white font-medium">
                    Earn $0.01
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToNextSection}
            aria-label="Scroll down"
            className="text-white/80 hover:text-white transition-colors"
          >
            <ArrowDown className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
