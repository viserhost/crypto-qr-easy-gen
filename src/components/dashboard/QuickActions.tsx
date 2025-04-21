
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Users, MonitorPlay } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Withdraw Funds',
      description: 'Transfer your earnings to your account',
      icon: <Download className="h-6 w-6" />,
      buttonText: 'Withdraw',
      buttonVariant: 'default' as const,
      href: '/dashboard/withdraw',
      isPrimary: true
    },
    {
      title: 'Refer Friends',
      description: 'Earn 10% from your referrals',
      icon: <Users className="h-6 w-6" />,
      buttonText: 'Copy Link',
      buttonVariant: 'outline' as const,
      onClick: () => {
        // Copy referral link logic
        navigator.clipboard.writeText('https://clickgain.com/ref/123456');
        alert('Referral link copied to clipboard!');
      }
    },
    {
      title: 'View Ads',
      description: 'Start earning by watching ads',
      icon: <MonitorPlay className="h-6 w-6" />,
      buttonText: 'Start Now',
      buttonVariant: 'outline' as const,
      href: '/dashboard/ads'
    }
  ];
  
  return (
    <motion.div
      className="bg-card border rounded-xl p-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            className={`border rounded-lg p-4 ${
              action.isPrimary ? 'bg-primary text-primary-foreground' : 'bg-card'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
              action.isPrimary ? 'bg-primary-foreground/20' : 'bg-primary/10'
            }`}>
              {action.icon}
            </div>
            
            <h4 className={`text-lg font-medium mb-1 ${
              action.isPrimary ? 'text-primary-foreground' : ''
            }`}>
              {action.title}
            </h4>
            
            <p className={`text-sm mb-4 ${
              action.isPrimary ? 'text-primary-foreground/80' : 'text-muted-foreground'
            }`}>
              {action.description}
            </p>
            
            <Button
              variant={action.buttonVariant}
              className={`w-full ${
                action.isPrimary ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' : ''
              }`}
              onClick={action.onClick}
              {...(action.href ? { as: 'a', href: action.href } : {})}
            >
              {action.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
