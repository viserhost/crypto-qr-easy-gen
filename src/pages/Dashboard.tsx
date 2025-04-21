
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  Bell, User, LogOut, Home, DollarSign, MousePointer, Users, 
  Copy, ExternalLink, Coffee, ChevronDown, Moon, Sun 
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

// Mock data for the earnings chart
const earningsData = [
  { name: 'Jan', amount: 12.5 },
  { name: 'Feb', amount: 18.3 },
  { name: 'Mar', amount: 21.2 },
  { name: 'Apr', amount: 16.8 },
  { name: 'May', amount: 22.5 },
  { name: 'Jun', amount: 26.7 },
  { name: 'Jul', amount: 31.2 },
];

// Mock data for ad history
const adHistoryData = [
  { id: 1, date: '2023-04-21', adName: 'Digital Marketing Pro', earnings: 0.015, status: 'Completed' },
  { id: 2, date: '2023-04-21', adName: 'Travel Deals App', earnings: 0.022, status: 'Completed' },
  { id: 3, date: '2023-04-20', adName: 'Crypto Trading Platform', earnings: 0.018, status: 'Completed' },
  { id: 4, date: '2023-04-20', adName: 'Language Learning App', earnings: 0.012, status: 'Completed' },
  { id: 5, date: '2023-04-19', adName: 'Food Delivery Service', earnings: 0.025, status: 'Completed' },
  { id: 6, date: '2023-04-19', adName: 'Online Education', earnings: 0.020, status: 'Completed' },
  { id: 7, date: '2023-04-18', adName: 'E-commerce Store', earnings: 0.017, status: 'Completed' },
  { id: 8, date: '2023-04-18', adName: 'Fitness App', earnings: 0.019, status: 'Completed' },
];

// Mock data for referrals
const referralsData = [
  { id: 1, name: 'Sarah P.', earnings: 4.25, date: '2023-04-15' },
  { id: 2, name: 'Michael T.', earnings: 3.75, date: '2023-04-12' },
  { id: 3, name: 'Jessica K.', earnings: 5.10, date: '2023-04-10' },
];

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [activeSection, setActiveSection] = useState("overview");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const copyReferralLink = () => {
    if (user?.referralLink) {
      navigator.clipboard.writeText(user.referralLink);
      toast.success("Referral link copied to clipboard!");
    }
  };

  // Container variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.div 
        className={`fixed md:relative md:flex flex-col h-full bg-card shadow-lg z-30 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} overflow-hidden`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`text-xl font-bold text-primary ${!isSidebarOpen && 'md:hidden'}`}>ClickGain</h1>
          {isSidebarOpen && <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <ChevronDown className="h-5 w-5" />
          </Button>}
        </div>
        
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="p-4">
            {isSidebarOpen ? (
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                </div>
              </div>
            )}
          </div>
          
          <nav className="mt-6 px-3">
            <ul className="space-y-2">
              <li>
                <Button 
                  variant={activeSection === "overview" ? "default" : "ghost"} 
                  className={`w-full justify-start ${!isSidebarOpen && 'md:justify-center'}`}
                  onClick={() => setActiveSection("overview")}
                >
                  <Home className="h-5 w-5 mr-2" />
                  {isSidebarOpen && <span>Overview</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant={activeSection === "earnings" ? "default" : "ghost"} 
                  className={`w-full justify-start ${!isSidebarOpen && 'md:justify-center'}`}
                  onClick={() => setActiveSection("earnings")}
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  {isSidebarOpen && <span>Earnings</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant={activeSection === "ads" ? "default" : "ghost"} 
                  className={`w-full justify-start ${!isSidebarOpen && 'md:justify-center'}`}
                  onClick={() => setActiveSection("ads")}
                >
                  <MousePointer className="h-5 w-5 mr-2" />
                  {isSidebarOpen && <span>Ad History</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant={activeSection === "referrals" ? "default" : "ghost"} 
                  className={`w-full justify-start ${!isSidebarOpen && 'md:justify-center'}`}
                  onClick={() => setActiveSection("referrals")}
                >
                  <Users className="h-5 w-5 mr-2" />
                  {isSidebarOpen && <span>Referrals</span>}
                </Button>
              </li>
            </ul>
          </nav>
          
          <div className="mt-auto p-4">
            <Button 
              variant="outline" 
              className={`w-full justify-start ${!isSidebarOpen && 'md:justify-center'}`}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Log Out</span>}
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-card border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <ChevronDown className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            
            <div className="relative">
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2" 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                <span className="hidden md:block">{user.name}</span>
              </Button>
              
              {showUserDropdown && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg overflow-hidden z-20 border"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-3 border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setShowUserDropdown(false)}>
                      <User className="h-4 w-4 mr-2" />
                      <span>Profile</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setShowUserDropdown(false)}>
                      <Coffee className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-sm text-destructive hover:text-destructive"
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log Out</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Stat Cards */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div 
                  className="bg-card p-6 rounded-lg shadow-sm border"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <h3 className="text-2xl font-bold">${user.earnings?.toFixed(2)}</h3>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">+5.3% from last month</p>
                </motion.div>
                
                <motion.div 
                  className="bg-card p-6 rounded-lg shadow-sm border"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ads Clicked</p>
                      <h3 className="text-2xl font-bold">{user.adsClicked}</h3>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <MousePointer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">+12.8% from last month</p>
                </motion.div>
                
                <motion.div 
                  className="bg-card p-6 rounded-lg shadow-sm border"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Referrals</p>
                      <h3 className="text-2xl font-bold">{user.referrals}</h3>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">+2 new referrals this month</p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Earnings Chart */}
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm border"
              variants={itemVariants}
            >
              <h2 className="text-xl font-bold mb-4">Earnings History</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={earningsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* Ad History Table */}
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm border"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Ad History</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Ad Name</TableHead>
                      <TableHead>Earnings</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adHistoryData.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell>{ad.date}</TableCell>
                        <TableCell>{ad.adName}</TableCell>
                        <TableCell>${ad.earnings.toFixed(3)}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {ad.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
            
            {/* Referral Section */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Your Referral Link</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex-1 p-2 bg-muted rounded border text-sm truncate">
                    {user.referralLink}
                  </div>
                  <Button variant="outline" size="icon" onClick={copyReferralLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share your referral link and earn 10% of your referrals' earnings for life!
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Top Referrals</h3>
                <div className="space-y-4">
                  {referralsData.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 mr-3"></div>
                        <div>
                          <p className="font-medium">{referral.name}</p>
                          <p className="text-xs text-muted-foreground">Joined {referral.date}</p>
                        </div>
                      </div>
                      <p className="font-semibold">${referral.earnings.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
