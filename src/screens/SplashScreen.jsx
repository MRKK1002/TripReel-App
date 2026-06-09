import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  View,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { appScreensAPI, SERVER_URL } from '../services/api';
import './../../android/app/src/utils/globalFont.js';

const { width, height } = Dimensions.get('window');

const resolveUrl = url => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url.startsWith('/') ? url : '/' + url}`;
};

const SplashScreen = ({ navigation }) => {
  const { isAuthenticated, loading } = useAuth();
  const timerRef = useRef(null);
  const [dynamicImage, setDynamicImage] = useState(null);

  // Fetch dynamic splash image
  useEffect(() => {
    appScreensAPI
      .get()
      .then(res => {
        if (res.data?.splashImageUrl) {
          setDynamicImage(resolveUrl(res.data.splashImageUrl));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      navigation.replace('Main');
    } else {
      timerRef.current = setTimeout(() => {
        navigation.replace('Welcome');
      }, 800);
    }

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
      {dynamicImage ? (
        <Image
          source={{ uri: dynamicImage }}
          style={{ width, height, resizeMode: 'cover' }}
          onError={() => setDynamicImage(null)}
        />
      ) : (
        <Image
          source={require('../assets/splash.png')}
          style={{ width, height, resizeMode: 'cover' }}
        />
      )}
      <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
};

export default SplashScreen;
