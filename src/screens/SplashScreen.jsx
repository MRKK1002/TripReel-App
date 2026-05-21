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
  const { isAuthenticated } = useAuth();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Main');
      } else {
        navigation.replace('Welcome');
      }
    }, 1200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAuthenticated, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
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
