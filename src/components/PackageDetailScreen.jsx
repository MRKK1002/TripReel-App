// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   ActivityIndicator,
//   StatusBar,
//   Share,
//   StyleSheet,
//   TextInput,
// } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { SERVER_URL } from '../services/api';
// import { useWishlist } from '../context/WishlistContext';

// const { width } = Dimensions.get('window');

// // ─── Inline icon components (emoji-based, no extra deps) ─────────────────────
// const StarIcon = ({ size, filled }) => (
//   <Text style={{ fontSize: size, color: filled ? '#f59e0b' : '#d1d5db' }}>
//     ★
//   </Text>
// );
// const UserIcon = ({ size }) => <Text style={{ fontSize: size }}>👤</Text>;
// const CalendarIcon = ({ size }) => <Text style={{ fontSize: size }}>📅</Text>;
// const MapPinIcon = ({ size }) => <Text style={{ fontSize: size }}>📍</Text>;
// const ClockIcon = ({ size }) => <Text style={{ fontSize: size }}>⏰</Text>;
// const CheckIcon = ({ size }) => (
//   <Text style={{ fontSize: size, color: 'white' }}>✓</Text>
// );
// const XMarkIcon = ({ size }) => (
//   <Text style={{ fontSize: size, color: 'white' }}>✗</Text>
// );
// const ShareIcon = ({ size }) => <Text style={{ fontSize: size }}>📤</Text>;
// const WalletIcon = ({ size }) => <Text style={{ fontSize: size }}>💳</Text>;
// const HeartIcon = ({ size, solid }) => (
//   <Text style={{ fontSize: size }}>{solid ? '❤️' : '🤍'}</Text>
// );
// const BackIcon = ({ size }) => (
//   <Text style={{ fontSize: size, color: '#1f2937' }}>←</Text>
// );

// // ─── Static reviews (no reviews endpoint yet) ─────────────────────────────────
// const STATIC_REVIEWS = [
//   {
//     id: 1,
//     name: 'Sarah Johnson',
//     rating: 5,
//     date: '2 days ago',
//     comment:
//       'Absolutely incredible experience! The island was breathtaking and the activities were perfectly organized.',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
//   },
//   {
//     id: 2,
//     name: 'Mike Chen',
//     rating: 5,
//     date: '1 week ago',
//     comment:
//       'Best vacation ever! The destination was amazing and the service was top-notch. Highly recommend.',
//     avatar:
//       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
//   },
//   {
//     id: 3,
//     name: 'Emma Wilson',
//     rating: 4,
//     date: '2 weeks ago',
//     comment:
//       'Great concept and beautiful location. Would definitely book again!',
//     avatar:
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
//   },
//   {
//     id: 4,
//     name: 'David Rodriguez',
//     rating: 5,
//     date: '3 weeks ago',
//     comment:
//       'Perfect for couples looking for adventure. My partner and I were amazed by the destination.',
//     avatar:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
//   },
// ];

// // ─── Main Component ───────────────────────────────────────────────────────────
// const PackageDetailScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();

//   const [activeTab, setActiveTab] = useState('overview');
//   const [currentImageIdx, setCurrentImageIdx] = useState(0);
//   const [expandedDays, setExpandedDays] = useState({});

//   const { toggleWishlist, isSaved } = useWishlist();

//   // ── Guard: no package passed ──────────────────────────────────────────────
//   if (!route.params?.package) {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator size="large" color="#1F8A70" />
//       </View>
//     );
//   }

//   // ── Extract backend fields with safe defaults ─────────────────────────────
//   const pkg = route.params.package;

//   const title = pkg.title || 'Package';
//   const price = pkg.price || 0;
//   const location = pkg.location || '';
//   const duration = pkg.duration || '';
//   const rating = pkg.rating || 4.5;
//   const reviews = pkg.reviews || '';
//   const badge = pkg.badge || 'Popular';
//   const about = pkg.about || pkg.description || 'No description available.';
//   const highlights = Array.isArray(pkg.highlights) ? pkg.highlights : [];
//   const inclusions = Array.isArray(pkg.inclusions) ? pkg.inclusions : [];
//   const exclusions = Array.isArray(pkg.exclusions) ? pkg.exclusions : [];
//   const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
//   const addons = Array.isArray(pkg.addons) ? pkg.addons : [];

//   // Build image list — prefer images[], fall back to image_url
//   const imageList =
//     Array.isArray(pkg.images) && pkg.images.length > 0
//       ? pkg.images
//       : pkg.image_url
//       ? [pkg.image_url]
//       : [];

//   // ── Helpers ───────────────────────────────────────────────────────────────
//   const renderStars = count =>
//     [1, 2, 3, 4, 5].map(i => (
//       <StarIcon key={i} size={14} filled={i <= Math.round(count)} />
//     ));

//   const toggleDay = day =>
//     setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Check out this amazing ${title} package for just ₹${price}!`,
//       });
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

//   // ── Image Carousel ────────────────────────────────────────────────────────
//   const renderImageCarousel = () => {
//     if (!imageList.length) {
//       return (
//         <View
//           style={{
//             width,
//             height: width * 0.75,
//             backgroundColor: '#E6F4EF',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Text style={{ color: '#94A3B8', fontSize: 14 }}>
//             No images available
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <View style={{ position: 'relative' }}>
//         <ScrollView
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onMomentumScrollEnd={e => {
//             const idx = Math.round(e.nativeEvent.contentOffset.x / width);
//             setCurrentImageIdx(idx);
//           }}
//         >
//           {imageList.map((img, i) => (
//             <View key={i} style={{ width, height: width * 0.75 }}>
//               <Image
//                 source={{ uri: img }}
//                 style={{ width: '100%', height: '100%' }}
//                 resizeMode="cover"
//               />
//               <View
//                 style={{
//                   position: 'absolute',
//                   inset: 0,
//                   backgroundColor: 'rgba(0,0,0,0.08)',
//                 }}
//               />
//             </View>
//           ))}
//         </ScrollView>

//         {/* Back button */}
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backBtn}
//         >
//           <BackIcon size={20} />
//         </TouchableOpacity>

//         {/* Share + Favourite */}
//         <View style={styles.carouselActions}>
//           <TouchableOpacity onPress={handleShare} style={styles.actionBtn}>
//             <ShareIcon size={18} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => toggleWishlist(pkg._id)}
//             style={styles.actionBtn}
//           >
//             <HeartIcon size={18} solid={isSaved(pkg._id)} />
//           </TouchableOpacity>
//         </View>

//         {/* Dot indicators */}
//         <View style={styles.dotRow}>
//           {imageList.map((_, i) => (
//             <View
//               key={i}
//               style={[
//                 styles.dot,
//                 {
//                   backgroundColor:
//                     currentImageIdx === i ? '#fff' : 'rgba(255,255,255,0.45)',
//                 },
//               ]}
//             />
//           ))}
//         </View>

//         {/* Price badge */}
//         <View style={styles.priceBadge}>
//           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
//             ₹{price.toLocaleString('en-IN')}
//           </Text>
//           <Text style={{ color: '#dcfce7', fontSize: 11, textAlign: 'center' }}>
//             per guest
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   // ── Tab: Overview ─────────────────────────────────────────────────────────
//   const renderOverview = () => (
//     <View style={{ paddingBottom: 24 }}>
//       {/* Quick Facts */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Quick Facts</Text>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//           {[
//             {
//               icon: <MapPinIcon size={22} />,
//               label: location || 'Location',
//               sub: 'Destination',
//             },
//             {
//               icon: <ClockIcon size={22} />,
//               label: duration || '—',
//               sub: 'Duration',
//             },
//             {
//               icon: <StarIcon size={22} filled />,
//               label: String(rating),
//               sub: 'Rating',
//             },
//             { icon: <UserIcon size={22} />, label: badge, sub: 'Badge' },
//           ].map((f, i) => (
//             <View key={i} style={{ alignItems: 'center', flex: 1 }}>
//               <View
//                 style={[
//                   styles.factIcon,
//                   {
//                     backgroundColor: [
//                       '#dbeafe',
//                       '#dcfce7',
//                       '#fef9c3',
//                       '#e9d5ff',
//                     ][i],
//                   },
//                 ]}
//               >
//                 {f.icon}
//               </View>
//               <Text
//                 style={{
//                   fontSize: 12,
//                   fontWeight: '600',
//                   color: '#1f2937',
//                   textAlign: 'center',
//                   marginTop: 4,
//                 }}
//                 numberOfLines={1}
//               >
//                 {f.label}
//               </Text>
//               <Text
//                 style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}
//               >
//                 {f.sub}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* About */}
//       <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
//         <Text style={styles.sectionTitle}>About This Package</Text>
//         <Text style={{ fontSize: 15, lineHeight: 24, color: '#374151' }}>
//           {about}
//         </Text>
//       </View>

//       {/* Highlights */}
//       {highlights.length > 0 && (
//         <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
//           <View style={[styles.inclusionBlock, { backgroundColor: '#EFF6FF' }]}>
//             <Text style={[styles.inclusionTitle, { color: '#1E40AF' }]}>
//               Highlights
//             </Text>
//             {highlights.map((h, i) => (
//               <View key={i} style={styles.inclusionRow}>
//                 <View
//                   style={[styles.inclusionDot, { backgroundColor: '#3b82f6' }]}
//                 >
//                   <CheckIcon size={12} />
//                 </View>
//                 <Text style={{ flex: 1, color: '#1E40AF', fontSize: 14 }}>
//                   {h}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       )}

//       {/* Inclusions */}
//       {inclusions.length > 0 && (
//         <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
//           <View style={[styles.inclusionBlock, { backgroundColor: '#f0fdf4' }]}>
//             <Text style={[styles.inclusionTitle, { color: '#166534' }]}>
//               What's Included
//             </Text>
//             {inclusions.map((inc, i) => (
//               <View key={i} style={styles.inclusionRow}>
//                 <View
//                   style={[styles.inclusionDot, { backgroundColor: '#10b981' }]}
//                 >
//                   <CheckIcon size={12} />
//                 </View>
//                 <Text style={{ flex: 1, color: '#166534', fontSize: 14 }}>
//                   {inc}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       )}

//       {/* Exclusions */}
//       {exclusions.length > 0 && (
//         <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
//           <View style={[styles.inclusionBlock, { backgroundColor: '#fef2f2' }]}>
//             <Text style={[styles.inclusionTitle, { color: '#991b1b' }]}>
//               Not Included
//             </Text>
//             {exclusions.map((exc, i) => (
//               <View key={i} style={styles.inclusionRow}>
//                 <View
//                   style={[styles.inclusionDot, { backgroundColor: '#ef4444' }]}
//                 >
//                   <XMarkIcon size={12} />
//                 </View>
//                 <Text style={{ flex: 1, color: '#991b1b', fontSize: 14 }}>
//                   {exc}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       )}

//       {/* Add-ons */}
//       {addons.length > 0 && (
//         <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
//           <Text style={styles.sectionTitle}>Add-ons</Text>
//           {addons.map((addon, i) => (
//             <View key={i} style={styles.addonCard}>
//               <View style={{ flex: 1 }}>
//                 <Text
//                   style={{ fontWeight: '600', color: '#1f2937', fontSize: 15 }}
//                 >
//                   {addon.name}
//                 </Text>
//                 {Array.isArray(addon.details) && addon.details.length > 0 && (
//                   <Text
//                     style={{ color: '#6b7280', fontSize: 13, marginTop: 2 }}
//                   >
//                     {addon.details.join(' · ')}
//                   </Text>
//                 )}
//               </View>
//               <View style={styles.addonPrice}>
//                 <Text
//                   style={{ color: '#1F8A70', fontWeight: '700', fontSize: 15 }}
//                 >
//                   +₹{addon.price?.toLocaleString('en-IN') || 0}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       )}
//     </View>
//   );

//   // ── Tab: Itinerary ────────────────────────────────────────────────────────
//   const renderItinerary = () => {
//     if (!itinerary.length) {
//       return (
//         <View style={{ padding: 32, alignItems: 'center' }}>
//           <Text style={{ color: '#6b7280', fontSize: 14 }}>
//             No itinerary available for this package.
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
//         <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>
//           Day-by-Day Itinerary
//         </Text>
//         {itinerary.map((day, i) => (
//           <View key={i} style={styles.dayCard}>
//             <TouchableOpacity
//               onPress={() => toggleDay(day.day ?? i)}
//               style={styles.dayHeader}
//               activeOpacity={0.8}
//             >
//               <View style={styles.dayBadge}>
//                 <Text
//                   style={{ color: 'white', fontWeight: '700', fontSize: 13 }}
//                 >
//                   {day.day ?? i + 1}
//                 </Text>
//               </View>
//               <View style={{ flex: 1, marginLeft: 12 }}>
//                 <Text
//                   style={{ fontWeight: '600', color: '#1f2937', fontSize: 15 }}
//                 >
//                   Day {day.day ?? i + 1}: {day.title || 'Activities'}
//                 </Text>
//                 {Array.isArray(day.points) && day.points.length > 0 && (
//                   <Text
//                     style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}
//                     numberOfLines={1}
//                   >
//                     {day.points[0]}
//                   </Text>
//                 )}
//               </View>
//               <Text style={{ color: '#1F8A70', fontSize: 18 }}>
//                 {expandedDays[day.day ?? i] ? '▲' : '▼'}
//               </Text>
//             </TouchableOpacity>

//             {expandedDays[day.day ?? i] && Array.isArray(day.points) && (
//               <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
//                 {day.points.map((point, j) => (
//                   <View
//                     key={j}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'flex-start',
//                       marginTop: 10,
//                     }}
//                   >
//                     <View style={styles.pointDot} />
//                     <Text
//                       style={{
//                         flex: 1,
//                         color: '#374151',
//                         fontSize: 14,
//                         lineHeight: 20,
//                       }}
//                     >
//                       {point}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         ))}
//       </View>
//     );
//   };

//   // ── Tab: Reviews ──────────────────────────────────────────────────────────
//   const renderReviews = () => (
//     <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
//       {/* Summary */}
//       <View style={styles.reviewSummary}>
//         <Text style={{ fontSize: 40, fontWeight: '800', color: '#1f2937' }}>
//           4.8
//         </Text>
//         <View style={{ flexDirection: 'row', marginTop: 4 }}>
//           {renderStars(5)}
//         </View>
//         <Text style={{ color: '#6b7280', marginTop: 4 }}>
//           Based on 127 reviews
//         </Text>
//         <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 2 }}>
//           96% of guests recommend this
//         </Text>
//       </View>

//       {STATIC_REVIEWS.map(rev => (
//         <View key={rev.id} style={styles.reviewCard}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginBottom: 10,
//             }}
//           >
//             <Image source={{ uri: rev.avatar }} style={styles.reviewAvatar} />
//             <View style={{ flex: 1 }}>
//               <Text style={{ fontWeight: '600', color: '#1f2937' }}>
//                 {rev.name}
//               </Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 2,
//                 }}
//               >
//                 <View style={{ flexDirection: 'row', marginRight: 8 }}>
//                   {renderStars(rev.rating)}
//                 </View>
//                 <Text style={{ fontSize: 12, color: '#9ca3af' }}>
//                   {rev.date}
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <Text style={{ color: '#374151', lineHeight: 20, fontSize: 14 }}>
//             {rev.comment}
//           </Text>
//         </View>
//       ))}
//     </View>
//   );

//   // ── Tab content router ────────────────────────────────────────────────────
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return renderOverview();
//       case 'itinerary':
//         return renderItinerary();
//       case 'reviews':
//         return renderReviews();
//       default:
//         return renderOverview();
//     }
//   };

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
//       <StatusBar
//         barStyle="light-content"
//         translucent
//         backgroundColor="transparent"
//       />

//       <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
//         {/* Image Carousel */}
//         {renderImageCarousel()}

//         {/* Title + Meta */}
//         <View style={styles.titleBlock}>
//           <Text style={styles.titleText}>{title}</Text>
//           {location ? (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginTop: 4,
//               }}
//             >
//               <MapPinIcon size={14} />
//               <Text style={{ color: '#6b7280', fontSize: 14, marginLeft: 4 }}>
//                 {location}
//               </Text>
//             </View>
//           ) : null}
//           <View
//             style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
//           >
//             <View style={{ flexDirection: 'row', marginRight: 8 }}>
//               {renderStars(rating)}
//             </View>
//             <Text style={{ color: '#6b7280', fontSize: 13 }}>
//               {rating} {reviews ? `• ${reviews}` : ''}
//             </Text>
//           </View>
//         </View>

//         {/* Tab Bar */}
//         <View style={styles.tabBar}>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingHorizontal: 16,
//               gap: 8,
//               paddingVertical: 10,
//             }}
//           >
//             {[
//               { key: 'overview', label: 'Overview' },
//               { key: 'itinerary', label: 'Itinerary' },
//               { key: 'reviews', label: 'Reviews' },
//             ].map(tab => (
//               <TouchableOpacity
//                 key={tab.key}
//                 onPress={() => setActiveTab(tab.key)}
//                 style={[
//                   styles.tabBtn,
//                   activeTab === tab.key && styles.tabBtnActive,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.tabLabel,
//                     activeTab === tab.key && styles.tabLabelActive,
//                   ]}
//                 >
//                   {tab.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* Tab Content */}
//         <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
//           {renderTabContent()}
//         </View>

//         {/* Bottom spacing for fixed button */}
//         <View style={{ height: 100 }} />
//       </ScrollView>

//       {/* Fixed Book Now Button */}
//       <View style={styles.bookBar}>
//         <View>
//           <Text style={{ fontSize: 12, color: '#6b7280' }}>Total price</Text>
//           <Text style={{ fontSize: 20, fontWeight: '800', color: '#1f2937' }}>
//             ₹{price.toLocaleString('en-IN')}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={styles.bookBtn}
//           onPress={() =>
//             Alert.alert(
//               'Book Package',
//               `You're about to book "${title}" for ₹${price.toLocaleString(
//                 'en-IN',
//               )}`,
//               [{ text: 'OK' }],
//             )
//           }
//         >
//           <WalletIcon size={20} />
//           <Text style={styles.bookBtnText}>Book Now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   // Carousel
//   backBtn: {
//     position: 'absolute',
//     top: 48,
//     left: 16,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   carouselActions: {
//     position: 'absolute',
//     top: 48,
//     right: 16,
//     flexDirection: 'row',
//     gap: 10,
//   },
//   actionBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dotRow: {
//     position: 'absolute',
//     bottom: 14,
//     left: 16,
//     flexDirection: 'row',
//     gap: 6,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   priceBadge: {
//     position: 'absolute',
//     bottom: 14,
//     right: 16,
//     backgroundColor: '#1F8A70',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   // Title block
//   titleBlock: {
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//     backgroundColor: 'white',
//   },
//   titleText: {
//     fontSize: 24,
//     fontWeight: '800',
//     color: '#1f2937',
//   },
//   // Tab bar
//   tabBar: {
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f4f6',
//   },
//   tabBtn: {
//     paddingHorizontal: 22,
//     paddingVertical: 10,
//     borderRadius: 20,
//     backgroundColor: '#f3f4f6',
//   },
//   tabBtnActive: {
//     backgroundColor: '#1F8A70',
//   },
//   tabLabel: {
//     fontWeight: '600',
//     color: '#6b7280',
//     fontSize: 14,
//   },
//   tabLabelActive: {
//     color: 'white',
//   },
//   // Cards
//   card: {
//     backgroundColor: '#f8fafc',
//     marginHorizontal: 16,
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 12,
//   },
//   factIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   // Inclusions / exclusions
//   inclusionBlock: {
//     borderRadius: 14,
//     padding: 16,
//   },
//   inclusionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 10,
//   },
//   inclusionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   inclusionDot: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   // Add-ons
//   addonCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8fafc',
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//   },
//   addonPrice: {
//     backgroundColor: '#E6F4EF',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 10,
//   },

//   dayCard: {
//     backgroundColor: 'white',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#f3f4f6',
//     marginBottom: 12,
//     overflow: 'hidden',
//   },
//   dayHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 14,
//     backgroundColor: '#f8fafc',
//   },
//   dayBadge: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: '#1F8A70',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pointDot: {
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: '#1F8A70',
//     marginRight: 10,
//     marginTop: 7,
//   },
//   reviewSummary: {
//     backgroundColor: '#f8fafc',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   reviewCard: {
//     backgroundColor: 'white',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#f3f4f6',
//     padding: 16,
//     marginBottom: 14,
//   },
//   reviewAvatar: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     marginRight: 12,
//   },
//   bookBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#f3f4f6',
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   bookBtn: {
//     backgroundColor: '#1F8A70',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 28,
//     paddingVertical: 14,
//     borderRadius: 14,
//     gap: 8,
//     shadowColor: '#1F8A70',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   bookBtnText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '700',
//   },
// });

// export default PackageDetailScreen;
 
 


import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  Share,
  PanResponder,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SERVER_URL } from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import {
  ArrowLeft,
  MapPin,
  Star,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Upload,
  Heart,
  Tag,
} from 'lucide-react-native';
import './../../android/app/src/utils/globalFont.js';

const { width } = Dimensions.get('window');

// Resolve relative /uploads/... paths to full URLs
const resolveUrl = url => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  // ensure leading slash
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SERVER_URL}${path}`;
};

const PackageDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destination: _destination, package: _package } = route.params ?? {};
  const destination = _destination ?? _package;

  // DEBUG — remove after confirming images load
  console.log('[PackageDetail] destination keys:', destination ? Object.keys(destination) : 'undefined');
  console.log('[PackageDetail] image_url:', destination?.image_url);
  console.log('[PackageDetail] images:', destination?.images);

  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [showInclusions, setShowInclusions] = useState(true);
  const [showPolicies, setShowPolicies] = useState(true);
  const [selectedDate, setSelectedDate] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const imageOpacity = useRef(new Animated.Value(1)).current;
  const activeImageIndexRef = useRef(0);

  // Build image list: cover photo first, then additional operator images
  const rawImages = [
    destination?.image_url,
    ...(destination?.images || []),
  ];
  const images = rawImages.map(resolveUrl).filter(Boolean);
  console.log('[PackageDetail] resolved images:', images);
  const priceStr = `₹${destination?.price?.toLocaleString('en-IN') ?? '12,999'}`;
  const dates = [
    { label: '12-14 Feb 2026', price: priceStr },
    { label: '12-14 Feb 2028', price: priceStr },
  ];

  const handleImageChange = (newIndex) => {
    if (newIndex === activeImageIndexRef.current) return;
    if (newIndex >= 0 && newIndex < images.length) {
      Animated.sequence([
        Animated.timing(imageOpacity, { 
          toValue: 0, 
          duration: 150, 
          useNativeDriver: true 
        }),
        Animated.timing(imageOpacity, { 
          toValue: 1, 
          duration: 150, 
          useNativeDriver: true 
        }),
      ]).start();

      activeImageIndexRef.current = newIndex; // ✅ update ref
      setActiveImageIndex(newIndex);          // ✅ update state for UI
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
      onPanResponderGrant: () => {
        if (scrollViewRef.current) scrollViewRef.current.setNativeProps({ scrollEnabled: false });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (scrollViewRef.current) scrollViewRef.current.setNativeProps({ scrollEnabled: true });

        if (Math.abs(gestureState.dx) > 50) {
          if (gestureState.dx > 0 && activeImageIndexRef.current > 0) {
            handleImageChange(activeImageIndexRef.current - 1); // ✅ reads latest
          } else if (gestureState.dx < 0 && activeImageIndexRef.current < images.length - 1) {
            handleImageChange(activeImageIndexRef.current + 1); // ✅ reads latest
          }
        }
      },
      onPanResponderTerminate: () => {
        if (scrollViewRef.current) scrollViewRef.current.setNativeProps({ scrollEnabled: true });
      },
    })
  ).current;

  const handleImagePress = (index) => {
    handleImageChange(index);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${destination.title} - ${destination.priceLabel}`,
      });
    } catch (_) {}
  };

  // ── Wishlist (real API via context) ─────────────────────────────────────
  const { toggleWishlist, isSaved } = useWishlist();
  const isWishlisted = destination ? isSaved(destination._id) : false;

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#F8FAFC' }}
      >
        {/* ── Hero Image Carousel ── */}
        <View
          style={{ width, height: 320, backgroundColor: '#E5E7EB' }}
          {...panResponder.panHandlers}
        >
          {/* Full-bleed images */}
          {images.map((img, i) => (
            <Animated.Image
              key={i}
              source={{ uri: img }}
              style={{
                position: 'absolute',
                width,
                height: 320,
                opacity: i === activeImageIndex ? imageOpacity : 0,
              }}
              resizeMode="cover"
            />
          ))}

          {/* Dark gradient at bottom for thumbnail contrast */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 110,
              background: 'transparent',
            }}
            pointerEvents="none"
          />

          {/* ── Top bar: back + share + heart ── */}
          <SafeAreaView
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingTop: 10,
              }}
            >
              {/* Back button */}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 3,
                }}
              >
                <ArrowLeft size={20} color="#111827" />
              </TouchableOpacity>

              {/* Share + Heart */}
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  onPress={handleShare}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.15,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                >
                  <Upload size={18} color="#111827" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => destination && toggleWishlist(destination._id)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.15,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                >
                  <Heart
                    size={18}
                    color={isWishlisted ? '#EF4444' : '#111827'}
                    fill={isWishlisted ? '#EF4444' : 'none'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>

          {/* ── Bottom: thumbnail strip ── */}
          <View
            style={{
              position: 'absolute',
              bottom: 12,
              left: 16,
              right: 16,
              flexDirection: 'row',
              gap: 8,
              alignItems: 'flex-end',
            }}
          >
            {images.slice(0, 4).map((img, i) => {
              const isActive = i === activeImageIndex;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleImagePress(i)}
                  activeOpacity={0.85}
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    overflow: 'hidden',
                    borderWidth: isActive ? 2 : 1.5,
                    borderColor: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                    height: isActive ? 52 : 46,
                  }}
                >
                  <Image
                    source={{ uri: img }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ backgroundColor: '#F8FAFC' }}>
          {/* Title */}
          <View
            style={{
              backgroundColor: '#F8FAFC',
              paddingHorizontal: 16,
              paddingTop: 18,
              paddingBottom: 4,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 6,
              }}
            >
              {destination.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Star size={15} color="#4CAF50" fill="#4CAF50" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#111827',
                  marginLeft: 5,
                }}
              >
                {destination.rating}
              </Text>
              <Text style={{ fontSize: 13, color: '#9CA3AF', marginLeft: 6 }}>
                • {destination.reviews} reviews
              </Text>
            </View>
          </View>

          {/* Destination + Price card */}
          <View
            style={{ marginHorizontal: 16, marginTop: 12, marginBottom: 12 }}
          >
            <View
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: 14,
                flexDirection: 'row',
                overflow: 'hidden',
              }}
              className="border-[#E5E7EB] border-[0.8px]"
            >
              {/* Left: Destination */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 14,
                }}
              >
                <MapPin size={20} color="#3B4A6B" strokeWidth={1.8} />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: '#1E2A45',
                    }}
                  >
                    {destination.location}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#7B8DB0', marginTop: 1 }}
                  >
                    Destination
                  </Text>
                </View>
              </View>
              {/* Divider */}
              <View
                style={{
                  width: 1,
                  backgroundColor: '#C7D0E8',
                  marginVertical: 10,
                }}
              />
              {/* Right: Price */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 14,
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Tag size={20} color="#3B4A6B" strokeWidth={1.8} />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: '#1E2A45',
                    }}
                  >
                    {destination.priceLabel}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#7B8DB0', marginTop: 1 }}
                  >
                    Price
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Highlights card */}
          <View
            style={{
              marginHorizontal: 16,
              marginBottom: 12,
              backgroundColor: '#F8FAFC',
              borderRadius: 16,
              padding: 18,
            }}
            className="border-[#E5E7EB] border-[0.8px]"
          >
            {/* Duration row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <Text style={{ fontSize: 16, color: '#6B7280', marginRight: 10 }}>
                ✓
              </Text>
              <Text
                style={{ fontSize: 16, color: '#1E2A45', fontWeight: '500' }}
              >
                {destination.duration}
              </Text>
            </View>
            {/* Highlights */}
            {(destination.highlights ?? [])
              .slice(0, showMoreHighlights ? undefined : 2)
              .map((h, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 14,
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: '#6B7280', marginRight: 10 }}
                  >
                    ✓
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#1E2A45',
                      fontWeight: '500',
                    }}
                  >
                    {h}
                  </Text>
                </View>
              ))}
            {/* Show More */}
            <TouchableOpacity
              onPress={() => setShowMoreHighlights(!showMoreHighlights)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#1E2A45',
                  textDecorationLine: 'underline',
                }}
              >
                {showMoreHighlights ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* About This Trip */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 16,
            }}
          >
            <Text
              style={{
                color: '#111827',
                marginBottom: 8,
                fontSize: 22,
                fontWeight: '700',
              }}
              // className="text-2xl font-medium"
            >
              About this trip
            </Text>
            <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 20 }}>
              {showFullAbout
                ? destination.about
                : destination.about?.slice(0, 100) +
                  (destination.about?.length > 100 ? '...' : '')}
            </Text>
            {destination.about?.length > 100 && (
              <TouchableOpacity
                onPress={() => setShowFullAbout(!showFullAbout)}
                style={{ marginTop: 6 }}
              >
                <Text
                  style={{ color: '#1F8A70', fontSize: 13, fontWeight: '600' }}
                >
                  {showFullAbout ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Itinerary */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
              onPress={() => setShowFullItinerary(!showFullItinerary)}
            >
              <Text
                style={{ color: '#111827', fontSize: 22, fontWeight: '700' }}
              >
                Itinerary
              </Text>
              {showFullItinerary ? (
                <ChevronUp size={18} color="#6B7280" />
              ) : (
                <ChevronDown size={18} color="#6B7280" />
              )}
            </TouchableOpacity>

            {destination.itinerary
              ?.slice(0, showFullItinerary ? undefined : 1)
              .map((day, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        // backgroundColor: '#E6F4EF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8,
                      }}
                    >
                      <Image
                        source={require('./../assets/Calendar_check.png')}
                        className="w-6 h-6"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#111827',
                      }}
                    >
                      Day {day.day ?? i + 1} • {day.title}
                    </Text>
                  </View>
                  {day.points?.map((pt, j) => (
                    <View
                      key={j}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginBottom: 4,
                        paddingLeft: 36,
                      }}
                    >
                      <Check
                        size={13}
                        color="#1F8A70"
                        style={{ marginTop: 2 }}
                      />
                      <Text
                        style={{
                          marginLeft: 8,
                          fontSize: 13,
                          color: '#374151',
                          flex: 1,
                        }}
                      >
                        {pt}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}

            {destination.itinerary?.length > 1 && (
              <TouchableOpacity
                onPress={() => setShowFullItinerary(!showFullItinerary)}
              >
                <Text
                  style={{ color: '#1F8A70', fontSize: 13, fontWeight: '600' }}
                >
                  {showFullItinerary
                    ? 'Show less'
                    : `Show full ${destination.itinerary.length} days`}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Available Dates & Pricing */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 12,
              }}
            >
              Available Dates & Pricing
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {dates.map((d, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedDate(i)}
                  style={{
                    flex: 1,
                    borderWidth: 1.5,
                    borderColor: selectedDate === i ? '#1F8A70' : '#E5E7EB',
                    backgroundColor: selectedDate === i ? '#EBFFF8' : '#FFF6F6',
                    borderRadius: 10,
                    padding: 10,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}
                    className="w-full"
                  >
                    {d.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: '#2563EB',
                    }}
                  >
                    {d.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Inclusions / Exclusions */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
              onPress={() => setShowInclusions(!showInclusions)}
            >
              <Text
                style={{ fontSize: 22, fontWeight: '700', color: '#111827' }}
              >
                Inclusions / Exclusions
              </Text>
              {showInclusions ? (
                <ChevronUp size={18} color="#6B7280" />
              ) : (
                <ChevronDown size={18} color="#6B7280" />
              )}
            </TouchableOpacity>
            {showInclusions && (
              <>
                {destination.inclusions?.map((inc, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 6,
                    }}
                  >
                    <Check size={14} color="#1F8A70" />
                    <Text
                      style={{ marginLeft: 8, fontSize: 13, color: '#374151' }}
                    >
                      {inc}
                    </Text>
                  </View>
                ))}
                {destination.exclusions?.map((exc, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 6,
                    }}
                  >
                    <X size={14} color="#EF4444" />
                    <Text
                      style={{ marginLeft: 8, fontSize: 13, color: '#374151' }}
                    >
                      {exc}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* Add-ons */}
          {destination.addons?.length > 0 && (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                marginHorizontal: 16,
                marginBottom: 12,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: 4,
                }}
              >
                {'Add-ons '}
                <Text
                  style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}
                >
                  - Make your trip memorable
                </Text>
              </Text>
              {destination.addons.map((addon, i) => (
                <View
                  key={i}
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 12,
                    padding: 12,
                    marginTop: 12,
                    backgroundColor: i % 2 === 0 ? '#EFF4FF' : '#F3FAF7', // Alternating backgrounds
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#111827',
                        }}
                      >
                        {addon.name}
                      </Text>
                      <Text
                        style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}
                      >
                        No travel required
                      </Text>
                    </View>
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop',
                      }}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 10,
                        marginLeft: 12,
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 8,
                      backgroundColor:
                              i % 2 === 0 ? '#E7EDFA' : '#E7F2EE' ,
                              padding:5,
                              borderRadius:10
                    }}
                  >
                    {addon.details?.map((d, j) => (
                      <View key={j} style={{ alignItems: 'center', flex: 1,    }}>
                        <View
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 2,
                          }}
                        >
                          {j === 0 ? (
                            <Image
                              source={require('./../assets/local.png')}
                              style={{ width: 24, height: 24 }}
                            />
                          ) : j === 1 ? (
                            <Image
                              source={require('./../assets/duration.png')}
                              style={{ width: 24, height: 24 }}
                            />
                          ) : (
                            <Image
                              source={require('./../assets/reel.png')}
                              style={{ width: 24, height: 24 }}
                            />
                          )}
                        </View>
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#334155',
                            textAlign: 'center',
                            width:"100%"
                          }}
                        >
                          {d}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#111827',
                      }}
                    >
                      Just{' '}
                      <Text className="text-2xl font-medium">
                        ₹{addon.price?.toLocaleString('en-IN')}
                      </Text>
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#E6F4EF',
                        paddingHorizontal: 24,
                        paddingVertical: 8,
                        borderRadius: 8,
                        borderWidth: 1, // thickness
                        borderColor: '#1F8A70', // color
                        width: 126,
                        height: 40,
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: '#1F8A70',
                          fontWeight: '600',
                          fontSize: 14,
                        }}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      alignItems: 'center',
                      backgroundColor: i % 2 === 0 ? '#E7EDFA' : '#E7F2EE',
                    }}
                    className="w-[100%] h-[36px] flex items-center justify-center rounded-3xl"
                  >
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 13,
                        fontWeight: '500',
                        textDecorationLine: 'underline',
                      }}
                    >
                      Watch Demo Videos
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Policies */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 100,
              padding: 16,
              elevation: 2,
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
              onPress={() => setShowPolicies(!showPolicies)}
            >
              <Text
                style={{ fontSize: 22, fontWeight: '700', color: '#111827' }}
              >
                Policies
              </Text>
              {showPolicies ? (
                <ChevronUp size={18} color="#6B7280" />
              ) : (
                <ChevronDown size={18} color="#6B7280" />
              )}
            </TouchableOpacity>
            {showPolicies && (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: 8,
                  }}
                >
                  Cancellation Policy
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 6,
                  }}
                >
                  <Check size={14} color="#1F8A70" />
                  <Text
                    style={{ marginLeft: 8, fontSize: 13, color: '#374151' }}
                  >
                    Free cancellation up to 5 days before travel
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Check size={14} color="#1F8A70" />
                  <Text
                    style={{ marginLeft: 8, fontSize: 13, color: '#374151' }}
                  >
                    No refund after that
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}
                >
                  Payment Policy
                </Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Book Now Bar */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          paddingBottom: 24,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
          <Text style={{ fontSize: 11, color: '#9CA3AF' }}>From </Text>
            {priceStr}
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280' }}>
              {' '}
              /Guest
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#1F8A70',
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
          }}
          onPress={() => navigation.navigate('Booking', { destination })}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default PackageDetailScreen;