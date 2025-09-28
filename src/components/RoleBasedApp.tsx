import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import Navbar from './Navbar';
import CustomerDashboard from './customer/CustomerDashboard';
import ArtisanDashboard from './artisan/ArtisanDashboard';
import AdminDashboard from './admin/AdminDashboard';

const RoleBasedApp: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<string>(() => {
    // Set initial view based on user role
    switch (user?.role) {
      case 'customer': return 'home';
      case 'artisan': return 'dashboard';
      case 'admin': return 'dashboard';
      default: return 'home';
    }
  });

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const renderMainContent = () => {
    if (!user) return null;

    // Customer Views
    if (user.role === 'customer') {
      switch (currentView) {
        case 'home':
          return <CustomerDashboard />;
        case 'products':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Products Catalog
              </h2>
              <p className="text-muted-foreground">
                Detailed product browsing and filtering coming soon!
              </p>
            </div>
          );
        case 'cart':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Shopping Cart
              </h2>
              <p className="text-muted-foreground">
                Your cart management interface coming soon!
              </p>
            </div>
          );
        case 'profile':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Customer Profile
              </h2>
              <p className="text-muted-foreground">
                Profile management and order history coming soon!
              </p>
            </div>
          );
        default:
          return <CustomerDashboard />;
      }
    }

    // Artisan Views
    if (user.role === 'artisan') {
      switch (currentView) {
        case 'dashboard':
          return <ArtisanDashboard onViewChange={handleViewChange} />;
        case 'my-products':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                My Products
              </h2>
              <p className="text-muted-foreground">
                Product inventory management coming soon!
              </p>
            </div>
          );
        case 'add-product':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Add New Product
              </h2>
              <p className="text-muted-foreground">
                Product creation form coming soon!
              </p>
            </div>
          );
        case 'orders':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Order Management
              </h2>
              <p className="text-muted-foreground">
                Order processing interface coming soon!
              </p>
            </div>
          );
        case 'profile':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Artisan Profile
              </h2>
              <p className="text-muted-foreground">
                Profile and workshop details coming soon!
              </p>
            </div>
          );
        default:
          return <ArtisanDashboard onViewChange={handleViewChange} />;
      }
    }

    // Admin Views
    if (user.role === 'admin') {
      switch (currentView) {
        case 'dashboard':
          return <AdminDashboard onViewChange={handleViewChange} />;
        case 'manage-users':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                User Management
              </h2>
              <p className="text-muted-foreground">
                User administration panel coming soon!
              </p>
            </div>
          );
        case 'manage-products':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Product Management
              </h2>
              <p className="text-muted-foreground">
                Product approval and management system coming soon!
              </p>
            </div>
          );
        case 'manage-orders':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Order Management
              </h2>
              <p className="text-muted-foreground">
                Platform-wide order monitoring coming soon!
              </p>
            </div>
          );
        case 'settings':
          return (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif text-craft-terracotta mb-4">
                Platform Settings
              </h2>
              <p className="text-muted-foreground">
                Administrative settings and configuration coming soon!
              </p>
            </div>
          );
        default:
          return <AdminDashboard onViewChange={handleViewChange} />;
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentView={currentView} onViewChange={handleViewChange} />
      
      <main className="container mx-auto px-4 py-8">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default RoleBasedApp;