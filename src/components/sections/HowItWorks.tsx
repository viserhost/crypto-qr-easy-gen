
import React from 'react';
import { Check, MousePointer, DollarSign, UserPlus } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Register',
    description:
      'Sign up for free in less than 60 seconds. No credit card required to get started.',
    icon: <UserPlus className="h-8 w-8 text-primary" />,
  },
  {
    id: 2,
    title: 'Click Ads',
    description:
      'Browse our marketplace of advertiser links. Each valid click earns you money instantly.',
    icon: <MousePointer className="h-8 w-8 text-primary" />,
  },
  {
    id: 3,
    title: 'Earn',
    description:
      'Watch your balance grow in real-time. Invite friends to multiply your earnings.',
    icon: <DollarSign className="h-8 w-8 text-primary" />,
  },
  {
    id: 4,
    title: 'Withdraw',
    description:
      'Cash out your earnings via PayPal, crypto, or gift cards once you reach the minimum threshold.',
    icon: <Check className="h-8 w-8 text-primary" />,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section-spacing bg-muted/50 dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How ClickGain Works</h2>
          <p className="text-muted-foreground text-lg">
            Our platform makes earning online simple, transparent and accessible to everyone.
            Just follow these easy steps.
          </p>
        </div>

        {/* Mobile Timeline (Vertical) */}
        <div className="md:hidden">
          {steps.map((step, index) => (
            <div key={step.id} className="relative pl-12 pb-10 last:pb-0">
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-primary/30"></div>
              )}
              
              {/* Circle number */}
              <div className="absolute left-0 top-0 timeline-number">
                {step.id}
              </div>
              
              {/* Content */}
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Timeline (Horizontal) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Top connecting line */}
                <div className="absolute top-5 left-1/2 right-0 h-0.5 bg-primary/30">
                  {/* Hide line after last item */}
                  {index === steps.length - 1 && (
                    <div className="absolute inset-0 bg-muted/50 dark:bg-slate-900"></div>
                  )}
                </div>
                
                {/* Left connecting line (except first item) */}
                {index > 0 && (
                  <div className="absolute top-5 right-1/2 left-0 h-0.5 bg-primary/30"></div>
                )}
                
                {/* Content */}
                <div className="pt-14 relative">
                  {/* Circle number */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 timeline-number">
                    {step.id}
                  </div>
                  
                  <div className="bg-background rounded-xl p-6 shadow-sm border border-border h-full">
                    <div className="mb-4">{step.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
