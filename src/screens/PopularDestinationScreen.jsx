// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   Image,
//   Animated,
//   StatusBar,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width, height } = Dimensions.get('window');
// const HEADER_HEIGHT = 300;
// const COLLAPSED_HEIGHT = 60;

// const PopularDestinationScreen = () => {
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const [searchText, setSearchText] = useState('');

//   // Animated header height
//   const headerHeight = scrollY.interpolate({
//     inputRange: [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
//     outputRange: [HEADER_HEIGHT, COLLAPSED_HEIGHT],
//     extrapolate: 'clamp',
//   });

//   // Animated opacity for header content
//   const headerOpacity = scrollY.interpolate({
//     inputRange: [0, (HEADER_HEIGHT - COLLAPSED_HEIGHT) / 2],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   // Animated search input position
//   const searchInputTranslateY = scrollY.interpolate({
//     inputRange: [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
//     outputRange: [0, -50],
//     extrapolate: 'clamp',
//   });

//   const destinations = [
//     {
//       id: 1,
//       name: 'Budapest',
//       country: 'Hungary',
//       image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=500&h=400&fit=crop',
//     },
//     {
//       id: 2,
//       name: 'Barcelona',
//       country: 'Spain',
//       image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&h=400&fit=crop',
//     },
//     {
//       id: 3,
//       name: 'Prague',
//       country: 'Czech Republic',
//       image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=500&h=300&fit=crop',
//     },
//     {
//       id: 4,
//       name: 'Dublin',
//       country: 'Ireland',
//       image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=500&h=300&fit=crop',
//     },
//     {
//       id: 5,
//       name: 'Berlin',
//       country: 'Germany',
//       image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=500&h=300&fit=crop',
//     },
//     {
//       id: 6,
//       name: 'London',
//       country: 'United Kingdom',
//       image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=300&fit=crop',
//     },
//   ];

//   const DestinationCard = ({ destination, isLarge = false }) => (
//     <TouchableOpacity
//       className={`rounded-2xl overflow-hidden mb-4 ${
//         isLarge ? 'h-72' : 'h-48'
//       }`}
//       style={{ marginHorizontal: 16 }}
//     >
//       <Image
//         source={{ uri: destination.image }}
//         className="w-full h-full"
//         resizeMode="cover"
//       />
//       <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/30">
//         <Text className="text-2xl font-bold text-white">{destination.name}</Text>
//         <Text className="text-base text-white/80">{destination.country}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View className="flex-1 bg-gray-50">
//       <StatusBar barStyle="light-content" />
      
//       {/* Animated Header */}
//       <Animated.View
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: headerHeight,
//           zIndex: 10,
//         }}
//         className="overflow-hidden"
//       >
//         <Image
//           source={{
//             uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
//           }}
//           className="w-full h-full"
//           resizeMode="cover"
//         />
        
//         {/* Gradient Overlay */}
//         <View className="absolute inset-0 bg-black/40" />
        
//         {/* Header Content */}
//         <SafeAreaView className="absolute inset-0 items-center justify-center">
//           <Animated.View
//             style={{ opacity: headerOpacity }}
//             className="items-center px-6"
//           >
//             {/* Logo */}
//             <View className="flex-row items-center mb-8">
//               <View className="items-center justify-center w-10 h-10 mr-3 bg-orange-500 rounded-full">
//                 <Text className="text-lg font-bold text-white">F</Text>
//               </View>
//               <Text className="text-2xl font-bold text-white">FREETOUR.com</Text>
//             </View>
            
//             {/* Main Title */}
//             <Text className="mb-8 text-4xl font-bold text-center text-white">
//               Free Your World
//             </Text>
//           </Animated.View>
          
//           {/* Search Input */}
//           <Animated.View
//             style={{
//               transform: [{ translateY: searchInputTranslateY }],
//             }}
//             className="absolute bottom-6 left-6 right-6"
//           >
//             <View className="flex-row items-center px-6 py-4 bg-white rounded-full shadow-lg">
//               <View className="mr-4">
//                 <Text className="text-xl text-gray-400">🔍</Text>
//               </View>
//               <TextInput
//                 value={searchText}
//                 onChangeText={setSearchText}
//                 placeholder="Explore cities, places, and tours"
//                 placeholderTextColor="#9CA3AF"
//                 className="flex-1 text-base text-gray-800"
//               />
//             </View>
//           </Animated.View>
//         </SafeAreaView>
//       </Animated.View>

//       {/* Scrollable Content */}
//       <Animated.ScrollView
//         contentContainerStyle={{
//           paddingTop: HEADER_HEIGHT,
//           paddingBottom: 100,
//         }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Popular Destinations Section */}
//         <View className="pt-8 pb-6 bg-white">
//           <View className="px-6 mb-6">
//             <Text className="mb-3 text-3xl font-bold text-gray-900">
//               Popular Destinations
//             </Text>
//             <Text className="text-base leading-relaxed text-gray-600">
//               Join some of our popular tours in Dublin, Budapest, Barcelona, Berlin, Prague and London.
//             </Text>
//           </View>

//           {/* Destination Cards */}
//           <View className="space-y-4">
//             {destinations.map((destination, index) => (
//               <DestinationCard
//                 key={destination.id}
//                 destination={destination}
//                 isLarge={index === 0 || index === 1}
//               />
//             ))}
//           </View>
//         </View>

//         {/* Additional Content for Scrolling */}
//         <View className="p-6 bg-gray-50">
//           <Text className="mb-4 text-2xl font-bold text-gray-900">
//             Why Choose FreeTour?
//           </Text>
//           <View className="space-y-4">
//             <View className="p-4 bg-white rounded-xl">
//               <Text className="mb-2 text-lg font-semibold text-gray-900">
//                 🎯 Expert Local Guides
//               </Text>
//               <Text className="text-gray-600">
//                 Discover hidden gems and local stories with our passionate guides.
//               </Text>
//             </View>
//             <View className="p-4 bg-white rounded-xl">
//               <Text className="mb-2 text-lg font-semibold text-gray-900">
//                 💰 Pay What You Want
//               </Text>
//               <Text className="text-gray-600">
//                 Enjoy quality tours and pay what you feel they're worth.
//               </Text>
//             </View>
//             <View className="p-4 bg-white rounded-xl">
//               <Text className="mb-2 text-lg font-semibold text-gray-900">
//                 🌍 Multiple Languages
//               </Text>
//               <Text className="text-gray-600">
//                 Tours available in various languages to suit every traveler.
//               </Text>
//             </View>
//           </View>
//         </View>
//       </Animated.ScrollView>

//       {/* Bottom Navigation */}
//       <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
//         <SafeAreaView>
//           <View className="flex-row justify-around py-3">
//             {[
//               { name: 'Tours', icon: '🎫', active: true },
//               { name: 'Favorites', icon: '❤️', active: false },
//               { name: 'Nearby', icon: '📍', active: false },
//               { name: 'Bookings', icon: '📅', active: false },
//               { name: 'Profile', icon: '👤', active: false },
//             ].map((tab) => (
//               <TouchableOpacity
//                 key={tab.name}
//                 className="items-center justify-center px-4 py-2"
//               >
//                 <Text className={`text-lg mb-1 ${tab.active ? 'opacity-100' : 'opacity-50'}`}>
//                   {tab.icon}
//                 </Text>
//                 <Text
//                   className={`text-xs ${
//                     tab.active ? 'text-orange-500 font-semibold' : 'text-gray-500'
//                   }`}
//                 >
//                   {tab.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </SafeAreaView>
//       </View>
//     </View>
//   );
// };

// export default PopularDestinationScreen;










import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Animated,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 300;
const COLLAPSED_HEIGHT = 100;

const PopularDestinationScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState('');

  // Animated header height
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
    outputRange: [HEADER_HEIGHT, COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  // Animated opacity for header content
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, (HEADER_HEIGHT - COLLAPSED_HEIGHT) / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Animated search input position - moves up with header
  const searchInputTop = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
    outputRange: [HEADER_HEIGHT - 35, COLLAPSED_HEIGHT - 40], // Stays close to header
    extrapolate: 'clamp',
  });

// const destinations = [
//   {
//     id: 1,
//     name: "Bangkok",
//     country: "Thailand",
//     image:
//       "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&h=400&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Chiang Mai",
//     country: "Thailand",
//     image:
//       "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?w=500&h=400&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Phuket",
//     country: "Thailand",
//     image:
//       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
//   },
//   {
//     id: 4,
//     name: "Krabi",
//     country: "Thailand",
//     image:
//       "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop",
//   },
//   {
//     id: 5,
//     name: "Pattaya",
//     country: "Thailand",
//     image:
//       "https://images.unsplash.com/photo-1591802030230-6b4b38183b9f?w=500&h=300&fit=crop",
//   },
//   {
//     id: 6,
//     name: "Koh Samui",
//     country: "Thailand",
//     image:
//       "https://images.unsplash.com/photo-1604999322749-9a443a0c3c8e?w=500&h=300&fit=crop",
//   },
// ];

const destinations = [
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


  const DestinationCard = ({ destination, isLarge = false }) => (
    <TouchableOpacity
      className={`rounded-2xl overflow-hidden mb-4 ${
        isLarge ? 'h-72' : 'h-48'
      }`}
      style={{ marginHorizontal: 16 }}
    >
      <Image
        source={{ uri: destination.image }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/30">
        <Text className="text-2xl font-bold text-white">{destination.name}</Text>
        <Text className="text-base text-white/80">{destination.country}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      
      {/* Animated Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: headerHeight,
          zIndex: 10,
        }}
        className="overflow-visible bg-white"
      >
        {/* Image with Curved Bottom */}
        <View className="relative w-full h-full overflow-hidden">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
            }}
            className="w-full h-full "
            // style={{borderBottomLeftRadius:70,borderBottomRightRadius:70}}
            resizeMode="cover"
          />
          
          {/* Curved bottom overlay */}
          <View 
            className="absolute bottom-0 left-0 right-0 "
            style={{
            //   height: 30,
              borderTopLeftRadius: 70,
              borderTopRightRadius: 70,
              transform: [{ scaleX: 1.5 }],
            }}
          />
          
          {/* Gradient Overlay */}
          <View className="absolute inset-0 bg-black/30" />
        </View>
        
        {/* Header Content */}
        <View className="absolute inset-0 items-center justify-center">
          <Animated.View
            style={{ opacity: headerOpacity }}
            className="items-center px-6"
          >
            {/* Logo */}
            <View className="flex-row items-center mb-8">
              <View className="items-center justify-center w-10 h-10 mr-3 bg-orange-500 rounded-full">
                <Text className="text-lg font-bold text-white">R</Text>
              </View>
              <Text className="text-2xl font-bold text-white">RoamWe.com</Text>
            </View>
            
            {/* Main Title */}
            <Text className="mb-8 text-4xl font-bold text-center text-white">
              Free Your World
            </Text>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Search Input - Positioned between image and content */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          top: searchInputTop,
          zIndex: 20,
        }}
      >
        <View className="flex-row items-center px-6 py-4 bg-white rounded-full elevation-2xl ">
          <View className="mr-4 ">
            <Text className="text-xl text-gray-400">🔍</Text>
          </View>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Explore cities, places, and tours"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-base text-gray-800 rounded-full "
          />
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + 40, // Reduced padding for better spacing
          paddingBottom: 100,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={8} // Smoother animation
        showsVerticalScrollIndicator={false}
      >
        {/* Popular Destinations Section */}
        <View className="pt-8 pb-6 bg-white">
          <View className="px-6 mb-6">
            <Text className="mb-3 text-3xl font-bold text-gray-900">
              Popular Destinations
            </Text>
            <Text className="text-base leading-relaxed text-gray-600">
              Join some of our popular tours in Dublin, Budapest, Barcelona, Berlin, Prague and London.
            </Text>
          </View>

          {/* Destination Cards */}
          <View className="space-y-4">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isLarge={index === 0 || index === 1}
              />
            ))}
          </View>
        </View>

        {/* Additional Content for Scrolling */}
        <View className="p-6 bg-gray-50">
          <Text className="mb-4 text-2xl font-bold text-gray-900">
            Why Choose RoamWe?
          </Text>
          <View className="space-y-4">
            <View className="p-4 bg-white rounded-xl">
              <Text className="mb-2 text-lg font-semibold text-gray-900">
                🎯 Expert Local Guides
              </Text>
              <Text className="text-gray-600">
                Discover hidden gems and local stories with our passionate guides.
              </Text>
            </View>
            <View className="p-4 bg-white rounded-xl">
              <Text className="mb-2 text-lg font-semibold text-gray-900">
                💰 Pay What You Want
              </Text>
              <Text className="text-gray-600">
                Enjoy quality tours and pay what you feel they're worth.
              </Text>
            </View>
            <View className="p-4 bg-white rounded-xl">
              <Text className="mb-2 text-lg font-semibold text-gray-900">
                🌍 Multiple Languages
              </Text>
              <Text className="text-gray-600">
                Tours available in various languages to suit every traveler.
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default PopularDestinationScreen;