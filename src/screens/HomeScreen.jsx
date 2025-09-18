// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   StatusBar,
// } from 'react-native';
// import banner from './../assets/Gemini_Generated_Image_v5d497v5d497v5d4.png';
// import banner1 from './../assets/Gemini_Generated_Image_w9pepyw9pepyw9pe.png';
// import banner2 from './../assets/Gemini_Generated_Image_w9pepzw9pepzw9pe2.png';
// import Carousel from 'react-native-reanimated-carousel';
// import { useNavigation } from '@react-navigation/native';
// import offer1 from './../assets/offers1.jpg';
// import offer2 from './../assets/offers2.jpg';
// import Video from 'react-native-video';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import LottieView from 'lottie-react-native';
// import buddies from '../data/buddies';
// import categories from '../data/categories';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');
// const height = (width * 16) / 9; // default (for normal videos)
// // For shorts (vertical), swap ratio:
// const shortsHeight = (width * 16) / 9;
// const shortsWidth = width;

// const HomeScreen = () => {
//   const [searchText, setSearchText] = useState('');

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playingVideoId, setPlayingVideoId] = useState(null);

//   const banners = [
//     { id: 1, image: banner, label: 'HOT DEALS' },
//     { id: 2, image: banner1, label: 'LIMITED OFFER' },
//     { id: 3, image: banner2, label: 'NEW ARRIVAL' },
//   ];

//   const thailandShorts = [
//     {
//       id: '1',
//       videoId: 'YIbbFLRd3cY', // Bangkok Night Market
//       title: 'Bangkok Night Market Tour 🌃',
//     },
//     {
//       id: '2',
//       videoId: 'eVJfeb4zlLI', // Phi Phi Island
//       title: 'Phi Phi Island Paradise 🏝️',
//     },
//     {
//       id: '3',
//       videoId: 'ep2V_aMCV1M', // Thai Street Food
//       title: 'Street Food in Thailand 🍜',
//     },
//     {
//       id: '4',
//       videoId: 'HtbeuimTI6U', // Floating Market
//       title: 'Floating Market Experience 🚤',
//     },
//     {
//       id: '5',
//       videoId: 'EQSlaPhZUfI', // Chiang Mai temples
//       title: 'Chiang Mai Temples ⛩️',
//     },
//   ];

//   const placeholders = [
//     'Search destinations...',
//     'Search BUDDY...',
//     'Search hotels...',
//     'Search experiences...',
//   ];

//   const [placeholderIndex, setPlaceholderIndex] = useState(0);

//   // const categories = [
//   //   { id: 3, name: "Guide", icon: "🧭" },
//   //   { id: 2, name: "Companion", icon: "👫" },
//   //   { id: 1, name: "Packages", icon: "🧳" },
//   //   { id: 4, name: "Hotels", icon: "🏨" },
//   // ];

//   const thaiDestinations = [
//     {
//       id: 1,
//       name: 'Bangkok',
//       image:
//         'https://images.unsplash.com/photo-1578167635648-df79e1565908?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.8,
//     },
//     {
//       id: 2,
//       name: 'Phuket',
//       image:
//         'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.9,
//     },
//     {
//       id: 3,
//       name: 'Chiang Mai',
//       image:
//         'https://images.unsplash.com/photo-1578157695179-d7b7ddeb2f53?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.7,
//     },
//     {
//       id: 4,
//       name: 'Krabi',
//       image:
//         'https://images.unsplash.com/photo-1587691254941-bbd1faa13154?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.6,
//     },
//     {
//       id: 5,
//       name: 'Koh Samui',
//       image:
//         'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0',
//       rating: 4.5,
//     },
//     {
//       id: 6,
//       name: 'Ayutthaya',
//       image:
//         'https://images.unsplash.com/photo-1580977957630-bf69b7e0c8f9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0',
//       rating: 4.4,
//     },
//   ];

//   const featuredPackages = [
//     {
//       id: 1,
//       title: 'Romantic Phuket Getaway',
//       price: '$499',
//       originalPrice: '$699',
//       image:
//         'https://plus.unsplash.com/premium_photo-1670002464796-3a3136fe8808?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       duration: '5 days',
//       rating: 4.8,
//       discount: '29% OFF',
//     },
//     {
//       id: 2,
//       title: 'Chiang Mai Adventure',
//       price: '$399',
//       originalPrice: '$549',
//       image:
//         'https://images.unsplash.com/photo-1611605834890-a4f92858c823?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       duration: '4 days',
//       rating: 4.7,
//       discount: '27% OFF',
//     },
//     {
//       id: 3,
//       title: 'Bangkok City Explorer',
//       price: '$299',
//       originalPrice: '$399',
//       image:
//         'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       duration: '3 days',
//       rating: 4.6,
//       discount: '25% OFF',
//     },
//   ];

//   const trendingExperiences = [
//     {
//       id: 1,
//       title: 'Thai Cooking Class',
//       image:
//         'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1770&auto=format&fit=crop',
//       price: '$45',
//       rating: 4.9,
//       duration: '3 hours',
//     },
//     {
//       id: 2,
//       title: 'Elephant Sanctuary',
//       image:
//         'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1771&auto=format&fit=crop',
//       price: '$85',
//       rating: 4.8,
//       duration: 'Full day',
//     },
//     {
//       id: 3,
//       title: 'Temple Hopping Tour',
//       image:
//         'https://images.unsplash.com/photo-1563492065421-4c3abbec2651?q=80&w=1770&auto=format&fit=crop',
//       price: '$35',
//       rating: 4.7,
//       duration: '4 hours',
//     },
//     {
//       id: 4,
//       title: 'Island Hopping',
//       image:
//         'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1770&auto=format&fit=crop',
//       price: '$120',
//       rating: 4.9,
//       duration: 'Full day',
//     },
//   ];

//   // const testimonials = [
//   //   {
//   //     id: 1,
//   //     name: 'Sarah Johnson',
//   //     location: 'New York',
//   //     rating: 5,
//   //     text: 'Amazing trip to Thailand! Everything was perfectly organized.',
//   //     avatar:
//   //       'https://images.unsplash.com/photo-1494790108755-2616b612b647?q=80&w=200&h=200&auto=format&fit=crop',
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Mike Chen',
//   //     location: 'California',
//   //     rating: 5,
//   //     text: 'Best travel experience ever. Highly recommend RoamWe!',
//   //     avatar:
//   //       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
//   //   },
//   //   {
//   //     id: 3,
//   //     name: 'Emma Davis',
//   //     location: 'London',
//   //     rating: 5,
//   //     text: 'Professional service and unforgettable memories.',
//   //     avatar:
//   //       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
//   //   },
//   // ];

//   const testimonials = [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       location: 'New York',
//       rating: 5,
//       text: 'Amazing trip to Thailand! Everything was perfectly organized and exceeded all my expectations. The team went above and beyond.',
//       avatar:
//         'https://images.unsplash.com/photo-1494790108755-2616b612b647?q=80&w=200&h=200&auto=format&fit=crop',
//       trip: 'Bangkok & Phuket Tour',
//     },
//     {
//       id: 2,
//       name: 'Mike Chen',
//       location: 'California',
//       rating: 5,
//       text: 'Best travel experience ever! From booking to the actual trip, everything was seamless. Highly recommend RoamWe to everyone!',
//       avatar:
//         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
//       trip: 'Northern Thailand Adventure',
//     },
//     {
//       id: 3,
//       name: 'Emma Davis',
//       location: 'London',
//       rating: 5,
//       text: 'Professional service and unforgettable memories. The attention to detail and local insights made this trip truly special.',
//       avatar:
//         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
//       trip: 'Cultural Thailand Experience',
//     },
//     {
//       id: 4,
//       name: 'James Wilson',
//       location: 'Australia',
//       rating: 5,
//       text: 'Incredible journey through Thailand! Every detail was thoughtfully planned and the local guides were fantastic.',
//       avatar:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
//       trip: 'Island Hopping Package',
//     },
//   ];

//   const quickActions = [
//     {
//       id: 1,
//       title: 'Flight Deals',
//       icon: '✈️',
//       color: 'bg-blue-100',
//       textColor: 'text-blue-800',
//     },
//     {
//       id: 2,
//       title: 'Hotel Offers',
//       icon: '🏨',
//       color: 'bg-green-100',
//       textColor: 'text-green-800',
//     },
//     {
//       id: 3,
//       title: 'Car Rental',
//       icon: '🚗',
//       color: 'bg-purple-100',
//       textColor: 'text-purple-800',
//     },
//     {
//       id: 4,
//       title: 'Travel Insurance',
//       icon: '🛡️',
//       color: 'bg-orange-100',
//       textColor: 'text-orange-800',
//     },
//   ];

//   const navigation = useNavigation();
//   // const category = [
//   //   {
//   //     id: 1,
//   //     name: 'Packages',
//   //     image: require('../assets/package.png'),
//   //     color: 'bg-purple-100',
//   //     textColor: 'text-purple-800',
//   //     screen: 'Package', // Add screen name for navigation
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Buddy',
//   //     image: require('../assets/buddy.png'),
//   //     color: 'bg-green-100',
//   //     textColor: 'text-green-800',
//   //     screen: 'Buddy',
//   //   },
//   //   {
//   //     id: 3,
//   //     name: 'Hotel',
//   //     image: require('../assets/hotel.png'),
//   //     color: 'bg-orange-100',
//   //     textColor: 'text-orange-800',
//   //     screen: 'Hotel',
//   //   },
//   // ];

//   const category = [
//     {
//       id: 1,
//       name: 'Packages',
//       image: require('./../assets/traveltickets.json'),
//       color: 'bg-purple-100',
//       textColor: 'text-purple-800',
//       screen: 'Package', // Add screen name for navigation
//     },
//     {
//       id: 2,
//       name: 'Buddy',
//       image: require('../assets/road.json'),
//       color: 'bg-green-100',
//       textColor: 'text-green-800',
//       screen: 'Buddy',
//     },
//     {
//       id: 3,
//       name: 'Hotel',
//       image: require('../assets/hotel.json'),
//       color: 'bg-orange-100',
//       textColor: 'text-orange-800',
//       screen: 'Hotel',
//     },
//   ];

//   const handleCategoryPress = category => {
//     // Navigate to the appropriate screen
//     navigation.navigate(category.screen);
//   };

//   const renderStars = rating => {
//     return '⭐'.repeat(Math.floor(rating)) + (rating % 1 !== 0 ? '⭐' : '');
//   };

//   const renderBuddies = ({ item: buddy }) => (
//     <TouchableOpacity
//       key={buddy.id}
//       activeOpacity={0.8}
//       className="w-64 mb-4 mr-4 overflow-hidden bg-white h-72 rounded-2xl"
//       style={{ elevation: 3 }}
//     >
//       {/* Make card flex column */}
//       <View className="relative flex-col h-full p-4">
//         {/* Avatar + Verified Badge */}
//         <View className="flex-row items-start mb-3">
//           <View className="relative">
//             <Image
//               source={{ uri: buddy.image }}
//               className="w-16 h-16 rounded-full"
//             />
//             {buddy.verified && (
//               <View className="absolute flex items-center justify-center w-5 h-5 bg-green-500 rounded-full -top-1 -right-1">
//                 <Text className="text-xs text-white">✓</Text>
//               </View>
//             )}
//           </View>
//           <View className="flex-1 ml-3">
//             <Text className="font-semibold text-gray-800">{buddy.name}</Text>
//             <Text className="text-sm text-gray-600">{buddy.location}</Text>
//             <View className="flex-row items-center mt-1">
//               <Text className="mr-1 text-yellow-500">⭐</Text>
//               <Text className="text-sm text-gray-600">{buddy.rating}</Text>
//             </View>
//           </View>
//           <Text className="font-bold text-green-600"> ฿{buddy.price}</Text>
//         </View>

//         {/* Middle content */}
//         <View>
//           {/* Specialties */}
//           <View className="mb-3">
//             <Text className="mb-1 text-xs font-medium text-gray-500">
//               SPECIALTIES
//             </Text>
//             <View className="flex-row flex-wrap">
//               {buddy.specialties.slice(0, 2).map((specialty, index) => (
//                 <View
//                   key={index}
//                   className="px-2 py-1 mb-1 mr-1 bg-blue-100 rounded-full"
//                 >
//                   <Text className="text-xs text-blue-800">{specialty}</Text>
//                 </View>
//               ))}
//               {buddy.specialties.length > 2 && (
//                 <View className="px-2 py-1 mb-1 bg-gray-100 rounded-full">
//                   <Text className="text-xs text-gray-600">
//                     +{buddy.specialties.length - 2}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </View>

//           {/* Languages */}
//           <View className="mb-3">
//             <Text className="mb-1 text-xs font-medium text-gray-500">
//               LANGUAGES
//             </Text>
//             <Text className="text-sm text-gray-700">
//               {buddy.languages.join(', ')}
//             </Text>
//           </View>
//         </View>

//         {/* Push button to bottom */}
//         <View className="mt-auto">
//           <TouchableOpacity
//             className="w-full px-4 py-2 bg-pink-600 rounded-xl"
//             onPress={() => handleBuddyPress(buddy)}
//           >
//             <Text className="font-medium text-center text-white">Connect</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const handleBuddyPress = buddy => {
//     navigation.navigate('BuddyDetails', { buddy: buddy });
//   };

//   const renderDestinations = ({ item }) => (
//     <View
//       key={item.id}
//       className="mr-5"
//       style={{
//         elevation: 3,
//         width: 220,
//       }}
//     >
//       <TouchableOpacity activeOpacity={0.9}>
//         <View className="relative h-48 overflow-hidden rounded-t-3xl">
//           <Image
//             source={{ uri: item.image }}
//             className="absolute inset-0 w-full h-full"
//             // resizeMode={cover}
//           />
//           {/* Rating Badge */}
//           <View className="absolute flex-row items-center px-2 py-1 rounded-full top-4 right-4 bg-white/90">
//             <Text className="mr-1 text-yellow-500">★</Text>
//             <Text className="text-sm font-bold">{item.rating}</Text>
//           </View>
//         </View>

//         <View className="p-5 bg-white border-t border-gray-100 rounded-b-3xl">
//           <Text className="mb-1 text-xl font-bold text-gray-900">
//             {item.name}
//           </Text>
//           <Text className="mb-3 text-sm text-gray-500">
//             {item.location || 'Thailand'}
//           </Text>
//           <View className="flex-row items-center justify-between">
//             <View className="flex-row items-center">
//               <View className="w-2 h-2 mr-2 bg-green-400 rounded-full"></View>
//               <Text className="text-sm text-gray-600">Popular spot</Text>
//             </View>
//             <View className="px-3 py-1 rounded-full bg-blue-50">
//               <Text className="font-semibold text-blue-600">Visit</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   const handlePackagePress = pkg => {
//     console.log(pkg, '..........................................');
//     navigation.navigate('PackageDetails', { package: pkg.packages[0] });
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
//     }, 2500); // changes every 2.5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//        {/* <View className="flex-row items-center justify-between px-6 py-4">
//         <View>
//           <Text className="text-lg font-semibold text-gray-500">
//             Good Morning 👋
//           </Text>
//           <Text className="text-2xl font-bold text-gray-900">
//             Explore the World
//           </Text>
//         </View>
//         <TouchableOpacity>
//           <Image
//             source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
//             className="w-12 h-12 rounded-full"
//           />
//         </TouchableOpacity>
//       </View> */}
//       {/* Header */}

//       <View
//         className="px-4 pt-2 pb-6 bg-gradient-to-r from-blue-600 to-purple-600"
//         style={{ backgroundColor: '#000' }}
//       >
//         <View className="flex-row items-center justify-between mb-4">
//           <Text className="text-3xl font-bold text-white">RoamWe</Text>
//           <View className="flex-row space-x-3">
//             <TouchableOpacity
//               className="p-2"
//               onPress={() => navigation.navigate('Notification')}
//             >
//               <Text className="text-2xl text-white">🔔</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               className="p-2"
//               onPress={() => navigation.navigate('Profile')}
//             >
//               <Text className="text-2xl text-white">👤</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* Search Input with Animated Placeholder */}
//         <TextInput
//           placeholder={placeholders[placeholderIndex]}
//           placeholderTextColor="#9CA3AF"
//           value={searchText}
//           onChangeText={setSearchText}
//           className="px-4 py-3 bg-white shadow-sm rounded-xl"
//         />
//       </View>

//       <ScrollView>
//         {/* Banner */}
//         <View className="px-4 py-4">
//           <Carousel
//             loop={false}
//             autoPlay
//             autoPlayInterval={3000}
//             width={width - 32} // fit inside px-4
//             height={200}
//             data={banners}
//             scrollAnimationDuration={800}
//             onProgressChange={(_, absProgress) =>
//               setCurrentIndex(Math.round(absProgress))
//             }
//             renderItem={({ item }) => (
//               <View className="relative">
//                 <Image
//                   source={item.image}
//                   className="w-full h-48 rounded-2xl"
//                   resizeMode="cover"
//                 />
//                 {/* Label Badge */}
//                 <View className="absolute top-4 left-4">
//                   <View className="px-3 py-1 bg-red-500 rounded-full">
//                     <Text className="text-xs font-bold text-white">
//                       {item.label}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             )}
//           />

//           {/* Pagination Dots */}
//           <View className="flex-row justify-center ">
//             {banners.map((_, index) => (
//               <View
//                 key={index}
//                 className={`h-2 w-2 mx-1 rounded-full ${
//                   currentIndex === index ? 'bg-black w-4' : 'bg-gray-400'
//                 }`}
//               />
//             ))}
//           </View>
//         </View>

//         {/* Quick Actions */}
//         {/* <View className="px-4 mb-6">
//           <Text className="mb-3 text-xl font-semibold text-gray-800">Quick Actions</Text>
//           <View className="flex-row justify-between">
//             {quickActions.map((action) => (
//               <TouchableOpacity
//                 key={action.id}
//                 className={`items-center flex-1 px-2 py-4 mx-1 ${action.color} rounded-2xl`}
//               >
//                 <Text className="mb-1 text-2xl">{action.icon}</Text>
//                 <Text className={`text-xs font-medium ${action.textColor} text-center`}>{action.title}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View> */}

//         <View className="px-4 mb-6">
//           <Text className="mb-3 text-xl font-semibold text-gray-800">
//             Explore Categories
//           </Text>

//           <View className="flex-row justify-between">
//             {category.map(action => (
//               <TouchableOpacity
//                 key={action.id}
//                 className={`items-center flex-1 px-2 mx-1 ${action.color} rounded-2xl min-w-[100px]`}
//                 onPress={() => handleCategoryPress(action)}
//               >
//                 {/* Image */}
//                 {/* <Image
//                   source={action.image}
//                   className="w-32 h-32 mb-2 rounded-xl"
//                   resizeMode="contain"
//                 /> */}

//                 <LottieView
//                   source={action.image}
//                   autoPlay
//                   loop
//                   style={{ width: 80, height: 80 }}
//                 />

//                 {/* Category Name */}
//                 <Text
//                   className={`text-xs font-medium ${action.textColor} text-center mb-1`}
//                 >
//                   {action.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <View className="flex-1 bg-gray-50">
//           {/* Featured Buddies */}
//           <View className="mb-6">
//             <View className="flex-row items-center justify-between px-4 mb-3">
//               <Text className="text-xl font-semibold text-gray-800">
//                 Featured Travel Buddies
//               </Text>
//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 className="flex-row items-center px-3 py-2 bg-gray-100 rounded-full"
//               >
//                 <Text className="mr-1 font-medium text-gray-700">View all</Text>
//                 <Text>➔</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={buddies}
//               renderItem={renderBuddies}
//               keyExtractor={item => item.id.toString()}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             />
//           </View>

//           {/* Featured Packages */}
//           <View className="px-4 mb-6">
//             <View className="flex-row items-center justify-between mb-3">
//               <Text className="text-xl font-semibold text-gray-800">
//                 Featured Packages
//               </Text>
//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 className="flex-row items-center px-3 py-2 bg-gray-100 rounded-full"
//               >
//                 <Text className="mr-1 font-medium text-gray-700">View all</Text>
//                 <Text>➔</Text> {/* Using text arrow character */}
//               </TouchableOpacity>
//             </View>
//             {categories.slice(0, 5).map(pkg => (
//               <TouchableOpacity
//                 key={pkg.id}
//                 className="flex-row items-center p-4 mb-3 bg-white shadow-lg rounded-2xl"
//               >
//                 <View className="relative mr-4">
//                   <Image
//                     source={{ uri: pkg.image }}
//                     className="w-24 h-24 rounded-xl"
//                   />
//                   <View className="absolute px-2 py-1 bg-red-500 rounded-full top-1 right-1">
//                     <Text className="text-xs font-bold text-white">
//                       20% OFF
//                     </Text>
//                   </View>
//                 </View>
//                 <View className="flex-1">
//                   <Text className="mb-1 font-semibold text-gray-800">
//                     {pkg.name}
//                   </Text>
//                   <Text className="mb-1 text-sm text-gray-600">
//                     {pkg.duration} • {renderStars(4.5)} {4.5}
//                   </Text>
//                   <View className="flex-row items-center">
//                     <Text className="mr-2 text-lg font-bold text-green-600">
//                       ฿{pkg.packages[0].price}
//                     </Text>
//                     <Text className="w-full mt-1 text-sm text-gray-400 line-through">
//                       {pkg.packages[0].price * 1.25}
//                     </Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity
//                   className="px-4 py-2 bg-blue-600 rounded-xl"
//                   onPress={() => handlePackagePress(pkg)}
//                 >
//                   <Text className="font-medium text-white">Book</Text>
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Explore Thailand */}
//           <View className="mb-12">
//             <View className="flex-row items-center justify-between px-6 mb-6">
//               <View>
//                 <Text className="text-2xl font-black text-gray-900">
//                   Explore Thailand
//                 </Text>
//                 <Text className="font-medium text-blue-500">
//                   🌴 Tropical destinations
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 className="flex-row items-center px-3 py-2 bg-gray-100 rounded-full"
//               >
//                 <Text className="mr-1 font-medium text-gray-700">View all</Text>
//                 <Text>➔</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={thaiDestinations}
//               renderItem={renderDestinations}
//               keyExtractor={item => item.id.toString()}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingLeft: 24 }}
//               decelerationRate="fast"
//             />
//           </View>
//         </View>

//         {/* Trending Experiences */}
//         {/* <View className="mb-6">
//           <View className="flex-row items-center justify-between px-4 mb-3">
//             <Text className="text-xl font-semibold text-gray-800">
//               Trending Experiences
//             </Text>
//             <TouchableOpacity
//               activeOpacity={0.7}
//               className="flex-row items-center px-3 py-2 bg-gray-100 rounded-full"
//             >
//               <Text className="mr-1 font-medium text-gray-700">View all</Text>
//               <Text>➔</Text>
//             </TouchableOpacity>
//           </View>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 16 }}
//           >
//             {trendingExperiences.map(experience => (
//               <TouchableOpacity
//                 key={experience.id}
//                 className="w-40 mr-4 overflow-hidden bg-white shadow-lg rounded-2xl"
//               >
//                 <Image
//                   source={{ uri: experience.image }}
//                   className="w-full h-28"
//                 />
//                 <View className="p-3">
//                   <Text className="mb-1 text-sm font-semibold text-gray-800">
//                     {experience.title}
//                   </Text>
//                   <Text className="mb-2 text-xs text-gray-600">
//                     {experience.duration}
//                   </Text>
//                   <View className="flex-row items-center justify-between">
//                     <Text className="font-bold text-green-600">
//                       {experience.price}
//                     </Text>
//                     <View className="flex-row items-center">
//                       <Text className="mr-1 text-yellow-500">⭐</Text>
//                       <Text className="text-xs text-gray-600">
//                         {experience.rating}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View> */}

//         <View className="px-4 mb-6">
//           <Image
//             source={require('../assets/offers2.jpg')}
//             className="w-full h-80 rounded-2xl"
//             resizeMode=""
//           />
//         </View>

//         <View className="px-4 mb-6">
//           <Text className="mb-3 text-xl font-semibold text-gray-800">
//             Success Stories
//           </Text>
//           <View className="flex-1 bg-gray-50">
//             <FlatList
//               key="horizontal-video-list"
//               data={thailandShorts}
//               keyExtractor={item => item.id}
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{
//                 paddingHorizontal: 16,
//                 paddingVertical: 20,
//               }}
//               renderItem={({ item }) => {
//                 return (
//                   <TouchableOpacity
//                     className="mr-4 overflow-hidden bg-white shadow-sm rounded-xl"
//                     style={{
//                       width: 140,
//                       height: 200,
//                       elevation: 2,
//                       shadowColor: '#000',
//                       shadowOffset: { width: 0, height: 1 },
//                       shadowOpacity: 0.1,
//                       shadowRadius: 3,
//                     }}
//                     activeOpacity={0.9}
//                     onPress={() => {
//                       // Play video in fullscreen
//                       setPlayingVideoId(item.videoId);
//                     }}
//                   >
//                     <View style={{ flex: 1, backgroundColor: '#000' }}>
//                       {/* Thumbnail image */}
//                       <Image
//                         source={{
//                           uri: `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`,
//                         }}
//                         style={{
//                           width: '100%',
//                           height: '100%',
//                         }}
//                         resizeMode="cover"
//                       />

//                       {/* Hidden YoutubePlayer for fullscreen functionality */}
//                       <View
//                         style={{
//                           position: 'absolute',
//                           opacity: 0,
//                           width: 1,
//                           height: 1,
//                         }}
//                       >
//                         <YoutubePlayer
//                           height={1}
//                           width={1}
//                           play={false}
//                           videoId={item.videoId}
//                           initialPlayerParams={{
//                             controls: true,
//                             showClosedCaptions: false,
//                             preventFullScreen: false,
//                           }}
//                           onChangeState={state => {
//                             if (state === 'ended') {
//                               setPlayingVideoId(null);
//                             }
//                           }}
//                           onFullScreenChange={isFullScreen => {
//                             if (isFullScreen) {
//                               setPlayingVideoId(item.videoId);
//                             } else {
//                               setPlayingVideoId(null);
//                             }
//                           }}
//                         />
//                       </View>

//                       {/* Play button overlay */}
//                       <View
//                         style={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           right: 0,
//                           bottom: 0,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           backgroundColor: 'rgba(0,0,0,0.3)',
//                         }}
//                       >
//                         <View
//                           style={{
//                             width: 50,
//                             height: 50,
//                             borderRadius: 25,
//                             backgroundColor: 'rgba(255,255,255,0.9)',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}
//                         >
//                           <Text
//                             style={{
//                               fontSize: 20,
//                               color: '#000',
//                               marginLeft: 3,
//                             }}
//                           >
//                             ▶️
//                           </Text>
//                         </View>
//                       </View>
//                     </View>

//                     {/* Video title */}
//                     <View
//                       style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         backgroundColor: 'rgba(0,0,0,0.7)',
//                         padding: 8,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color: 'white',
//                           fontSize: 12,
//                           fontWeight: '600',
//                           textAlign: 'center',
//                         }}
//                       >
//                         {item.title}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           </View>
//         </View>

//         {/* Customer Testimonials */}

//         <View className="px-4 mb-32">
//           {/* Section Header */}
//           <View className="mb-6">
//             <Text className="mb-2 text-2xl font-bold text-gray-900">
//               What Our Travelers Say
//             </Text>
//             <Text className="text-gray-600">
//               Real experiences from real travelers
//             </Text>
//           </View>

//           {/* Testimonials ScrollView */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingLeft: 4,
//               paddingRight: 20,
//             }}
//             decelerationRate="fast"
//             snapToInterval={300}
//             snapToAlignment="start"
//           >
//             {testimonials.map((testimonial, index) => (
//               <View
//                 key={testimonial.id}
//                 style={{
//                   width: 280,
//                   marginRight: 16,
//                   marginBottom: 10,
//                   backgroundColor: 'white',
//                   borderRadius: 20,
//                   padding: 20,
//                   shadowColor: '#000',
//                   shadowOffset: {
//                     width: 0,
//                     height: 4,
//                   },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 12,
//                   elevation: 8,
//                   borderWidth: 1,
//                   borderColor: '#f1f5f9',
//                 }}
//               >
//                 {/* Rating Stars */}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginBottom: 12,
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 18,
//                       color: '#fbbf24',
//                       letterSpacing: 2,
//                     }}
//                   >
//                     {renderStars(testimonial.rating)}
//                   </Text>
//                   <Text
//                     style={{
//                       marginLeft: 8,
//                       fontSize: 12,
//                       color: '#6b7280',
//                       fontWeight: '600',
//                     }}
//                   >
//                     {testimonial.rating}.0
//                   </Text>
//                 </View>

//                 {/* Testimonial Text */}
//                 <Text
//                   style={{
//                     fontSize: 15,
//                     lineHeight: 22,
//                     color: '#374151',
//                     marginBottom: 16,
//                     fontStyle: 'italic',
//                   }}
//                 >
//                   "{testimonial.text}"
//                 </Text>

//                 {/* Trip Type Badge */}
//                 <View
//                   style={{
//                     backgroundColor: '#eff6ff',
//                     paddingHorizontal: 12,
//                     paddingVertical: 6,
//                     borderRadius: 20,
//                     alignSelf: 'flex-start',
//                     marginBottom: 16,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 12,
//                       color: '#3b82f6',
//                       fontWeight: '600',
//                     }}
//                   >
//                     {testimonial.trip}
//                   </Text>
//                 </View>

//                 {/* User Info */}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingTop: 16,
//                     borderTopWidth: 1,
//                     borderTopColor: '#f1f5f9',
//                   }}
//                 >
//                   <View
//                     style={{
//                       position: 'relative',
//                       marginRight: 12,
//                     }}
//                   >
//                     <Image
//                       source={{ uri: testimonial.avatar }}
//                       style={{
//                         width: 48,
//                         height: 48,
//                         borderRadius: 24,
//                         borderWidth: 3,
//                         borderColor: '#3b82f6',
//                       }}
//                     />
//                     {/* Verified Badge */}
//                     <View
//                       style={{
//                         position: 'absolute',
//                         bottom: -2,
//                         right: -2,
//                         width: 20,
//                         height: 20,
//                         backgroundColor: '#10b981',
//                         borderRadius: 10,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         borderWidth: 2,
//                         borderColor: 'white',
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color: 'white',
//                           fontSize: 10,
//                           fontWeight: 'bold',
//                         }}
//                       >
//                         ✓
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={{ flex: 1 }}>
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         fontWeight: '700',
//                         color: '#111827',
//                         marginBottom: 2,
//                       }}
//                     >
//                       {testimonial.name}
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: '#6b7280',
//                           marginRight: 4,
//                         }}
//                       >
//                         📍
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 13,
//                           color: '#6b7280',
//                           fontWeight: '500',
//                         }}
//                       >
//                         {testimonial.location}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
  RefreshControl, // Add this import
  StyleSheet,
} from 'react-native';
import banner from './../assets/Gemini_Generated_Image_v5d497v5d497v5d4.png';
import banner1 from './../assets/Gemini_Generated_Image_w9pepyw9pepyw9pe.png';
import banner2 from './../assets/Gemini_Generated_Image_w9pepzw9pepzw9pe2.png';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import offer1 from './../assets/offers1.jpg';
import offer2 from './../assets/offers2.jpg';
import Video from 'react-native-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import LottieView from 'lottie-react-native';
import buddies from '../data/buddies';
import categories from '../data/categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gift } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const height = (width * 16) / 9; // default (for normal videos)

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false); // Add refresh state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // Add refresh function
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh (replace with actual API calls)
    setRandomPackages(getRandomPackages(5));
    setRandomBuddies(getRandomBuddies(3));
    setTimeout(() => {
      setRefreshing(false);
      // You would typically fetch new data here
    }, 2000);
  }, []);

  const banners = [
    { id: 1, image: banner, label: 'HOT DEALS' },
    { id: 2, image: banner1, label: 'LIMITED OFFER' },
    { id: 3, image: banner2, label: 'NEW ARRIVAL' },
  ];

  const thailandShorts = [
    {
      id: '1',
      videoId: 'YIbbFLRd3cY', // Bangkok Night Market
      title: 'Bangkok Night Market Tour 🌃',
    },
    {
      id: '2',
      videoId: 'eVJfeb4zlLI', // Phi Phi Island
      title: 'Phi Phi Island Paradise 🏝️',
    },
    {
      id: '3',
      videoId: 'ep2V_aMCV1M', // Thai Street Food
      title: 'Street Food in Thailand 🍜',
    },
    {
      id: '4',
      videoId: 'HtbeuimTI6U', // Floating Market
      title: 'Floating Market Experience 🚤',
    },
    {
      id: '5',
      videoId: 'EQSlaPhZUfI', // Chiang Mai temples
      title: 'Chiang Mai Temples ⛩️',
    },
  ];

  const placeholders = [
    'Search destinations...',
    'Search BUDDY...',
    'Search hotels...',
    'Search experiences...',
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const thaiDestinations = [
    {
      id: 1,
      name: 'Bangkok',
      image:
        'https://images.unsplash.com/photo-1578167635648-df79e1565908?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Phuket',
      image:
        'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Chiang Mai',
      image:
        'https://images.unsplash.com/photo-1578157695179-d7b7ddeb2f53?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Krabi',
      image:
        'https://images.unsplash.com/photo-1587691254941-bbd1faa13154?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.6,
    },
    {
      id: 5,
      name: 'Koh Samui',
      image:
        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0',
      rating: 4.5,
    },
    {
      id: 6,
      name: 'Ayutthaya',
      image:
        'https://images.unsplash.com/photo-1580977957630-bf69b7e0c8f9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0',
      rating: 4.4,
    },
  ];

  const trendingExperiences = [
    {
      id: 1,
      title: 'Thai Cooking Class',
      image:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1770&auto=format&fit=crop',
      price: '$45',
      rating: 4.9,
      duration: '3 hours',
    },
    {
      id: 2,
      title: 'Elephant Sanctuary',
      image:
        'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1771&auto=format&fit=crop',
      price: '$85',
      rating: 4.8,
      duration: 'Full day',
    },
    {
      id: 3,
      title: 'Temple Hopping Tour',
      image:
        'https://images.unsplash.com/photo-1563492065421-4c3abbec2651?q=80&w=1770&auto=format&fit=crop',
      price: '$35',
      rating: 4.7,
      duration: '4 hours',
    },
    {
      id: 4,
      title: 'Island Hopping',
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1770&auto=format&fit=crop',
      price: '$120',
      rating: 4.9,
      duration: 'Full day',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York',
      rating: 5,
      text: 'Amazing trip to Thailand! Everything was perfectly organized and exceeded all my expectations. The team went above and beyond.',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b647?q=80&w=200&h=200&auto=format&fit=crop',
      trip: 'Bangkok & Phuket Tour',
    },
    {
      id: 2,
      name: 'Mike Chen',
      location: 'California',
      rating: 5,
      text: 'Best travel experience ever! From booking to the actual trip, everything was seamless. Highly recommend RoamWe to everyone!',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
      trip: 'Northern Thailand Adventure',
    },
    {
      id: 3,
      name: 'Emma Davis',
      location: 'London',
      rating: 5,
      text: 'Professional service and unforgettable memories. The attention to detail and local insights made this trip truly special.',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
      trip: 'Cultural Thailand Experience',
    },
    {
      id: 4,
      name: 'James Wilson',
      location: 'Australia',
      rating: 5,
      text: 'Incredible journey through Thailand! Every detail was thoughtfully planned and the local guides were fantastic.',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
      trip: 'Island Hopping Package',
    },
  ];

  const navigation = useNavigation();

  const category = [
    {
      id: 1,
      name: 'Packages',
      image: require('./../assets/traveltickets.json'),
      color: 'bg-purple-100',
      textColor: 'text-purple-800',
      screen: 'Package',
    },
    {
      id: 2,
      name: 'Buddy',
      image: require('../assets/road.json'),
      color: 'bg-green-100',
      textColor: 'text-green-800',
      screen: 'Buddy',
    },
    {
      id: 3,
      name: 'Hotel',
      image: require('../assets/hotel.json'),
      color: 'bg-orange-100',
      textColor: 'text-orange-800',
      screen: 'Hotel',
    },
  ];

  const [randomPackages, setRandomPackages] = useState([]);

  // Function to get random packages
  const getRandomPackages = count => {
    const shuffled = [...categories];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  // Load initial random packages
  useEffect(() => {
    setRandomPackages(getRandomPackages(5));
  }, []);

  const handleCategoryPress = category => {
    navigation.navigate(category.screen);
  };

  const renderStars = rating => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 !== 0 ? '⭐' : '');
  };

  const renderBuddies = ({ item: buddy }) => (
    <TouchableOpacity
      key={buddy.id}
      activeOpacity={0.8}
      className="w-64 mb-4 mr-4 overflow-hidden bg-white h-72 rounded-2xl"
      style={{ elevation: 3 }}
    >
      <View className="relative flex-col h-full p-4">
        <View className="flex-row items-start mb-3">
          <View className="relative">
            <Image
              source={{ uri: buddy.image }}
              className="w-16 h-16 rounded-full"
            />
            {buddy.verified && (
              <View className="absolute flex items-center justify-center w-5 h-5 bg-green-500 rounded-full -top-1 -right-1">
                <Text className="text-xs text-white">✓</Text>
              </View>
            )}
          </View>
          <View className="flex-1 ml-3">
            <Text className="font-semibold text-gray-800">{buddy.name}</Text>
            <Text className="text-sm text-gray-600">{buddy.location}</Text>
            <View className="flex-row items-center mt-1">
              <Text className="mr-1 text-yellow-500">⭐</Text>
              <Text className="text-sm text-gray-600">{buddy.rating}</Text>
            </View>
          </View>
          <Text className="font-bold text-green-600"> ฿{buddy.price}</Text>
        </View>

        <View>
          <View className="mb-3">
            <Text className="mb-1 text-xs font-medium text-gray-500">
              SPECIALTIES
            </Text>
            <View className="flex-row flex-wrap">
              {buddy?.specialties?.slice(0, 2).map((specialty, index) => (
                <View
                  key={index}
                  className="px-2 py-1 mb-1 mr-1 bg-blue-100 rounded-full"
                >
                  <Text className="text-xs text-blue-800">{specialty}</Text>
                </View>
              ))}
              {buddy?.specialties?.length > 2 && (
                <View className="px-2 py-1 mb-1 bg-gray-100 rounded-full">
                  <Text className="text-xs text-gray-600">
                    +{buddy?.specialties?.length - 2}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-1 text-xs font-medium text-gray-500">
              LANGUAGES
            </Text>
            <Text className="text-sm text-gray-700">
              {buddy.languages.join(', ')}
            </Text>
          </View>
        </View>

        <View className="mt-auto">
          <TouchableOpacity
            className="w-full px-4 py-2 bg-pink-600 rounded-xl"
            onPress={() => handleBuddyPress(buddy)}
          >
            <Text className="font-medium text-center text-white">Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const [randomBuddies, setRandomBuddies] = useState([]);

  // Function to get random packages
  const getRandomBuddies = count => {
    const shuffled = [...categories];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  // Load initial random packages
  useEffect(() => {
    setRandomBuddies(getRandomBuddies(5));
  }, []);

  const handleBuddyPress = buddy => {
    navigation.navigate('BuddyDetails', { buddy: buddy });
  };

  const renderDestinations = ({ item }) => (
    <View
      key={item.id}
      className="mr-5"
      style={{
        elevation: 3,
        width: 220,
      }}
    >
      <TouchableOpacity activeOpacity={0.9}>
        <View className="relative h-48 overflow-hidden rounded-t-3xl">
          <Image
            source={{ uri: item.image }}
            className="absolute inset-0 w-full h-full"
          />
          <View className="absolute flex-row items-center px-2 py-1 rounded-full top-4 right-4 bg-white/90">
            <Text className="mr-1 text-yellow-500">★</Text>
            <Text className="text-sm font-bold">{item.rating}</Text>
          </View>
        </View>

        <View className="p-5 bg-white border-t border-gray-100 rounded-b-3xl">
          <Text className="mb-1 text-xl font-bold text-gray-900">
            {item.name}
          </Text>
          <Text className="mb-3 text-sm text-gray-500">
            {item.location || 'Thailand'}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-2 h-2 mr-2 bg-green-400 rounded-full"></View>
              <Text className="text-sm text-gray-600">Popular spot</Text>
            </View>
            <View className="px-3 py-1 rounded-full bg-blue-50">
              <Text className="font-semibold text-blue-600">Visit</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const handlePackagePress = pkg => {
    navigation.navigate('PackageDetails', { package: pkg.packages[0] });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b2b51' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1b2b51" // black status bar
        translucent={false} // content stays below
      />
      <View
        className="px-4 pt-2 pb-6 bg-gradient-to-r from-blue-600 to-purple-600"
        style={{ backgroundColor: '#1b2b51' }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-3xl font-bold text-white">RoamWe</Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="p-2"
              onPress={() => navigation.navigate('Notification')}
            >
              <Text className="text-2xl text-white">🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2"
              onPress={() => navigation.navigate('Profile')}
            >
              <Text className="text-2xl text-white">👤</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          className="px-4 py-3 bg-white shadow-sm rounded-xl"
        >
          <Text className="text-gray-400">
            {placeholders[placeholderIndex]}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add RefreshControl to ScrollView */}
      <View style={{ flex: 1, marginBottom: 35 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#000000']} // Customize for dark theme
              tintColor="#000000" // Customize for dark theme
            />
          }
        >
          {/* Banner */}
          <View className="px-4 py-4 bg-white">
            <Carousel
              loop={false}
              autoPlay
              autoPlayInterval={3000}
              width={width - 32}
              height={200}
              data={banners}
              scrollAnimationDuration={800}
              onProgressChange={(_, absProgress) =>
                setCurrentIndex(Math.round(absProgress))
              }
              renderItem={({ item }) => (
                <View className="relative">
                  <Image
                    source={item.image}
                    className="w-full h-48 rounded-2xl"
                    resizeMode="cover"
                  />
                  <View className="absolute top-4 left-4">
                    <View className="px-3 py-1 bg-red-500 rounded-full">
                      <Text className="text-xs font-bold text-white">
                        {item.label}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />

            <View className="flex-row justify-center ">
              {banners.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 w-2 mx-1 rounded-full ${
                    currentIndex === index ? 'bg-black w-4' : 'bg-gray-400'
                  }`}
                />
              ))}
            </View>
          </View>

          {/* Categories */}
          <View className="px-4 bg-white pb-7">
            <Text className="mb-3 text-xl font-semibold text-gray-800">
              Explore Categories
            </Text>

            <View className="flex-row justify-between">
              {category.map(action => (
                <TouchableOpacity
                  key={action.id}
                  className={`items-center flex-1 px-2 mx-1 ${action.color} rounded-2xl min-w-[100px]`}
                  onPress={() => handleCategoryPress(action)}
                >
                  <LottieView
                    source={action.image}
                    autoPlay
                    loop
                    style={{ width: 80, height: 80 }}
                  />
                  <Text
                    className={`text-xs font-medium ${action.textColor} text-center mb-1`}
                  >
                    {action.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="flex-1 pb-0 bg-gray-50">
            {/* Featured Travel Buddies */}

            <View className="mb-2">
              <View className="flex-row items-center justify-between px-4 mb-3">
                <Text className="text-xl font-semibold text-gray-800">
                  Featured Travel Buddies
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-row items-center px-3 py-2 bg-gray-100 rounded-full"
                >
                  <Text
                    className="mr-1 font-medium text-gray-700"
                    onPress={() => navigation.navigate('Buddy')}
                  >
                    View all
                  </Text>
                  <Text>➔</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={buddies}
                renderItem={renderBuddies}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              />
            </View>

            {/* Welcome Gift */}
            <View className="bg-white">
              <View className="flex-row items-center justify-between p-4 mx-4 my-4 bg-orange-100 rounded-xl">
                {/* Left Icon */}
                <View className="p-2 bg-orange-200 rounded-lg">
                  <Gift size={24} color="#EA580C" />
                </View>

                {/* Text */}
                <View className="flex-1 px-3">
                  <Text className="text-base font-semibold text-gray-900">
                    Welcome gift!
                  </Text>
                  <Text className="text-sm text-gray-700">Up to 10% off</Text>
                </View>

                {/* Claim Button */}
                <TouchableOpacity
                  className="px-5 py-2 bg-orange-500 rounded-full"
                  activeOpacity={0.8}
                  onPress={() => console.log('Claim clicked')}
                >
                  <Text className="font-semibold text-white">Claim</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Featured Packages */}
            <View className="px-4 mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-xl font-semibold text-gray-800">
                  Featured Packages
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-row items-center px-3 py-2 bg-gray-100 rounded-full"
                >
                  <Text
                    className="mr-1 font-medium text-gray-700"
                    onPress={() => navigation.navigate('Package')}
                  >
                    View all
                  </Text>
                  <Text>➔</Text>
                </TouchableOpacity>
              </View>
              {randomPackages.slice(0, 5).map(pkg => (
                <TouchableOpacity
                  key={pkg.id}
                  className="flex-row items-center p-4 mb-3 bg-white shadow-lg rounded-2xl"
                >
                  <View className="relative mr-4">
                    <Image
                      source={{ uri: pkg.image }}
                      className="w-24 h-24 rounded-xl"
                    />
                    <View className="absolute px-2 py-1 bg-red-500 rounded-full top-1 right-1">
                      <Text className="text-xs font-bold text-white">
                        20% OFF
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="mb-1 font-semibold text-gray-800">
                      {pkg.name}
                    </Text>
                    <Text className="mb-1 text-sm text-gray-600">
                      {pkg.duration} • {renderStars(4.5)} {4.5}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="mr-2 text-lg font-bold text-green-600">
                        ฿{pkg.packages[0].price}
                      </Text>
                      <Text className="w-full mt-1 text-sm text-gray-400 line-through">
                        {pkg.packages[0].price * 1.25}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="px-4 py-2 bg-blue-600 rounded-xl"
                    onPress={() => handlePackagePress(pkg)}
                  >
                    <Text className="font-medium text-white">Book</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>

            {/* Popular Destinations */}
            <View className="mb-12">
              <View className="flex-row items-center justify-between px-6 mb-6">
                <View>
                  <Text className="text-2xl font-black text-gray-900">
                    Explore Thailand
                  </Text>
                  <Text className="font-medium text-blue-500">
                    🌴 Tropical destinations
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-row items-center px-3 py-2 bg-gray-100 rounded-full"
                onPress={() => navigation.navigate('PopularDestination')}>
                  <Text className="mr-1 font-medium text-gray-700">
                    View all
                  </Text>
                  <Text>➔</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={thaiDestinations}
                renderItem={renderDestinations}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 24 }}
                decelerationRate="fast"
              />
            </View>
          </View>

          <TouchableOpacity
            className="px-4 pb-8 bg-white"
            onPress={() => navigation.navigate('Offers')}
          >
            <Image
              source={require('../assets/offers2.jpg')}
              className="w-full h-80 rounded-2xl"
              resizeMode=""
            />
          </TouchableOpacity>

          <View className="px-4 pb-6 bg-white">
            <Text className="mb-3 text-xl font-semibold text-gray-800">
              Success Stories
            </Text>
            <View className="flex-1 bg-gray-50">
              <FlatList
                key="horizontal-video-list"
                data={thailandShorts}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingVertical: 20,
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      className="mr-4 overflow-hidden bg-white shadow-sm rounded-xl"
                      style={{
                        width: 140,
                        height: 200,
                        elevation: 2,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                      }}
                      activeOpacity={0.9}
                      onPress={() => {
                        setPlayingVideoId(item.videoId);
                      }}
                    >
                      <View style={{ flex: 1, backgroundColor: '#000' }}>
                        <Image
                          source={{
                            uri: `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`,
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          resizeMode="cover"
                        />

                        <View
                          style={{
                            position: 'absolute',
                            opacity: 0,
                            width: 1,
                            height: 1,
                          }}
                        >
                          <YoutubePlayer
                            height={1}
                            width={1}
                            play={false}
                            videoId={item.videoId}
                            initialPlayerParams={{
                              controls: true,
                              showClosedCaptions: false,
                              preventFullScreen: false,
                            }}
                            onChangeState={state => {
                              if (state === 'ended') {
                                setPlayingVideoId(null);
                              }
                            }}
                            onFullScreenChange={isFullScreen => {
                              if (isFullScreen) {
                                setPlayingVideoId(item.videoId);
                              } else {
                                setPlayingVideoId(null);
                              }
                            }}
                          />
                        </View>

                        <View
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                          }}
                        >
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25,
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#000',
                                marginLeft: 3,
                              }}
                            >
                              ▶️
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          padding: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 12,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>

          <View className="px-4 pb-20 bg-white">
            <View className="mb-6">
              <Text className="mb-2 text-2xl font-bold text-gray-900">
                What Our Travelers Say
              </Text>
              <Text className="text-gray-600">
                Real experiences from real travelers
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 4,
                paddingRight: 20,
              }}
              decelerationRate="fast"
              snapToInterval={300}
              snapToAlignment="start"
            >
              {testimonials.map((testimonial, index) => (
                <View
                  key={testimonial.id}
                  style={{
                    width: 280,
                    marginRight: 16,
                    marginBottom: 10,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 8,
                    borderWidth: 1,
                    borderColor: '#f1f5f9',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 12,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#fbbf24',
                        letterSpacing: 2,
                      }}
                    >
                      {renderStars(testimonial.rating)}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 8,
                        fontSize: 12,
                        color: '#6b7280',
                        fontWeight: '600',
                      }}
                    >
                      {testimonial.rating}.0
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 22,
                      color: '#374151',
                      marginBottom: 16,
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.text}"
                  </Text>

                  <View
                    style={{
                      backgroundColor: '#eff6ff',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,
                      alignSelf: 'flex-start',
                      marginBottom: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#3b82f6',
                        fontWeight: '600',
                      }}
                    >
                      {testimonial.trip}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 16,
                      borderTopWidth: 1,
                      borderTopColor: '#f1f5f9',
                    }}
                  >
                    <View
                      style={{
                        position: 'relative',
                        marginRight: 12,
                      }}
                    >
                      <Image
                        source={{ uri: testimonial.avatar }}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                          borderWidth: 3,
                          borderColor: '#3b82f6',
                        }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          width: 20,
                          height: 20,
                          backgroundColor: '#10b981',
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 2,
                          borderColor: 'white',
                        }}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 10,
                            fontWeight: 'bold',
                          }}
                        >
                          ✓
                        </Text>
                      </View>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#111827',
                          marginBottom: 2,
                        }}
                      >
                        {testimonial.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#6b7280',
                            marginRight: 4,
                          }}
                        >
                          📍
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#6b7280',
                            fontWeight: '500',
                          }}
                        >
                          {testimonial.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        {/* Fixed bottom-right Lottie */}
        {/* <View style={styles.lottieContainer}>
          <View style={styles.lottieBackground}>
            <LottieView
              source={require('../assets/traveller.json')}
              autoPlay
              loop
              style={{ width: 50, height: 50 }}
            />
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  lottieBackground: {
    backgroundColor: '', // background
    padding: 10, // space around animation
    borderRadius: 50, // make it circular
    elevation: 5, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default HomeScreen;
