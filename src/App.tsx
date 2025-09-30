import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import RoleBasedApp from "./components/RoleBasedApp";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = "pk_test_ZHluYW1pYy1lc2NhcmdvdC04MS5jbGVyay5hY2NvdW50cy5kZXYk";

const App = () => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            {/* Main route - show role-based app for authenticated users */}
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <RoleBasedApp />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
              }
            />

            {/* Sign-in route */}
            <Route
              path="/sign-in/*"
              element={
                <>
                  <SignedOut>
                    <div className="min-h-screen flex items-center justify-center bg-background">
                      <Login />
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <Navigate to="/" replace />
                  </SignedIn>
                </>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
