
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

type ActivityItem = {
  id: string;
  message: string;
  time: string;
  type: 'earning' | 'referral' | 'withdrawal' | 'system';
};

// Mock activities
const initialActivities: ActivityItem[] = [
  {
    id: '1',
    message: 'John earned $0.02 from Ad #4532',
    time: '2 minutes ago',
    type: 'earning',
  },
  {
    id: '2',
    message: 'Sarah referred a new user: Michael',
    time: '5 minutes ago',
    type: 'referral',
  },
  {
    id: '3',
    message: 'David withdrew $25 to PayPal',
    time: '10 minutes ago',
    type: 'withdrawal',
  },
  {
    id: '4',
    message: 'System maintenance scheduled for tomorrow',
    time: '15 minutes ago',
    type: 'system',
  },
  {
    id: '5',
    message: 'Emma earned $0.05 from Ad #4536',
    time: '20 minutes ago',
    type: 'earning',
  },
];

// New activities that will be added periodically
const newActivities: Omit<ActivityItem, 'id' | 'time'>[] = [
  {
    message: 'Alex earned $0.03 from Ad #4540',
    type: 'earning',
  },
  {
    message: 'Mike referred a new user: Jessica',
    type: 'referral',
  },
  {
    message: 'Lisa withdrew $30 to Bitcoin wallet',
    type: 'withdrawal',
  },
  {
    message: 'Premium plan promotion: 20% off',
    type: 'system',
  },
];

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const activityContainerRef = useRef<HTMLDivElement>(null);

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setActivities(initialActivities);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Periodically add new activities
  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(() => {
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
      const newActivity: ActivityItem = {
        id: String(Date.now()),
        message: randomActivity.message,
        type: randomActivity.type,
        time: 'Just now',
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      
      // Adjust the older activities' time
      setTimeout(() => {
        setActivities(prev => 
          prev.map(activity => 
            activity.id === newActivity.id 
              ? { ...activity, time: 'A few seconds ago' } 
              : activity
          )
        );
      }, 5000);
    }, 10000); // Add new activity every 10 seconds
    
    return () => clearInterval(interval);
  }, [isLoading]);

  // Auto-scroll to the top when new activities are added
  useEffect(() => {
    if (activityContainerRef.current && !isLoading) {
      activityContainerRef.current.scrollTop = 0;
    }
  }, [activities, isLoading]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'earning':
        return '💰';
      case 'referral':
        return '👥';
      case 'withdrawal':
        return '💸';
      case 'system':
        return '🔔';
      default:
        return '📌';
    }
  };

  return (
    <motion.div
      className="bg-card border rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold">Recent Activity</h3>
      </div>
      
      <div 
        ref={activityContainerRef}
        className="max-h-[350px] overflow-y-auto"
      >
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y">
            <AnimatePresence>
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  className="p-4 flex items-start space-x-3 hover:bg-muted/50 transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span role="img" aria-label={activity.type}>
                      {getActivityIcon(activity.type)}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
