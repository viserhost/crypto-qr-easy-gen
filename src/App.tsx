
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Lazy loaded pages
const Dashboard = lazy(() => import("./pages/Dashboard"));

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  
  if (!user) {
    console.log("No user found, redirecting to home");
    return <Navigate to="/" replace />;
  }
  
  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route
                  path="/dashboard/*"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
