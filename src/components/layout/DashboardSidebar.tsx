
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, MonitorPlay, DollarSign, Users, 
  Settings, LogOut, ChevronLeft, ChevronRight, CreditCard, Download
} from 'lucide-react';

type SidebarLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isCollapsed }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `
          flex items-center px-4 py-3 rounded-md transition-colors 
          ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'} 
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        <span className="w-5 h-5 flex-shrink-0">{icon}</span>
        {!isCollapsed && <span className="ml-3">{label}</span>}
      </NavLink>
    </li>
  );
};

type DashboardSidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;
  
  const sidebarVariants = {
    open: { width: '250px', transition: { duration: 0.3 } },
    collapsed: { width: '70px', transition: { duration: 0.3 } },
    mobileOpen: { x: 0, transition: { duration: 0.3 } },
    mobileClose: { x: '-100%', transition: { duration: 0.3 } }
  };

  const navLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/dashboard/ads', icon: <MonitorPlay size={20} />, label: 'View Ads' },
    { to: '/dashboard/earnings', icon: <DollarSign size={20} />, label: 'Earnings' },
    { to: '/dashboard/referrals', icon: <Users size={20} />, label: 'Referrals' },
    { to: '/dashboard/plans', icon: <CreditCard size={20} />, label: 'Plans' },
    { to: '/dashboard/withdraw', icon: <Download size={20} />, label: 'Withdraw' },
    { to: '/dashboard/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <AnimatePresence initial={false}>
      {(isOpen || !isMobile) && (
        <>
          {/* Mobile overlay */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Sidebar */}
          <motion.aside
            className={`fixed md:relative h-full z-50 bg-card border-r flex flex-col ${isMobile ? 'left-0' : ''}`}
            variants={isMobile ? 
              { open: sidebarVariants.mobileOpen, closed: sidebarVariants.mobileClose } : 
              { open: sidebarVariants.open, closed: sidebarVariants.collapsed }
            }
            initial={isMobile ? "closed" : (isOpen ? "open" : "closed")}
            animate="open"
            exit="closed"
            role="navigation"
            aria-label="Main Navigation"
          >
            {/* Logo and brand */}
            <div className={`flex items-center ${!isOpen && !isMobile ? 'justify-center' : 'justify-between'} p-4 border-b`}>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  CG
                </div>
                {(isOpen || isMobile) && <span className="ml-3 text-lg font-semibold">ClickGain</span>}
              </div>
              {!isMobile && (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1 rounded-md hover:bg-muted"
                  aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
              )}
            </div>

            {/* User info */}
            <div className={`p-4 border-b ${!isOpen && !isMobile ? 'justify-center items-center' : ''}`}>
              <div className={`flex ${!isOpen && !isMobile ? 'justify-center' : 'items-center'}`}>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-primary">{user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                {(isOpen || isMobile) && (
                  <div className="ml-3">
                    <p className="font-medium">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 overflow-y-auto px-2 py-4">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <SidebarLink
                    key={link.to}
                    to={link.to}
                    icon={link.icon}
                    label={link.label}
                    isCollapsed={!isOpen && !isMobile}
                  />
                ))}
              </ul>
            </nav>

            {/* Logout button */}
            <div className="p-4 border-t">
              <button
                onClick={logout}
                className={`flex items-center w-full px-4 py-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors ${!isOpen && !isMobile ? 'justify-center' : ''}`}
              >
                <LogOut size={20} />
                {(isOpen || isMobile) && <span className="ml-3">Logout</span>}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default DashboardSidebar;
