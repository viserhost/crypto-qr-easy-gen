
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

type StatCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  format?: (value: number | string) => string;
  isLoading?: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  format = (val) => String(val),
  isLoading = false,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Animate the number counting up
  useEffect(() => {
    if (isLoading) return;
    
    const numericValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;
    let startValue = 0;
    const duration = 1000; // 1 second
    const increment = numericValue / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(startValue);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, isLoading]);
  
  const formattedValue = format(displayValue);
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      {isLoading ? (
        <div className="p-5 space-y-3">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ) : (
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{title}</span>
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10">
              {icon}
            </div>
          </div>
          
          <div className="mt-2">
            <h3 className="text-2xl font-bold">
              {formattedValue}
            </h3>
            
            {change && (
              <p className={`text-xs flex items-center mt-1 ${
                change.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                <span>
                  {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
                </span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
