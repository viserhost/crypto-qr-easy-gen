
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Settings, CreditCard, ChevronLeft, 
  ChevronRight, LogOut, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 250 : 80 }}
        animate={{ width: isSidebarOpen ? 250 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-card border-r shadow-sm flex flex-col"
      >
        {/* Logo and brand */}
        <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-4 border-b`}>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
              CG
            </div>
            {isSidebarOpen && <span className="ml-3 text-lg font-semibold">Admin Panel</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-md hover:bg-muted"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} py-2`}
                onClick={() => navigate('/admin')}
              >
                <LayoutDashboard className={`h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} py-2`}
                onClick={() => navigate('/admin/plans')}
              >
                <CreditCard className={`h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />
                {isSidebarOpen && <span className="ml-3">Manage Plans</span>}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} py-2`}
                onClick={() => navigate('/admin/settings')}
              >
                <Settings className={`h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />
                {isSidebarOpen && <span className="ml-3">Settings</span>}
              </Button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className={`flex items-center ${!isSidebarOpen && 'justify-center'} mb-4`}>
            <Shield className="h-5 w-5 text-primary" />
            {isSidebarOpen && <span className="ml-2 text-sm font-medium">Admin Access</span>}
          </div>
          <Button
            variant="outline"
            size="sm"
            className={`w-full ${!isSidebarOpen && 'p-2'}`}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header */}
        <header className="h-16 px-6 border-b flex items-center">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
        </header>
        
        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
