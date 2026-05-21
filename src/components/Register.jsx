import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import wel1 from './../assets/wel1.jpg';
import wel2 from './../assets/wel2.jpg';
import wel3 from './../assets/wel3.jpg';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const RegisterScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigation = useNavigation();

  const backgroundImages = [
    {
      image: wel1,
      title: "Let's explore\nthe world",
      subtitle: 'start your journey of a lifetime with us in just a few clicks',
    },
    {
      image: wel2,
      title: 'Visit tourist\nattractions',
      subtitle: 'find plenty of places to visit! Plan your perfect adventure',
    },
    {
      image: wel3,
      title: 'Get ready for\nnext trip?',
      subtitle: 'amazing places waiting for you!',
    },
  ];

  const handleNext = () => {
    if (currentIndex === backgroundImages.length - 1) {
      // On last slide, navigate to login
      navigation.navigate('Login');
    } else {
      // Move to next slide
      carouselRef.current?.next();
    }
  };

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View className="relative flex-1">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <View
          className="absolute left-6 right-6"
          style={{ bottom: screenHeight * 0.2 }}
        >
          <Text className="mb-2 leading-tight text-white" style={{fontFamily:'Urbanist-ExtraBold', fontWeight: '800', fontSize: 55 , }}>
            {item.title}
          </Text>
          <Text className="mb-6 text-base leading-6 text-white/90">
            {item.subtitle}
          </Text>

          {/* Indicator Dots - Below Subtitle */}
          <View className="flex-row space-x-2">
            {backgroundImages.map((_, dotIndex) => (
              <View
                key={dotIndex}
                className={`h-1.5 rounded-full ${
                  dotIndex === index ? 'bg-white w-6' : 'bg-white/40 w-1.5'
                }`}
                style={{
                  width: dotIndex === index ? 24 : 6,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </View>
        </View>

        {/* Square Arrow Button - As shown in first image */}
        <TouchableOpacity
          onPress={handleNext}
          className="absolute items-center justify-center bottom-12 right-6"
          style={{
            width: 48,
            height: 48,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
          activeOpacity={0.8}
        >
          <ArrowRight size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaProvider className="flex-1 bg-black">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background Carousel */}
      <View className="absolute inset-0">
        <Carousel
          ref={carouselRef}
          width={screenWidth}
          height={screenHeight}
          data={backgroundImages}
          renderItem={renderCarouselItem}
          autoPlay={false}
          onSnapToItem={setCurrentIndex}
          loop={false}
          scrollAnimationDuration={500}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;
