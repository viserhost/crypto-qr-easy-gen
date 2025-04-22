
import React from 'react';
import { Check, MousePointer, DollarSign, UserPlus, CreditCard } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';

const steps = [
  {
    id: 1,
    title: 'Sign Up',
    description:
      'Create your free account in less than 60 seconds. No credit card required to start earning.',
    icon: <UserPlus className="h-12 w-12 text-primary" />,
  },
  {
    id: 2,
    title: 'View Ads',
    description:
      'Browse our marketplace of advertiser links. Each valid view and click earns you money instantly.',
    icon: <MousePointer className="h-12 w-12 text-primary" />,
  },
  {
    id: 3,
    title: 'Refer Friends',
    description:
      'Invite friends to join and earn a percentage of their clicks. Build your passive income network.',
    icon: <UserPlus className="h-12 w-12 text-primary" />,
  },
  {
    id: 4,
    title: 'Earn Rewards',
    description:
      'Watch your balance grow in real-time. Complete tasks for bonus rewards and special offers.',
    icon: <DollarSign className="h-12 w-12 text-primary" />,
  },
  {
    id: 5,
    title: 'Cash Out',
    description:
      'Withdraw your earnings via PayPal, crypto, or gift cards with our fast payment processing.',
    icon: <CreditCard className="h-12 w-12 text-primary" />,
  },
];

const HowItWorks: React.FC = () => {
  const isMobile = useIsMobile();
  
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

        {isMobile ? (
          // Mobile View - Vertical Timeline
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative pl-12">
                {/* Timeline line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-14 bottom-0 w-0.5 h-12 bg-primary/30"></div>
                )}
                
                {/* Step number circle */}
                <div className="absolute left-0 top-2.5 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {step.id}
                </div>
                
                {/* Step content */}
                <Card className="border-primary/10">
                  <CardContent className="p-6">
                    <div className="mb-4 text-primary">{step.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          // Desktop View - Horizontal Process
          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary/30"></div>
            
            {/* Steps */}
            <div className="grid grid-cols-5 gap-4 w-full relative z-10">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center text-center">
                  {/* Step number and icon */}
                  <div className="relative mb-8">
                    {/* Circle with number */}
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-4 relative z-10">
                      <span className="text-xl font-bold">{step.id}</span>
                    </div>
                    
                    {/* Icon floating above */}
                    <div className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Step content */}
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
