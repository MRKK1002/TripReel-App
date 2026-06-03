import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, profileAPI, setAuthToken } from '../services/api';

const STORAGE_TOKEN_KEY = '@tripreel_token';
const STORAGE_USER_KEY = '@tripreel_user';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // loading = true while we're restoring session from storage
  const [loading, setLoading] = useState(true);

  // ── Restore session on cold start ─────────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem(STORAGE_TOKEN_KEY),
          AsyncStorage.getItem(STORAGE_USER_KEY),
        ]);

        if (storedToken) {
          setAuthToken(storedToken);
          setToken(storedToken);
          setUser(storedUser ? JSON.parse(storedUser) : null);
        }
      } catch {
        // corrupted storage — start fresh
        await AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY]);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ── Persist helpers ───────────────────────────────────────────────────────
  const saveSession = async (newToken, newUser) => {
    setAuthToken(newToken);
    setToken(newToken);
    setUser(newUser);
    await Promise.all([
      AsyncStorage.setItem(STORAGE_TOKEN_KEY, newToken),
      AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser)),
    ]);
  };

  const clearSession = async () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
    await AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY]);
  };

  // ── Legacy email/password (kept for admin web panel compat) ───────────────
  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { token: t, user: u } = response.data;
    await saveSession(t, u);
    return response.data;
  };

  const register = async (name, email, phone, password) => {
    const response = await authAPI.register({ name, email, phone, password });
    const { token: t, user: u } = response.data;
    await saveSession(t, u);
    return response.data;
  };

  // ── OTP-based auth ────────────────────────────────────────────────────────
  const sendSignupOtp = async (name, email, phone, state) => {
    const response = await authAPI.signupSendOtp({ name, email, phone, state });
    return response.data;
  };

  const verifySignupOtp = async (phone, code) => {
    const response = await authAPI.signupVerifyOtp({ phone, code });
    const { token: t, user: u } = response.data;
    await saveSession(t, u);
    return response.data;
  };

  const sendLoginOtp = async phone => {
    try {
      const response = await authAPI.loginSendOtp({ phone });
      return response.data;
    } catch (err) {
      console.log('[LOGIN OTP] code:', err?.code);
      console.log('[LOGIN OTP] status:', err?.response?.status);
      console.log('[LOGIN OTP] data:', JSON.stringify(err?.response?.data));
      console.log('[LOGIN OTP] message:', err?.message);
      console.log('[LOGIN OTP] url:', err?.config?.url);
      console.log('[LOGIN OTP] baseURL:', err?.config?.baseURL);
      throw err;
    }
  };

  const verifyLoginOtp = async (phone, code) => {
    const response = await authAPI.loginVerifyOtp({ phone, code });
    const { token: t, user: u } = response.data;
    await saveSession(t, u);
    return response.data;
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = async () => {
    await clearSession();
  };

  // ── Profile helpers ───────────────────────────────────────────────────────
  const refreshUser = async () => {
    try {
      const res = await profileAPI.get();
      const updated = res.data.user;
      setUser(updated);
      await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return null;
    }
  };

  const updateProfile = async data => {
    // data can include: name, email, phone, state
    const res = await profileAPI.update(data);
    const updated = res.data.user;
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updated));
    return updated;
  };

  const uploadAvatar = async formData => {
    const res = await profileAPI.uploadAvatar(formData);
    const updated = res.data.user;
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updated));
    return res.data;
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
        sendSignupOtp,
        verifySignupOtp,
        sendLoginOtp,
        verifyLoginOtp,
        refreshUser,
        updateProfile,
        uploadAvatar,
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
