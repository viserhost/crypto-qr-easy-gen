
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

const stats: Stat[] = [
  { label: 'Total Users', value: 24583, prefix: '' },
  { label: 'Total Paid Out', value: 157845, prefix: '$' },
  { label: 'Active Users', value: 8721, prefix: '' },
  { label: 'Daily Ads Viewed', value: 145321, prefix: '' },
];

const FooterStatsBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const statVisibility = stats.reduce((acc, _, index) => {
      acc[`stat-${index}`] = false;
      return acc;
    }, {} as Record<string, boolean>);
    
    // Delay the animation start
    setTimeout(() => {
      stats.forEach((_, index) => {
        setTimeout(() => {
          setIsVisible(prev => ({ ...prev, [`stat-${index}`]: true }));
        }, index * 300);
      });
    }, 500);
  }, []);
  
  return (
    <div className="hidden md:block sticky bottom-0 left-0 right-0 z-10 border-t bg-card/80 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl py-3">
        <div className="grid grid-cols-4 divide-x">
          {stats.map((stat, index) => (
            <div key={index} className="px-4 flex flex-col items-center justify-center">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <motion.p 
                className="text-base font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isVisible[`stat-${index}`] ? 1 : 0, 
                  y: isVisible[`stat-${index}`] ? 0 : 10 
                }}
                transition={{ duration: 0.5 }}
              >
                {stat.prefix || ''}
                {isVisible[`stat-${index}`] ? stat.value.toLocaleString() : '0'}
                {stat.suffix || ''}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterStatsBar;
