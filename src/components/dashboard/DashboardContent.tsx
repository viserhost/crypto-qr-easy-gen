
import React, { useState, useEffect } from 'react';
import { DollarSign, MousePointer, Users, TrendingUp } from 'lucide-react';
import WelcomeBanner from './WelcomeBanner';
import StatCard from './StatCard';
import EarningsChart from './EarningsChart';
import TopReferrals from './TopReferrals';
import QuickActions from './QuickActions';
import ActivityFeed from './ActivityFeed';
import FooterStatsBar from './FooterStatsBar';

const DashboardContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <WelcomeBanner />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Balance"
          value={126.85}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          change={{ value: 12.5, isPositive: true }}
          format={(value) => `$${Number(value).toFixed(2)}`}
          isLoading={isLoading}
        />
        <StatCard
          title="Clicks Today"
          value={85}
          icon={<MousePointer className="h-5 w-5 text-blue-500" />}
          change={{ value: 8.3, isPositive: true }}
          isLoading={isLoading}
        />
        <StatCard
          title="Referrals"
          value={12}
          icon={<Users className="h-5 w-5 text-purple-500" />}
          change={{ value: 2, isPositive: true }}
          isLoading={isLoading}
        />
        <StatCard
          title="CTR"
          value={5.67}
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          change={{ value: 0.8, isPositive: false }}
          format={(value) => `${Number(value).toFixed(2)}%`}
          isLoading={isLoading}
        />
      </div>
      
      {/* Earnings Chart */}
      <EarningsChart />
      
      {/* Quick Actions */}
      <QuickActions />
      
      {/* Referrals and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopReferrals />
        <ActivityFeed />
      </div>
      
      {/* Footer Stats Bar */}
      <FooterStatsBar />
    </>
  );
};

export default DashboardContent;
