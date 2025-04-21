
import React, { Suspense, lazy } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy loading fallback component
const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-12 w-3/4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-lg" />
      ))}
    </div>
    <Skeleton className="h-72 rounded-lg" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton className="h-64 rounded-lg" />
      <Skeleton className="h-64 rounded-lg" />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSkeleton />}>
        <DashboardContent />
      </Suspense>
    </DashboardLayout>
  );
};

export default Dashboard;
