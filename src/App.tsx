
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";

// Create route guard component
const ProtectedRoute = ({ 
  children, 
  requiredFeature 
}: { 
  children: React.ReactNode, 
  requiredFeature?: 'chatbot' | 'transcript' | 'dada'
}) => {
  const { isAuthenticated, hasAccess } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  if (requiredFeature && !hasAccess(requiredFeature)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Wrap the ProtectedRoute in a component that doesn't use hooks
const RoutesWithAuth = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Protected Routes */}
      <Route 
        path="/chatbot" 
        element={
          <ProtectedRoute requiredFeature="chatbot">
            <Dashboard initialDashboard={1} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/transcript" 
        element={
          <ProtectedRoute requiredFeature="transcript">
            <Dashboard initialDashboard={2} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dada" 
        element={
          <ProtectedRoute requiredFeature="dada">
            <Dashboard initialDashboard={3} />
          </ProtectedRoute>
        } 
      />
      
      {/* Legacy route - redirect to the appropriate dashboard */}
      <Route path="/dashboard" element={<Navigate to="/chatbot" replace />} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <RoutesWithAuth />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
