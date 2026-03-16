'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock user for local development
const MOCK_USER = {
  id: 'dev_user_001',
  firstName: 'Laura',
  lastName: 'Dev',
  email: 'laura@mykit.tools',
  imageUrl: null,
  isPro: true,
  purchases: [],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Restore sign-in state from localStorage
    const saved = localStorage.getItem('mykit-mock-auth');
    if (saved === 'signed-in') {
      setUser(MOCK_USER);
    }
    setLoaded(true);
  }, []);

  const signIn = () => {
    setUser(MOCK_USER);
    localStorage.setItem('mykit-mock-auth', 'signed-in');
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('mykit-mock-auth');
  };

  const togglePro = () => {
    if (user) {
      setUser(prev => ({ ...prev, isPro: !prev.isPro }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loaded, signIn, signOut, togglePro, isSignedIn: !!user, isPro: user?.isPro || false }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // If used outside provider (e.g. Clerk is active), return safe defaults
    return { user: null, loaded: true, signIn: () => {}, signOut: () => {}, togglePro: () => {}, isSignedIn: false, isPro: false };
  }
  return ctx;
}
