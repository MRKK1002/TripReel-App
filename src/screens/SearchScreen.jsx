// import React, { useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Image,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import {
//   ArrowLeft,
//   Search,
//   MapPin,
//   Navigation,
//   ChevronDown,
//   ChevronUp,
//   Calendar,
//   Users,
//   Star,
//   SlidersHorizontal,
//   X,
// } from 'lucide-react-native';
// import  './../../android/app/src/utils/globalFont.js';


// // ─── Data ────────────────────────────────────────────────────────────────────

// const popularDestinations = [
//   { id: 1, name: 'South Goa, India', subtitle: 'Beachside view' },
//   { id: 2, name: 'Kerala, India', subtitle: 'Boat house, boat ride and more' },
// ];

// // Search result cards shown when query matches
// const searchResults = [
//   {
//     id: 1,
//     title: 'Goa Weekend Escape',
//     duration: '3 Days · 2 Nights',
//     rating: 4.5,
//     reviews: '20k reviews',
//     price: '₹34,999',
//     image:
//       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop',
//     location: 'Goa, India',
//     about:
//       'Enjoy a relaxing Goa getaway with beach vibes, local sightseeing, and comfortable stays.',
//     highlights: ['Beachside stay', 'Airport transfers included'],
//     itinerary: [
//       {
//         day: 1,
//         title: 'Arrival & Leisure',
//         points: ['Transfer to hotel', 'Rest day at leisure'],
//       },
//       {
//         day: 2,
//         title: 'Sightseeing',
//         points: ['North Goa tour', 'Beach hopping'],
//       },
//       { day: 3, title: 'Departure', points: ['Checkout & transfer'] },
//     ],
//     inclusions: ['Lunch & dinner'],
//     exclusions: ['Personal expenses'],
//     addons: [
//       { name: 'Photographer', price: 2000, details: ['30 min', '2 reels'] },
//     ],
//     image_url:
//       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
//     images: [
//       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
//       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
//     ],
//   },
//   {
//     id: 2,
//     title: 'Honeymoon in Goa',
//     duration: '5 Days · 4 Nights',
//     rating: 4.5,
//     reviews: '20k reviews',
//     price: '₹34,999',
//     image:
//       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop',
//     location: 'Goa, India',
//     about:
//       'A romantic escape in Goa with private beach dinners and luxury stays.',
//     highlights: ['Private beach dinner', 'Luxury stay'],
//     itinerary: [
//       {
//         day: 1,
//         title: 'Arrival',
//         points: ['Hotel check-in', 'Candlelight dinner'],
//       },
//       { day: 2, title: 'Beach Day', points: ['Relaxation', 'Water sports'] },
//     ],
//     inclusions: ['Breakfast', 'Dinner'],
//     exclusions: ['Flights'],
//     addons: [{ name: 'Couple Spa', price: 3000, details: ['60 min'] }],
//     image_url:
//       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
//     images: [
//       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
//       'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
//     ],
//   },
//   {
//     id: 3,
//     title: 'North Goa Sightseeing Trip',
//     duration: '2 Days · 1 Night',
//     rating: 4.5,
//     reviews: '20k reviews',
//     price: '₹34,999',
//     image:
//       'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300&h=200&fit=crop',
//     location: 'Goa, India',
//     about:
//       'Explore the best of North Goa with guided sightseeing and beach visits.',
//     highlights: ['Guided tour', 'Beach visits'],
//     itinerary: [
//       {
//         day: 1,
//         title: 'Arrival & Tour',
//         points: ['Fort Aguada', 'Baga Beach'],
//       },
//       { day: 2, title: 'Departure', points: ['Checkout'] },
//     ],
//     inclusions: ['Breakfast'],
//     exclusions: ['Personal expenses'],
//     addons: [],
//     image_url:
//       'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
//     images: [
//       'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
//       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
//     ],
//   },
//   {
//     id: 4,
//     title: 'Goa Weekend Escape',
//     duration: '3 Days · 2 Nights',
//     rating: 4.5,
//     reviews: '20k reviews',
//     price: '₹34,999',
//     image:
//       'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=300&h=200&fit=crop',
//     location: 'Goa, India',
//     about: 'A quick weekend getaway to Goa with beach stays and sightseeing.',
//     highlights: ['Beachside stay', 'Sightseeing'],
//     itinerary: [
//       { day: 1, title: 'Arrival', points: ['Hotel check-in'] },
//       { day: 2, title: 'Explore', points: ['Beach hopping'] },
//       { day: 3, title: 'Departure', points: ['Checkout'] },
//     ],
//     inclusions: ['Breakfast'],
//     exclusions: ['Flights'],
//     addons: [],
//     image_url:
//       'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop',
//     images: [
//       'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop',
//       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
//     ],
//   },
//   {
//     id: 5,
//     title: 'Honeymoon in Goa',
//     duration: '5 Days · 4 Nights',
//     rating: 4.5,
//     reviews: '20k reviews',
//     price: '₹34,999',
//     image:
//       'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
//     location: 'Goa, India',
//     about: 'Romantic Goa honeymoon with private experiences and luxury stays.',
//     highlights: ['Private villa', 'Romantic dinner'],
//     itinerary: [
//       { day: 1, title: 'Arrival', points: ['Villa check-in'] },
//       { day: 2, title: 'Leisure', points: ['Spa & beach'] },
//     ],
//     inclusions: ['All meals'],
//     exclusions: ['Flights'],
//     addons: [],
//     image_url:
//       'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
//     images: [
//       'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
//     ],
//   },
//   {
//     id: 6,
//     title: 'North Goa Sightseeing Trip',
//     duration: '2 Days · 1 Night',
//     rating: 4.5,
//     reviews: '20k reviews',
//     price: '₹34,999',
//     image:
//       'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop',
//     location: 'Goa, India',
//     about: 'Explore North Goa churches, forts and beaches in a quick trip.',
//     highlights: ['Churches', 'Forts', 'Beaches'],
//     itinerary: [
//       {
//         day: 1,
//         title: 'Sightseeing',
//         points: ['Old Goa churches', 'Fort Aguada'],
//       },
//       { day: 2, title: 'Departure', points: ['Checkout'] },
//     ],
//     inclusions: ['Breakfast'],
//     exclusions: ['Entry tickets'],
//     addons: [],
//     image_url:
//       'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=500&fit=crop',
//     images: [
//       'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=500&fit=crop',
//     ],
//   },
// ];

// // ─── Component ────────────────────────────────────────────────────────────────

// const SearchScreen = () => {
//   const navigation = useNavigation();
//   const [searchText, setSearchText] = useState('');
//   const [whereExpanded, setWhereExpanded] = useState(true);
//   const [selectedDate] = useState('07 Jan 2025');
//   const [guestInfo] = useState('2 guests, 1 infant');
//   const [showResults, setShowResults] = useState(false);
//   const [activeQuery, setActiveQuery] = useState('');

//   // Filter popular destinations as user types
//   const filteredSuggestions = useMemo(() => {
//     if (!searchText.trim()) return popularDestinations;
//     return popularDestinations.filter(d =>
//       d.name.toLowerCase().includes(searchText.toLowerCase()),
//     );
//   }, [searchText]);

//   // Filter result cards based on active query
//   const filteredResults = useMemo(() => {
//     if (!activeQuery.trim()) return searchResults;
//     return searchResults.filter(
//       r =>
//         r.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
//         r.location.toLowerCase().includes(activeQuery.toLowerCase()),
//     );
//   }, [activeQuery]);

//   const handleSearch = () => {
//     setActiveQuery(searchText);
//     setShowResults(true);
//   };

//   const handleClearAll = () => {
//     setSearchText('');
//     setActiveQuery('');
//     setShowResults(false);
//   };

//   const handleSelectSuggestion = name => {
//     setSearchText(name);
//     setActiveQuery(name);
//     setShowResults(true);
//   };

//   // ── Results View ────────────────────────────────────────────────────────────
//   if (showResults) {
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
//         <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

//         {/* Search Header */}
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: 16,
//             paddingVertical: 12,
//             backgroundColor: '#F9FAFB',
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => setShowResults(false)}
//             style={{ marginRight: 10 }}
//           >
//             <ArrowLeft size={22} color="#111827" />
//           </TouchableOpacity>

//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               alignItems: 'center',
//               backgroundColor: '#fff',
//               borderRadius: 24,
//               paddingHorizontal: 14,
//               paddingVertical: 10,
//               borderWidth: 1,
//               borderColor: '#E5E7EB',
//             }}
//           >
//             <Search size={16} color="#9CA3AF" />
//             <TextInput
//               value={searchText}
//               onChangeText={text => {
//                 setSearchText(text);
//                 setActiveQuery(text);
//               }}
//               placeholder="Search destinations..."
//               placeholderTextColor="#9CA3AF"
//               style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111827' }}
//               returnKeyType="search"
//               onSubmitEditing={handleSearch}
//             />
//             {searchText.length > 0 && (
//               <TouchableOpacity onPress={handleClearAll}>
//                 <X size={16} color="#9CA3AF" />
//               </TouchableOpacity>
//             )}
//           </View>

//           <TouchableOpacity
//             style={{
//               marginLeft: 10,
//               width: 38,
//               height: 38,
//               borderRadius: 10,
//               backgroundColor: '#fff',
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderWidth: 1,
//               borderColor: '#E5E7EB',
//             }}
//           >
//             <SlidersHorizontal size={18} color="#374151" />
//           </TouchableOpacity>
//         </View>

//         {/* Results List */}
//         <FlatList
//           data={filteredResults}
//           keyExtractor={item => item.id.toString()}
//           contentContainerStyle={{
//             paddingHorizontal: 16,
//             paddingTop: 8,
//             paddingBottom: 24,
//           }}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={{ alignItems: 'center', marginTop: 60 }}>
//               <Text style={{ fontSize: 15, color: '#9CA3AF' }}>
//                 No results found
//               </Text>
//             </View>
//           }
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('DestinationDetail', { destination: item })
//               }
//               style={{
//                 flexDirection: 'row',
//                 backgroundColor: '#fff',
//                 borderRadius: 14,
//                 marginBottom: 14,
//                 overflow: 'hidden',
//                 shadowColor: '#000',
//                 shadowOpacity: 0.04,
//                 shadowRadius: 4,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//               activeOpacity={0.85}
//             >
//               <Image
//                 source={{ uri: item.image }}
//                 style={{ width: 90, height: 90, borderRadius: 12, margin: 10 }}
//                 resizeMode="cover"
//               />
//               <View
//                 style={{
//                   flex: 1,
//                   paddingVertical: 12,
//                   paddingRight: 12,
//                   justifyContent: 'center',
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 15,
//                     fontWeight: '700',
//                     color: '#111827',
//                     marginBottom: 4,
//                   }}
//                 >
//                   {item.title}
//                 </Text>
//                 <View
//                   style={{
//                     alignSelf: 'flex-start',
//                     backgroundColor: '#E6F4EF',
//                     borderRadius: 6,
//                     paddingHorizontal: 8,
//                     paddingVertical: 3,
//                     marginBottom: 6,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 11,
//                       color: '#1F8A70',
//                       fontWeight: '600',
//                     }}
//                   >
//                     {item.duration}
//                   </Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Star size={13} color="#1F8A70" fill="#1F8A70" />
//                   <Text
//                     style={{
//                       fontSize: 12,
//                       fontWeight: '700',
//                       color: '#111827',
//                       marginLeft: 3,
//                     }}
//                   >
//                     {item.rating}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 12,
//                       color: '#1F8A70',
//                       marginLeft: 4,
//                       textDecorationLine: 'underline',
//                     }}
//                   >
//                     {item.reviews}
//                   </Text>
//                   <Text
//                     style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}
//                   >
//                     • From {item.price}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </SafeAreaView>
//     );
//   }

//   // ── Search Form View ────────────────────────────────────────────────────────
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

//       {/* Header */}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingHorizontal: 16,
//           paddingVertical: 14,
//         }}
//       >
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{
//             width: 36,
//             height: 36,
//             borderRadius: 18,
//             backgroundColor: '#fff',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginRight: 14,
//             borderWidth: 1,
//             borderColor: '#E5E7EB',
//           }}
//         >
//           <X size={18} color="#374151" />
//         </TouchableOpacity>
//         <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
//           Search your destination
//         </Text>
//       </View>

//       <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
//         {/* Where Section */}
//         <View
//           style={{
//             backgroundColor: '#fff',
//             marginHorizontal: 16,
//             marginTop: 4,
//             borderRadius: 16,
//             padding: 16,
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => setWhereExpanded(!whereExpanded)}
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <MapPin size={20} color="#1F8A70" />
//               <View style={{ marginLeft: 12 }}>
//                 <Text
//                   style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
//                 >
//                   Where
//                 </Text>
//                 <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
//                   Select your destination
//                 </Text>
//               </View>
//             </View>
//             {whereExpanded ? (
//               <ChevronUp size={20} color="#6B7280" />
//             ) : (
//               <ChevronDown size={20} color="#6B7280" />
//             )}
//           </TouchableOpacity>

//           {whereExpanded && (
//             <View style={{ marginTop: 14 }}>
//               {/* Search Input */}
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   backgroundColor: '#F9FAFB',
//                   borderRadius: 12,
//                   paddingHorizontal: 12,
//                   paddingVertical: 11,
//                   borderWidth: 1,
//                   borderColor: '#E5E7EB',
//                 }}
//               >
//                 <Search size={18} color="#9CA3AF" />
//                 <TextInput
//                   value={searchText}
//                   onChangeText={setSearchText}
//                   placeholder="Search Destination"
//                   placeholderTextColor="#9CA3AF"
//                   style={{
//                     flex: 1,
//                     marginLeft: 8,
//                     fontSize: 14,
//                     color: '#111827',
//                   }}
//                   returnKeyType="search"
//                   onSubmitEditing={handleSearch}
//                 />
//               </View>

//               {/* Nearby */}
//               <TouchableOpacity
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 10,
//                   backgroundColor: '#F9FAFB',
//                   borderRadius: 12,
//                   padding: 14,
//                   borderWidth: 1,
//                   borderColor: '#E5E7EB',
//                 }}
//               >
//                 <Navigation size={18} color="#1F8A70" />
//                 <View style={{ marginLeft: 12 }}>
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       fontWeight: '600',
//                       color: '#111827',
//                     }}
//                   >
//                     Nearby
//                   </Text>
//                   <Text
//                     style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}
//                   >
//                     Find what destination near
//                   </Text>
//                 </View>
//               </TouchableOpacity>

//               {/* Popular Destinations */}
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '700',
//                   color: '#111827',
//                   marginTop: 18,
//                   marginBottom: 10,
//                 }}
//               >
//                 Popular Destinations
//               </Text>
//               <View
//                 style={{
//                   backgroundColor: '#F9FAFB',
//                   borderRadius: 12,
//                   borderWidth: 1,
//                   borderColor: '#E5E7EB',
//                   overflow: 'hidden',
//                 }}
//               >
//                 {filteredSuggestions.map((dest, index) => (
//                   <TouchableOpacity
//                     key={dest.id}
//                     onPress={() => handleSelectSuggestion(dest.name)}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       padding: 14,
//                       borderBottomWidth:
//                         index < filteredSuggestions.length - 1 ? 1 : 0,
//                       borderBottomColor: '#E5E7EB',
//                     }}
//                   >
//                     <View
//                       style={{
//                         width: 38,
//                         height: 38,
//                         borderRadius: 10,
//                         backgroundColor: '#E6F4EF',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         marginRight: 12,
//                       }}
//                     >
//                       <MapPin size={18} color="#1F8A70" />
//                     </View>
//                     <View>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           fontWeight: '600',
//                           color: '#111827',
//                         }}
//                       >
//                         {dest.name}
//                       </Text>
//                       <Text
//                         style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}
//                       >
//                         {dest.subtitle}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//           )}
//         </View>

//         {/* When Section */}
//         <View
//           style={{
//             backgroundColor: '#fff',
//             marginHorizontal: 16,
//             marginTop: 10,
//             borderRadius: 16,
//             padding: 16,
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Calendar size={20} color="#6B7280" />
//               <View style={{ marginLeft: 12 }}>
//                 <Text
//                   style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
//                 >
//                   {selectedDate}
//                 </Text>
//                 <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
//                   When
//                 </Text>
//               </View>
//             </View>
//             <ChevronDown size={20} color="#6B7280" />
//           </TouchableOpacity>
//         </View>

//         {/* Who Section */}
//         <View
//           style={{
//             backgroundColor: '#fff',
//             marginHorizontal: 16,
//             marginTop: 10,
//             borderRadius: 16,
//             padding: 16,
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Users size={20} color="#6B7280" />
//               <View style={{ marginLeft: 12 }}>
//                 <Text
//                   style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
//                 >
//                   {guestInfo}
//                 </Text>
//                 <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
//                   Who
//                 </Text>
//               </View>
//             </View>
//             <ChevronDown size={20} color="#6B7280" />
//           </TouchableOpacity>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>

//       {/* Bottom Bar */}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           paddingHorizontal: 20,
//           paddingVertical: 16,
//           backgroundColor: '#fff',
//           borderTopWidth: 1,
//           borderTopColor: '#E5E7EB',
//         }}
//       >
//         <TouchableOpacity onPress={handleClearAll}>
//           <Text
//             style={{
//               fontSize: 15,
//               color: '#374151',
//               textDecorationLine: 'underline',
//               fontWeight: '500',
//             }}
//           >
//             Clear All
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleSearch}
//           style={{
//             backgroundColor: '#1F8A70',
//             paddingHorizontal: 36,
//             paddingVertical: 14,
//             borderRadius: 12,
//           }}
//         >
//           <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>
//             Search
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SearchScreen;





























import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Search,
  MapPin,
  Navigation,
  ChevronDown,
  ChevronUp,
  Calendar,
  Users,
  Star,
  SlidersHorizontal,
  X,
} from 'lucide-react-native';
import './../../android/app/src/utils/globalFont.js';

// ─── Data ────────────────────────────────────────────────────────────────────

const popularDestinations = [
  { id: 1, name: 'South Goa, India', subtitle: 'Beachside view' },
  { id: 2, name: 'Kerala, India', subtitle: 'Boat house, boat ride and more' },
];

// Search result cards shown when query matches
const searchResults = [
  {
    id: 1,
    title: 'Goa Weekend Escape',
    duration: '3 Days · 2 Nights',
    rating: 4.5,
    reviews: '20k reviews',
    price: '₹34,999',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop',
    location: 'Goa, India',
    about:
      'Enjoy a relaxing Goa getaway with beach vibes, local sightseeing, and comfortable stays.',
    highlights: ['Beachside stay', 'Airport transfers included'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Leisure',
        points: ['Transfer to hotel', 'Rest day at leisure'],
      },
      {
        day: 2,
        title: 'Sightseeing',
        points: ['North Goa tour', 'Beach hopping'],
      },
      { day: 3, title: 'Departure', points: ['Checkout & transfer'] },
    ],
    inclusions: ['Lunch & dinner'],
    exclusions: ['Personal expenses'],
    addons: [
      { name: 'Photographer', price: 2000, details: ['30 min', '2 reels'] },
    ],
    image_url:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Honeymoon in Goa',
    duration: '5 Days · 4 Nights',
    rating: 4.5,
    reviews: '20k reviews',
    price: '₹34,999',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop',
    location: 'Goa, India',
    about:
      'A romantic escape in Goa with private beach dinners and luxury stays.',
    highlights: ['Private beach dinner', 'Luxury stay'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival',
        points: ['Hotel check-in', 'Candlelight dinner'],
      },
      { day: 2, title: 'Beach Day', points: ['Relaxation', 'Water sports'] },
    ],
    inclusions: ['Breakfast', 'Dinner'],
    exclusions: ['Flights'],
    addons: [{ name: 'Couple Spa', price: 3000, details: ['60 min'] }],
    image_url:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'North Goa Sightseeing Trip',
    duration: '2 Days · 1 Night',
    rating: 4.5,
    reviews: '20k reviews',
    price: '₹34,999',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300&h=200&fit=crop',
    location: 'Goa, India',
    about:
      'Explore the best of North Goa with guided sightseeing and beach visits.',
    highlights: ['Guided tour', 'Beach visits'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Tour',
        points: ['Fort Aguada', 'Baga Beach'],
      },
      { day: 2, title: 'Departure', points: ['Checkout'] },
    ],
    inclusions: ['Breakfast'],
    exclusions: ['Personal expenses'],
    addons: [],
    image_url:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 4,
    title: 'Goa Weekend Escape',
    duration: '3 Days · 2 Nights',
    rating: 4.5,
    reviews: '20k reviews',
    price: '₹34,999',
    image:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=300&h=200&fit=crop',
    location: 'Goa, India',
    about: 'A quick weekend getaway to Goa with beach stays and sightseeing.',
    highlights: ['Beachside stay', 'Sightseeing'],
    itinerary: [
      { day: 1, title: 'Arrival', points: ['Hotel check-in'] },
      { day: 2, title: 'Explore', points: ['Beach hopping'] },
      { day: 3, title: 'Departure', points: ['Checkout'] },
    ],
    inclusions: ['Breakfast'],
    exclusions: ['Flights'],
    addons: [],
    image_url:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 5,
    title: 'Honeymoon in Goa',
    duration: '5 Days · 4 Nights',
    rating: 4.5,
    reviews: '20k reviews',
    price: '₹34,999',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
    location: 'Goa, India',
    about: 'Romantic Goa honeymoon with private experiences and luxury stays.',
    highlights: ['Private villa', 'Romantic dinner'],
    itinerary: [
      { day: 1, title: 'Arrival', points: ['Villa check-in'] },
      { day: 2, title: 'Leisure', points: ['Spa & beach'] },
    ],
    inclusions: ['All meals'],
    exclusions: ['Flights'],
    addons: [],
    image_url:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 6,
    title: 'North Goa Sightseeing Trip',
    duration: '2 Days · 1 Night',
    rating: 4.5,
    reviews: '20k reviews',
    price: '₹34,999',
    image:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop',
    location: 'Goa, India',
    about: 'Explore North Goa churches, forts and beaches in a quick trip.',
    highlights: ['Churches', 'Forts', 'Beaches'],
    itinerary: [
      {
        day: 1,
        title: 'Sightseeing',
        points: ['Old Goa churches', 'Fort Aguada'],
      },
      { day: 2, title: 'Departure', points: ['Checkout'] },
    ],
    inclusions: ['Breakfast'],
    exclusions: ['Entry tickets'],
    addons: [],
    image_url:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=500&fit=crop',
    ],
  },
];

// Available dates for selection
const availableDates = [
  { id: 1, date: '07 Jan 2025', day: 'Tuesday' },
  { id: 2, date: '10 Jan 2025', day: 'Friday' },
  { id: 3, date: '15 Jan 2025', day: 'Wednesday' },
  { id: 4, date: '20 Jan 2025', day: 'Monday' },
  { id: 5, date: '25 Jan 2025', day: 'Saturday' },
  { id: 6, date: '01 Feb 2025', day: 'Saturday' },
  { id: 7, date: '05 Feb 2025', day: 'Wednesday' },
  { id: 8, date: '10 Feb 2025', day: 'Monday' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [whereExpanded, setWhereExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = useState('07 Jan 2025');
  const [guestInfo, setGuestInfo] = useState('2 guests, 1 infant');
  const [guests, setGuests] = useState({ adults: 2, infants: 1 });
  const [showResults, setShowResults] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');
  
  // Modal states
  const [showDateModal, setShowDateModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  // Filter popular destinations as user types
  const filteredSuggestions = useMemo(() => {
    if (!searchText.trim()) return popularDestinations;
    return popularDestinations.filter(d =>
      d.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText]);

  // Filter result cards based on active query
  const filteredResults = useMemo(() => {
    if (!activeQuery.trim()) return searchResults;
    return searchResults.filter(
      r =>
        r.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(activeQuery.toLowerCase()),
    );
  }, [activeQuery]);

  const handleSearch = () => {
    setActiveQuery(searchText);
    setShowResults(true);
  };

  const handleClearAll = () => {
    setSearchText('');
    setActiveQuery('');
    setShowResults(false);
    setSelectedDate('07 Jan 2025');
    setGuests({ adults: 2, infants: 1 });
    setGuestInfo('2 guests, 1 infant');
  };

  const handleSelectSuggestion = name => {
    setSearchText(name);
    setActiveQuery(name);
    setShowResults(true);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowDateModal(false);
  };

  const updateGuestInfo = (adults, infants) => {
    let info = '';
    if (adults > 0) {
      info += `${adults} guest${adults > 1 ? 's' : ''}`;
    }
    if (infants > 0) {
      info += `${info ? ', ' : ''}${infants} infant${infants > 1 ? 's' : ''}`;
    }
    setGuestInfo(info);
    setGuests({ adults, infants });
  };

  const handleGuestDone = () => {
    updateGuestInfo(guests.adults, guests.infants);
    setShowGuestModal(false);
  };

  // ── Results View ────────────────────────────────────────────────────────────
  if (showResults) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

        {/* Search Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#F9FAFB',
          }}
        >
          <TouchableOpacity
            onPress={() => setShowResults(false)}
            style={{ marginRight: 10 }}
          >
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 24,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <Search size={16} color="#9CA3AF" />
            <TextInput
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
                setActiveQuery(text);
              }}
              placeholder="Search destinations..."
              placeholderTextColor="#9CA3AF"
              style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111827' }}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={handleClearAll}>
                <X size={16} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={{
              marginLeft: 10,
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <SlidersHorizontal size={18} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Results List */}
        <FlatList
          data={filteredResults}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <Text style={{ fontSize: 15, color: '#9CA3AF' }}>
                No results found
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DestinationDetail', { destination: item })
              }
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 14,
                marginBottom: 14,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOpacity: 0.04,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 90, height: 90, borderRadius: 12, margin: 10 }}
                resizeMode="cover"
              />
              <View
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingRight: 12,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#E6F4EF',
                    borderRadius: 6,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    marginBottom: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#1F8A70',
                      fontWeight: '600',
                    }}
                  >
                    {item.duration}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Star size={13} color="#1F8A70" fill="#1F8A70" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: '#111827',
                      marginLeft: 3,
                    }}
                  >
                    {item.rating}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#1F8A70',
                      marginLeft: 4,
                      textDecorationLine: 'underline',
                    }}
                  >
                    {item.reviews}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}
                  >
                    • From {item.price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }

  // ── Search Form View ────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <X size={18} color="#374151" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
          Search your destination
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Where Section */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginTop: 4,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setWhereExpanded(!whereExpanded)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MapPin size={20} color="#1F8A70" />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
                >
                  Where
                </Text>
                <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
                  Select your destination
                </Text>
              </View>
            </View>
            {whereExpanded ? (
              <ChevronUp size={20} color="#6B7280" />
            ) : (
              <ChevronDown size={20} color="#6B7280" />
            )}
          </TouchableOpacity>

          {whereExpanded && (
            <View style={{ marginTop: 14 }}>
              {/* Search Input */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#F9FAFB',
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 11,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}
              >
                <Search size={18} color="#9CA3AF" />
                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search Destination"
                  placeholderTextColor="#9CA3AF"
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    fontSize: 14,
                    color: '#111827',
                  }}
                  returnKeyType="search"
                  onSubmitEditing={handleSearch}
                />
              </View>

              {/* Nearby */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  backgroundColor: '#F9FAFB',
                  borderRadius: 12,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}
              >
                <Navigation size={18} color="#1F8A70" />
                <View style={{ marginLeft: 12 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#111827',
                    }}
                  >
                    Nearby
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}
                  >
                    Find what destination near
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Popular Destinations */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#111827',
                  marginTop: 18,
                  marginBottom: 10,
                }}
              >
                Popular Destinations
              </Text>
              <View
                style={{
                  backgroundColor: '#F9FAFB',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  overflow: 'hidden',
                }}
              >
                {filteredSuggestions.map((dest, index) => (
                  <TouchableOpacity
                    key={dest.id}
                    onPress={() => handleSelectSuggestion(dest.name)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 14,
                      borderBottomWidth:
                        index < filteredSuggestions.length - 1 ? 1 : 0,
                      borderBottomColor: '#E5E7EB',
                    }}
                  >
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        backgroundColor: '#E6F4EF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <MapPin size={18} color="#1F8A70" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#111827',
                        }}
                      >
                        {dest.name}
                      </Text>
                      <Text
                        style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}
                      >
                        {dest.subtitle}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* When Section - Clickable */}
        <TouchableOpacity
          onPress={() => setShowDateModal(true)}
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginTop: 10,
            borderRadius: 16,
            padding: 16,
          }}
          activeOpacity={0.7}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar size={20} color="#6B7280" />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
                >
                  {selectedDate}
                </Text>
                <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
                  When
                </Text>
              </View>
            </View>
            <ChevronDown size={20} color="#6B7280" />
          </View>
        </TouchableOpacity>

        {/* Who Section - Clickable */}
        <TouchableOpacity
          onPress={() => setShowGuestModal(true)}
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginTop: 10,
            borderRadius: 16,
            padding: 16,
          }}
          activeOpacity={0.7}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Users size={20} color="#6B7280" />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
                >
                  {guestInfo}
                </Text>
                <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
                  Who
                </Text>
              </View>
            </View>
            <ChevronDown size={20} color="#6B7280" />
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        }}
      >
        <TouchableOpacity onPress={handleClearAll}>
          <Text
            style={{
              fontSize: 15,
              color: '#374151',
              textDecorationLine: 'underline',
              fontWeight: '500',
            }}
          >
            Clear All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: '#1F8A70',
            paddingHorizontal: 36,
            paddingVertical: 14,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Selection Modal */}
      <Modal
        visible={showDateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDateModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              maxHeight: '70%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#111827',
                }}
              >
                Select Date
              </Text>
              <TouchableOpacity onPress={() => setShowDateModal(false)}>
                <X size={22} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={availableDates}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectDate(item.date)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: '#111827',
                      }}
                    >
                      {item.date}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#9CA3AF',
                        marginTop: 2,
                      }}
                    >
                      {item.day}
                    </Text>
                  </View>
                  {selectedDate === item.date && (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: '#1F8A70',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#fff',
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={() => setShowDateModal(false)}
              style={{
                backgroundColor: '#1F8A70',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Guest Selection Modal */}
      <Modal
        visible={showGuestModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowGuestModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#111827',
                }}
              >
                Select Guests
              </Text>
              <TouchableOpacity onPress={() => setShowGuestModal(false)}>
                <X size={22} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Adults Counter */}
            <GuestCounter
              label="Adults"
              value={guests.adults}
              min={1}
              onChange={(val) => setGuests(g => ({ ...g, adults: val }))}
            />

            {/* Infants Counter */}
            <GuestCounter
              label="Infants"
              value={guests.infants}
              min={0}
              onChange={(val) => setGuests(g => ({ ...g, infants: val }))}
            />

            <TouchableOpacity
              onPress={handleGuestDone}
              style={{
                backgroundColor: '#1F8A70',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Guest Counter Component
const GuestCounter = ({ label, value, min, onChange }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    }}
  >
    <Text
      style={{
        fontSize: 15,
        color: '#111827',
        fontWeight: '600',
      }}
    >
      {label}
    </Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <TouchableOpacity
        onPress={() => onChange(Math.max(min, value - 1))}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: '#D1D5DB',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: '#374151',
            lineHeight: 22,
          }}
        >
          −
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#111827',
          minWidth: 24,
          textAlign: 'center',
        }}
      >
        {value}
      </Text>
      <TouchableOpacity
        onPress={() => onChange(value + 1)}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#1F8A70',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{ fontSize: 18, color: '#fff', lineHeight: 22 }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default SearchScreen;