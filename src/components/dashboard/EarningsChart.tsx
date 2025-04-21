
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type TimeRange = 'daily' | 'weekly' | 'monthly';

// Mock data
const mockData = {
  daily: [
    { name: '12 AM', amount: 0.2 },
    { name: '4 AM', amount: 0.5 },
    { name: '8 AM', amount: 1.2 },
    { name: '12 PM', amount: 2.5 },
    { name: '4 PM', amount: 3.5 },
    { name: '8 PM', amount: 5.2 },
    { name: 'Now', amount: 6.0 },
  ],
  weekly: [
    { name: 'Mon', amount: 10.5 },
    { name: 'Tue', amount: 8.3 },
    { name: 'Wed', amount: 12.2 },
    { name: 'Thu', amount: 9.8 },
    { name: 'Fri', amount: 15.5 },
    { name: 'Sat', amount: 17.7 },
    { name: 'Sun', amount: 14.2 },
  ],
  monthly: [
    { name: 'Jan', amount: 55.5 },
    { name: 'Feb', amount: 60.3 },
    { name: 'Mar', amount: 75.2 },
    { name: 'Apr', amount: 62.8 },
    { name: 'May', amount: 70.5 },
    { name: 'Jun', amount: 85.7 },
    { name: 'Jul', amount: 90.2 },
  ],
};

const EarningsChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const [data, setData] = useState(mockData.daily);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setData(mockData[timeRange]);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRange]);

  return (
    <motion.div
      className="bg-card border rounded-xl p-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold mb-2 sm:mb-0">Earnings Overview</h3>
        
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={timeRange === 'daily' ? 'default' : 'outline'}
            onClick={() => setTimeRange('daily')}
            className="text-xs h-8"
          >
            Daily
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'weekly' ? 'default' : 'outline'}
            onClick={() => setTimeRange('weekly')}
            className="text-xs h-8"
          >
            Weekly
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'monthly' ? 'default' : 'outline'}
            onClick={() => setTimeRange('monthly')}
            className="text-xs h-8"
          >
            Monthly
          </Button>
        </div>
      </div>
      
      <div className="h-72">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="space-y-4 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Earnings']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorAmount)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default EarningsChart;
