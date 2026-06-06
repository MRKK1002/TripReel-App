import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import api from './api';

/**
 * Request notification permission and get FCM token
 */
export async function requestNotificationPermission() {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return null;
      }
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('FCM permission not granted');
      return null;
    }

    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (err) {
    console.warn('FCM permission error:', err);
    return null;
  }
}

/**
 * Register FCM token with backend
 */
export async function registerFCMToken() {
  try {
    const token = await requestNotificationPermission();
    if (token) {
      await api.post('/notifications/register-token', { fcmToken: token });
      console.log('FCM token registered with backend');
    }
  } catch (err) {
    console.warn('FCM token registration failed:', err?.message);
  }
}

/**
 * Listen for token refresh (token can change)
 */
export function onTokenRefresh(callback) {
  return messaging().onTokenRefresh(async newToken => {
    try {
      await api.post('/notifications/register-token', { fcmToken: newToken });
      if (callback) callback(newToken);
    } catch {}
  });
}

/**
 * Handle foreground messages
 */
export function onForegroundMessage(callback) {
  return messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification:', remoteMessage);
    if (callback) callback(remoteMessage);
  });
}

/**
 * Handle background/quit messages (call in index.js)
 */
export function setBackgroundMessageHandler() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background notification:', remoteMessage);
  });
}
