import React, { useEffect, useRef } from 'react';
import {
  Image,
  View,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import './../../android/app/src/utils/globalFont.js';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // loading = true while AsyncStorage is being read on cold start
  const { isAuthenticated, loading } = useAuth();
  const timerRef = useRef(null);

  useEffect(() => {
    // Don't navigate until the session restore is done
    if (loading) return;

    timerRef.current = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Main');
      } else {
        navigation.replace('Welcome');
      }
    }, 800); // short splash delay

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loading, isAuthenticated, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Image
        source={require('../assets/splash.png')}
        style={{ width, height, resizeMode: 'cover' }}
      />
      <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
};

export default SplashScreen;
