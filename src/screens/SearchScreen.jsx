// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
// import { MagnifyingGlassIcon, MapPinIcon, CalendarDaysIcon, UserIcon } from 'react-native-heroicons/outline';
// import categories from '../data/categories';
// import buddies from '../data/buddies';

// const SearchScreen = () => {
//   const [activeTab, setActiveTab] = useState('hotel');
//   const [searchText, setSearchText] = useState('');

//   // Sample data for demonstration
//   const searchHistory = ['Bangkok', 'Singapore', 'Bali'];
//   const popularSearches = ['Singapore', 'Bangkok city tour', 'Wings of time', 'Singapore SIM'];

//   const trendingData = [
//     {
//       id: '1',
//       title: 'Universal Studios Singapore',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹4,670',
//       image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVuaXZlcnNhbCUyMHN0dWRpb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
//     },
//     {
//       id: '2',
//       title: 'Singapore Oceanarium',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹1,885',
//       image: 'https://images.unsplash.com/photo-1551909497-da19a4dfba32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXF1YXJpdW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
//     },
//     {
//       id: '3',
//       title: 'Gardens by the Bay',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹642',
//       image: 'https://images.unsplash.com/photo-1586500036706-41963c3f1793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbnMlMjBieSUyMHRoZSUyMGJheXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
//     },
//   ];

//    const hotels = [
//     {
//       id: 1,
//       name: 'The Sarojin Resort',
//       location: 'Khao Lak',
//       price: 4200,
//       rating: 4.8,
//       reviews: 1247,
//       image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Pool', 'Spa', 'Beachfront'],
//       stars: 5
//     },
//     {
//       id: 2,
//       name: 'Banyan Tree Bangkok',
//       location: 'Bangkok',
//       price: 5600,
//       rating: 4.7,
//       reviews: 2856,
//       image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Pool', 'Spa', 'Restaurant'],
//       stars: 5
//     },
//     {
//       id: 3,
//       name: 'Pai River Corner',
//       location: 'Pai',
//       price: 1200,
//       rating: 4.5,
//       reviews: 893,
//       image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['River View', 'Restaurant', 'Garden'],
//       stars: 4
//     },
//     {
//       id: 4,
//       name: 'Rayavadee Krabi',
//       location: 'Krabi',
//       price: 8900,
//       rating: 4.9,
//       reviews: 1562,
//       image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Private Beach', 'Pool', 'Luxury Spa'],
//       stars: 5
//     },
//     {
//       id: 5,
//       name: 'Chiang Mai Heritage',
//       location: 'Chiang Mai',
//       price: 1800,
//       rating: 4.3,
//       reviews: 765,
//       image: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Historic', 'Pool', 'City Center'],
//       stars: 4
//     },
//   ];

//   const renderSearchItem = ({ item }) => (
//     <TouchableOpacity className="flex-row items-center p-4 mb-3 bg-white rounded-lg shadow-sm">
//       <Image source={{ uri: item.image }} className="w-16 h-16 rounded-lg" />
//       <View className="flex-1 ml-4">
//         <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
//         <Text className="text-gray-500">{item.type} • {item.location}</Text>
//         <Text className="mt-1 font-semibold text-blue-600">{item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Header */}
//       <View className="px-4 pt-12 pb-4 bg-white shadow-sm">
//         <Text className="text-2xl font-bold text-gray-800">Find Your Travel</Text>
//         <Text className="text-2xl font-bold text-blue-600">Experience</Text>
//       </View>

//       {/* Search Bar */}
//       <View className="px-4 py-4 bg-white shadow-sm">
//         <View className="flex-row items-center px-4 py-2 bg-gray-100 rounded-lg">
//           <MagnifyingGlassIcon size={20} color="#6B7280" />
//           <TextInput
//             className="flex-1 ml-2 text-gray-700"
//             placeholder="Search for destinations, activities, or buddies"
//             value={searchText}
//             onChangeText={setSearchText}
//           />
//         </View>
//       </View>

//       {/* Tabs */}
//       <View className="flex-row px-4 bg-white border-b border-gray-200">
//         <TouchableOpacity
//           className={`py-4 px-2 mr-6 ${activeTab === 'hotel' ? 'border-b-2 border-blue-500' : ''}`}
//           onPress={() => setActiveTab('hotel')}
//         >
//           <Text className={`font-medium ${activeTab === 'hotel' ? 'text-blue-500' : 'text-gray-500'}`}>Hotels</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           className={`py-4 px-2 mr-6 ${activeTab === 'package' ? 'border-b-2 border-blue-500' : ''}`}
//           onPress={() => setActiveTab('package')}
//         >
//           <Text className={`font-medium ${activeTab === 'package' ? 'text-blue-500' : 'text-gray-500'}`}>Packages</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           className={`py-4 px-2 ${activeTab === 'buddy' ? 'border-b-2 border-blue-500' : ''}`}
//           onPress={() => setActiveTab('buddy')}
//         >
//           <Text className={`font-medium ${activeTab === 'buddy' ? 'text-blue-500' : 'text-gray-500'}`}>Travel Buddies</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView className="flex-1 px-4 pt-4">
//         {/* Search History */}
//         <View className="mb-6">
//           <Text className="mb-3 text-lg font-semibold text-gray-800">Search History</Text>
//           <View className="flex-row flex-wrap">
//             {searchHistory.map((item, index) => (
//               <TouchableOpacity key={index} className="px-4 py-2 mb-2 mr-2 bg-gray-100 rounded-full">
//                 <Text className="text-gray-700">{item}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Other Travelers Searched For */}
//         <View className="mb-6">
//           <Text className="mb-3 text-lg font-semibold text-gray-800">Other travelers searched for</Text>
//           <View className="flex-row flex-wrap">
//             {popularSearches.map((item, index) => (
//               <TouchableOpacity key={index} className="px-4 py-2 mb-2 mr-2 bg-white rounded-full shadow-sm">
//                 <Text className="text-gray-700">{item}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Top Searches */}
//         <View className="mb-6">
//           <View className="flex-row items-center justify-between mb-3">
//             <Text className="text-lg font-semibold text-gray-800">Top Searches</Text>
//             <TouchableOpacity>
//               <Text className="text-blue-500">See all</Text>
//             </TouchableOpacity>
//           </View>

//           <FlatList
//             data={trendingData}
//             renderItem={renderSearchItem}
//             keyExtractor={item => item.id}
//             scrollEnabled={false}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default SearchScreen;

// import React, { useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   FlatList,
//   Dimensions
// } from 'react-native';
// import {
//   MagnifyingGlassIcon,
//   MapPinIcon,
//   CalendarDaysIcon,
//   UserIcon,
//   StarIcon,
//   CheckBadgeIcon,
//   HeartIcon,
//   AdjustmentsHorizontalIcon
// } from 'react-native-heroicons/outline';
// import { StarIcon as StarSolid } from 'react-native-heroicons/solid';
// import categories from '../data/categories';
// import buddies from '../data/buddies';
// const { width } = Dimensions.get('window');

// const SearchScreen = () => {
//   const [activeTab, setActiveTab] = useState('hotel');
//   const [searchText, setSearchText] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedPriceRange, setSelectedPriceRange] = useState('all');
//   const [selectedRating, setSelectedRating] = useState('all');

//   // Sample data
//   const searchHistory = ['Bangkok', 'Singapore', 'Bali'];
//   const popularSearches = ['Singapore', 'Bangkok city tour', 'Wings of time', 'Singapore SIM'];

//   const trendingData = [
//     {
//       id: '1',
//       title: 'Universal Studios Singapore',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹4,670',
//       image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVuaXZlcnNhbCUyMHN0dWRpb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.8
//     },
//     {
//       id: '2',
//       title: 'Singapore Oceanarium',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹1,885',
//       image: 'https://images.unsplash.com/photo-1551909497-da19a4dfba32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXF1YXJpdW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.6
//     },
//     {
//       id: '3',
//       title: 'Gardens by the Bay',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹642',
//       image: 'https://images.unsplash.com/photo-1586500036706-41963c3f1793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbnMlMjBieSUyMHRoZSUyMGJheXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.7
//     },
//   ];

//   const hotels = [
//     {
//       id: 1,
//       name: 'The Sarojin Resort',
//       location: 'Khao Lak',
//       price: 4200,
//       rating: 4.8,
//       reviews: 1247,
//       image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Pool', 'Spa', 'Beachfront'],
//       stars: 5
//     },
//     {
//       id: 2,
//       name: 'Banyan Tree Bangkok',
//       location: 'Bangkok',
//       price: 5600,
//       rating: 4.7,
//       reviews: 2856,
//       image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Pool', 'Spa', 'Restaurant'],
//       stars: 5
//     },
//     {
//       id: 3,
//       name: 'Pai River Corner',
//       location: 'Pai',
//       price: 1200,
//       rating: 4.5,
//       reviews: 893,
//       image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['River View', 'Restaurant', 'Garden'],
//       stars: 4
//     },
//     {
//       id: 4,
//       name: 'Rayavadee Krabi',
//       location: 'Krabi',
//       price: 8900,
//       rating: 4.9,
//       reviews: 1562,
//       image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Private Beach', 'Pool', 'Luxury Spa'],
//       stars: 5
//     },
//     {
//       id: 5,
//       name: 'Chiang Mai Heritage',
//       location: 'Chiang Mai',
//       price: 1800,
//       rating: 4.3,
//       reviews: 765,
//       image: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Historic', 'Pool', 'City Center'],
//       stars: 4
//     },
//   ];

//   const packages = [
//     {
//       id: "MW-101",
//       title: "Secret Island Escape",
//       price: 450,
//       discount: "15%",
//       people: 2,
//       image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       includes: ["3N/4D Stay", "Transfers", "Meals", "Island Activities"],
//       location: "Thailand",
//       rating: 4.6,
//       reviews: 324
//     }
//   ];

// //   const buddies = [
// //     {
// //       id: 1,
// //       name: 'Nattawut S.',
// //       age: 28,
// //       rating: 4.9,
// //       price: 800,
// //       languages: ['English', 'Thai'],
// //       specialties: ['City Tours', 'Food Guide', 'Photography'],
// //       location: 'Bangkok',
// //       image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //       verified: true,
// //       description: "Hi! I'm Nattawut, a Bangkok native with a passion for showing visitors the real heart of our city.",
// //       experience: '5 years as a tour guide',
// //       reviews: 127
// //     }
// //   ];

//   // Filter function
//   const filteredData = useMemo(() => {
//     let data = [];

//     switch (activeTab) {
//       case 'hotel':
//         data = hotels;
//         break;
//       case 'package':
//         data = packages;
//         break;
//       case 'buddy':
//         data = buddies;
//         break;
//       default:
//         data = [];
//     }

//     // Apply search filter
//     if (searchText.trim()) {
//       data = data.filter(item =>
//         item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.location?.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.specialties?.some(s => s.toLowerCase().includes(searchText.toLowerCase()))
//       );
//     }

//     // Apply price filter
//     if (selectedPriceRange !== 'all') {
//       data = data.filter(item => {
//         const price = item.price;
//         switch (selectedPriceRange) {
//           case 'low': return price < 2000;
//           case 'mid': return price >= 2000 && price <= 5000;
//           case 'high': return price > 5000;
//           default: return true;
//         }
//       });
//     }

//     // Apply rating filter
//     if (selectedRating !== 'all') {
//       const minRating = parseFloat(selectedRating);
//       data = data.filter(item => item.rating >= minRating);
//     }

//     return data;
//   }, [activeTab, searchText, selectedPriceRange, selectedRating]);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <StarSolid
//           key={i}
//           size={12}
//           color={i <= Math.floor(rating) ? "#FCD34D" : "#E5E7EB"}
//         />
//       );
//     }
//     return stars;
//   };

//   const renderHotelItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="relative">
//         <Image source={{ uri: item.image }} className="w-full h-48" />
//         <TouchableOpacity className="absolute p-2 rounded-full top-3 right-3 bg-white/80">
//           <HeartIcon size={20} color="#EF4444" />
//         </TouchableOpacity>
//         <View className="absolute px-2 py-1 rounded-md bottom-3 left-3 bg-black/70">
//           <Text className="text-xs font-medium text-white">{item.stars} Star Hotel</Text>
//         </View>
//       </View>

//       <View className="p-4">
//         <View className="flex-row items-start justify-between mb-2">
//           <View className="flex-1">
//             <Text className="mb-1 text-lg font-bold text-gray-800">{item.name}</Text>
//             <View className="flex-row items-center">
//               <MapPinIcon size={14} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>
//           </View>
//           <View className="items-end">
//             <Text className="text-2xl font-bold text-blue-600">₹{item.price.toLocaleString()}</Text>
//             <Text className="text-xs text-gray-500">per night</Text>
//           </View>
//         </View>

//         <View className="flex-row items-center mb-3">
//           <View className="flex-row mr-2">
//             {renderStars(item.rating)}
//           </View>
//           <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//           <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.amenities.map((amenity, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-blue-50">
//               <Text className="text-xs text-blue-600">{amenity}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderPackageItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="relative">
//         <Image source={{ uri: item.image }} className="w-full h-48" />
//         <TouchableOpacity className="absolute p-2 rounded-full top-3 right-3 bg-white/80">
//           <HeartIcon size={20} color="#EF4444" />
//         </TouchableOpacity>
//         {item.discount && (
//           <View className="absolute px-2 py-1 bg-red-500 rounded-md top-3 left-3">
//             <Text className="text-xs font-bold text-white">{item.discount} OFF</Text>
//           </View>
//         )}
//       </View>

//       <View className="p-4">
//         <View className="flex-row items-start justify-between mb-2">
//           <View className="flex-1">
//             <Text className="mb-1 text-lg font-bold text-gray-800">{item.title}</Text>
//             <View className="flex-row items-center">
//               <MapPinIcon size={14} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>
//           </View>
//           <View className="items-end">
//             <Text className="text-2xl font-bold text-green-600">₹{item.price}</Text>
//             <Text className="text-xs text-gray-500">for {item.people} people</Text>
//           </View>
//         </View>

//         <View className="flex-row items-center mb-3">
//           <View className="flex-row mr-2">
//             {renderStars(item.rating)}
//           </View>
//           <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//           <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.includes.slice(0, 3).map((include, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-green-50">
//               <Text className="text-xs text-green-600">{include}</Text>
//             </View>
//           ))}
//           {item.includes.length > 3 && (
//             <View className="px-2 py-1 bg-gray-100 rounded-md">
//               <Text className="text-xs text-gray-600">+{item.includes.length - 3} more</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderBuddyItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="p-4">
//         <View className="flex-row items-start mb-3">
//           <View className="relative">
//             <Image source={{ uri: item.image }} className="w-16 h-16 rounded-full" />
//             {item.verified && (
//               <View className="absolute -bottom-1 -right-1">
//                 <CheckBadgeIcon size={20} color="#10B981" />
//               </View>
//             )}
//           </View>

//           <View className="flex-1 ml-4">
//             <View className="flex-row items-center justify-between mb-1">
//               <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
//               <Text className="text-xl font-bold text-blue-600">₹{item.price}</Text>
//             </View>

//             <View className="flex-row items-center mb-2">
//               <Text className="text-sm text-gray-600">{item.age} years old • </Text>
//               <MapPinIcon size={12} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>

//             <View className="flex-row items-center mb-2">
//               <View className="flex-row mr-2">
//                 {renderStars(item.rating)}
//               </View>
//               <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//               <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//             </View>
//           </View>
//         </View>

//         <Text className="mb-3 text-sm text-gray-600" numberOfLines={2}>
//           {item.description}
//         </Text>

//         <View className="flex-row flex-wrap mb-3">
//           {item.languages.map((lang, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-blue-50">
//               <Text className="text-xs text-blue-600">{lang}</Text>
//             </View>
//           ))}
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.specialties.map((specialty, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-purple-50">
//               <Text className="text-xs text-purple-600">{specialty}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderSearchSuggestions = () => (
//     <View>
//       {/* Search History */}
//       <View className="mb-6">
//         <Text className="mb-3 text-lg font-semibold text-gray-800">Recent Searches</Text>
//         <View className="flex-row flex-wrap">
//           {searchHistory.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               className="px-4 py-2 mb-2 mr-2 bg-gray-100 rounded-full"
//               onPress={() => setSearchText(item)}
//             >
//               <Text className="text-gray-700">{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Popular Searches */}
//       <View className="mb-6">
//         <Text className="mb-3 text-lg font-semibold text-gray-800">Trending Searches</Text>
//         <View className="flex-row flex-wrap">
//           {popularSearches.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               className="px-4 py-2 mb-2 mr-2 border border-blue-200 rounded-full bg-blue-50"
//               onPress={() => setSearchText(item)}
//             >
//               <Text className="font-medium text-blue-600">{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Top Searches */}
//       <View className="mb-6">
//         <View className="flex-row items-center justify-between mb-3">
//           <Text className="text-lg font-semibold text-gray-800">Top Destinations</Text>
//           <TouchableOpacity>
//             <Text className="font-medium text-blue-500">See all</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={trendingData}
//           renderItem={({ item }) => (
//             <TouchableOpacity className="flex-row items-center p-4 mb-3 bg-white shadow-sm rounded-xl">
//               <Image source={{ uri: item.image }} className="w-16 h-16 rounded-xl" />
//               <View className="flex-1 ml-4">
//                 <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
//                 <View className="flex-row items-center mt-1">
//                   <Text className="text-sm text-gray-500">{item.type} • {item.location}</Text>
//                 </View>
//                 <View className="flex-row items-center justify-between mt-2">
//                   <Text className="font-bold text-blue-600">{item.price}</Text>
//                   <View className="flex-row items-center">
//                     <StarSolid size={14} color="#FCD34D" />
//                     <Text className="ml-1 text-sm text-gray-600">{item.rating}</Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//           keyExtractor={item => item.id}
//           scrollEnabled={false}
//         />
//       </View>
//     </View>
//   );

//   const renderFilters = () => (
//     <View className="px-4 py-3 bg-white border-b border-gray-200">
//       <View className="flex-row items-center justify-between mb-3">
//         <Text className="text-lg font-semibold text-gray-800">Filters</Text>
//         <TouchableOpacity onPress={() => setShowFilters(false)}>
//           <Text className="font-medium text-blue-500">Done</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Price Range Filter */}
//       <View className="mb-4">
//         <Text className="mb-2 text-sm font-medium text-gray-700">Price Range</Text>
//         <View className="flex-row">
//           {[
//             { key: 'all', label: 'All' },
//             { key: 'low', label: 'Under ₹2K' },
//             { key: 'mid', label: '₹2K-5K' },
//             { key: 'high', label: 'Above ₹5K' }
//           ].map((option) => (
//             <TouchableOpacity
//               key={option.key}
//               className={`px-3 py-2 rounded-full mr-2 ${
//                 selectedPriceRange === option.key ? 'bg-blue-500' : 'bg-gray-100'
//               }`}
//               onPress={() => setSelectedPriceRange(option.key)}
//             >
//               <Text className={`text-xs ${
//                 selectedPriceRange === option.key ? 'text-white font-medium' : 'text-gray-600'
//               }`}>
//                 {option.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Rating Filter */}
//       <View>
//         <Text className="mb-2 text-sm font-medium text-gray-700">Minimum Rating</Text>
//         <View className="flex-row">
//           {[
//             { key: 'all', label: 'All' },
//             { key: '4.0', label: '4.0+' },
//             { key: '4.5', label: '4.5+' },
//             { key: '4.8', label: '4.8+' }
//           ].map((option) => (
//             <TouchableOpacity
//               key={option.key}
//               className={`px-3 py-2 rounded-full mr-2 ${
//                 selectedRating === option.key ? 'bg-blue-500' : 'bg-gray-100'
//               }`}
//               onPress={() => setSelectedRating(option.key)}
//             >
//               <Text className={`text-xs ${
//                 selectedRating === option.key ? 'text-white font-medium' : 'text-gray-600'
//               }`}>
//                 {option.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </View>
//   );

//   const renderResults = () => {
//     if (filteredData.length === 0) {
//       return (
//         <View className="items-center justify-center flex-1 py-12">
//           <MagnifyingGlassIcon size={48} color="#9CA3AF" />
//           <Text className="mt-4 text-lg font-medium text-gray-600">No results found</Text>
//           <Text className="px-8 mt-2 text-center text-gray-500">
//             Try adjusting your search terms or filters
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={filteredData}
//         renderItem={activeTab === 'hotel' ? renderHotelItem :
//                    activeTab === 'package' ? renderPackageItem : renderBuddyItem}
//         keyExtractor={item => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Header */}
//       <View className="px-4 pt-12 pb-4 bg-white shadow-sm">
//         <Text className="text-2xl font-bold text-gray-800">Find Your Perfect</Text>
//         <Text className="text-2xl font-bold text-blue-600">Travel Experience</Text>
//       </View>

//       {/* Search Bar */}
//       <View className="px-4 py-4 bg-white shadow-sm">
//         <View className="flex-row items-center px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl">
//           <MagnifyingGlassIcon size={20} color="#6B7280" />
//           <TextInput
//             className="flex-1 ml-3 text-base text-gray-700"
//             placeholder="Search destinations, hotels, or guides..."
//             value={searchText}
//             onChangeText={setSearchText}
//             placeholderTextColor="#9CA3AF"
//           />
//           <TouchableOpacity
//             className="p-1 ml-2"
//             onPress={() => setShowFilters(!showFilters)}
//           >
//             <AdjustmentsHorizontalIcon size={20} color="#6B7280" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Filters */}
//       {showFilters && renderFilters()}

//       {/* Tabs */}
//       <View className="flex-row px-4 bg-white border-b border-gray-200">
//         {[
//           { key: 'hotel', label: 'Hotels', icon: 'hotel' },
//           { key: 'package', label: 'Packages', icon: 'package' },
//           { key: 'buddy', label: 'Travel Guides', icon: 'buddy' }
//         ].map((tab) => (
//           <TouchableOpacity
//             key={tab.key}
//             className={`py-4 px-2 mr-6 ${activeTab === tab.key ? 'border-b-2 border-blue-500' : ''}`}
//             onPress={() => setActiveTab(tab.key)}
//           >
//             <Text className={`font-medium ${
//               activeTab === tab.key ? 'text-blue-500' : 'text-gray-500'
//             }`}>
//               {tab.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Content */}
//       <View className="flex-1">
//         {searchText.trim() || selectedPriceRange !== 'all' || selectedRating !== 'all' ? (
//           <View className="flex-1 px-4 pt-4">
//             {/* Results Header */}
//             <View className="flex-row items-center justify-between mb-4">
//               <Text className="text-base font-medium text-gray-700">
//                 {filteredData.length} results found
//               </Text>
//               {(searchText.trim() || selectedPriceRange !== 'all' || selectedRating !== 'all') && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSearchText('');
//                     setSelectedPriceRange('all');
//                     setSelectedRating('all');
//                   }}
//                 >
//                   <Text className="font-medium text-blue-500">Clear all</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//             {renderResults()}
//           </View>
//         ) : (
//           <ScrollView className="flex-1 px-4 pt-4">
//             {renderSearchSuggestions()}
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// export default SearchScreen;

// import React, { useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   FlatList,
//   Dimensions
// } from 'react-native';
// import {
//   MagnifyingGlassIcon,
//   MapPinIcon,
//   CalendarDaysIcon,
//   UserIcon,
//   StarIcon,
//   CheckBadgeIcon,
//   HeartIcon,
//   AdjustmentsHorizontalIcon
// } from 'react-native-heroicons/outline';
// import { StarIcon as StarSolid } from 'react-native-heroicons/solid';
// import categories from '../data/categories';
// import buddies from '../data/buddies';

// const { width } = Dimensions.get('window');

// const SearchScreen = () => {
//   const [activeTab, setActiveTab] = useState('hotel');
//   const [searchText, setSearchText] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedPriceRange, setSelectedPriceRange] = useState('all');
//   const [selectedRating, setSelectedRating] = useState('all');

//   // Sample data
//   const searchHistory = ['Bangkok', 'Singapore', 'Bali'];
//   const popularSearches = ['Singapore', 'Bangkok city tour', 'Wings of time', 'Singapore SIM'];

//   const trendingData = [
//     {
//       id: '1',
//       title: 'Universal Studios Singapore',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹4,670',
//       image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVuaXZlcnNhbCUyMHN0dWRpb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.8
//     },
//     {
//       id: '2',
//       title: 'Singapore Oceanarium',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹1,885',
//       image: 'https://images.unsplash.com/photo-1551909497-da19a4dfba32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXF1YXJpdW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.6
//     },
//     {
//       id: '3',
//       title: 'Gardens by the Bay',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹642',
//       image: 'https://images.unsplash.com/photo-1586500036706-41963c3f1793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbnMlMjBieSUyMHRoZSUyMGJheXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.7
//     },
//   ];

//   const hotels = [
//     {
//       id: 1,
//       name: 'The Sarojin Resort',
//       location: 'Khao Lak',
//       price: 4200,
//       rating: 4.8,
//       reviews: 1247,
//       image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Pool', 'Spa', 'Beachfront'],
//       stars: 5
//     },
//     {
//       id: 2,
//       name: 'Banyan Tree Bangkok',
//       location: 'Bangkok',
//       price: 5600,
//       rating: 4.7,
//       reviews: 2856,
//       image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Pool', 'Spa', 'Restaurant'],
//       stars: 5
//     },
//     {
//       id: 3,
//       name: 'Pai River Corner',
//       location: 'Pai',
//       price: 1200,
//       rating: 4.5,
//       reviews: 893,
//       image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['River View', 'Restaurant', 'Garden'],
//       stars: 4
//     },
//     {
//       id: 4,
//       name: 'Rayavadee Krabi',
//       location: 'Krabi',
//       price: 8900,
//       rating: 4.9,
//       reviews: 1562,
//       image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Private Beach', 'Pool', 'Luxury Spa'],
//       stars: 5
//     },
//     {
//       id: 5,
//       name: 'Chiang Mai Heritage',
//       location: 'Chiang Mai',
//       price: 1800,
//       rating: 4.3,
//       reviews: 765,
//       image: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Historic', 'Pool', 'City Center'],
//       stars: 4
//     },
//   ];

//   const packages = [
//     {
//       id: "MW-101",
//       title: "Secret Island Escape",
//       price: 450,
//       discount: "15%",
//       people: 2,
//       image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       includes: ["3N/4D Stay", "Transfers", "Meals", "Island Activities"],
//       location: "Thailand",
//       rating: 4.6,
//       reviews: 324
//     }
//   ];

//   const buddies = [
//     {
//       id: 1,
//       name: 'Nattawut S.',
//       age: 28,
//       rating: 4.9,
//       price: 800,
//       languages: ['English', 'Thai'],
//       specialties: ['City Tours', 'Food Guide', 'Photography'],
//       location: 'Bangkok',
//       image: 'https://randomuser.me/api/portraits/men/32.jpg',
//       verified: true,
//       description: "Hi! I'm Nattawut, a Bangkok native with a passion for showing visitors the real heart of our city.",
//       experience: '5 years as a tour guide',
//       reviews: 127
//     }
//   ];

//   // Search across all data types
//   const allSearchResults = useMemo(() => {
//     if (!searchText.trim() && selectedPriceRange === 'all' && selectedRating === 'all') {
//       return { hotels: [], packages: [], buddies: [] };
//     }

//     const searchLower = searchText.toLowerCase();

//     // Filter hotels
//     let filteredHotels = hotels.filter(item =>
//       item.name?.toLowerCase().includes(searchLower) ||
//       item.location?.toLowerCase().includes(searchLower) ||
//       item.amenities?.some(a => a.toLowerCase().includes(searchLower))
//     );

//     // Filter packages
//     let filteredPackages = packages.filter(item =>
//       item.title?.toLowerCase().includes(searchLower) ||
//       item.location?.toLowerCase().includes(searchLower) ||
//       item.categoryName?.toLowerCase().includes(searchLower) ||
//       item.includes?.some(inc => inc.toLowerCase().includes(searchLower)) ||
//       item.categoryDescription?.toLowerCase().includes(searchLower)
//     );

//     // Filter buddies
//     let filteredBuddies = buddies.filter(item =>
//       item.name?.toLowerCase().includes(searchLower) ||
//       item.location?.toLowerCase().includes(searchLower) ||
//       item.specialties?.some(s => s.toLowerCase().includes(searchLower)) ||
//       item.languages?.some(l => l.toLowerCase().includes(searchLower)) ||
//       item.description?.toLowerCase().includes(searchLower)
//     );

//     // Apply price filter
//     if (selectedPriceRange !== 'all') {
//       const priceFilter = (item) => {
//         const price = item.price;
//         switch (selectedPriceRange) {
//           case 'low': return price < 2000;
//           case 'mid': return price >= 2000 && price <= 5000;
//           case 'high': return price > 5000;
//           default: return true;
//         }
//       };
//       filteredHotels = filteredHotels.filter(priceFilter);
//       filteredPackages = filteredPackages.filter(priceFilter);
//       filteredBuddies = filteredBuddies.filter(priceFilter);
//     }

//     // Apply rating filter
//     if (selectedRating !== 'all') {
//       const minRating = parseFloat(selectedRating);
//       const ratingFilter = (item) => item.rating >= minRating;
//       filteredHotels = filteredHotels.filter(ratingFilter);
//       filteredPackages = filteredPackages.filter(ratingFilter);
//       filteredBuddies = filteredBuddies.filter(ratingFilter);
//     }

//     return {
//       hotels: filteredHotels,
//       packages: filteredPackages,
//       buddies: filteredBuddies
//     };
//   }, [searchText, selectedPriceRange, selectedRating, packages]);

//   // Get current tab data
//   const filteredData = useMemo(() => {
//     switch (activeTab) {
//       case 'hotel':
//         return allSearchResults.hotels;
//       case 'package':
//         return allSearchResults.packages;
//       case 'buddy':
//         return allSearchResults.buddies;
//       default:
//         return [];
//     }
//   }, [activeTab, allSearchResults]);

//   // Get total results count across all tabs
//   const totalResults = useMemo(() => {
//     return allSearchResults.hotels.length + allSearchResults.packages.length + allSearchResults.buddies.length;
//   }, [allSearchResults]);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <StarSolid
//           key={i}
//           size={12}
//           color={i <= Math.floor(rating) ? "#FCD34D" : "#E5E7EB"}
//         />
//       );
//     }
//     return stars;
//   };

//   const renderHotelItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="relative">
//         <Image source={{ uri: item.image }} className="w-full h-48" />
//         <TouchableOpacity className="absolute p-2 rounded-full top-3 right-3 bg-white/80">
//           <HeartIcon size={20} color="#EF4444" />
//         </TouchableOpacity>
//         <View className="absolute px-2 py-1 rounded-md bottom-3 left-3 bg-black/70">
//           <Text className="text-xs font-medium text-white">{item.stars} Star Hotel</Text>
//         </View>
//       </View>

//       <View className="p-4">
//         <View className="flex-row items-start justify-between mb-2">
//           <View className="flex-1">
//             <Text className="mb-1 text-lg font-bold text-gray-800">{item.name}</Text>
//             <View className="flex-row items-center">
//               <MapPinIcon size={14} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>
//           </View>
//           <View className="items-end">
//             <Text className="text-2xl font-bold text-blue-600">₹{item.price.toLocaleString()}</Text>
//             <Text className="text-xs text-gray-500">per night</Text>
//           </View>
//         </View>

//         <View className="flex-row items-center mb-3">
//           <View className="flex-row mr-2">
//             {renderStars(item.rating)}
//           </View>
//           <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//           <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.amenities.map((amenity, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-blue-50">
//               <Text className="text-xs text-blue-600">{amenity}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderPackageItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="relative">
//         <Image source={{ uri: item.image }} className="w-full h-48" />
//         <TouchableOpacity className="absolute p-2 rounded-full top-3 right-3 bg-white/80">
//           <HeartIcon size={20} color="#EF4444" />
//         </TouchableOpacity>
//         {item.discount && (
//           <View className="absolute px-2 py-1 bg-red-500 rounded-md top-3 left-3">
//             <Text className="text-xs font-bold text-white">{item.discount} OFF</Text>
//           </View>
//         )}
//       </View>

//       <View className="p-4">
//         <View className="flex-row items-start justify-between mb-2">
//           <View className="flex-1">
//             <Text className="mb-1 text-lg font-bold text-gray-800">{item.title}</Text>
//             <View className="flex-row items-center">
//               <MapPinIcon size={14} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>
//           </View>
//           <View className="items-end">
//             <Text className="text-2xl font-bold text-green-600">₹{item.price}</Text>
//             <Text className="text-xs text-gray-500">for {item.people} people</Text>
//           </View>
//         </View>

//         <View className="flex-row items-center mb-3">
//           <View className="flex-row mr-2">
//             {renderStars(item.rating)}
//           </View>
//           <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//           <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.includes.slice(0, 3).map((include, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-green-50">
//               <Text className="text-xs text-green-600">{include}</Text>
//             </View>
//           ))}
//           {item.includes.length > 3 && (
//             <View className="px-2 py-1 bg-gray-100 rounded-md">
//               <Text className="text-xs text-gray-600">+{item.includes.length - 3} more</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderBuddyItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="p-4">
//         <View className="flex-row items-start mb-3">
//           <View className="relative">
//             <Image source={{ uri: item.image }} className="w-16 h-16 rounded-full" />
//             {item.verified && (
//               <View className="absolute -bottom-1 -right-1">
//                 <CheckBadgeIcon size={20} color="#10B981" />
//               </View>
//             )}
//           </View>

//           <View className="flex-1 ml-4">
//             <View className="flex-row items-center justify-between mb-1">
//               <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
//               <Text className="text-xl font-bold text-blue-600">₹{item.price}</Text>
//             </View>

//             <View className="flex-row items-center mb-2">
//               <Text className="text-sm text-gray-600">{item.age} years old • </Text>
//               <MapPinIcon size={12} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>

//             <View className="flex-row items-center mb-2">
//               <View className="flex-row mr-2">
//                 {renderStars(item.rating)}
//               </View>
//               <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//               <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//             </View>
//           </View>
//         </View>

//         <Text className="mb-3 text-sm text-gray-600" numberOfLines={2}>
//           {item.description}
//         </Text>

//         <View className="flex-row flex-wrap mb-3">
//           {item.languages.map((lang, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-blue-50">
//               <Text className="text-xs text-blue-600">{lang}</Text>
//             </View>
//           ))}
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.specialties.map((specialty, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-purple-50">
//               <Text className="text-xs text-purple-600">{specialty}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderSearchSuggestions = () => (
//     <View>
//       {/* Search History */}
//       <View className="mb-6">
//         <Text className="mb-3 text-lg font-semibold text-gray-800">Recent Searches</Text>
//         <View className="flex-row flex-wrap">
//           {searchHistory.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               className="px-4 py-2 mb-2 mr-2 bg-gray-100 rounded-full"
//               onPress={() => setSearchText(item)}
//             >
//               <Text className="text-gray-700">{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Popular Searches */}
//       <View className="mb-6">
//         <Text className="mb-3 text-lg font-semibold text-gray-800">Trending Searches</Text>
//         <View className="flex-row flex-wrap">
//           {popularSearches.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               className="px-4 py-2 mb-2 mr-2 border border-blue-200 rounded-full bg-blue-50"
//               onPress={() => setSearchText(item)}
//             >
//               <Text className="font-medium text-blue-600">{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Top Searches */}
//       <View className="mb-6">
//         <View className="flex-row items-center justify-between mb-3">
//           <Text className="text-lg font-semibold text-gray-800">Top Destinations</Text>
//           <TouchableOpacity>
//             <Text className="font-medium text-blue-500">See all</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={trendingData}
//           renderItem={({ item }) => (
//             <TouchableOpacity className="flex-row items-center p-4 mb-3 bg-white shadow-sm rounded-xl">
//               <Image source={{ uri: item.image }} className="w-16 h-16 rounded-xl" />
//               <View className="flex-1 ml-4">
//                 <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
//                 <View className="flex-row items-center mt-1">
//                   <Text className="text-sm text-gray-500">{item.type} • {item.location}</Text>
//                 </View>
//                 <View className="flex-row items-center justify-between mt-2">
//                   <Text className="font-bold text-blue-600">{item.price}</Text>
//                   <View className="flex-row items-center">
//                     <StarSolid size={14} color="#FCD34D" />
//                     <Text className="ml-1 text-sm text-gray-600">{item.rating}</Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//           keyExtractor={item => item.id}
//           scrollEnabled={false}
//         />
//       </View>
//     </View>
//   );

//   const renderFilters = () => (
//     <View className="px-4 py-3 bg-white border-b border-gray-200">
//       <View className="flex-row items-center justify-between mb-3">
//         <Text className="text-lg font-semibold text-gray-800">Filters</Text>
//         <TouchableOpacity onPress={() => setShowFilters(false)}>
//           <Text className="font-medium text-blue-500">Done</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Price Range Filter */}
//       <View className="mb-4">
//         <Text className="mb-2 text-sm font-medium text-gray-700">Price Range</Text>
//         <View className="flex-row">
//           {[
//             { key: 'all', label: 'All' },
//             { key: 'low', label: 'Under ₹2K' },
//             { key: 'mid', label: '₹2K-5K' },
//             { key: 'high', label: 'Above ₹5K' }
//           ].map((option) => (
//             <TouchableOpacity
//               key={option.key}
//               className={`px-3 py-2 rounded-full mr-2 ${
//                 selectedPriceRange === option.key ? 'bg-blue-500' : 'bg-gray-100'
//               }`}
//               onPress={() => setSelectedPriceRange(option.key)}
//             >
//               <Text className={`text-xs ${
//                 selectedPriceRange === option.key ? 'text-white font-medium' : 'text-gray-600'
//               }`}>
//                 {option.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Rating Filter */}
//       <View>
//         <Text className="mb-2 text-sm font-medium text-gray-700">Minimum Rating</Text>
//         <View className="flex-row">
//           {[
//             { key: 'all', label: 'All' },
//             { key: '4.0', label: '4.0+' },
//             { key: '4.5', label: '4.5+' },
//             { key: '4.8', label: '4.8+' }
//           ].map((option) => (
//             <TouchableOpacity
//               key={option.key}
//               className={`px-3 py-2 rounded-full mr-2 ${
//                 selectedRating === option.key ? 'bg-blue-500' : 'bg-gray-100'
//               }`}
//               onPress={() => setSelectedRating(option.key)}
//             >
//               <Text className={`text-xs ${
//                 selectedRating === option.key ? 'text-white font-medium' : 'text-gray-600'
//               }`}>
//                 {option.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </View>
//   );

//   const renderResults = () => {
//     if (filteredData.length === 0) {
//       return (
//         <View className="items-center justify-center flex-1 py-12">
//           <MagnifyingGlassIcon size={48} color="#9CA3AF" />
//           <Text className="mt-4 text-lg font-medium text-gray-600">No results found</Text>
//           <Text className="px-8 mt-2 text-center text-gray-500">
//             Try adjusting your search terms or filters
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={filteredData}
//         renderItem={activeTab === 'hotel' ? renderHotelItem :
//                    activeTab === 'package' ? renderPackageItem : renderBuddyItem}
//         keyExtractor={item => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Header */}
//       <View className="px-4 pt-12 pb-4 bg-white shadow-sm">
//         <Text className="text-2xl font-bold text-gray-800">Find Your Perfect</Text>
//         <Text className="text-2xl font-bold text-blue-600">Travel Experience</Text>
//       </View>

//       {/* Search Bar */}
//       <View className="px-4 py-4 bg-white shadow-sm">
//         <View className="flex-row items-center px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl">
//           <MagnifyingGlassIcon size={20} color="#6B7280" />
//           <TextInput
//             className="flex-1 ml-3 text-base text-gray-700"
//             placeholder="Search destinations, hotels, or guides..."
//             value={searchText}
//             onChangeText={setSearchText}
//             placeholderTextColor="#9CA3AF"
//           />
//           <TouchableOpacity
//             className="p-1 ml-2"
//             onPress={() => setShowFilters(!showFilters)}
//           >
//             <AdjustmentsHorizontalIcon size={20} color="#6B7280" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Filters */}
//       {showFilters && renderFilters()}

//       {/* Tabs with result counts */}
//       <View className="flex-row px-4 bg-white border-b border-gray-200">
//         {[
//           { key: 'hotel', label: 'Hotels', count: allSearchResults.hotels.length },
//           { key: 'package', label: 'Packages', count: allSearchResults.packages.length },
//           { key: 'buddy', label: 'Travel Guides', count: allSearchResults.buddies.length }
//         ].map((tab) => (
//           <TouchableOpacity
//             key={tab.key}
//             className={`py-4 px-2 mr-6 ${activeTab === tab.key ? 'border-b-2 border-blue-500' : ''}`}
//             onPress={() => setActiveTab(tab.key)}
//           >
//             <View className="flex-row items-center">
//               <Text className={`font-medium ${
//                 activeTab === tab.key ? 'text-blue-500' : 'text-gray-500'
//               }`}>
//                 {tab.label}
//               </Text>
//               {(searchText.trim() || selectedPriceRange !== 'all' || selectedRating !== 'all') && tab.count > 0 && (
//                 <View className="ml-2 px-2 py-0.5 bg-blue-500 rounded-full">
//                   <Text className="text-xs font-medium text-white">{tab.count}</Text>
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Content */}
//       <View className="flex-1">
//         {searchText.trim() || selectedPriceRange !== 'all' || selectedRating !== 'all' ? (
//           <View className="flex-1 px-4 pt-4">
//             {/* Results Header */}
//             <View className="flex-row items-center justify-between mb-4">
//               <Text className="text-base font-medium text-gray-700">
//                 {filteredData.length} results found
//               </Text>
//               {(searchText.trim() || selectedPriceRange !== 'all' || selectedRating !== 'all') && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSearchText('');
//                     setSelectedPriceRange('all');
//                     setSelectedRating('all');
//                   }}
//                 >
//                   <Text className="font-medium text-blue-500">Clear all</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//             {renderResults()}
//           </View>
//         ) : (
//           <ScrollView className="flex-1 px-4 pt-4">
//             {renderSearchSuggestions()}
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// export default SearchScreen;

// import React, { useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   FlatList,
//   Dimensions
// } from 'react-native';
// import {
//   MagnifyingGlassIcon,
//   MapPinIcon,
//   CalendarDaysIcon,
//   UserIcon,
//   StarIcon,
//   CheckBadgeIcon,
//   HeartIcon,
//   AdjustmentsHorizontalIcon
// } from 'react-native-heroicons/outline';
// import { StarIcon as StarSolid } from 'react-native-heroicons/solid';
// import categories from '../data/categories';
// import buddies from '../data/buddies';

// const { width } = Dimensions.get('window');

// const SearchScreen = () => {
//   const [activeTab, setActiveTab] = useState('hotel');
//   const [searchText, setSearchText] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedPriceRange, setSelectedPriceRange] = useState('all');
//   const [selectedRating, setSelectedRating] = useState('all');

//   // Sample data
//   const searchHistory = ['Bangkok', 'Singapore', 'Bali'];
//   const popularSearches = ['Singapore', 'Bangkok city tour', 'Wings of time', 'Singapore SIM'];

//   const trendingData = [
//     {
//       id: '1',
//       title: 'Universal Studios Singapore',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹4,670',
//       image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVuaXZlcnNhbCUyMHN0dWRpb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.8
//     },
//     {
//       id: '2',
//       title: 'Singapore Oceanarium',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹1,885',
//       image: 'https://images.unsplash.com/photo-1551909497-da19a4dfba32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXF1YXJpdW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.6
//     },
//     {
//       id: '3',
//       title: 'Gardens by the Bay',
//       type: 'Ticket',
//       location: 'Singapore',
//       price: 'From ₹642',
//       image: 'https://images.unsplash.com/photo-1586500036706-41963c3f1793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbnMlMjBieSUyMHRoZSUyMGJheXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
//       rating: 4.7
//     },
//   ];

//   const hotels = [
//     {
//       id: 1,
//       name: 'The Sarojin Resort',
//       location: 'Khao Lak',
//       price: 4200,
//       rating: 4.8,
//       reviews: 1247,
//       image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Pool', 'Spa', 'Beachfront'],
//       stars: 5
//     },
//     {
//       id: 2,
//       name: 'Banyan Tree Bangkok',
//       location: 'Bangkok',
//       price: 5600,
//       rating: 4.7,
//       reviews: 2856,
//       image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Pool', 'Spa', 'Restaurant'],
//       stars: 5
//     },
//     {
//       id: 3,
//       name: 'Pai River Corner',
//       location: 'Pai',
//       price: 1200,
//       rating: 4.5,
//       reviews: 893,
//       image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['River View', 'Restaurant', 'Garden'],
//       stars: 4
//     },
//     {
//       id: 4,
//       name: 'Rayavadee Krabi',
//       location: 'Krabi',
//       price: 8900,
//       rating: 4.9,
//       reviews: 1562,
//       image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Private Beach', 'Pool', 'Luxury Spa'],
//       stars: 5
//     },
//     {
//       id: 5,
//       name: 'Chiang Mai Heritage',
//       location: 'Chiang Mai',
//       price: 1800,
//       rating: 4.3,
//       reviews: 765,
//       image: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       amenities: ['Historic', 'Pool', 'City Center'],
//       stars: 4
//     },
//   ];

//   // Use imported categories data for packages
//   const packages = useMemo(() => {
//     // Extract packages from categories data
//     return categories.flatMap(category =>
//       category.packages.map(pkg => ({
//         ...pkg,
//         categoryName: category.name,
//         categoryDescription: category.description
//       }))
//     );
//   }, [categories]);

//   // Use imported buddies data
//   const travelBuddies = buddies;

//   // Search across all data types
//   const allSearchResults = useMemo(() => {
//     if (!searchText.trim() && selectedPriceRange === 'all' && selectedRating === 'all') {
//       return { hotels: [], packages: [], buddies: [] };
//     }

//     const searchLower = searchText.toLowerCase();

//     // Filter hotels
//     let filteredHotels = hotels.filter(item =>
//       item.name?.toLowerCase().includes(searchLower) ||
//       item.location?.toLowerCase().includes(searchLower) ||
//       item.amenities?.some(a => a.toLowerCase().includes(searchLower))
//     );

//     // Filter packages
//     let filteredPackages = packages.filter(item =>
//       item.title?.toLowerCase().includes(searchLower) ||
//       item.location?.toLowerCase().includes(searchLower) ||
//       item.categoryName?.toLowerCase().includes(searchLower) ||
//       item.includes?.some(inc => inc.toLowerCase().includes(searchLower)) ||
//       item.categoryDescription?.toLowerCase().includes(searchLower)
//     );

//     // Filter buddies
//     let filteredBuddies = travelBuddies.filter(item =>
//       item.name?.toLowerCase().includes(searchLower) ||
//       item.location?.toLowerCase().includes(searchLower) ||
//       item.specialties?.some(s => s.toLowerCase().includes(searchLower)) ||
//       item.languages?.some(l => l.toLowerCase().includes(searchLower)) ||
//       item.description?.toLowerCase().includes(searchLower)
//     );

//     // Apply price filter
//     if (selectedPriceRange !== 'all') {
//       const priceFilter = (item) => {
//         const price = item.price;
//         switch (selectedPriceRange) {
//           case 'low': return price < 2000;
//           case 'mid': return price >= 2000 && price <= 5000;
//           case 'high': return price > 5000;
//           default: return true;
//         }
//       };
//       filteredHotels = filteredHotels.filter(priceFilter);
//       filteredPackages = filteredPackages.filter(priceFilter);
//       filteredBuddies = filteredBuddies.filter(priceFilter);
//     }

//     // Apply rating filter
//     if (selectedRating !== 'all') {
//       const minRating = parseFloat(selectedRating);
//       const ratingFilter = (item) => item.rating >= minRating;
//       filteredHotels = filteredHotels.filter(ratingFilter);
//       filteredPackages = filteredPackages.filter(ratingFilter);
//       filteredBuddies = filteredBuddies.filter(ratingFilter);
//     }

//     return {
//       hotels: filteredHotels,
//       packages: filteredPackages,
//       buddies: filteredBuddies
//     };
//   }, [searchText, selectedPriceRange, selectedRating, packages, travelBuddies]);

//   // Get current tab data
//   const filteredData = useMemo(() => {
//     switch (activeTab) {
//       case 'hotel':
//         return allSearchResults.hotels;
//       case 'package':
//         return allSearchResults.packages;
//       case 'buddy':
//         return allSearchResults.buddies;
//       default:
//         return [];
//     }
//   }, [activeTab, allSearchResults]);

//   // Get total results count across all tabs
//   const totalResults = useMemo(() => {
//     return allSearchResults.hotels.length + allSearchResults.packages.length + allSearchResults.buddies.length;
//   }, [allSearchResults]);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <StarSolid
//           key={i}
//           size={12}
//           color={i <= Math.floor(rating) ? "#FCD34D" : "#E5E7EB"}
//         />
//       );
//     }
//     return stars;
//   };

//   const renderHotelItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="relative">
//         <Image source={{ uri: item.image }} className="w-full h-48" />
//         <TouchableOpacity className="absolute p-2 rounded-full top-3 right-3 bg-white/80">
//           <HeartIcon size={20} color="#EF4444" />
//         </TouchableOpacity>
//         <View className="absolute px-2 py-1 rounded-md bottom-3 left-3 bg-black/70">
//           <Text className="text-xs font-medium text-white">{item.stars} Star Hotel</Text>
//         </View>
//       </View>

//       <View className="p-4">
//         <View className="flex-row items-start justify-between mb-2">
//           <View className="flex-1">
//             <Text className="mb-1 text-lg font-bold text-gray-800">{item.name}</Text>
//             <View className="flex-row items-center">
//               <MapPinIcon size={14} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>
//           </View>
//           <View className="items-end">
//             <Text className="text-2xl font-bold text-blue-600">₹{item.price.toLocaleString()}</Text>
//             <Text className="text-xs text-gray-500">per night</Text>
//           </View>
//         </View>

//         <View className="flex-row items-center mb-3">
//           <View className="flex-row mr-2">
//             {renderStars(item.rating)}
//           </View>
//           <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//           <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.amenities.map((amenity, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-blue-50">
//               <Text className="text-xs text-blue-600">{amenity}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderPackageItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="relative">
//         <Image source={{ uri: item.image }} className="w-full h-48" />
//         <TouchableOpacity className="absolute p-2 rounded-full top-3 right-3 bg-white/80">
//           <HeartIcon size={20} color="#EF4444" />
//         </TouchableOpacity>
//         {item.discount && (
//           <View className="absolute px-2 py-1 bg-red-500 rounded-md top-3 left-3">
//             <Text className="text-xs font-bold text-white">{item.discount} OFF</Text>
//           </View>
//         )}
//       </View>

//       <View className="p-4">
//         <View className="flex-row items-start justify-between mb-2">
//           <View className="flex-1">
//             <Text className="mb-1 text-lg font-bold text-gray-800">{item.title}</Text>
//             <View className="flex-row items-center">
//               <MapPinIcon size={14} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>
//           </View>
//           <View className="items-end">
//             <Text className="text-2xl font-bold text-green-600">₹{item.price}</Text>
//             <Text className="text-xs text-gray-500">for {item.people} people</Text>
//           </View>
//         </View>

//         <View className="flex-row items-center mb-3">
//           <View className="flex-row mr-2">
//             {renderStars(item.rating)}
//           </View>
//           <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//           <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.includes.slice(0, 3).map((include, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-green-50">
//               <Text className="text-xs text-green-600">{include}</Text>
//             </View>
//           ))}
//           {item.includes.length > 3 && (
//             <View className="px-2 py-1 bg-gray-100 rounded-md">
//               <Text className="text-xs text-gray-600">+{item.includes.length - 3} more</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderBuddyItem = ({ item }) => (
//     <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
//       <View className="p-4">
//         <View className="flex-row items-start mb-3">
//           <View className="relative">
//             <Image source={{ uri: item.image }} className="w-16 h-16 rounded-full" />
//             {item.verified && (
//               <View className="absolute -bottom-1 -right-1">
//                 <CheckBadgeIcon size={20} color="#10B981" />
//               </View>
//             )}
//           </View>

//           <View className="flex-1 ml-4">
//             <View className="flex-row items-center justify-between mb-1">
//               <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
//               <Text className="text-xl font-bold text-blue-600">₹{item.price}</Text>
//             </View>

//             <View className="flex-row items-center mb-2">
//               <Text className="text-sm text-gray-600">{item.age} years old • </Text>
//               <MapPinIcon size={12} color="#6B7280" />
//               <Text className="ml-1 text-sm text-gray-600">{item.location}</Text>
//             </View>

//             <View className="flex-row items-center mb-2">
//               <View className="flex-row mr-2">
//                 {renderStars(item.rating)}
//               </View>
//               <Text className="text-sm font-medium text-gray-700">{item.rating}</Text>
//               <Text className="ml-1 text-sm text-gray-500">({item.reviews} reviews)</Text>
//             </View>
//           </View>
//         </View>

//         <Text className="mb-3 text-sm text-gray-600" numberOfLines={2}>
//           {item.description}
//         </Text>

//         <View className="flex-row flex-wrap mb-3">
//           {item.languages.map((lang, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-blue-50">
//               <Text className="text-xs text-blue-600">{lang}</Text>
//             </View>
//           ))}
//         </View>

//         <View className="flex-row flex-wrap">
//           {item.specialties.map((specialty, index) => (
//             <View key={index} className="px-2 py-1 mb-1 mr-2 rounded-md bg-purple-50">
//               <Text className="text-xs text-purple-600">{specialty}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderSearchSuggestions = () => (
//     <View>
//       {/* Search History */}
//       <View className="mb-6">
//         <Text className="mb-3 text-lg font-semibold text-gray-800">Recent Searches</Text>
//         <View className="flex-row flex-wrap">
//           {searchHistory.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               className="px-4 py-2 mb-2 mr-2 bg-gray-100 rounded-full"
//               onPress={() => setSearchText(item)}
//             >
//               <Text className="text-gray-700">{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Popular Searches */}
//       <View className="mb-6">
//         <Text className="mb-3 text-lg font-semibold text-gray-800">Trending Searches</Text>
//         <View className="flex-row flex-wrap">
//           {popularSearches.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               className="px-4 py-2 mb-2 mr-2 border border-blue-200 rounded-full bg-blue-50"
//               onPress={() => setSearchText(item)}
//             >
//               <Text className="font-medium text-blue-600">{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Top Searches */}
//       <View className="mb-6">
//         <View className="flex-row items-center justify-between mb-3">
//           <Text className="text-lg font-semibold text-gray-800">Top Destinations</Text>
//           <TouchableOpacity>
//             <Text className="font-medium text-blue-500">See all</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={trendingData}
//           renderItem={({ item }) => (
//             <TouchableOpacity className="flex-row items-center p-4 mb-3 bg-white shadow-sm rounded-xl">
//               <Image source={{ uri: item.image }} className="w-16 h-16 rounded-xl" />
//               <View className="flex-1 ml-4">
//                 <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
//                 <View className="flex-row items-center mt-1">
//                   <Text className="text-sm text-gray-500">{item.type} • {item.location}</Text>
//                 </View>
//                 <View className="flex-row items-center justify-between mt-2">
//                   <Text className="font-bold text-blue-600">{item.price}</Text>
//                   <View className="flex-row items-center">
//                     <StarSolid size={14} color="#FCD34D" />
//                     <Text className="ml-1 text-sm text-gray-600">{item.rating}</Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//           keyExtractor={item => item.id}
//           scrollEnabled={false}
//         />
//       </View>
//     </View>
//   );

//   const renderFilters = () => (
//     <View className="px-4 py-3 bg-white border-b border-gray-200">
//       <View className="flex-row items-center justify-between mb-3">
//         <Text className="text-lg font-semibold text-gray-800">Filters</Text>
//         <TouchableOpacity onPress={() => setShowFilters(false)}>
//           <Text className="font-medium text-blue-500">Done</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Price Range Filter */}
//       <View className="mb-4">
//         <Text className="mb-2 text-sm font-medium text-gray-700">Price Range</Text>
//         <View className="flex-row">
//           {[
//             { key: 'all', label: 'All' },
//             { key: 'low', label: 'Under ₹2K' },
//             { key: 'mid', label: '₹2K-5K' },
//             { key: 'high', label: 'Above ₹5K' }
//           ].map((option) => (
//             <TouchableOpacity
//               key={option.key}
//               className={`px-3 py-2 rounded-full mr-2 ${
//                 selectedPriceRange === option.key ? 'bg-blue-500' : 'bg-gray-100'
//               }`}
//               onPress={() => setSelectedPriceRange(option.key)}
//             >
//               <Text className={`text-xs ${
//                 selectedPriceRange === option.key ? 'text-white font-medium' : 'text-gray-600'
//               }`}>
//                 {option.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Rating Filter */}
//       <View>
//         <Text className="mb-2 text-sm font-medium text-gray-700">Minimum Rating</Text>
//         <View className="flex-row">
//           {[
//             { key: 'all', label: 'All' },
//             { key: '4.0', label: '4.0+' },
//             { key: '4.5', label: '4.5+' },
//             { key: '4.8', label: '4.8+' }
//           ].map((option) => (
//             <TouchableOpacity
//               key={option.key}
//               className={`px-3 py-2 rounded-full mr-2 ${
//                 selectedRating === option.key ? 'bg-blue-500' : 'bg-gray-100'
//               }`}
//               onPress={() => setSelectedRating(option.key)}
//             >
//               <Text className={`text-xs ${
//                 selectedRating === option.key ? 'text-white font-medium' : 'text-gray-600'
//               }`}>
//                 {option.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </View>
//   );

//   const renderResults = () => {
//     if (filteredData.length === 0) {
//       return (
//         <View className="items-center justify-center flex-1 py-12">
//           <MagnifyingGlassIcon size={48} color="#9CA3AF" />
//           <Text className="mt-4 text-lg font-medium text-gray-600">No results found</Text>
//           <Text className="px-8 mt-2 text-center text-gray-500">
//             Try adjusting your search terms or filters
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={filteredData}
//         renderItem={activeTab === 'hotel' ? renderHotelItem :
//                    activeTab === 'package' ? renderPackageItem : renderBuddyItem}
//         keyExtractor={item => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Header */}
//       <View className="px-4 pt-12 pb-4 bg-white shadow-sm">
//         <Text className="text-2xl font-bold text-gray-800">Find Your Perfect</Text>
//         <Text className="text-2xl font-bold text-blue-600">Travel Experience</Text>
//       </View>

//       {/* Search Bar */}
//       <View className="px-4 py-4 bg-white shadow-sm">
//         <View className="flex-row items-center px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl">
//           <MagnifyingGlassIcon size={20} color="#6B7280" />
//           <TextInput
//             className="flex-1 ml-3 text-base text-gray-700"
//             placeholder="Search destinations, hotels, or guides..."
//             value={searchText}
//             onChangeText={setSearchText}
//             placeholderTextColor="#9CA3AF"
//           />
//           <TouchableOpacity
//             className="p-1 ml-2"
//             onPress={() => setShowFilters(!showFilters)}
//           >
//             <AdjustmentsHorizontalIcon size={20} color="#6B7280" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Filters */}
//       {showFilters && renderFilters()}

//       {/* Tabs with result counts */}
//       <View className="flex-row px-4 bg-white border-b border-gray-200">
//         {[
//           { key: 'hotel', label: 'Hotels', count: allSearchResults.hotels.length },
//           { key: 'package', label: 'Packages', count: allSearchResults.packages.length },
//           { key: 'buddy', label: 'Travel Guides', count: allSearchResults.buddies.length }
//         ].map((tab) => (
//           <TouchableOpacity
//             key={tab.key}
//             className={`py-4 px-2 mr-6 ${activeTab === tab.key ? 'border-b-2 border-blue-500' : ''}`}
//             onPress={() => setActiveTab(tab.key)}
//           >
//             <View className="flex-row items-center">
//               <Text className={`font-medium ${
//                 activeTab === tab.key ? 'text-blue-500' : 'text-gray-500'
//               }`}>
//                 {tab.label}
//               </Text>
//               {(searchText.trim() || selectedPriceRange !== 'all' || selectedRating !== 'all') && tab.count > 0 && (
//                 <View className="ml-2 px-2 py-0.5 bg-blue-500 rounded-full">
//                   <Text className="text-xs font-medium text-white">{tab.count}</Text>
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Content */}
//       <View className="flex-1">
//         {searchText.trim() || selectedPriceRange !== 'all' || selectedRating !== 'all' ? (
//           <View className="flex-1 px-4 pt-4">
//             {/* Results Header */}
//             <View className="flex-row items-center justify-between mb-4">
//               <Text className="text-base font-medium text-gray-700">
//                 {filteredData.length} results found
//               </Text>
//               {(searchText.trim() || selectedPriceRange !== 'all' || selectedRating !== 'all') && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSearchText('');
//                     setSelectedPriceRange('all');
//                     setSelectedRating('all');
//                   }}
//                 >
//                   <Text className="font-medium text-blue-500">Clear all</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//             {renderResults()}
//           </View>
//         ) : (
//           <ScrollView className="flex-1 px-4 pt-4">
//             {renderSearchSuggestions()}
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// export default SearchScreen;

import React, { useState, useMemo, use } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserIcon,
  StarIcon,
  CheckBadgeIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon,
} from 'react-native-heroicons/outline';
import { StarIcon as StarSolid } from 'react-native-heroicons/solid';
import categories from '../data/categories';
import buddies from '../data/buddies';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const [activeTab, setActiveTab] = useState('hotel');
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const navigation = useNavigation();
  // Sample data
  const searchHistory = ['Bangkok', 'Singapore', 'Bali'];
  const popularSearches = [
    'Singapore',
    'Bangkok city tour',
    'Wings of time',
    'Singapore SIM',
  ];

  const trendingData = [
    {
      id: '1',
      title: 'Universal Studios Singapore',
      type: 'Ticket',
      location: 'Singapore',
      price: 'From ₹4,670',
      image:
        'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVuaXZlcnNhbCUyMHN0dWRpb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Singapore Oceanarium',
      type: 'Ticket',
      location: 'Singapore',
      price: 'From ₹1,885',
      image:
        'https://images.unsplash.com/photo-1551909497-da19a4dfba32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXF1YXJpdW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      rating: 4.6,
    },
    {
      id: '3',
      title: 'Gardens by the Bay',
      type: 'Ticket',
      location: 'Singapore',
      price: 'From ₹642',
      image:
        'https://images.unsplash.com/photo-1586500036706-41963c3f1793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbnMlMjBieSUyMHRoZSUyMGJheXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      rating: 4.7,
    },
  ];

  const hotels = [
    {
      id: 1,
      name: 'The Sarojin Resort',
      location: 'Khao Lak',
      price: 4200,
      rating: 4.8,
      reviews: 1247,
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Pool', 'Spa', 'Beachfront'],
      stars: 5,
    },
    {
      id: 2,
      name: 'Banyan Tree Bangkok',
      location: 'Bangkok',
      price: 5600,
      rating: 4.7,
      reviews: 2856,
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Pool', 'Spa', 'Restaurant'],
      stars: 5,
    },
    {
      id: 3,
      name: 'Pai River Corner',
      location: 'Pai',
      price: 1200,
      rating: 4.5,
      reviews: 893,
      image:
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['River View', 'Restaurant', 'Garden'],
      stars: 4,
    },
    {
      id: 4,
      name: 'Rayavadee Krabi',
      location: 'Krabi',
      price: 8900,
      rating: 4.9,
      reviews: 1562,
      image:
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Private Beach', 'Pool', 'Luxury Spa'],
      stars: 5,
    },
    {
      id: 5,
      name: 'Chiang Mai Heritage',
      location: 'Chiang Mai',
      price: 1800,
      rating: 4.3,
      reviews: 765,
      image:
        'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Historic', 'Pool', 'City Center'],
      stars: 4,
    },
  ];

  // Use imported categories data for packages
  const packages = useMemo(() => {
    // Extract packages from categories data and flatten them
    return categories.flatMap(category =>
      category.packages.map(pkg => ({
        ...pkg,
        categoryName: category.name,
        categoryDescription: category.description,
        categoryMood: category.mood,
        location: 'Thailand', // Default location for packages
      })),
    );
  }, [categories]);

  // Use imported buddies data
  const travelBuddies = buddies;

  // Search across all data types
  const allSearchResults = useMemo(() => {
    if (
      !searchText.trim() &&
      selectedPriceRange === 'all' &&
      selectedRating === 'all'
    ) {
      return { hotels: [], packages: [], buddies: [] };
    }

    const searchLower = searchText.toLowerCase();

    // Filter hotels
    let filteredHotels = hotels.filter(
      item =>
        item.name?.toLowerCase().includes(searchLower) ||
        item.location?.toLowerCase().includes(searchLower) ||
        item.amenities?.some(a => a.toLowerCase().includes(searchLower)),
    );

    // Filter packages - search across all relevant fields
    let filteredPackages = packages.filter(
      item =>
        item.title?.toLowerCase().includes(searchLower) ||
        item.categoryName?.toLowerCase().includes(searchLower) ||
        item.categoryDescription?.toLowerCase().includes(searchLower) ||
        item.categoryMood?.toLowerCase().includes(searchLower) ||
        item.includes?.some(inc => inc.toLowerCase().includes(searchLower)) ||
        item.excludes?.some(exc => exc.toLowerCase().includes(searchLower)) ||
        item.touristPlaces?.some(place =>
          place.toLowerCase().includes(searchLower),
        ) ||
        item.packingTips?.some(tip =>
          tip.toLowerCase().includes(searchLower),
        ) ||
        item.culturalNotes?.some(note =>
          note.toLowerCase().includes(searchLower),
        ) ||
        item.itinerary?.some(
          day =>
            day.theme?.toLowerCase().includes(searchLower) ||
            day.morning?.toLowerCase().includes(searchLower) ||
            day.afternoon?.toLowerCase().includes(searchLower) ||
            day.evening?.toLowerCase().includes(searchLower) ||
            day.dining?.toLowerCase().includes(searchLower),
        ),
    );

    // Filter buddies
    let filteredBuddies = travelBuddies.filter(
      item =>
        item.name?.toLowerCase().includes(searchLower) ||
        item.location?.toLowerCase().includes(searchLower) ||
        item.specialties?.some(s => s.toLowerCase().includes(searchLower)) ||
        item.languages?.some(l => l.toLowerCase().includes(searchLower)) ||
        item.description?.toLowerCase().includes(searchLower),
    );

    // Apply price filter
    if (selectedPriceRange !== 'all') {
      const priceFilter = item => {
        const price = item.price;
        switch (selectedPriceRange) {
          case 'low':
            return price < 2000;
          case 'mid':
            return price >= 2000 && price <= 5000;
          case 'high':
            return price > 5000;
          default:
            return true;
        }
      };
      filteredHotels = filteredHotels.filter(priceFilter);
      filteredPackages = filteredPackages.filter(priceFilter);
      filteredBuddies = filteredBuddies.filter(priceFilter);
    }

    // Apply rating filter
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      const ratingFilter = item => item.rating >= minRating;
      filteredHotels = filteredHotels.filter(ratingFilter);
      filteredPackages = filteredPackages.filter(ratingFilter);
      filteredBuddies = filteredBuddies.filter(ratingFilter);
    }

    return {
      hotels: filteredHotels,
      packages: filteredPackages,
      buddies: filteredBuddies,
    };
  }, [searchText, selectedPriceRange, selectedRating, packages, travelBuddies]);

  // Get current tab data
  const filteredData = useMemo(() => {
    switch (activeTab) {
      case 'hotel':
        return allSearchResults.hotels;
      case 'package':
        return allSearchResults.packages;
      case 'buddy':
        return allSearchResults.buddies;
      default:
        return [];
    }
  }, [activeTab, allSearchResults]);

  // Get total results count across all tabs
  const totalResults = useMemo(() => {
    return (
      allSearchResults.hotels.length +
      allSearchResults.packages.length +
      allSearchResults.buddies.length
    );
  }, [allSearchResults]);

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarSolid
          key={i}
          size={12}
          color={i <= Math.floor(rating) ? '#FCD34D' : '#E5E7EB'}
        />,
      );
    }
    return stars;
  };

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
      <View className="relative">
        <Image source={{ uri: item.image }} className="w-full h-48" />
        <TouchableOpacity className="absolute p-2 rounded-full top-3 right-3 bg-white/80">
          <HeartIcon size={20} color="#EF4444" />
        </TouchableOpacity>
        <View className="absolute px-2 py-1 rounded-md bottom-3 left-3 bg-black/70">
          <Text className="text-xs font-medium text-white">
            {item.stars} Star Hotel
          </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="mb-1 text-lg font-bold text-gray-800">
              {item.name}
            </Text>
            <View className="flex-row items-center">
              <MapPinIcon size={14} color="#6B7280" />
              <Text className="ml-1 text-sm text-gray-600">
                {item.location}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-2xl font-bold text-blue-600">
              ₹{item.price.toLocaleString()}
            </Text>
            <Text className="text-xs text-gray-500">per night</Text>
          </View>
        </View>

        <View className="flex-row items-center mb-3">
          <View className="flex-row mr-2">{renderStars(item.rating)}</View>
          <Text className="text-sm font-medium text-gray-700">
            {item.rating}
          </Text>
          <Text className="ml-1 text-sm text-gray-500">
            ({item.reviews} reviews)
          </Text>
        </View>

        <View className="flex-row flex-wrap">
          {item.amenities.map((amenity, index) => (
            <View
              key={index}
              className="px-2 py-1 mb-1 mr-2 rounded-md bg-blue-50"
            >
              <Text className="text-xs text-blue-600">{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPackageItem = ({ item }) => (
    <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
      <View className="relative">
        <Image
          source={{
            uri:
              item.images && item.images[0]
                ? item.images[0]
                : 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
          }}
          className="w-full h-48"
        />
        <TouchableOpacity className="absolute p-2 rounded-full top-3 right-3 bg-white/80">
          <HeartIcon size={20} color="#EF4444" />
        </TouchableOpacity>
        {item.discount && (
          <View className="absolute px-2 py-1 bg-red-500 rounded-md top-3 left-3">
            <Text className="text-xs font-bold text-white">
              {item.discount} OFF
            </Text>
          </View>
        )}
      </View>

      <View className="p-4">
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="mb-1 text-lg font-bold text-gray-800">
              {item.title}
            </Text>
            <View className="flex-row items-center">
              <MapPinIcon size={14} color="#6B7280" />
              <Text className="ml-1 text-sm text-gray-600">
                {item.location || 'Thailand'}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-2xl font-bold text-green-600">
              ₹{item.price}
            </Text>
            <Text className="text-xs text-gray-500">
              for {item.people} people
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mb-3">
          <View className="flex-row mr-2">
            {renderStars(item.rating || 4.5)}
          </View>
          <Text className="text-sm font-medium text-gray-700">
            {item.rating || 4.5}
          </Text>
          <Text className="ml-1 text-sm text-gray-500">
            ({item.reviews || 0} reviews)
          </Text>
        </View>

        <View className="flex-row flex-wrap">
          {item.includes &&
            item.includes.slice(0, 3).map((include, index) => (
              <View
                key={index}
                className="px-2 py-1 mb-1 mr-2 rounded-md bg-green-50"
              >
                <Text className="text-xs text-green-600">{include}</Text>
              </View>
            ))}
          {item.includes && item.includes.length > 3 && (
            <View className="px-2 py-1 bg-gray-100 rounded-md">
              <Text className="text-xs text-gray-600">
                +{item.includes.length - 3} more
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBuddyItem = ({ item }) => (
    <TouchableOpacity className="mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">
      <View className="p-4">
        <View className="flex-row items-start mb-3">
          <View className="relative">
            <Image
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-full"
            />
            {item.verified && (
              <View className="absolute -bottom-1 -right-1">
                <CheckBadgeIcon size={20} color="#10B981" />
              </View>
            )}
          </View>

          <View className="flex-1 ml-4">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-lg font-bold text-gray-800">
                {item.name}
              </Text>
              <Text className="text-xl font-bold text-blue-600">
                ₹{item.price}
              </Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Text className="text-sm text-gray-600">
                {item.age} years old •{' '}
              </Text>
              <MapPinIcon size={12} color="#6B7280" />
              <Text className="ml-1 text-sm text-gray-600">
                {item.location}
              </Text>
            </View>

            <View className="flex-row items-center mb-2">
              <View className="flex-row mr-2">{renderStars(item.rating)}</View>
              <Text className="text-sm font-medium text-gray-700">
                {item.rating}
              </Text>
              <Text className="ml-1 text-sm text-gray-500">
                ({item.reviews} reviews)
              </Text>
            </View>
          </View>
        </View>

        <Text className="mb-3 text-sm text-gray-600" numberOfLines={2}>
          {item.description}
        </Text>

        <View className="flex-row flex-wrap mb-3">
          {item.languages.map((lang, index) => (
            <View
              key={index}
              className="px-2 py-1 mb-1 mr-2 rounded-md bg-blue-50"
            >
              <Text className="text-xs text-blue-600">{lang}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row flex-wrap">
          {item.specialties.map((specialty, index) => (
            <View
              key={index}
              className="px-2 py-1 mb-1 mr-2 rounded-md bg-purple-50"
            >
              <Text className="text-xs text-purple-600">{specialty}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSearchSuggestions = () => (
    <View>
      {/* Search History */}
      <View className="mb-6">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          Recent Searches
        </Text>
        <View className="flex-row flex-wrap">
          {searchHistory.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="px-4 py-2 mb-2 mr-2 bg-gray-100 rounded-full"
              onPress={() => setSearchText(item)}
            >
              <Text className="text-gray-700">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Popular Searches */}
      <View className="mb-6">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          Trending Searches
        </Text>
        <View className="flex-row flex-wrap">
          {popularSearches.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="px-4 py-2 mb-2 mr-2 border border-blue-200 rounded-full bg-blue-50"
              onPress={() => setSearchText(item)}
            >
              <Text className="font-medium text-blue-600">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Top Searches */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-semibold text-gray-800">
            Top Destinations
          </Text>
          <TouchableOpacity>
            <Text className="font-medium text-blue-500">See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={trendingData}
          renderItem={({ item }) => (
            <TouchableOpacity className="flex-row items-center p-4 mb-3 bg-white shadow-sm rounded-xl">
              <Image
                source={{ uri: item.image }}
                className="w-16 h-16 rounded-xl"
              />
              <View className="flex-1 ml-4">
                <Text className="text-base font-semibold text-gray-800">
                  {item.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-sm text-gray-500">
                    {item.type} • {item.location}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="font-bold text-blue-600">{item.price}</Text>
                  <View className="flex-row items-center">
                    <StarSolid size={14} color="#FCD34D" />
                    <Text className="ml-1 text-sm text-gray-600">
                      {item.rating}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    </View>
  );

  const renderFilters = () => (
    <View className="px-4 py-3 bg-white border-b border-gray-200">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-800">Filters</Text>
        <TouchableOpacity onPress={() => setShowFilters(false)}>
          <Text className="font-medium text-blue-500">Done</Text>
        </TouchableOpacity>
      </View>

      {/* Price Range Filter */}
      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Price Range
        </Text>
        <View className="flex-row">
          {[
            { key: 'all', label: 'All' },
            { key: 'low', label: 'Under ₹2K' },
            { key: 'mid', label: '₹2K-5K' },
            { key: 'high', label: 'Above ₹5K' },
          ].map(option => (
            <TouchableOpacity
              key={option.key}
              className={`px-3 py-2 rounded-full mr-2 ${
                selectedPriceRange === option.key
                  ? 'bg-blue-500'
                  : 'bg-gray-100'
              }`}
              onPress={() => setSelectedPriceRange(option.key)}
            >
              <Text
                className={`text-xs ${
                  selectedPriceRange === option.key
                    ? 'text-white font-medium'
                    : 'text-gray-600'
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Rating Filter */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Minimum Rating
        </Text>
        <View className="flex-row">
          {[
            { key: 'all', label: 'All' },
            { key: '4.0', label: '4.0+' },
            { key: '4.5', label: '4.5+' },
            { key: '4.8', label: '4.8+' },
          ].map(option => (
            <TouchableOpacity
              key={option.key}
              className={`px-3 py-2 rounded-full mr-2 ${
                selectedRating === option.key ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedRating(option.key)}
            >
              <Text
                className={`text-xs ${
                  selectedRating === option.key
                    ? 'text-white font-medium'
                    : 'text-gray-600'
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderResults = () => {
    if (filteredData.length === 0) {
      return (
        <View className="items-center justify-center flex-1 py-12">
          <MagnifyingGlassIcon size={48} color="#9CA3AF" />
          <Text className="mt-4 text-lg font-medium text-gray-600">
            No results found
          </Text>
          <Text className="px-8 mt-2 text-center text-gray-500">
            Try adjusting your search terms or filters
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredData}
        renderItem={
          activeTab === 'hotel'
            ? renderHotelItem
            : activeTab === 'package'
            ? renderPackageItem
            : renderBuddyItem
        }
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b2b51' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1b2b51" // black status bar
        translucent={false} // content stays below
      />
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="flex-row items-center px-4 pt-12 pb-4 bg-white shadow-sm">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3"
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>

          {/* Title */}
          <Text className="flex-row text-2xl font-bold">
            <Text className="text-gray-800">Find Your Perfect </Text>
            <Text className="text-blue-600">Travel Experience</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-4 py-4 bg-white shadow-sm">
          <View className="flex-row items-center px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl">
            <MagnifyingGlassIcon size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-700"
              placeholder="Search destinations, hotels, or guides..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              className="p-1 ml-2"
              onPress={() => setShowFilters(!showFilters)}
            >
              <AdjustmentsHorizontalIcon size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        {showFilters && renderFilters()}

        {/* Tabs with result counts */}
        <View className="flex-row px-4 bg-white border-b border-gray-200">
          {[
            {
              key: 'hotel',
              label: 'Hotels',
              count: allSearchResults.hotels.length,
            },
            {
              key: 'package',
              label: 'Packages',
              count: allSearchResults.packages.length,
            },
            {
              key: 'buddy',
              label: 'Travel Guides',
              count: allSearchResults.buddies.length,
            },
          ].map(tab => (
            <TouchableOpacity
              key={tab.key}
              className={`py-4 px-2 mr-6 ${
                activeTab === tab.key ? 'border-b-2 border-blue-500' : ''
              }`}
              onPress={() => setActiveTab(tab.key)}
            >
              <View className="flex-row items-center">
                <Text
                  className={`font-medium ${
                    activeTab === tab.key ? 'text-blue-500' : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </Text>
                {(searchText.trim() ||
                  selectedPriceRange !== 'all' ||
                  selectedRating !== 'all') &&
                  tab.count > 0 && (
                    <View className="ml-2 px-2 py-0.5 bg-blue-500 rounded-full">
                      <Text className="text-xs font-medium text-white">
                        {tab.count}
                      </Text>
                    </View>
                  )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <View className="flex-1">
          {searchText.trim() ||
          selectedPriceRange !== 'all' ||
          selectedRating !== 'all' ? (
            <View className="flex-1 px-4 pt-4">
              {/* Results Header */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-base font-medium text-gray-700">
                  {filteredData.length} results found
                </Text>
                {(searchText.trim() ||
                  selectedPriceRange !== 'all' ||
                  selectedRating !== 'all') && (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchText('');
                      setSelectedPriceRange('all');
                      setSelectedRating('all');
                    }}
                  >
                    <Text className="font-medium text-blue-500">Clear all</Text>
                  </TouchableOpacity>
                )}
              </View>
              {renderResults()}
            </View>
          ) : (
            <ScrollView className="flex-1 px-4 pt-4">
              {renderSearchSuggestions()}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
