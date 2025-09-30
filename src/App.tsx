import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import ProductCatalog from "./components/customer/ProductCatalog";
import ShoppingCart from "./components/customer/ShoppingCart";
import CustomerProfile from "./components/customer/CustomerProfile";
import ArtisanDashboard from "./components/artisan/ArtisanDashboard";
import MyProducts from "./components/artisan/MyProducts";
import AddProduct from "./components/artisan/AddProduct";
import OrderManagement from "./components/artisan/OrderManagement";
import ArtisanProfile from "./components/artisan/ArtisanProfile";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";
import AdminOrderManagement from "./components/admin/AdminOrderManagement";
import AdminSettings from "./components/admin/AdminSettings";

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
            {/* Root route - role selection after sign-in */}
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Login />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
              }
            />

            {/* Sign-in route */}
            <Route
              path="/sign-in"
              element={
                <div className="min-h-screen flex items-center justify-center bg-background">
                  <Login />
                </div>
              }
            />

            {/* Customer routes */}
            <Route
              path="/customer"
              element={
                <SignedIn>
                  <CustomerDashboard />
                </SignedIn>
              }
            />
            <Route
              path="/customer/products"
              element={
                <SignedIn>
                  <ProductCatalog />
                </SignedIn>
              }
            />
            <Route
              path="/customer/cart"
              element={
                <SignedIn>
                  <ShoppingCart />
                </SignedIn>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <SignedIn>
                  <CustomerProfile />
                </SignedIn>
              }
            />

            {/* Artisan routes */}
            <Route
              path="/artisan"
              element={
                <SignedIn>
                  <ArtisanDashboard onViewChange={() => {}} />
                </SignedIn>
              }
            />
            <Route
              path="/artisan/products"
              element={
                <SignedIn>
                  <MyProducts />
                </SignedIn>
              }
            />
            <Route
              path="/artisan/add-product"
              element={
                <SignedIn>
                  <AddProduct />
                </SignedIn>
              }
            />
            <Route
              path="/artisan/orders"
              element={
                <SignedIn>
                  <OrderManagement />
                </SignedIn>
              }
            />
            <Route
              path="/artisan/profile"
              element={
                <SignedIn>
                  <ArtisanProfile />
                </SignedIn>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <SignedIn>
                  <AdminDashboard onViewChange={() => {}} />
                </SignedIn>
              }
            />
            <Route
              path="/admin/users"
              element={
                <SignedIn>
                  <UserManagement />
                </SignedIn>
              }
            />
            <Route
              path="/admin/products"
              element={
                <SignedIn>
                  <ProductManagement />
                </SignedIn>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <SignedIn>
                  <AdminOrderManagement />
                </SignedIn>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <SignedIn>
                  <AdminSettings />
                </SignedIn>
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
