
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

type Referral = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  clicks: number;
  earnings: number;
};

// Mock data for referrals
const mockReferrals: Referral[] = [
  {
    id: '1',
    name: 'Sarah P.',
    email: 'sarah.p@example.com',
    joinDate: '2023-04-15',
    clicks: 145,
    earnings: 12.50,
  },
  {
    id: '2',
    name: 'Michael T.',
    email: 'michael.t@example.com',
    joinDate: '2023-04-12',
    clicks: 120,
    earnings: 10.25,
  },
  {
    id: '3',
    name: 'Jessica K.',
    email: 'jessica.k@example.com',
    joinDate: '2023-04-10',
    clicks: 210,
    earnings: 15.75,
  },
  {
    id: '4',
    name: 'David L.',
    email: 'david.l@example.com',
    joinDate: '2023-04-08',
    clicks: 75,
    earnings: 7.30,
  },
  {
    id: '5',
    name: 'Amanda R.',
    email: 'amanda.r@example.com',
    joinDate: '2023-04-05',
    clicks: 90,
    earnings: 8.45,
  },
];

const TopReferrals: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setReferrals(mockReferrals);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <motion.div
      className="bg-card border rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Top Referrals</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        {referral.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{referral.name}</div>
                        <div className="text-xs text-muted-foreground">{referral.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(referral.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">{referral.clicks}</TableCell>
                  <TableCell className="text-right font-medium">${referral.earnings.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </motion.div>
  );
};

export default TopReferrals;
