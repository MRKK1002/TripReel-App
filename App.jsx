import { View, Text, Platform, StatusBar,Dimensions } from 'react-native';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import SliderScreen from './src/screens/SliderScreen';
import { Animated } from 'react-native';
import PackageScreen from './src/screens/PackageScreen';
import BuddyScreen from './src/screens/BuddyScreen';
import PackageDetailScreen from './src/components/PackageDetailScreen';
import BuddyDetailsScreen from './src/components/BuddyDetailsScreen';
import MyTrip from './src/screens/MyTrip';
import SavedScreen from './src/screens/SavedScreen';
import HotelScreen from './src/screens/HotelScreen';
import ItineraryScreen from './src/screens/ItineraryScreen';
import AIRecommendationsScreen from './src/screens/AIRecommendationsScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import { 
  Globe, 
  Compass, 
  Package, 
  Gift, 
  Map, 
  Navigation, 
  Users, 
  User, 
  Bookmark, 
  Heart, 
  Search,
  Home,
  ShoppingCart
} from 'lucide-react-native';
import { useRef } from 'react';
import OffersScreen from './src/screens/OffersScreen';
import RegisterScreen from './src/components/Register';
import Register from './src/screens/Register';
import LoginScreen from './src/screens/LoginScreen';
import SearchScreen from './src/screens/SearchScreen';
import PopularDestinationScreen from './src/screens/PopularDestinationScreen';
const { width } = Dimensions.get('window');

// function BottomTabs() {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           height: Platform.OS === 'android' ? 55 + insets.bottom : 90,
//           paddingBottom:
//             insets.bottom > 0
//               ? insets.bottom
//               : Platform.OS === 'android'
//               ? 5
//               : 20,
//           backgroundColor: '#1b2b51',
//           borderTopWidth: 0,
//           elevation: 0,
//           position: 'absolute',
//           left: 16,
//           right: 16,
//           // bottom: insets.bottom ? insets.bottom : 10, // place above back button/gesture bar
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.25,
//           shadowRadius: 12,
//         },
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: '600',
//           marginBottom: 6,
//           letterSpacing: 0.5,
//         },
//         tabBarItemStyle: {
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingVertical: 3,
//         },
//         tabBarActiveTintColor: '#FFD700',
//         tabBarInactiveTintColor: '#A8C7FA',
//       }}
//     >
//       {/* <Tab.Screen
//         name="Explore"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Explore',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 backgroundColor: focused
//                   ? 'rgba(255, 215, 0, 0.2)'
//                   : 'transparent',
//                 width: 30,
//                 height: 30,
//                 borderRadius: 26,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 transform: [{ scale: focused ? 1.15 : 1 }],
//                 transition: 'all 0.3s ease',
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 15,
//                   color: focused ? '#FFD700' : color,
//                 }}
//               >
//                 {focused ? '✈️' : '🌎'}
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Package"
//         component={PackageScreen}
//         options={{
//           tabBarLabel: 'Packages',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 backgroundColor: focused
//                   ? 'rgba(255, 215, 0, 0.2)'
//                   : 'transparent',
//                 width: 30,
//                 height: 30,
//                 borderRadius: 26,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 transform: [{ scale: focused ? 1.15 : 1 }],
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 15,
//                   color: focused ? '#FFD700' : color,
//                 }}
//               >
//                 {focused ? '🎁' : '📦'}
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="TripGuides"
//         component={MyTrip}
//         options={{
//           tabBarLabel: 'Trip Plan',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 backgroundColor: focused
//                   ? 'rgba(255, 215, 0, 0.2)'
//                   : 'transparent',
//                 width: 30,
//                 height: 30,
//                 borderRadius: 26,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 transform: [{ scale: focused ? 1.15 : 1 }],
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 18,
//                   color: focused ? '#FFD700' : color,
//                 }}
//               >
//                 {focused ? '🗺️' : '🧳'}
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Buddy"
//         component={BuddyScreen}
//         options={{
//           tabBarLabel: 'Buddy',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 backgroundColor: focused
//                   ? 'rgba(255, 215, 0, 0.2)'
//                   : 'transparent',
//                 width: 30,
//                 height: 30,
//                 borderRadius: 26,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 transform: [{ scale: focused ? 1.15 : 1 }],
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 18,
//                   color: focused ? '#FFD700' : color,
//                 }}
//               >
//                 {focused ? '👫' : '👤'}
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Saved"
//         component={SavedScreen}
//         options={{
//           tabBarLabel: 'Saved',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 backgroundColor: focused
//                   ? 'rgba(255, 215, 0, 0.2)'
//                   : 'transparent',
//                 width: 30,
//                 height: 30,
//                 borderRadius: 26,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 transform: [{ scale: focused ? 1.15 : 1 }],
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 18,
//                   color: focused ? '#FFD700' : color,
//                 }}
//               >
//                 {focused ? '⭐' : '❤️'}
//               </Text>
//             </View>
//           ),
//         }}
//       /> */}

//         <Tab.Screen
//         name="Explore"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Explore',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//               }}
//             >
//               {/* Animated background glow */}
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               {/* Icon container with glassmorphism effect */}
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
                  
//                 }}
//               >
//                 {focused ? (
//                   <Compass size={22} color="#FFD700" strokeWidth={2.5} />
//                 ) : (
//                   <Globe size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {/* Active indicator dot */}
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 4,
//                     height: 4,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Package"
//         component={PackageScreen}
//         options={{
//           tabBarLabel: 'Packages',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//               }}
//             >
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Gift size={22} color="#FFD700" strokeWidth={2.5} />
//                 ) : (
//                   <Package size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 4,
//                     height: 4,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="TripGuides"
//         component={MyTrip}
//         options={{
//           tabBarLabel: 'Trip Plan',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//               }}
//             >
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Map size={22} color="#FFD700" strokeWidth={2.5} />
//                 ) : (
//                   <Navigation size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 4,
//                     height: 4,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Buddy"
//         component={BuddyScreen}
//         options={{
//           tabBarLabel: 'Buddy',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//               }}
//             >
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Users size={22} color="#FFD700" strokeWidth={2.5} />
//                 ) : (
//                   <User size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 4,
//                     height: 4,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Saved"
//         component={SavedScreen}
//         options={{
//           tabBarLabel: 'Saved',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//               }}
//             >
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Bookmark size={22} color="#FFD700" strokeWidth={2.5} fill="#FFD700" />
//                 ) : (
//                   <Heart size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 3,
//                     height: 3,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }


// function BottomTabs() {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           height: Platform.OS === 'android' ? 65 + insets.bottom : 90,
//           paddingBottom: insets.bottom > 0 ? insets.bottom : Platform.OS === 'android' ? 5 : 20,
//           backgroundColor: '#1b2b51',
//           borderTopWidth: 0,
//           elevation: 0,
//           position: 'absolute',
//           left: 16,
//           right: 16,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.25,
//           shadowRadius: 12,
//         },
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: '600',
//           marginBottom: 6,
//           letterSpacing: 0.5,
//           marginTop:10
//         },
//         tabBarItemStyle: {
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingVertical: 5,
//           // Add gap between icon and label
//           gap: 4, // This creates the space between icon and text
//         },
//         tabBarActiveTintColor: '#FFD700',
//         tabBarInactiveTintColor: '#A8C7FA',
//       }}
//     >
//       <Tab.Screen
//         name="Explore"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Explore',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//                 // Add margin to create space for the indicator
//                 marginBottom: 0, // This creates space for the active indicator
//               }}
//             >
//               {/* Animated background glow */}
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               {/* Icon container with glassmorphism effect */}
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Compass size={22} color="#FFD700" strokeWidth={2.5} />
//                 ) : (
//                   <Globe size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {/* Active indicator dot */}
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 4,
//                     height: 4,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Package"
//         component={PackageScreen}
//         options={{
//           tabBarLabel: 'Packages',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//                 marginBottom: 4,
//               }}
//             >
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Gift size={22} color="#FFD700" strokeWidth={2.5} />
//                 ) : (
//                   <Package size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 4,
//                     height: 4,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="TripGuides"
//         component={MyTrip}
//         options={{
//           tabBarLabel: 'Trip Plan',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//                 marginBottom: 4,
//               }}
//             >
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Map size={22} color="#FFD700" strokeWidth={2.5} />
//                 ) : (
//                   <Navigation size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 4,
//                     height: 4,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Buddy"
//         component={BuddyScreen}
//         options={{
//           tabBarLabel: 'Buddy',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//                 marginBottom: 4,
//               }}
//             >
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Users size={22} color="#FFD700" strokeWidth={2.5} />
//                 ) : (
//                   <User size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 4,
//                     height: 4,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Saved"
//         component={SavedScreen}
//         options={{
//           tabBarLabel: 'Saved',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative',
//                 marginBottom: 4,
//               }}
//             >
//               <View
//                 style={{
//                   position: 'absolute',
//                   width: focused ? 50 : 35,
//                   height: focused ? 50 : 35,
//                   borderRadius: 25,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.25)' 
//                     : 'transparent',
//                   transform: [{ scale: focused ? 1 : 0.8 }],
//                 }}
//               />
              
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 20,
//                   backgroundColor: focused 
//                     ? 'rgba(255, 215, 0, 0.15)' 
//                     : 'rgba(255, 255, 255, 0.05)',
//                   borderWidth: focused ? 1.5 : 0.5,
//                   borderColor: focused 
//                     ? 'rgba(255, 215, 0, 0.6)' 
//                     : 'rgba(255, 255, 255, 0.2)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   transform: [{ scale: focused ? 1.1 : 1 }],
//                 }}
//               >
//                 {focused ? (
//                   <Bookmark size={22} color="#FFD700" strokeWidth={2.5} fill="#FFD700" />
//                 ) : (
//                   <Heart size={20} color={color} strokeWidth={2} />
//                 )}
//               </View>
              
//               {focused && (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: -8,
//                     width: 3,
//                     height: 3,
//                     borderRadius: 2,
//                     backgroundColor: '#FFD700',
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }




function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 65 + insets.bottom : 90,
          paddingBottom: insets.bottom > 0 ? insets.bottom : Platform.OS === 'android' ? 5 : 20,
          backgroundColor: '#1b2b51',
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute',
          left: 16,
          right: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 6,
          letterSpacing: 0.5,
          marginTop: 8, // Reduced from 10 to create better spacing
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
          gap: 6, // Increased gap for better spacing between icon and text
        },
        tabBarActiveTintColor: '#FFFFFF', // Changed to white
        tabBarInactiveTintColor: '#A8C7FA',
      }}
    >
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: 0,
              }}
            >
              {/* Animated background glow */}
              <View
                style={{
                  position: 'absolute',
                  width: focused ? 40 : 35, // Reduced focused size from 50 to 40
                  height: focused ? 40 : 35, // Reduced focused size from 50 to 40
                  borderRadius: 20, // Adjusted border radius
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.15)' // Changed to white with opacity
                    : 'transparent',
                  transform: [{ scale: focused ? 1 : 0.8 }],
                }}
              />
              
              {/* Icon container with glassmorphism effect */}
              <View
                style={{
                  width: 35, // Reduced from 40
                  height: 35, // Reduced from 40
                  borderRadius: 17.5, // Adjusted border radius
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.1)' // Changed to white with opacity
                    : 'rgba(255, 255, 255, 0.05)',
                  borderWidth: focused ? 1.5 : 0.5,
                  borderColor: focused 
                    ? 'rgba(255, 255, 255, 0.4)' // Changed to white with opacity
                    : 'rgba(255, 255, 255, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ scale: focused ? 1.05 : 1 }], // Reduced scale from 1.1 to 1.05
                }}
              >
                {focused ? (
                  <Compass size={20} color="#FFFFFF" strokeWidth={2.5} /> // Reduced size and changed color to white
                ) : (
                  <Globe size={18} color={color} strokeWidth={2} /> // Reduced size from 20 to 18
                )}
              </View>
              
              {/* Active indicator dot */}
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -6, // Adjusted position
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF', // Changed to white
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="Package"
        component={PackageScreen}
        options={{
          tabBarLabel: 'Packages',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: 0,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  width: focused ? 40 : 35,
                  height: focused ? 40 : 35,
                  borderRadius: 20,
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'transparent',
                  transform: [{ scale: focused ? 1 : 0.8 }],
                }}
              />
              
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 17.5,
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  borderWidth: focused ? 1.5 : 0.5,
                  borderColor: focused 
                    ? 'rgba(255, 255, 255, 0.4)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ scale: focused ? 1.05 : 1 }],
                }}
              >
                {focused ? (
                  <Gift size={20} color="#FFFFFF" strokeWidth={2.5} />
                ) : (
                  <Package size={18} color={color} strokeWidth={2} />
                )}
              </View>
              
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -6,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="TripGuides"
        component={MyTrip}
        options={{
          tabBarLabel: 'Trip Plan',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: 0,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  width: focused ? 40 : 35,
                  height: focused ? 40 : 35,
                  borderRadius: 20,
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'transparent',
                  transform: [{ scale: focused ? 1 : 0.8 }],
                }}
              />
              
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 17.5,
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  borderWidth: focused ? 1.5 : 0.5,
                  borderColor: focused 
                    ? 'rgba(255, 255, 255, 0.4)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ scale: focused ? 1.05 : 1 }],
                }}
              >
                {focused ? (
                  <Map size={20} color="#FFFFFF" strokeWidth={2.5} />
                ) : (
                  <Navigation size={18} color={color} strokeWidth={2} />
                )}
              </View>
              
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -6,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="Buddy"
        component={BuddyScreen}
        options={{
          tabBarLabel: 'Buddy',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: 0,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  width: focused ? 40 : 35,
                  height: focused ? 40 : 35,
                  borderRadius: 20,
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'transparent',
                  transform: [{ scale: focused ? 1 : 0.8 }],
                }}
              />
              
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 17.5,
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  borderWidth: focused ? 1.5 : 0.5,
                  borderColor: focused 
                    ? 'rgba(255, 255, 255, 0.4)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ scale: focused ? 1.05 : 1 }],
                }}
              >
                {focused ? (
                  <Users size={20} color="#FFFFFF" strokeWidth={2.5} />
                ) : (
                  <User size={18} color={color} strokeWidth={2} />
                )}
              </View>
              
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -6,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: 0,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  width: focused ? 40 : 35,
                  height: focused ? 40 : 35,
                  borderRadius: 20,
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'transparent',
                  transform: [{ scale: focused ? 1 : 0.8 }],
                }}
              />
              
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 17.5,
                  backgroundColor: focused 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  borderWidth: focused ? 1.5 : 0.5,
                  borderColor: focused 
                    ? 'rgba(255, 255, 255, 0.4)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ scale: focused ? 1.05 : 1 }],
                }}
              >
                {focused ? (
                  <Bookmark size={20} color="#FFFFFF" strokeWidth={2.5} fill="#FFFFFF" />
                ) : (
                  <Heart size={18} color={color} strokeWidth={2} />
                )}
              </View>
              
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -6,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}




// function BottomTabs() {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           height: Platform.OS === 'android' ? 70 + insets.bottom : 85,
//           paddingBottom: insets.bottom > 0 ? insets.bottom : Platform.OS === 'android' ? 10 : 15,
//           paddingTop: 10,
//           backgroundColor: '#FFFFFF',
//           borderTopWidth: 0,
//           elevation: 8,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: -2 },
//           shadowOpacity: 0.1,
//           shadowRadius: 8,
//           borderRadius: 0,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '500',
//           marginTop: 4,
//         },
//         tabBarItemStyle: {
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingVertical: 8,
//         },
//         tabBarActiveTintColor: '#FFFFFF',
//         tabBarInactiveTintColor: '#9CA3AF',
//       }}
//     >
//       <Tab.Screen
//         name="Favorites"
//         component={SavedScreen}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({ focused, color }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <Heart 
//                 size={24} 
//                 color={focused ? '#EF4444' : '#9CA3AF'} 
//                 strokeWidth={focused ? 2 : 1.5}
//                 fill={focused ? '#EF4444' : 'none'}
//               />
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Search"
//         component={PackageScreen}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({ focused, color }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <Search 
//                 size={24} 
//                 color={focused ? '#3B82F6' : '#9CA3AF'} 
//                 strokeWidth={focused ? 2 : 1.5}
//               />
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({ focused, color }) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: 56,
//                 height: 56,
//                 borderRadius: 28,
//                 backgroundColor: '#22D3EE',
//                 marginBottom: 20,
//                 shadowColor: '#22D3EE',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 8,
//                 elevation: 8,
//               }}
//             >
//               <Home 
//                 size={24} 
//                 color="#FFFFFF" 
//                 strokeWidth={2}
//               />
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Cart"
//         component={MyTrip}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({ focused, color }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <ShoppingCart 
//                 size={24} 
//                 color={focused ? '#10B981' : '#9CA3AF'} 
//                 strokeWidth={focused ? 2 : 1.5}
//               />
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Profile"
//         component={BuddyScreen}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({ focused, color }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <User 
//                 size={24} 
//                 color={focused ? '#8B5CF6' : '#9CA3AF'} 
//                 strokeWidth={focused ? 2 : 1.5}
//               />
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }



export default function App() {
  return (
    <SafeAreaProvider>
      {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Slider"
            component={SliderScreen}
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
            name="TripGuides"
            component={MyTrip}
            options={{ title: 'Trip Plan' }}
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
            name="AIRecommendations"
            component={AIRecommendationsScreen}
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
            component={Register}
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
            name="PopularDestination"
            component={PopularDestinationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
