import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Bell, User, Menu, Sun, Moon, ChevronDown, X, Settings, LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/ads': 'View Ads',
  '/dashboard/earnings': 'Earnings',
  '/dashboard/referrals': 'Referrals',
  '/dashboard/plans': 'Plans',
  '/dashboard/withdraw': 'Withdraw',
  '/dashboard/settings': 'Settings',
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Ad Available',
    message: 'A new high-paying ad is available for you',
    date: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    title: 'Payment Processed',
    message: 'Your withdrawal of $12.50 has been processed',
    date: '3 hours ago',
    read: false,
  },
  {
    id: '3',
    title: 'New Referral',
    message: 'You have a new referral: John S.',
    date: 'Yesterday',
    read: true,
  },
];

type DashboardHeaderProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  isSidebarOpen, toggleSidebar 
}) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = location.pathname;
    setPageTitle(pageNames[path] || 'Dashboard');
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-background'
      }`}
    >
      <div className="h-16 px-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
          
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 rounded-md border bg-card shadow-lg overflow-hidden z-50"
                >
                  <div className="p-3 border-b flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-xs h-7"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                              !notification.read ? 'bg-primary/5' : ''
                            }`}
                          >
                            <div className="flex justify-between">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-primary"></span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No notifications
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 border-t">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      View all notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="relative" ref={userMenuRef}>
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center"
              aria-label="User menu"
              aria-expanded={showUserMenu}
              aria-haspopup="true"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden mr-2">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-primary">{user?.name?.charAt(0) || 'U'}</span>
                )}
              </div>
              <span className="hidden md:inline-block">{user?.name || 'User'}</span>
              <ChevronDown size={16} className="ml-2" />
            </Button>
            
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 rounded-md border bg-card shadow-lg overflow-hidden z-50"
                >
                  <div className="p-3 border-b">
                    <p className="font-medium">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                  </div>
                  
                  <div className="p-1">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User size={16} className="mr-2" />
                      My Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-sm text-destructive hover:text-destructive"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
