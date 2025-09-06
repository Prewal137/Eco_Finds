'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { api, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const response = await api.checkSession() as { loggedIn: boolean; user?: User };
        
        if (response.loggedIn && response.user) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login({ email, password }) as { user: User };
      setUser(response.user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await api.signup({ username, email, password }) as { user: User };
      setUser(response.user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
    }
  };

  const checkSession = async () => {
    try {
      const response = await api.checkSession() as { loggedIn: boolean; user?: User };
      
      if (response.loggedIn && response.user) {
        setUser(response.user);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setUser(null);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    signup,
    logout,
    checkSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
