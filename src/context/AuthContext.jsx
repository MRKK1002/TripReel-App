import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setAuthToken } from '../services/api';

// Simple in-memory store — no native dependency needed.
// Token persists across JS reloads (Metro hot reload) but not cold app restarts.
// Replace with a proper storage solution when needed.
let _memToken = null;
let _memUser = null;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(_memUser);
  const [token, setToken] = useState(_memToken);
  const [loading, setLoading] = useState(false);

  // Restore from in-memory cache on mount (covers Metro hot reloads)
  useEffect(() => {
    if (_memToken) {
      setAuthToken(_memToken);
    }
    setLoading(false);
  }, []);

  const saveSession = (newToken, newUser) => {
    _memToken = newToken;
    _memUser = newUser;
    setAuthToken(newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { token: newToken, user: newUser } = response.data;
    saveSession(newToken, newUser);
    return response.data;
  };

  const register = async (name, email, phone, password) => {
    const response = await authAPI.register({ name, email, phone, password });
    const { token: newToken, user: newUser } = response.data;
    saveSession(newToken, newUser);
    return response.data;
  };

  const logout = () => {
    _memToken = null;
    _memUser = null;
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
