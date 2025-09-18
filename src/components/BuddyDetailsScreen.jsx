// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   Dimensions,
//   Share,
//   Linking,
// } from 'react-native';
// import { 
//   ArrowLeftIcon, 
//   ShareIcon, 
//   StarIcon, 
//   ChatBubbleLeftIcon,
//   CalendarDaysIcon,
//   BriefcaseIcon,
//   AcademicCapIcon,
//   CheckBadgeIcon,
//   MapPinIcon,
//   ChevronRightIcon,
//   CameraIcon,
//   ShoppingBagIcon,
//   BuildingStorefrontIcon,
//   VideoCameraIcon,
// } from 'react-native-heroicons/outline';
// import { 
//   StarIcon as StarSolid,
//   CheckBadgeIcon as CheckBadgeSolid 
// } from 'react-native-heroicons/solid';
// import YoutubePlayer from 'react-native-youtube-iframe';

// const { width } = Dimensions.get('window');

// const BuddyDetailsScreen = ({ route, navigation }) => {
//   const { buddy } = route.params;
//   const [activeTab, setActiveTab] = useState('about');
//    const [playing, setPlaying] = useState(false);

//      // Extract YouTube video ID from URL
//   const getYouTubeId = (url) => {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return (match && match[2].length === 11) ? match[2] : null;
//   };

//   const videoId = buddy.video ? getYouTubeId(buddy.video) : null;


//   const handlePlayVideo = () => {
//     if (buddy.video) {
//       Linking.openURL(buddy.video);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Check out ${buddy.name}, an amazing local guide in ${buddy.location}!`,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleBooking = () => {
//     // Navigate to booking screen or handle booking logic
//     console.log('Booking buddy:', buddy.name);
//   };

//   const renderRating = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(
//         <StarSolid key={i} size={14} color="#FFD700" />
//       );
//     }

//     if (hasHalfStar) {
//       stars.push(
//         <View key={fullStars} style={{ position: 'relative' }}>
//           <StarIcon size={14} color="#FFD700" />
//           <View style={{ 
//             position: 'absolute', 
//             top: 0, 
//             left: 0, 
//             width: '50%', 
//             overflow: 'hidden' 
//           }}>
//             <StarSolid size={14} color="#FFD700" />
//           </View>
//         </View>
//       );
//     }

//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <StarIcon key={fullStars + i + 1} size={14} color="#FFD700" />
//       );
//     }

//     return stars;
//   };

//   const getSpecialtyIcon = (specialty) => {
//     if (specialty.includes('Tour')) return <MapPinIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Food')) return <BuildingStorefrontIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Photography')) return <CameraIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Shopping')) return <ShoppingBagIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Adventure')) return <MapPinIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Diving')) return <MapPinIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Cultural')) return <AcademicCapIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Cooking')) return <BuildingStorefrontIcon size={24} color="#F59E0B" />;
//     return <StarSolid size={24} color="#F59E0B" />;
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'about':
//         return (
//           <View className="p-4">
//             <Text className="mb-6 text-base leading-6 text-gray-800">
//               {buddy.description}
//             </Text>

//             {/* Info Section */}
//             <View className="p-4 mb-6 bg-blue-50 rounded-xl">
//               <Text className="mb-3 text-lg font-semibold text-gray-800">
//                 Professional Information
//               </Text>
//               <View className="space-y-2">
//                 <View className="flex-row items-center">
//                   <BriefcaseIcon size={18} color="#3B82F6" />
//                   <Text className="ml-3 text-gray-700">{buddy.info.experience}</Text>
//                 </View>
//                 <View className="flex-row items-center">
//                   <AcademicCapIcon size={18} color="#3B82F6" />
//                   <Text className="ml-3 text-gray-700">{buddy.info.education}</Text>
//                 </View>
//                 {buddy.info.certifications.map((cert, index) => (
//                   <View key={index} className="flex-row items-center">
//                     <CheckBadgeIcon size={18} color="#10B981" />
//                     <Text className="ml-3 text-gray-700">{cert}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>

//             {/* Languages */}
//             <View className="mb-6">
//               <Text className="mb-3 text-lg font-semibold text-gray-800">Languages</Text>
//               <View className="flex-row flex-wrap">
//                 {buddy.languages.map((lang, index) => (
//                   <View key={index} className="px-3 py-2 mb-2 mr-2 bg-green-100 rounded-full">
//                     <Text className="font-medium text-green-700">{lang}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>

//             {/* Hobbies */}
//             <View className="mb-6">
//               <Text className="mb-3 text-lg font-semibold text-gray-800">Hobbies & Interests</Text>
//               <View className="flex-row flex-wrap">
//                 {buddy.hobbies.map((hobby, index) => (
//                   <View key={index} className="px-3 py-2 mb-2 mr-2 bg-purple-100 rounded-full">
//                     <Text className="text-purple-700">{hobby}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </View>
//         );

//       case 'places':
//         return (
//           <View className="p-4">
//             <Text className="mb-4 text-lg font-semibold text-gray-800">
//               Popular Places I Can Show You
//             </Text>
//             {buddy.touristPlaces.map((place, index) => (
//               <View key={index} className="flex-row items-center p-4 mb-3 bg-white shadow-sm rounded-xl">
//                 <View className="items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-full">
//                   <MapPinIcon size={20} color="#3B82F6" />
//                 </View>
//                 <Text className="flex-1 font-medium text-gray-800">{place}</Text>
//                 <ChevronRightIcon size={20} color="#9CA3AF" />
//               </View>
//             ))}
//           </View>
//         );

//       case 'specialties':
//         return (
//           <View className="p-4">
//             <Text className="mb-4 text-lg font-semibold text-gray-800">
//               My Specialties
//             </Text>
//             {buddy.specialties.map((specialty, index) => (
//               <View key={index} className="p-4 mb-3 bg-white shadow-sm rounded-xl">
//                 <View className="flex-row items-center">
//                   <View className="items-center justify-center w-12 h-12 mr-4 bg-orange-100 rounded-full">
//                     {getSpecialtyIcon(specialty)}
//                   </View>
//                   <Text className="text-lg font-semibold text-gray-800">{specialty}</Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         );

//          case 'video':
//         return (
//           <View className="p-4">
//   {/* Introductory Video Section */}
//   <Text className="mb-4 text-lg font-semibold text-gray-800">
//     {buddy.name}'s Introduction
//   </Text>
//   <View className="overflow-hidden bg-black rounded-xl">
//     <YoutubePlayer
//       height={220}
//       play={playing}
//       videoId="jOEzMTNrrd4" // Static demo video ID (replace with your actual video ID)
//       onChangeState={(state) => setPlaying(state === 'playing')}
//     />
//   </View>
//   <Text className="mt-4 text-gray-600">
//     Watch {buddy.name}'s personal introduction to learn about their guiding style and personality.
//   </Text>

//   {/* Work Gallery Section */}
//   <Text className="mt-8 mb-4 text-lg font-semibold text-gray-800">
//     {buddy.name}'s Work with Tourists
//   </Text>
  
//   <ScrollView 
//     horizontal 
//     showsHorizontalScrollIndicator={false}
//     className="mb-4"
//   >
//     <View className="flex-row space-x-3">
//       {/* Video 1 */}
//       <TouchableOpacity 
//         className="relative w-48 h-32 overflow-hidden bg-gray-200 rounded-lg"
//         onPress={() => Linking.openURL('https://youtu.be/jOEzMTNrrd4')} // Replace with your video URL
//       >
//         <Image
//           source={{ uri: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }} // Replace with your thumbnail
//           className="absolute w-full h-full"
//         />
//         <View className="absolute inset-0 items-center justify-center bg-black bg-opacity-30">
//           <VideoCameraIcon size={32} color="white" />
//         </View>
//       </TouchableOpacity>
      
//       {/* Image 1 */}
//       <View className="relative w-32 h-32 overflow-hidden bg-gray-200 rounded-lg">
//         <Image
//           source={{ uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }}
//           className="absolute w-full h-full"
//         />
//       </View>
      
//       {/* Video 2 */}
//       <TouchableOpacity 
//         className="relative w-48 h-32 overflow-hidden bg-gray-200 rounded-lg"
//         onPress={() => Linking.openURL('https://youtu.be/jOEzMTNrrd4')} // Replace with your video URL
//       >
//         <Image
//           source={{ uri: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }} // Replace with your thumbnail
//           className="absolute w-full h-full"
//         />
//         <View className="absolute inset-0 items-center justify-center bg-black bg-opacity-30">
//           <VideoCameraIcon size={32} color="white" />
//         </View>
//       </TouchableOpacity>
      
//       {/* Image 2 */}
//       <View className="relative w-32 h-32 overflow-hidden bg-gray-200 rounded-lg">
//         <Image
//           source={{ uri: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }}
//           className="absolute w-full h-full"
//         />
//       </View>
//     </View>
//   </ScrollView>
  
//   <Text className="text-gray-600">
//     See {buddy.name} in action with previous tourists and the amazing experiences they've created.
//   </Text>
// </View>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       {/* Header */}
//       {/* <View className="flex-row items-center justify-between p-4 bg-white">
//         <TouchableOpacity 
//           onPress={() => navigation.goBack()}
//           className="items-center justify-center w-10 h-10 bg-gray-100 rounded-full"
//         >
//           <ArrowLeftIcon size={24} color="#374151" />
//         </TouchableOpacity>
        
//         <Text className="text-xl font-bold text-gray-800">Guide Profile</Text>
        
//         <TouchableOpacity 
//           onPress={handleShare}
//           className="items-center justify-center w-10 h-10 bg-gray-100 rounded-full"
//         >
//           <ShareIcon size={24} color="#374151" />
//         </TouchableOpacity>
//       </View> */}

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         {/* Profile Header */}
//         <View className="px-6 pt-6 pb-4 bg-white">
//           <View className="items-center">
//             {/* Profile Image */}
//             <View className="relative">
//               <Image
//                 source={{ uri: buddy.image }}
//                 className="w-32 h-32 rounded-full"
//                 resizeMode="cover"
//               />
//               {buddy.verified && (
//                 <View className="absolute items-center justify-center w-10 h-10 bg-green-500 border-4 border-white rounded-full -bottom-1 -right-1">
//                   <CheckBadgeSolid size={20} color="white" />
//                 </View>
//               )}
//             </View>

//             {/* Name and Age */}
//             <Text className="mt-4 text-2xl font-bold text-gray-800">{buddy.name}</Text>
//             <Text className="text-lg text-gray-600">{buddy.age} years old</Text>
            
//             {/* Location */}
//             <View className="flex-row items-center mt-2">
//               <MapPinIcon size={16} color="#EF4444" />
//               <Text className="ml-1 text-gray-600">{buddy.location}</Text>
//             </View>

//             {/* Rating and Price */}
//             <View className="flex-row items-center justify-between w-full mt-6">
//               <View className="items-center">
//                 <View className="flex-row items-center">
//                   {renderRating(buddy.rating)}
//                   <Text className="ml-2 font-semibold text-gray-800">{buddy.rating}</Text>
//                 </View>
//                 <Text className="mt-1 text-sm text-gray-500">Rating</Text>
//               </View>
              
//               <View className="items-center">
//                 <Text className="text-2xl font-bold text-blue-600">฿{buddy.price}</Text>
//                 <Text className="text-sm text-gray-500">per day</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Tab Navigation */}
//         <View className="mt-2 bg-white">
//           <View className="flex-row justify-around py-4 border-b border-gray-200">
//             {[
//               { id: 'about', label: 'About', icon: 'person' },
//               { id: 'places', label: 'Places', icon: 'location' },
//               { id: 'specialties', label: 'Skills', icon: 'star' },
//                  { id: 'video', label: 'Video', icon: 'video' }
//             ].map((tab) => (
//               <TouchableOpacity
//                 key={tab.id}
//                 onPress={() => setActiveTab(tab.id)}
//                 className={`items-center py-2 px-4 rounded-lg ${
//                   activeTab === tab.id ? 'bg-blue-100' : 'bg-transparent'
//                 }`}
//               >
//                 {tab.icon === 'person' && (
//                   <CheckBadgeIcon 
//                     size={24} 
//                     color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
//                   />
//                 )}
//                 {tab.icon === 'location' && (
//                   <MapPinIcon 
//                     size={24} 
//                     color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
//                   />
//                 )}
//                 {tab.icon === 'star' && (
//                   <StarIcon 
//                     size={24} 
//                     color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
//                   />
//                 )}
//                  {tab.icon === 'video' && (
//                   <VideoCameraIcon 
//                     size={24} 
//                     color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
//                   />
//                 )}
//                 <Text className={`mt-1 text-sm font-medium ${
//                   activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
//                 }`}>
//                   {tab.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Tab Content */}
//         <View className="mt-2 bg-white">
//           {renderTabContent()}
//         </View>

//         {/* Bottom Spacing */}
//         <View className="h-24" />
//       </ScrollView>

//       {/* Bottom Action Buttons */}
//       <View className="absolute left-0 right-0 p-4 bg-white shadow-lg bottom-10">
//         <View className="flex-row gap-3 space-x-3">
//           <TouchableOpacity className="items-center flex-1 py-4 bg-gray-200 rounded-xl">
//             <View className="flex-row items-center">
//               <ChatBubbleLeftIcon size={20} color="#374151" />
//               <Text className="ml-2 font-semibold text-gray-800">Message</Text>
//             </View>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             onPress={handleBooking}
//             className="items-center py-4 bg-blue-600 flex-2 rounded-xl"
//             style={{ flex: 2 }}
//           >
//             <View className="flex-row items-center">
//               <CalendarDaysIcon size={20} color="white" />
//               <Text className="ml-2 text-lg font-semibold text-white">Book Now</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default BuddyDetailsScreen;























// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   Dimensions,
//   Share,
//   Linking,
// } from 'react-native';
// import { 
//   ArrowLeftIcon, 
//   ShareIcon, 
//   StarIcon, 
//   ChatBubbleLeftIcon,
//   CalendarDaysIcon,
//   BriefcaseIcon,
//   AcademicCapIcon,
//   CheckBadgeIcon,
//   MapPinIcon,
//   ChevronRightIcon,
//   CameraIcon,
//   ShoppingBagIcon,
//   BuildingStorefrontIcon,
//   VideoCameraIcon,
//   HeartIcon,
//   UserGroupIcon,
//   ClockIcon,
// } from 'react-native-heroicons/outline';
// import { 
//   StarIcon as StarSolid,
//   CheckBadgeIcon as CheckBadgeSolid,
//   HeartIcon as HeartSolid,
// } from 'react-native-heroicons/solid';
// import YoutubePlayer from 'react-native-youtube-iframe';

// const { width } = Dimensions.get('window');

// // Sample posts data - in a real app, this would come from props or API
// const touristPosts = [
//   {
//     id: 1,
//     touristName: "Sarah & Mike",
//     touristAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
//     date: "2 days ago",
//     location: "Grand Palace, Bangkok",
//     description: "Amazing day exploring the Grand Palace with our guide! They knew all the hidden stories and helped us capture perfect photos. The local food recommendations were incredible too! 🏰✨",
//     images: [
//       "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//       "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//       "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//     ],
//     videoUrl: "https://youtu.be/jOEzMTNrrd4",
//     videoThumbnail: "https://i.ytimg.com/vi/jOEzMTNrrd4/hqdefault.jpg",
//     likes: 24,
//     duration: "8 hours"
//   },
//   {
//     id: 2,
//     touristName: "James Wilson",
//     touristAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
//     date: "5 days ago",
//     location: "Chatuchak Market & Street Food",
//     description: "Best food tour ever! Our guide took us to authentic local spots that tourists never find. The mango sticky rice and pad thai were life-changing. Already planning our next adventure! 🍜🥭",
//     images: [
//       "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//       "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//     ],
//     videoUrl: "https://youtu.be/jOEzMTNrrd4",
//     videoThumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
//     likes: 31,
//     duration: "6 hours"
//   },
//   {
//     id: 3,
//     touristName: "Emma & Family",
//     touristAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
//     date: "1 week ago",
//     location: "Wat Pho Temple & Boat Tour",
//     description: "Perfect family day! Our guide was so patient with our kids and made the temple visit educational and fun. The longtail boat ride was the highlight - kids are still talking about it! 🛥️⛩️",
//     images: [
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//       "https://images.unsplash.com/photo-1598074926562-e1e6ad5b0bca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//       "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//     ],
//     likes: 18,
//     duration: "7 hours"
//   }
// ];

// const BuddyDetailsScreen = ({ route, navigation }) => {
//   const { buddy } = route.params;
//   const [activeTab, setActiveTab] = useState('about');
//   const [playing, setPlaying] = useState(false);
//   const [likedPosts, setLikedPosts] = useState(new Set());

//   // Extract YouTube video ID from URL
//   const getYouTubeId = (url) => {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return (match && match[2].length === 11) ? match[2] : null;
//   };

//   const videoId = buddy.video ? getYouTubeId(buddy.video) : null;

//   const handlePlayVideo = (videoUrl) => {
//     if (videoUrl) {
//       Linking.openURL(videoUrl);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Check out ${buddy.name}, an amazing local guide in ${buddy.location}!`,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleBooking = () => {
//     // Navigate to booking screen or handle booking logic
//     console.log('Booking buddy:', buddy.name);
//   };

//   const toggleLike = (postId) => {
//     setLikedPosts(prev => {
//       const newLikedPosts = new Set(prev);
//       if (newLikedPosts.has(postId)) {
//         newLikedPosts.delete(postId);
//       } else {
//         newLikedPosts.add(postId);
//       }
//       return newLikedPosts;
//     });
//   };

//   const renderRating = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(
//         <StarSolid key={i} size={14} color="#FFD700" />
//       );
//     }

//     if (hasHalfStar) {
//       stars.push(
//         <View key={fullStars} style={{ position: 'relative' }}>
//           <StarIcon size={14} color="#FFD700" />
//           <View style={{ 
//             position: 'absolute', 
//             top: 0, 
//             left: 0, 
//             width: '50%', 
//             overflow: 'hidden' 
//           }}>
//             <StarSolid size={14} color="#FFD700" />
//           </View>
//         </View>
//       );
//     }

//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <StarIcon key={fullStars + i + 1} size={14} color="#FFD700" />
//       );
//     }

//     return stars;
//   };

//   const getSpecialtyIcon = (specialty) => {
//     if (specialty.includes('Tour')) return <MapPinIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Food')) return <BuildingStorefrontIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Photography')) return <CameraIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Shopping')) return <ShoppingBagIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Adventure')) return <MapPinIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Diving')) return <MapPinIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Cultural')) return <AcademicCapIcon size={24} color="#F59E0B" />;
//     if (specialty.includes('Cooking')) return <BuildingStorefrontIcon size={24} color="#F59E0B" />;
//     return <StarSolid size={24} color="#F59E0B" />;
//   };

//   const renderPost = (post) => (
//     <View key={post.id} className="p-4 mb-4 bg-white shadow-sm rounded-xl">
//       {/* Post Header */}
//       <View className="flex-row items-center mb-3">
//         <Image
//           source={{ uri: post.touristAvatar }}
//           className="w-12 h-12 rounded-full"
//         />
//         <View className="flex-1 ml-3">
//           <Text className="font-semibold text-gray-800">{post.touristName}</Text>
//           <View className="flex-row items-center mt-1">
//             <MapPinIcon size={14} color="#6B7280" />
//             <Text className="ml-1 text-sm text-gray-500">{post.location}</Text>
//           </View>
//         </View>
//         <View className="items-end">
//           <Text className="text-sm text-gray-400">{post.date}</Text>
//           <View className="flex-row items-center mt-1">
//             <ClockIcon size={14} color="#6B7280" />
//             <Text className="ml-1 text-sm text-gray-500">{post.duration}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Post Description */}
//       <Text className="mb-3 leading-5 text-gray-700">{post.description}</Text>

//       {/* Media Gallery */}
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false}
//         className="mb-3"
//       >
//         <View className="flex-row space-x-2">
//           {/* Video if available */}
//           {post.videoUrl && (
//             <TouchableOpacity 
//               className="relative w-40 h-24 overflow-hidden bg-gray-200 rounded-lg"
//               onPress={() => handlePlayVideo(post.videoUrl)}
//             >
//               <Image
//                 source={{ uri: post.videoThumbnail }}
//                 className="absolute w-full h-full"
//                 resizeMode="cover"
//               />
//               <View className="absolute inset-0 items-center justify-center bg-black bg-opacity-30">
//                 <VideoCameraIcon size={24} color="white" />
//               </View>
//             </TouchableOpacity>
//           )}
          
//           {/* Images */}
//           {post.images.map((image, index) => (
//             <View key={index} className="w-24 h-24 overflow-hidden bg-gray-200 rounded-lg">
//               <Image
//                 source={{ uri: image }}
//                 className="w-full h-full"
//                 resizeMode="cover"
//               />
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Post Actions */}
//       <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
//         <TouchableOpacity 
//           className="flex-row items-center"
//           onPress={() => toggleLike(post.id)}
//         >
//           {likedPosts.has(post.id) ? (
//             <HeartSolid size={20} color="#EF4444" />
//           ) : (
//             <HeartIcon size={20} color="#6B7280" />
//           )}
//           <Text className={`ml-2 text-sm ${likedPosts.has(post.id) ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
//             {post.likes + (likedPosts.has(post.id) ? 1 : 0)} likes
//           </Text>
//         </TouchableOpacity>
        
//         <View className="flex-row items-center">
//           <UserGroupIcon size={16} color="#10B981" />
//           <Text className="ml-1 text-sm text-green-600">Great Experience</Text>
//         </View>
//       </View>
//     </View>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'about':
//         return (
//           <View className="p-4">
//             <Text className="mb-6 text-base leading-6 text-gray-800">
//               {buddy.description}
//             </Text>

//             {/* Info Section */}
//             <View className="p-4 mb-6 bg-blue-50 rounded-xl">
//               <Text className="mb-3 text-lg font-semibold text-gray-800">
//                 Professional Information
//               </Text>
//               <View className="space-y-2">
//                 <View className="flex-row items-center">
//                   <BriefcaseIcon size={18} color="#3B82F6" />
//                   <Text className="ml-3 text-gray-700">{buddy.info.experience}</Text>
//                 </View>
//                 <View className="flex-row items-center">
//                   <AcademicCapIcon size={18} color="#3B82F6" />
//                   <Text className="ml-3 text-gray-700">{buddy.info.education}</Text>
//                 </View>
//                 {buddy.info.certifications.map((cert, index) => (
//                   <View key={index} className="flex-row items-center">
//                     <CheckBadgeIcon size={18} color="#10B981" />
//                     <Text className="ml-3 text-gray-700">{cert}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>

//             {/* Languages */}
//             <View className="mb-6">
//               <Text className="mb-3 text-lg font-semibold text-gray-800">Languages</Text>
//               <View className="flex-row flex-wrap">
//                 {buddy.languages.map((lang, index) => (
//                   <View key={index} className="px-3 py-2 mb-2 mr-2 bg-green-100 rounded-full">
//                     <Text className="font-medium text-green-700">{lang}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>

//             {/* Hobbies */}
//             <View className="mb-6">
//               <Text className="mb-3 text-lg font-semibold text-gray-800">Hobbies & Interests</Text>
//               <View className="flex-row flex-wrap">
//                 {buddy.hobbies.map((hobby, index) => (
//                   <View key={index} className="px-3 py-2 mb-2 mr-2 bg-purple-100 rounded-full">
//                     <Text className="text-purple-700">{hobby}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </View>
//         );

//       case 'places':
//         return (
//           <View className="p-4">
//             <Text className="mb-4 text-lg font-semibold text-gray-800">
//               Popular Places I Can Show You
//             </Text>
//             {buddy.touristPlaces.map((place, index) => (
//               <View key={index} className="flex-row items-center p-4 mb-3 bg-white shadow-sm rounded-xl">
//                 <View className="items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-full">
//                   <MapPinIcon size={20} color="#3B82F6" />
//                 </View>
//                 <Text className="flex-1 font-medium text-gray-800">{place}</Text>
//                 <ChevronRightIcon size={20} color="#9CA3AF" />
//               </View>
//             ))}
//           </View>
//         );

//       case 'specialties':
//         return (
//           <View className="p-4">
//             <Text className="mb-4 text-lg font-semibold text-gray-800">
//               My Specialties
//             </Text>
//             {buddy.specialties.map((specialty, index) => (
//               <View key={index} className="p-4 mb-3 bg-white shadow-sm rounded-xl">
//                 <View className="flex-row items-center">
//                   <View className="items-center justify-center w-12 h-12 mr-4 bg-orange-100 rounded-full">
//                     {getSpecialtyIcon(specialty)}
//                   </View>
//                   <Text className="text-lg font-semibold text-gray-800">{specialty}</Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         );

//       case 'video':
//         return (
//           <View className="p-4">
//             {/* Introductory Video Section */}
//             <Text className="mb-4 text-lg font-semibold text-gray-800">
//               {buddy.name}'s Introduction
//             </Text>
//             <View className="overflow-hidden bg-black rounded-xl">
//               <YoutubePlayer
//                 height={220}
//                 play={playing}
//                 videoId="jOEzMTNrrd4" // Static demo video ID
//                 onChangeState={(state) => setPlaying(state === 'playing')}
//               />
//             </View>
//             <Text className="mt-4 mb-8 text-gray-600">
//               Watch {buddy.name}'s personal introduction to learn about their guiding style and personality.
//             </Text>

//             {/* Tourist Posts Section */}
//             <View className="flex-row items-center mb-6">
//               <UserGroupIcon size={24} color="#10B981" />
//               <Text className="ml-2 text-lg font-semibold text-gray-800">
//                 Recent Adventures with Tourists
//               </Text>
//             </View>
            
//             {touristPosts.map(renderPost)}
            
//             {/* Load More Button */}
//             <TouchableOpacity className="items-center py-4 mx-4 bg-gray-100 rounded-xl">
//               <Text className="font-medium text-gray-600">Load More Posts</Text>
//             </TouchableOpacity>
//           </View>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         {/* Profile Header */}
//         <View className="px-6 pt-6 pb-4 bg-white">
//           <View className="items-center">
//             {/* Profile Image */}
//             <View className="relative">
//               <Image
//                 source={{ uri: buddy.image }}
//                 className="w-32 h-32 rounded-full"
//                 resizeMode="cover"
//               />
//               {buddy.verified && (
//                 <View className="absolute items-center justify-center w-10 h-10 bg-green-500 border-4 border-white rounded-full -bottom-1 -right-1">
//                   <CheckBadgeSolid size={20} color="white" />
//                 </View>
//               )}
//             </View>

//             {/* Name and Age */}
//             <Text className="mt-4 text-2xl font-bold text-gray-800">{buddy.name}</Text>
//             <Text className="text-lg text-gray-600">{buddy.age} years old</Text>
            
//             {/* Location */}
//             <View className="flex-row items-center mt-2">
//               <MapPinIcon size={16} color="#EF4444" />
//               <Text className="ml-1 text-gray-600">{buddy.location}</Text>
//             </View>

//             {/* Rating and Price */}
//             <View className="flex-row items-center justify-between w-full mt-6">
//               <View className="items-center">
//                 <View className="flex-row items-center">
//                   {renderRating(buddy.rating)}
//                   <Text className="ml-2 font-semibold text-gray-800">{buddy.rating}</Text>
//                 </View>
//                 <Text className="mt-1 text-sm text-gray-500">Rating</Text>
//               </View>
              
//               <View className="items-center">
//                 <Text className="text-2xl font-bold text-blue-600">฿{buddy.price}</Text>
//                 <Text className="text-sm text-gray-500">per day</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Tab Navigation */}
//         <View className="mt-2 bg-white">
//           <View className="flex-row justify-around py-4 border-b border-gray-200">
//             {[
//               { id: 'about', label: 'About', icon: 'person' },
//               { id: 'places', label: 'Places', icon: 'location' },
//               { id: 'specialties', label: 'Skills', icon: 'star' },
//               { id: 'video', label: 'Video', icon: 'video' }
//             ].map((tab) => (
//               <TouchableOpacity
//                 key={tab.id}
//                 onPress={() => setActiveTab(tab.id)}
//                 className={`items-center py-2 px-4 rounded-lg ${
//                   activeTab === tab.id ? 'bg-blue-100' : 'bg-transparent'
//                 }`}
//               >
//                 {tab.icon === 'person' && (
//                   <CheckBadgeIcon 
//                     size={24} 
//                     color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
//                   />
//                 )}
//                 {tab.icon === 'location' && (
//                   <MapPinIcon 
//                     size={24} 
//                     color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
//                   />
//                 )}
//                 {tab.icon === 'star' && (
//                   <StarIcon 
//                     size={24} 
//                     color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
//                   />
//                 )}
//                 {tab.icon === 'video' && (
//                   <VideoCameraIcon 
//                     size={24} 
//                     color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
//                   />
//                 )}
//                 <Text className={`mt-1 text-sm font-medium ${
//                   activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
//                 }`}>
//                   {tab.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Tab Content */}
//         <View className="mt-2 bg-white">
//           {renderTabContent()}
//         </View>

//         {/* Bottom Spacing */}
//         <View className="h-24" />
//       </ScrollView>

//       {/* Bottom Action Buttons */}
//       <View className="absolute left-0 right-0 p-4 bg-white shadow-lg bottom-10">
//         <View className="flex-row gap-3 space-x-3">
//           <TouchableOpacity className="items-center flex-1 py-4 bg-gray-200 rounded-xl">
//             <View className="flex-row items-center">
//               <ChatBubbleLeftIcon size={20} color="#374151" />
//               <Text className="ml-2 font-semibold text-gray-800">Message</Text>
//             </View>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             onPress={handleBooking}
//             className="items-center py-4 bg-blue-600 flex-2 rounded-xl"
//             style={{ flex: 2 }}
//           >
//             <View className="flex-row items-center">
//               <CalendarDaysIcon size={20} color="white" />
//               <Text className="ml-2 text-lg font-semibold text-white">Book Now</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default BuddyDetailsScreen;






















import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Share,
  Linking,
} from 'react-native';
import { 
  ArrowLeftIcon, 
  ShareIcon, 
  StarIcon, 
  ChatBubbleLeftIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
  MapPinIcon,
  ChevronRightIcon,
  CameraIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  VideoCameraIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
} from 'react-native-heroicons/outline';
import { 
  StarIcon as StarSolid,
  CheckBadgeIcon as CheckBadgeSolid,
  HeartIcon as HeartSolid,
} from 'react-native-heroicons/solid';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

// Dummy carousel images
const carouselImages = [
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// Sample posts data - in a real app, this would come from props or API
const touristPosts = [
  {
    id: 1,
    touristName: "Sarah & Mike",
    touristAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    date: "2 days ago",
    location: "Grand Palace, Bangkok",
    description: "Amazing day exploring the Grand Palace with our guide! They knew all the hidden stories and helped us capture perfect photos. The local food recommendations were incredible too! 🏰✨",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    videoUrl: "https://youtu.be/jOEzMTNrrd4",
    videoThumbnail: "https://i.ytimg.com/vi/jOEzMTNrrd4/hqdefault.jpg",
    likes: 24,
    duration: "8 hours"
  },
  {
    id: 2,
    touristName: "James Wilson",
    touristAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    date: "5 days ago",
    location: "Chatuchak Market & Street Food",
    description: "Best food tour ever! Our guide took us to authentic local spots that tourists never find. The mango sticky rice and pad thai were life-changing. Already planning our next adventure! 🍜🥭",
    images: [
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    videoUrl: "https://youtu.be/jOEzMTNrrd4",
    videoThumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    likes: 31,
    duration: "6 hours"
  },
  {
    id: 3,
    touristName: "Emma & Family",
    touristAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    date: "1 week ago",
    location: "Wat Pho Temple & Boat Tour",
    description: "Perfect family day! Our guide was so patient with our kids and made the temple visit educational and fun. The longtail boat ride was the highlight - kids are still talking about it! 🛥️⛩️",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1598074926562-e1e6ad5b0bca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    likes: 18,
    duration: "7 hours"
  }
];

const BuddyDetailsScreen = ({ route, navigation }) => {
  const { buddy } = route.params;
  const [activeTab, setActiveTab] = useState('about');
  const [playing, setPlaying] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = buddy.video ? getYouTubeId(buddy.video) : null;

  const handlePlayVideo = (videoUrl) => {
    if (videoUrl) {
      Linking.openURL(videoUrl);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${buddy.name}, an amazing local guide in ${buddy.location}!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBooking = () => {
    // Navigate to booking screen or handle booking logic
    console.log('Booking buddy:', buddy.name);
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return newLikedPosts;
    });
  };

  const renderImageCarousel = () => {
    return (
      <View style={{ position: 'relative', height: width * 0.6 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentImageIndex(index);
          }}
        >
          {carouselImages.map((image, index) => (
            <View key={index} style={{ width, height: width * 0.6 }}>
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              {/* Gradient overlay */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  backgroundColor: 'transparent',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                }}
              />
            </View>
          ))}
        </ScrollView>

        {/* Navigation and Action Buttons */}
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 16,
            right: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeftIcon size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShareIcon size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Image indicators */}
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {carouselImages.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  currentImageIndex === index
                    ? '#fff'
                    : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </View>

        {/* Photo count badge */}
        <View
          style={{
            position: 'absolute',
            top: 50,
            right: 70,
            backgroundColor: 'rgba(0,0,0,0.6)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <CameraIcon size={16} color="white" />
          <Text style={{ color: 'white', marginLeft: 4, fontSize: 14, fontWeight: '500' }}>
            {currentImageIndex + 1}/{carouselImages.length}
          </Text>
        </View>
      </View>
    );
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarSolid key={i} size={14} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <View key={fullStars} style={{ position: 'relative' }}>
          <StarIcon size={14} color="#FFD700" />
          <View style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '50%', 
            overflow: 'hidden' 
          }}>
            <StarSolid size={14} color="#FFD700" />
          </View>
        </View>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={fullStars + i + 1} size={14} color="#FFD700" />
      );
    }

    return stars;
  };

  const getSpecialtyIcon = (specialty) => {
    if (specialty.includes('Tour')) return <MapPinIcon size={24} color="#F59E0B" />;
    if (specialty.includes('Food')) return <BuildingStorefrontIcon size={24} color="#F59E0B" />;
    if (specialty.includes('Photography')) return <CameraIcon size={24} color="#F59E0B" />;
    if (specialty.includes('Shopping')) return <ShoppingBagIcon size={24} color="#F59E0B" />;
    if (specialty.includes('Adventure')) return <MapPinIcon size={24} color="#F59E0B" />;
    if (specialty.includes('Diving')) return <MapPinIcon size={24} color="#F59E0B" />;
    if (specialty.includes('Cultural')) return <AcademicCapIcon size={24} color="#F59E0B" />;
    if (specialty.includes('Cooking')) return <BuildingStorefrontIcon size={24} color="#F59E0B" />;
    return <StarSolid size={24} color="#F59E0B" />;
  };

  const renderPost = (post) => (
    <View key={post.id} className="p-4 mb-4 bg-white shadow-sm rounded-xl">
      {/* Post Header */}
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: post.touristAvatar }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1 ml-3">
          <Text className="font-semibold text-gray-800">{post.touristName}</Text>
          <View className="flex-row items-center mt-1">
            <MapPinIcon size={14} color="#6B7280" />
            <Text className="ml-1 text-sm text-gray-500">{post.location}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-sm text-gray-400">{post.date}</Text>
          <View className="flex-row items-center mt-1">
            <ClockIcon size={14} color="#6B7280" />
            <Text className="ml-1 text-sm text-gray-500">{post.duration}</Text>
          </View>
        </View>
      </View>

      {/* Post Description */}
      <Text className="mb-3 leading-5 text-gray-700">{post.description}</Text>

      {/* Media Gallery */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-3"
      >
        <View className="flex-row space-x-2">
          {/* Video if available */}
          {post.videoUrl && (
            <TouchableOpacity 
              className="relative w-40 h-24 overflow-hidden bg-gray-200 rounded-lg"
              onPress={() => handlePlayVideo(post.videoUrl)}
            >
              <Image
                source={{ uri: post.videoThumbnail }}
                className="absolute w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 items-center justify-center bg-black bg-opacity-30">
                <VideoCameraIcon size={24} color="white" />
              </View>
            </TouchableOpacity>
          )}
          
          {/* Images */}
          {post.images.map((image, index) => (
            <View key={index} className="w-24 h-24 overflow-hidden bg-gray-200 rounded-lg">
              <Image
                source={{ uri: image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Post Actions */}
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={() => toggleLike(post.id)}
        >
          {likedPosts.has(post.id) ? (
            <HeartSolid size={20} color="#EF4444" />
          ) : (
            <HeartIcon size={20} color="#6B7280" />
          )}
          <Text className={`ml-2 text-sm ${likedPosts.has(post.id) ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
            {post.likes + (likedPosts.has(post.id) ? 1 : 0)} likes
          </Text>
        </TouchableOpacity>
        
        <View className="flex-row items-center">
          <UserGroupIcon size={16} color="#10B981" />
          <Text className="ml-1 text-sm text-green-600">Great Experience</Text>
        </View>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <View className="p-4">
            <Text className="mb-6 text-base leading-6 text-gray-800">
              {buddy.description}
            </Text>

            {/* Info Section */}
            <View className="p-4 mb-6 bg-blue-50 rounded-xl">
              <Text className="mb-3 text-lg font-semibold text-gray-800">
                Professional Information
              </Text>
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <BriefcaseIcon size={18} color="#3B82F6" />
                  <Text className="ml-3 text-gray-700">{buddy.info.experience}</Text>
                </View>
                <View className="flex-row items-center">
                  <AcademicCapIcon size={18} color="#3B82F6" />
                  <Text className="ml-3 text-gray-700">{buddy.info.education}</Text>
                </View>
                {buddy.info.certifications.map((cert, index) => (
                  <View key={index} className="flex-row items-center">
                    <CheckBadgeIcon size={18} color="#10B981" />
                    <Text className="ml-3 text-gray-700">{cert}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Languages */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-gray-800">Languages</Text>
              <View className="flex-row flex-wrap">
                {buddy.languages.map((lang, index) => (
                  <View key={index} className="px-3 py-2 mb-2 mr-2 bg-green-100 rounded-full">
                    <Text className="font-medium text-green-700">{lang}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Hobbies */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-gray-800">Hobbies & Interests</Text>
              <View className="flex-row flex-wrap">
                {buddy.hobbies.map((hobby, index) => (
                  <View key={index} className="px-3 py-2 mb-2 mr-2 bg-purple-100 rounded-full">
                    <Text className="text-purple-700">{hobby}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );

      case 'places':
        return (
          <View className="p-4">
            <Text className="mb-4 text-lg font-semibold text-gray-800">
              Popular Places I Can Show You
            </Text>
            {buddy.touristPlaces.map((place, index) => (
              <View key={index} className="flex-row items-center p-4 mb-3 bg-white shadow-sm rounded-xl">
                <View className="items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-full">
                  <MapPinIcon size={20} color="#3B82F6" />
                </View>
                <Text className="flex-1 font-medium text-gray-800">{place}</Text>
                <ChevronRightIcon size={20} color="#9CA3AF" />
              </View>
            ))}
          </View>
        );

      case 'specialties':
        return (
          <View className="p-4">
            <Text className="mb-4 text-lg font-semibold text-gray-800">
              My Specialties
            </Text>
            {buddy.specialties.map((specialty, index) => (
              <View key={index} className="p-4 mb-3 bg-white shadow-sm rounded-xl">
                <View className="flex-row items-center">
                  <View className="items-center justify-center w-12 h-12 mr-4 bg-orange-100 rounded-full">
                    {getSpecialtyIcon(specialty)}
                  </View>
                  <Text className="text-lg font-semibold text-gray-800">{specialty}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'video':
        return (
          <View className="p-4">
            {/* Introductory Video Section */}
            <Text className="mb-4 text-lg font-semibold text-gray-800">
              {buddy.name}'s Introduction
            </Text>
            <View className="overflow-hidden bg-black rounded-xl">
              <YoutubePlayer
                height={220}
                play={playing}
                videoId="jOEzMTNrrd4" // Static demo video ID
                onChangeState={(state) => setPlaying(state === 'playing')}
              />
            </View>
            <Text className="mt-4 mb-8 text-gray-600">
              Watch {buddy.name}'s personal introduction to learn about their guiding style and personality.
            </Text>

            {/* Tourist Posts Section */}
            <View className="flex-row items-center mb-6">
              <UserGroupIcon size={24} color="#10B981" />
              <Text className="ml-2 text-lg font-semibold text-gray-800">
                Recent Adventures with Tourists
              </Text>
            </View>
            
            {touristPosts.map(renderPost)}
            
            {/* Load More Button */}
            <TouchableOpacity className="items-center py-4 mx-4 bg-gray-100 rounded-xl">
              <Text className="font-medium text-gray-600">Load More Posts</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        {renderImageCarousel()}

        {/* Profile Header */}
        <View className="px-6 pt-6 pb-4 bg-white" style={{ marginTop: -40, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <View className="items-center">
            {/* Profile Image */}
            <View className="relative" style={{ marginTop: -50 }}>
              <Image
                source={{ uri: buddy.image }}
                className="w-32 h-32 border-4 border-white rounded-full"
                resizeMode="cover"
              />
              {buddy.verified && (
                <View className="absolute items-center justify-center w-10 h-10 bg-green-500 border-4 border-white rounded-full -bottom-1 -right-1">
                  <CheckBadgeSolid size={20} color="white" />
                </View>
              )}
            </View>

            {/* Name and Age */}
            <Text className="mt-4 text-2xl font-bold text-gray-800">{buddy.name}</Text>
            <Text className="text-lg text-gray-600">{buddy.age} years old</Text>
            
            {/* Location */}
            <View className="flex-row items-center mt-2">
              <MapPinIcon size={16} color="#EF4444" />
              <Text className="ml-1 text-gray-600">{buddy.location}</Text>
            </View>

            {/* Rating and Price */}
            <View className="flex-row items-center justify-between w-full mt-6">
              <View className="items-center">
                <View className="flex-row items-center">
                  {renderRating(buddy.rating)}
                  <Text className="ml-2 font-semibold text-gray-800">{buddy.rating}</Text>
                </View>
                <Text className="mt-1 text-sm text-gray-500">Rating</Text>
              </View>
              
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-600">฿{buddy.price}</Text>
                <Text className="text-sm text-gray-500">per day</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="mt-2 bg-white">
          <View className="flex-row justify-around py-4 border-b border-gray-200">
            {[
              { id: 'about', label: 'About', icon: 'person' },
              { id: 'places', label: 'Places', icon: 'location' },
              { id: 'specialties', label: 'Skills', icon: 'star' },
              { id: 'video', label: 'Video', icon: 'video' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`items-center py-2 px-4 rounded-lg ${
                  activeTab === tab.id ? 'bg-blue-100' : 'bg-transparent'
                }`}
              >
                {tab.icon === 'person' && (
                  <CheckBadgeIcon 
                    size={24} 
                    color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
                  />
                )}
                {tab.icon === 'location' && (
                  <MapPinIcon 
                    size={24} 
                    color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
                  />
                )}
                {tab.icon === 'star' && (
                  <StarIcon 
                    size={24} 
                    color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
                  />
                )}
                {tab.icon === 'video' && (
                  <VideoCameraIcon 
                    size={24} 
                    color={activeTab === tab.id ? '#3B82F6' : '#9CA3AF'} 
                  />
                )}
                <Text className={`mt-1 text-sm font-medium ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tab Content */}
        <View className="mt-2 bg-white">
          {renderTabContent()}
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="absolute left-0 right-0 p-4 bg-white shadow-lg bottom-10">
        <View className="flex-row gap-3 space-x-3">
          <TouchableOpacity className="items-center flex-1 py-4 bg-gray-200 rounded-xl">
            <View className="flex-row items-center">
              <ChatBubbleLeftIcon size={20} color="#374151" />
              <Text className="ml-2 font-semibold text-gray-800">Message</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleBooking}
            className="items-center py-4 bg-blue-600 flex-2 rounded-xl"
            style={{ flex: 2 }}
          >
            <View className="flex-row items-center">
              <CalendarDaysIcon size={20} color="white" />
              <Text className="ml-2 text-lg font-semibold text-white">Book Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BuddyDetailsScreen;