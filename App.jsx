import { View, Text, Platform, StatusBar, Dimensions } from 'react-native';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
// import SliderScreen from './src/screens/SliderScreen';
import { Animated } from 'react-native';
import PackageDetailScreen from './src/components/PackageDetailScreen';
// import MyTrip from './src/screens/MyTrip';
import SavedScreen from './src/screens/SavedScreen';
import HotelScreen from './src/screens/HotelScreen';
import ItineraryScreen from './src/screens/ItineraryScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import {
  Globe,
  Briefcase,
  Package,
  Gift,
  UserCircle,
  Navigation,
  Users,
  User,
  Bookmark,
  MessageCircle,
  Search,
  Home,
  ShoppingCart,
} from 'lucide-react-native';
import { useRef } from 'react';
import OffersScreen from './src/screens/OffersScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import WelcomeScreen from './src/components/Register.jsx';
import SearchScreen from './src/screens/SearchScreen';
import DestinationDetailScreen from './src/screens/DestinationDetailScreen';
import BookingScreen from './src/screens/BookingScreen';
import BookingDetailsScreen from './src/screens/BookingDetailsScreen';
import { Compass, Heart, Map } from 'lucide-react-native';
import MessagesScreen from './src/screens/MessageScreen';
import MyTripScreen from './src/screens/MyTripScreen';
import PopularDestinationScreen from './src/screens/PopularDestinationScreen';
import CuratedPackagesScreen from './src/screens/CuratedPackagesScreen';
import ExperiencesNearYouScreen from './src/screens/ExperiencesNearYouScreen';
import GuestFavoritesScreen from './src/screens/GuestFavoritesScreen';
const { width } = Dimensions.get('window');

function TabIcon({ icon, label, focused }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 64 }}>
      <View
        style={{
          backgroundColor: focused ? '#E6F4EF' : 'transparent',
          width: 44,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 3,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          color: focused ? '#111827' : '#9CA3AF',
          fontSize: 11,
          fontWeight: focused ? '700' : '400',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 62 + insets.bottom : 80,
          paddingBottom:
            insets.bottom > 0
              ? insets.bottom
              : Platform.OS === 'android'
              ? 6
              : 12,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
        },
        tabBarActiveTintColor: '#1F8A70',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabel: () => null,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Explore"
              icon={
                <Search
                  size={20}
                  color={focused ? '#1F8A70' : '#9CA3AF'}
                  strokeWidth={focused ? 2 : 1.5}
                />
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Wishlist"
              icon={
                <Heart
                  size={20}
                  color={focused ? '#1F8A70' : '#9CA3AF'}
                  strokeWidth={focused ? 2 : 1.5}
                  fill={focused ? '#1F8A70' : 'none'}
                />
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="MyTrip"
        component={MyTripScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="My Trips"
              icon={
                <Briefcase
                  size={20}
                  color={focused ? '#ffffff' : '#9CA3AF'}
                  strokeWidth={focused ? 2 : 1.5}
                  style={
                    focused
                      ? {
                          backgroundColor: '#1F8A70',
                          borderRadius: 8,
                          padding: 4,
                        }
                      : {}
                  }
                />
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Messages"
              icon={
                <MessageCircle
                  size={20}
                  color={focused ? '#1F8A70' : '#9CA3AF'}
                  strokeWidth={focused ? 2 : 1.5}
                />
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Profile"
              icon={
                <UserCircle
                  size={20}
                  color={focused ? '#1F8A70' : '#9CA3AF'}
                  strokeWidth={focused ? 2 : 1.5}
                />
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Buddy"
              component={BuddyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PackageDetails"
              component={PackageDetailScreen}
              options={{ title: 'Package Details' }}
            />
            <Stack.Screen
              name="BuddyDetails"
              component={BuddyDetailsScreen}
              options={{ title: 'Buddy Details' }}
            />

            <Stack.Screen
              name="Offers"
              component={OffersScreen}
              options={{ title: 'Offers' }}
            />
            <Stack.Screen
              name="Saved"
              component={SavedScreen}
              options={{ title: 'Saved Packages' }}
            />
            <Stack.Screen
              name="Hotel"
              component={HotelScreen}
              options={{ title: 'Hotel' }}
            />
            <Stack.Screen
              name="Main"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Itinerary"
              component={ItineraryScreen}
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notification"
              component={NotificationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="DestinationDetail"
              component={DestinationDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PopularDestinations"
              component={PopularDestinationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CuratedPackages"
              component={CuratedPackagesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExperiencesNearYou"
              component={ExperiencesNearYouScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GuestFavorites"
              component={GuestFavoritesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Booking"
              component={BookingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BookingDetails"
              component={BookingDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Messages"
              component={MessagesScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
