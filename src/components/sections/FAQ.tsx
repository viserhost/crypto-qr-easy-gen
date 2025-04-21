
import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'How does ClickGain work?',
    answer: "ClickGain is a paid-to-click (PTC) platform where users earn money by viewing ads. Advertisers pay us to display their ads, and we share that revenue with users who view them. Simply register, browse available ads, click to view them for the required time, and earn money for each valid view."
  },
  {
    question: 'How much can I earn?',
    answer: "Earnings vary based on your membership level, the number of ads you view, and your referral activity. Free members can earn from $0.001 to $0.005 per click, while premium members can earn up to $0.02 per click. With consistent activity and a strong referral network, users report earnings of $50-$300 per month."
  },
  {
    question: 'When and how do I get paid?',
    answer: "We process withdrawals every Monday and Thursday. You can request payment once you reach the minimum threshold ($10 for free members, $5 for Standard, and no minimum for Premium). We support multiple payment methods including PayPal, cryptocurrency (Bitcoin, Ethereum), and various e-wallets."
  },
  {
    question: 'Is ClickGain available worldwide?',
    answer: "Yes, ClickGain is available to users worldwide. We support multiple languages and payment methods to accommodate international users. However, the availability of certain ads may vary by region based on advertiser preferences."
  },
  {
    question: 'How does the referral program work?',
    answer: "Our referral program allows you to earn a commission from the clicks made by users you refer to ClickGain. Free members earn 5% commission, Standard members earn 8%, and Premium members earn 10%. You can promote your referral link on social media, websites, or directly to friends and family."
  },
  {
    question: 'Are there any fees to join?',
    answer: "No, registration is completely free. We offer a free membership plan with basic features, as well as paid membership plans (Standard and Premium) that provide enhanced earning rates and additional benefits."
  },
  {
    question: 'How do you prevent click fraud?',
    answer: "We employ sophisticated anti-fraud technologies to ensure all clicks are legitimate. This includes IP tracking, browser fingerprinting, and behavioral analysis. Using automation tools, bots, VPNs, or attempting to manipulate the system will result in account suspension and forfeiture of earnings."
  },
  {
    question: 'What happens if I miss a day?',
    answer: "Nothing negative happens if you miss a day. ClickGain is designed to be flexible with no daily requirements. However, available ads refresh daily, so unused ad opportunities don't carry over to the next day."
  }
];

const FAQ: React.FC = () => {
  // Add structured data for SEO
  useEffect(() => {
    // Create FAQPage schema for structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };

    // Add or update the JSON-LD script in the document head
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    // Clean up on component unmount
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);

  return (
    <section id="faq" className="section-spacing bg-muted/50 dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about how ClickGain works
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-lg font-medium text-left py-5 transition-all hover:text-primary">
                  <span className="flex items-center">
                    <PlusCircle className="mr-3 h-5 w-5 text-primary flex-shrink-0 transition-transform" />
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base py-4 pl-8 pr-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <a
              href="#contact"
              className="btn-primary"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
