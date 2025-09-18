import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import LottieView from 'lottie-react-native';
import loader from './../assets/LoadingTravel.json';
const { width, height } = Dimensions.get('window');

// Sample images (replace with your actual images)
const SLIDER_IMAGES = [
  require('./../assets/slider1.jpg'),
  require('./../assets/slider2.jpg'),
  require('./../assets/slider3.jpg'),
  require('./../assets/slider4.jpg'),
];

const SliderScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const carouselRef = useRef(null);
  const navigationTimeoutRef = useRef(null);

const slides = [
  {
    id: 1,
    image: SLIDER_IMAGES[0],
    title: 'Escape to Thailand',
    description:
      'Uncover golden temples, turquoise waters, and flavors that awaken your senses in the Land of Smiles.',
  },
  {
    id: 2,
    image: SLIDER_IMAGES[1],
    title: 'Travel With Your Tribe',
    description:
      'Meet fellow explorers, share journeys, and turn every trip into a story worth telling.',
  },
  {
    id: 3,
    image: SLIDER_IMAGES[2],
    title: 'Adventure, Your Way',
    description:
      'Whether it’s mountain trails or hidden beaches, design the adventure that speaks to your soul.',
  },
  {
    id: 4,
    image: SLIDER_IMAGES[3],
    title: 'Packages Made for You',
    description:
      'From luxury escapes to budget-friendly getaways — find the perfect travel deal crafted just for you.',
  },
];


  // Reset loader when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Reset loader state
      setShowLoader(false);

      // Clear any pending navigation timeouts
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }

      return () => {
        // Cleanup on screen blur if needed
      };
    }, []),
  );

  const navigateWithLoader = useCallback(
    (screen, params = {}, showLoader = true) => {
      // Clear any existing timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }

      if (showLoader) {
        // Show loader immediately
        setShowLoader(true);

        // Navigate after 3 seconds
        navigationTimeoutRef.current = setTimeout(() => {
          navigation.navigate(screen, params);
          navigationTimeoutRef.current = null;
        }, 700);
      } else {
        // Navigate immediately without loader
        navigation.navigate(screen, params);
      }
    },
    [navigation],
  );

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < slides.length) {
      setCurrentIndex(nextIndex);
      carouselRef.current?.scrollTo({ index: nextIndex });
    }
  }, [currentIndex, slides.length]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1b2b51"
        translucent={false}
      />

      {/* Loader Overlay */}
      {showLoader && (
        <SafeAreaView style={styles.loaderOverlay}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#1b2b51" // black status bar
            translucent={false} // content stays below
          />
          <LottieView
            source={loader}
            autoPlay
            loop
            style={{ width: 400, height: 400, marginBottom: -20 }}
          />
          <Text style={styles.loaderText}>Crafting your next adventure…</Text>
        </SafeAreaView>
      )}

      {/* Main Content */}
      <View style={styles.content}>
        {/* Skip button at top right */}
        {currentIndex !== slides.length - 1 && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigateWithLoader('Main', { screen: 'Home' })}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            loop={false}
            autoPlay={false}
            width={width}
            height={height * 0.6}
            data={slides}
            defaultIndex={currentIndex}
            scrollAnimationDuration={400}
            onSnapToItem={index => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            )}
          />

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Bottom Section with Button and Registration */}
        <View style={styles.bottomSection}>
          {currentIndex === slides.length - 1 ? (
            <>
              <TouchableOpacity
                style={styles.getStartedButton}
                onPress={() => navigateWithLoader('Main', { screen: 'Home' })}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigateWithLoader('Register', {}, false)}
                >
                  <Text style={styles.registerLink}>Register here</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.navigationButtons}>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2b51',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  skipButton: {
    position: 'absolute',
    top: 16,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    color: '#1b2b51',
    fontSize: 16,
    fontWeight: '500',
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b2b51',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#1b2b51',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#ccc',
  },
  bottomSection: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#1b2b51',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#666',
    fontSize: 16,
  },
  registerLink: {
    color: '#1b2b51',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  nextButton: {
    backgroundColor: '#1b2b51',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1000,
    backgroundColor: '#1b2b51',
  },
  loaderText: {
    marginTop: -10, 
    fontSize: 16,
    color: '#1b2b51',
    textAlign: 'center',
    width: '80%',
    color: 'white',
  },
});

export default SliderScreen;
