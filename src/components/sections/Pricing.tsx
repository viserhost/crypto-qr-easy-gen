
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// Pricing data
const plans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Basic earning potential for new members',
    features: [
      'Up to $0.005 per ad click',
      '10 available ads daily',
      'Minimum withdrawal: $10',
      'Basic referral commission (5%)',
      'Standard support'
    ],
    popular: false,
    buttonText: 'Get Started'
  },
  {
    name: 'Standard',
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    description: 'Enhanced earnings and more opportunities',
    features: [
      'Up to $0.01 per ad click',
      '30 available ads daily',
      'Minimum withdrawal: $5',
      'Enhanced referral commission (8%)',
      'Priority support',
      'Ad-free experience'
    ],
    popular: true,
    buttonText: 'Upgrade Now'
  },
  {
    name: 'Premium',
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    description: 'Maximum earning potential for serious users',
    features: [
      'Up to $0.02 per ad click',
      'Unlimited ads daily',
      'No minimum withdrawal',
      'Premium referral commission (10%)',
      '24/7 dedicated support',
      'Ad-free experience',
      'Exclusive high-paying offers'
    ],
    popular: false,
    buttonText: 'Go Premium'
  }
];

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(false);
  
  const toggleBilling = () => {
    setAnnual(!annual);
  };

  return (
    <section id="pricing" className="section-spacing bg-muted/50 dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Membership Plan
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Select the plan that fits your goals and boost your earning potential
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!annual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={annual}
              onCheckedChange={toggleBilling}
              aria-label="Toggle annual billing"
            />
            <span className={`text-sm font-medium ${annual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly <span className="text-primary">Save 15%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] ${
                plan.popular 
                  ? 'border-2 border-primary shadow-xl dark:border-primary relative md:scale-105' 
                  : 'border border-border shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground font-medium px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              
              <div className="bg-background p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      ${annual ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-lg font-normal text-muted-foreground ml-2">
                      {plan.monthlyPrice === 0 ? '' : annual ? '/year' : '/month'}
                    </span>
                  </div>
                  {annual && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-primary mt-1 text-center">
                      Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(2)} annually
                    </p>
                  )}
                </div>
                
                <Button 
                  className={`w-full py-6 ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </div>
              
              <div className="bg-muted/50 dark:bg-slate-800/50 p-6 md:p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
