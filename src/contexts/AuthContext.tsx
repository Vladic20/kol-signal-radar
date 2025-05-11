
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isPremium: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  upgradeToPremiun: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage for existing user session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('kolUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock authentication functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email && password) {
      // Mock user for demo purposes
      const mockUser = {
        id: 1,
        name: email.split('@')[0],
        email,
        isPremium: false
      };

      setUser(mockUser);
      localStorage.setItem('kolUser', JSON.stringify(mockUser));
      toast.success("Login successful!");
      return true;
    } 

    toast.error("Invalid credentials");
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (name && email && password) {
      const mockUser = {
        id: 1,
        name,
        email,
        isPremium: false
      };

      setUser(mockUser);
      localStorage.setItem('kolUser', JSON.stringify(mockUser));
      toast.success("Registration successful!");
      return true;
    }

    toast.error("Registration failed");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kolUser');
    toast.info("You have been logged out");
  };
  
  const upgradeToPremiun = () => {
    if (!user) return;
    
    const updatedUser = { ...user, isPremium: true };
    setUser(updatedUser);
    localStorage.setItem('kolUser', JSON.stringify(updatedUser));
    toast.success("Upgraded to Premium successfully!");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isPremium: user?.isPremium || false,
      loading,
      login,
      register,
      logout,
      upgradeToPremiun
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
