
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 md:py-24"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-8">About ClickGain</h1>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground mb-8">
                  At ClickGain, we're revolutionizing the way people earn money online through 
                  our innovative paid-to-click platform.
                </p>

                <div className="grid gap-12 my-12">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground">
                      To provide a reliable, transparent, and user-friendly platform where anyone 
                      can earn additional income by participating in advertising campaigns and 
                      referral programs.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-lg bg-card">
                        <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                        <p className="text-muted-foreground">
                          We believe in complete transparency in our operations and earnings structure.
                        </p>
                      </div>
                      <div className="p-6 rounded-lg bg-card">
                        <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                        <p className="text-muted-foreground">
                          Consistent and timely payments are our top priority.
                        </p>
                      </div>
                      <div className="p-6 rounded-lg bg-card">
                        <h3 className="text-xl font-semibold mb-2">Community</h3>
                        <p className="text-muted-foreground">
                          Building a supportive community of earners worldwide.
                        </p>
                      </div>
                      <div className="p-6 rounded-lg bg-card">
                        <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                        <p className="text-muted-foreground">
                          Continuously improving our platform with new features.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                    <p className="text-muted-foreground mb-4">
                      Founded in 2024, ClickGain emerged from a simple idea: making online earning 
                      accessible to everyone. What started as a small project has grown into a 
                      thriving community of thousands of active users worldwide.
                    </p>
                    <p className="text-muted-foreground">
                      Today, we process over 100,000 clicks daily and have paid out millions to 
                      our dedicated users. Our success is built on the trust and satisfaction of 
                      our growing community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
