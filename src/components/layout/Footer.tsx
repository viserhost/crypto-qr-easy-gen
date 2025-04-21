
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Mail, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted dark:bg-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">ClickGain</h3>
            <p className="text-muted-foreground mb-4">
              The easiest way to earn money online through paid advertising views.
              Join thousands already making money daily.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Earnings Disclaimer</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Referral Terms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">User Guidelines</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="max-w-[220px]"
              />
              <Button size="icon" aria-label="Subscribe">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ClickGain. All rights reserved.
            </p>
            <div className="text-sm text-muted-foreground">
              <span className="inline-flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="15" x="2" y="6" rx="2" />
                  <path d="M6 12h12" />
                  <path d="M8 9h8" />
                  <path d="M9 18l3-3 3 3" />
                </svg>
                Secured by TrustGuard
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
