
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'ClickGain',
    siteDescription: 'Earn money by viewing ads and referring friends',
    supportEmail: 'support@clickgain.com',
    allowRegistrations: true,
    maintenanceMode: false,
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    minimumPayout: '10.00',
    paymentProcessingFee: '1.00',
    enablePaypal: true,
    enableStripe: true,
    enableCryptoPayments: false,
  });
  
  const [adSettings, setAdSettings] = useState({
    minAdViewTime: '30',
    maxDailyAds: '50',
    adRevenueSharePercent: '70',
    referralCommissionPercent: '10',
  });
  
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "General settings have been updated",
    });
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Payment settings have been updated",
    });
  };
  
  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Ad settings have been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Settings</h2>
        <p className="text-muted-foreground">
          Configure the system settings for ClickGain platform
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="ads">Ads & Referrals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <form onSubmit={handleGeneralSubmit}>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic settings for your ClickGain platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="siteName" className="text-sm font-medium">Site Name</label>
                  <Input 
                    id="siteName" 
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="siteDescription" className="text-sm font-medium">Site Description</label>
                  <Input 
                    id="siteDescription" 
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="supportEmail" className="text-sm font-medium">Support Email</label>
                  <Input 
                    id="supportEmail" 
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <label htmlFor="allowRegistrations" className="text-sm font-medium">Allow Registrations</label>
                    <p className="text-sm text-muted-foreground">Allow new users to register on the platform</p>
                  </div>
                  <Switch 
                    id="allowRegistrations" 
                    checked={generalSettings.allowRegistrations}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, allowRegistrations: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <label htmlFor="maintenanceMode" className="text-sm font-medium">Maintenance Mode</label>
                    <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                  </div>
                  <Switch 
                    id="maintenanceMode" 
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <form onSubmit={handlePaymentSubmit}>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure payment options and thresholds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="minimumPayout" className="text-sm font-medium">Minimum Payout ($)</label>
                  <Input 
                    id="minimumPayout" 
                    value={paymentSettings.minimumPayout}
                    onChange={(e) => setPaymentSettings({...paymentSettings, minimumPayout: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="paymentProcessingFee" className="text-sm font-medium">Payment Processing Fee ($)</label>
                  <Input 
                    id="paymentProcessingFee" 
                    value={paymentSettings.paymentProcessingFee}
                    onChange={(e) => setPaymentSettings({...paymentSettings, paymentProcessingFee: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <label htmlFor="enablePaypal" className="text-sm font-medium">Enable PayPal</label>
                    <p className="text-sm text-muted-foreground">Allow payouts via PayPal</p>
                  </div>
                  <Switch 
                    id="enablePaypal" 
                    checked={paymentSettings.enablePaypal}
                    onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enablePaypal: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <label htmlFor="enableStripe" className="text-sm font-medium">Enable Stripe</label>
                    <p className="text-sm text-muted-foreground">Allow payouts via Stripe</p>
                  </div>
                  <Switch 
                    id="enableStripe" 
                    checked={paymentSettings.enableStripe}
                    onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableStripe: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <label htmlFor="enableCryptoPayments" className="text-sm font-medium">Enable Crypto Payments</label>
                    <p className="text-sm text-muted-foreground">Allow payouts via cryptocurrency</p>
                  </div>
                  <Switch 
                    id="enableCryptoPayments" 
                    checked={paymentSettings.enableCryptoPayments}
                    onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableCryptoPayments: checked})}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="ads" className="space-y-4">
          <Card>
            <form onSubmit={handleAdSubmit}>
              <CardHeader>
                <CardTitle>Ads & Referrals Settings</CardTitle>
                <CardDescription>
                  Configure ad viewing and referral settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="minAdViewTime" className="text-sm font-medium">Minimum Ad View Time (seconds)</label>
                  <Input 
                    id="minAdViewTime" 
                    value={adSettings.minAdViewTime}
                    onChange={(e) => setAdSettings({...adSettings, minAdViewTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="maxDailyAds" className="text-sm font-medium">Maximum Daily Ads Per User</label>
                  <Input 
                    id="maxDailyAds" 
                    value={adSettings.maxDailyAds}
                    onChange={(e) => setAdSettings({...adSettings, maxDailyAds: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="adRevenueSharePercent" className="text-sm font-medium">Ad Revenue Share (%)</label>
                  <Input 
                    id="adRevenueSharePercent" 
                    value={adSettings.adRevenueSharePercent}
                    onChange={(e) => setAdSettings({...adSettings, adRevenueSharePercent: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="referralCommissionPercent" className="text-sm font-medium">Referral Commission (%)</label>
                  <Input 
                    id="referralCommissionPercent" 
                    value={adSettings.referralCommissionPercent}
                    onChange={(e) => setAdSettings({...adSettings, referralCommissionPercent: e.target.value})}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
