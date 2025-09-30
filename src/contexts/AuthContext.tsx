import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { User, UserRole, LoginForm, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(!isLoaded);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
      if (clerkUser) {
        // Get role from user metadata or default to customer
        const role = (clerkUser.publicMetadata?.role as UserRole) || 'customer';
        
        setUser({
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: clerkUser.fullName || clerkUser.firstName || 'User',
          role: role,
          avatar: clerkUser.imageUrl || getAvatarByRole(role),
          createdAt: new Date(clerkUser.createdAt || Date.now()),
        });
      } else {
        setUser(null);
      }
    }
  }, [clerkUser, isLoaded]);

  const login = async (credentials: LoginForm) => {
    setIsLoading(true);
    // Store role in localStorage for role selection page
    localStorage.setItem('selectedRole', credentials.role);
    setIsLoading(false);
  };

  const logout = async () => {
    await signOut();
    localStorage.removeItem('selectedRole');
    setUser(null);
  };

  const getAvatarByRole = (role: UserRole): string => {
    switch (role) {
      case 'customer': return '🛍️';
      case 'artisan': return '🏺';
      case 'admin': return '👑';
      default: return '👤';
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};