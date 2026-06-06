import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, profileAPI, setAuthToken } from '../services/api';

const STORAGE_TOKEN_KEY = '@tripreel_token';
const STORAGE_USER_KEY = '@tripreel_user';
const STORAGE_LOGOUT_KEY = '@tripreel_logged_out';

const AuthContext = createContext(null);

// Helper — remove multiple keys without multiRemove
const removeKeys = (...keys) =>
  Promise.all(keys.map(k => AsyncStorage.removeItem(k)));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Restore session on cold start ─────────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const [storedToken, storedUser, loggedOut] = await Promise.all([
          AsyncStorage.getItem(STORAGE_TOKEN_KEY),
          AsyncStorage.getItem(STORAGE_USER_KEY),
          AsyncStorage.getItem(STORAGE_LOGOUT_KEY),
        ]);

        // Logout flag was written — treat as logged out regardless of token
        if (loggedOut === 'true') {
          await removeKeys(
            STORAGE_TOKEN_KEY,
            STORAGE_USER_KEY,
            STORAGE_LOGOUT_KEY,
          );
        } else if (storedToken) {
          setAuthToken(storedToken);
          setToken(storedToken);
          setUser(storedUser ? JSON.parse(storedUser) : null);
        }
      } catch {
        await removeKeys(
          STORAGE_TOKEN_KEY,
          STORAGE_USER_KEY,
          STORAGE_LOGOUT_KEY,
        );
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
    // Register FCM token for push notifications (non-blocking)
    try {
      const { registerFCMToken } = require('../services/notifications');
      registerFCMToken();
    } catch {}
  };

  // Called from synchronous onPress — writes logout flag first (survives app kill),
  // clears remaining keys in background, wipes in-memory state immediately.
  const clearSessionSync = () => {
    // Logout flag is the "source of truth" on next cold start
    AsyncStorage.setItem(STORAGE_LOGOUT_KEY, 'true').catch(() => {});
    // Remove token + user in background
    AsyncStorage.removeItem(STORAGE_TOKEN_KEY).catch(() => {});
    AsyncStorage.removeItem(STORAGE_USER_KEY).catch(() => {});
    // Wipe memory immediately — isAuthenticated becomes false right now
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  // ── Auth ──────────────────────────────────────────────────────────────────
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
  const sendSignupOtp = async (name, email, phone, state, country) => {
    const response = await authAPI.signupSendOtp({
      name,
      email,
      phone,
      state,
      country: country || 'India',
    });
    return response.data;
  };

  const verifySignupOtp = async (phone, code) => {
    const response = await authAPI.signupVerifyOtp({ phone, code });
    const { token: t, user: u } = response.data;
    await saveSession(t, u);
    return response.data;
  };

  const sendLoginOtp = async phone => {
    const response = await authAPI.loginSendOtp({ phone });
    return response.data;
  };

  const verifyLoginOtp = async (phone, code) => {
    const response = await authAPI.loginVerifyOtp({ phone, code });
    const { token: t, user: u } = response.data;
    await saveSession(t, u);
    return response.data;
  };

  // ── Logout — synchronous so it works safely inside onPress ───────────────
  const logout = () => {
    clearSessionSync();
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
