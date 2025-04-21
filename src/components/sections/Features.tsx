
import React from 'react';
import { Shield, Award, Users, DollarSign, Clock, Star } from 'lucide-react';

const features = [
  {
    title: 'Secure Payments',
    description:
      'Our platform uses bank-level encryption to ensure your earnings are safe and secure.',
    icon: <Shield className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Best Rates',
    description:
      'We offer some of the highest pay-per-click rates in the industry, helping you earn more.',
    icon: <Award className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Referral System',
    description:
      'Earn up to 10% from your referrals\' clicks, creating a passive income stream.',
    icon: <Users className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Instant Deposits',
    description:
      'Your account balance updates in real-time with each verified click.',
    icon: <DollarSign className="h-10 w-10 text-primary" />,
  },
  {
    title: '24/7 Availability',
    description:
      'Access new ads and earning opportunities around the clock, whenever it suits you.',
    icon: <Clock className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Premium Support',
    description:
      'Our responsive support team is available to help with any questions or issues.',
    icon: <Star className="h-10 w-10 text-primary" />,
  },
];

const Features: React.FC = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose ClickGain
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform is designed to maximize your earnings while providing a
            seamless and transparent experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="features-card group hover:-translate-y-1 transition-all"
            >
              <div className="mb-4 inline-block p-3 rounded-lg bg-primary/10 dark:bg-primary/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
