
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, Users, CreditCard, LineChart,
  ShieldCheck, Activity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between py-6">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated:</span>
          <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
        </div>
      </div>
      
      {/* Stats overview with improved spacing */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">643</div>
            <p className="text-xs text-muted-foreground mt-1">+7% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543.00</div>
            <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground mt-1">+4% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick status with improved layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>All systems operational</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>User Authentication</span>
                </div>
                <span className="text-sm text-muted-foreground">100% uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Payment Processing</span>
                </div>
                <span className="text-sm text-muted-foreground">99.9% uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Ad Delivery Network</span>
                </div>
                <span className="text-sm text-muted-foreground">99.8% uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Referral System</span>
                </div>
                <span className="text-sm text-muted-foreground">100% uptime</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Admin Activity</CardTitle>
            <CardDescription>Recent actions by administrators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">New plan added</span>
                <span className="text-xs text-muted-foreground">5 minutes ago by admin@clickgain.com</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">User banned</span>
                <span className="text-xs text-muted-foreground">2 hours ago by support@clickgain.com</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Settings updated</span>
                <span className="text-xs text-muted-foreground">1 day ago by admin@clickgain.com</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Security status with improved spacing */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Security Status</CardTitle>
            <CardDescription>System protection status</CardDescription>
          </div>
          <ShieldCheck className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Firewall</span>
              <span className="text-xs text-green-500">Active</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">DDoS Protection</span>
              <span className="text-xs text-green-500">Active</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Fraud Detection</span>
              <span className="text-xs text-green-500">Active</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Data Encryption</span>
              <span className="text-xs text-green-500">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
