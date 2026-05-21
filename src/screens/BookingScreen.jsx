// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   Modal,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import {
//   ArrowLeft,
//   ChevronRight,
//   Star,
//   Check,
//   Camera,
//   Calendar,
//   Users,
//   Wallet,
//   Tag,
// } from 'lucide-react-native';
// import './../../android/app/src/utils/globalFont.js';

// const F = 'Inter_28pt-Regular';

// const BookingScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { destination } = route.params;

//   const [selectedAddon, setSelectedAddon] = useState(
//     destination.addons?.[0]?.name ?? 'None',
//   );
//   const [selectedDate, setSelectedDate] = useState('10-11 Jan 2026');
//   const [guests, setGuests] = useState({ adults: 2, infants: 1 });
//   const [showAddonModal, setShowAddonModal] = useState(false);
//   const [showDateModal, setShowDateModal] = useState(false);
//   const [showGuestModal, setShowGuestModal] = useState(false);
//   const [showPriceModal, setShowPriceModal] = useState(false);

//   const addonPrice =
//     destination.addons?.find(a => a.name === selectedAddon)?.price ?? 0;
//   const totalPrice = destination.price + addonPrice;

//   const dates = ['10-11 Jan 2026', '12-14 Feb 2026', '15-17 Mar 2026'];

//   const guestLabel = `${guests.adults} adult${guests.adults > 1 ? 's' : ''}${
//     guests.infants > 0 ? `, ${guests.infants} infant` : ''
//   }`;

//   const cardStyle = {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     padding: 5,
//     width:346,
//     height:70,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     elevation: 3,
//   };

//    const cardStyle2 = {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     // padding: 14,
//     marginBottom: 10,
  
//   };

//      const cardStyle3 = {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     // padding: 14,
//     marginBottom: 10,
  
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* Header */}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           backgroundColor: '#fff',
//           paddingHorizontal: 16,
//           paddingVertical: 14,
//           borderBottomWidth: 1,
//           borderBottomColor: '#F3F4F6',
//         }}
//       >
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <ArrowLeft size={22} color="#111827" />
//         </TouchableOpacity>
//         <Text
//           style={{
//             flex: 1,
//             fontSize: 24,
//             fontWeight: '700',
//             color: '#111827',
//             textAlign: 'center',
//             fontFamily: F,
//           }}
//         >
//           Confirm Booking
//         </Text>
//         {/* spacer to balance the back arrow */}
//         <View style={{ width: 22 }} />
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
//       >
//       <View style={{backgroundColor:"#F9FAFB", padding:10}}>
//           {/* Destination Card */}
//           <View style={cardStyle2}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Image
//                 source={{ uri: destination.image_url }}
//                 style={{
//                   width: 80,
//                   height: 72,
//                   borderRadius: 10,
//                   marginRight: 12,
//                 }}
//                 resizeMode="cover"
//               />
//               <View style={{ flex: 1 }}>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: '700',
//                     color: '#111827',
//                     marginBottom: 6,
//                     fontFamily: F,
//                   }}
//                 >
//                   {destination.title}
//                 </Text>
//                 <View
//                   style={{
//                     backgroundColor: '#E6F4EF',
//                     paddingHorizontal: 10,
//                     paddingVertical: 3,
//                     borderRadius: 6,
//                     alignSelf: 'flex-start',
//                     marginBottom: 8,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 11,
//                       color: '#0F172A',
//                       fontWeight: '600',
//                       fontFamily: F,
//                     }}
//                   >
//                     Guest Favorite
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     flexWrap: 'wrap',
//                   }}
//                 >
//                   <Star size={13} color="#4CAF50" fill="#4CAF50" />
//                   <Text
//                     style={{
//                       fontSize: 13,
//                       fontWeight: '700',
//                       color: '#111827',
//                       marginLeft: 3,
//                       fontFamily: F,
//                     }}
//                   >
//                     {destination.rating}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 13,
//                       color: '#1F8A70',
//                       marginLeft: 4,
//                       textDecorationLine: 'underline',
//                       fontFamily: F,
//                     }}
//                   >
//                     {destination.reviews}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 13,
//                       color: '#6B7280',
//                       marginLeft: 4,
//                       fontFamily: F,
//                     }}
//                   >
//                     • {destination.priceLabel}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
  
//           {/* Add-Ons Row */}
//           <View style={cardStyle}>
//             <BookingRow
//               icon={<Camera size={18} color="#6B7280" />}
//               label={selectedAddon}
//               sublabel="Ad-Ons"
//               onPress={() => setShowAddonModal(true)}
//               btnLabel="Change"
//               isLast
//             />
//           </View>
  
//           {/* Dates Row */}
//           <View style={cardStyle}>
//             <BookingRow
//               icon={<Calendar size={18} color="#6B7280" />}
//               label={selectedDate}
//               sublabel="Dates"
//               onPress={() => setShowDateModal(true)}
//               btnLabel="Change"
//               isLast
//             />
//           </View>
  
//           {/* Guests Row */}
//           <View style={cardStyle}>
//             <BookingRow
//               icon={<Users size={18} color="#6B7280" />}
//               label={guestLabel}
//               sublabel="Guests"
//               onPress={() => setShowGuestModal(true)}
//               btnLabel="Change"
//               isLast
//             />
//           </View>
  
//           {/* Total Price Row */}
//           <View style={cardStyle}>
//             <BookingRow
//               icon={<Wallet size={18} color="#6B7280" />}
//               label={`₹${totalPrice.toLocaleString('en-IN')}`}
//               sublabel="Total Price"
//               onPress={() => setShowPriceModal(true)}
//               btnLabel="Details"
//               isLast
//             />
//           </View>
//       </View>

//         {/* Apply Discounts */}
//         <TouchableOpacity
//           style={[cardStyle, { flexDirection: 'row', alignItems: 'center' }]}
//         >
//           <Tag size={18} color="#6B7280" style={{ marginRight: 12 }} />
//           <View style={{ flex: 1 }}>
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontWeight: '600',
//                 color: '#111827',
//                 fontFamily: F,
//               }}
//             >
//               Apply Discounts
//             </Text>
//             <Text
//               style={{
//                 fontSize: 12,
//                 color: '#9CA3AF',
//                 marginTop: 2,
//                 fontFamily: F,
//               }}
//             >
//               Bank Offers & Coupons
//             </Text>
//           </View>
//           <ChevronRight size={18} color="#9CA3AF" />
//         </TouchableOpacity>

//         {/* Policies */}
//         <View style={cardStyle3}>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: '700',
//               color: '#111827',
//               marginBottom: 10,
//               marginTop:10,
//               fontFamily: F,
//             }}
//           >
//             Cancellation Policy
//           </Text>
//           <PolicyRow text="Free cancellation up to 5 days before travel" />
//           <PolicyRow text="No refund after that" />
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: '700',
//               color: '#111827',
//               marginTop: 14,
//               marginBottom: 10,
//               fontFamily: F,
//             }}
//           >
//             Payment Policy
//           </Text>
//           <PolicyRow text="Pay full amount during booking" />
//           <PolicyRow text="Secure online payment" />
//         </View>
//       </ScrollView>

//       {/* Continue to Pay */}
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           backgroundColor: '#fff',
//           padding: 16,
//           paddingBottom: 28,
//           borderTopWidth: 1,
//           borderTopColor: '#F3F4F6',
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             backgroundColor: '#1F8A70',
//             borderRadius: 14,
//             paddingVertical: 16,
//             alignItems: 'center',
//           }}
//           onPress={() =>
//             navigation.navigate('BookingDetails', {
//               destination,
//               selectedDate,
//               guests,
//               selectedAddon,
//             })
//           }
//         >
//           <Text
//             style={{
//               color: '#fff',
//               fontSize: 16,
//               fontWeight: '700',
//               fontFamily: F,
//             }}
//           >
//             Continue to pay
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Addon Modal */}
//       <PickerModal
//         visible={showAddonModal}
//         title="Select Add-On"
//         options={['None', ...(destination.addons?.map(a => a.name) ?? [])]}
//         selected={selectedAddon}
//         onSelect={v => {
//           setSelectedAddon(v);
//           setShowAddonModal(false);
//         }}
//         onClose={() => setShowAddonModal(false)}
//       />

//       {/* Date Modal */}
//       <PickerModal
//         visible={showDateModal}
//         title="Select Date"
//         options={dates}
//         selected={selectedDate}
//         onSelect={v => {
//           setSelectedDate(v);
//           setShowDateModal(false);
//         }}
//         onClose={() => setShowDateModal(false)}
//       />

//       {/* Guest Modal */}
//       <Modal visible={showGuestModal} transparent animationType="slide">
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'flex-end',
//             backgroundColor: 'rgba(0,0,0,0.4)',
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: '#fff',
//               borderTopLeftRadius: 20,
//               borderTopRightRadius: 20,
//               padding: 24,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '700',
//                 color: '#111827',
//                 marginBottom: 20,
//                 fontFamily: F,
//               }}
//             >
//               Select Guests
//             </Text>
//             <GuestCounter
//               label="Adults"
//               value={guests.adults}
//               min={1}
//               onChange={v => setGuests(g => ({ ...g, adults: v }))}
//             />
//             <GuestCounter
//               label="Infants"
//               value={guests.infants}
//               min={0}
//               onChange={v => setGuests(g => ({ ...g, infants: v }))}
//             />
//             <TouchableOpacity
//               onPress={() => setShowGuestModal(false)}
//               style={{
//                 backgroundColor: '#1F8A70',
//                 borderRadius: 12,
//                 paddingVertical: 14,
//                 alignItems: 'center',
//                 marginTop: 20,
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontWeight: '700',
//                   fontSize: 15,
//                   fontFamily: F,
//                 }}
//               >
//                 Done
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Price Details Modal */}
//       <Modal visible={showPriceModal} transparent animationType="slide">
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'flex-end',
//             backgroundColor: 'rgba(0,0,0,0.4)',
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: '#fff',
//               borderTopLeftRadius: 20,
//               borderTopRightRadius: 20,
//               padding: 24,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '700',
//                 color: '#111827',
//                 marginBottom: 16,
//                 fontFamily: F,
//               }}
//             >
//               Price Details
//             </Text>
//             <PriceRow
//               label="Base price"
//               value={`₹${destination.price?.toLocaleString('en-IN')}`}
//             />
//             {addonPrice > 0 && (
//               <PriceRow
//                 label={selectedAddon}
//                 value={`₹${addonPrice.toLocaleString('en-IN')}`}
//               />
//             )}
//             <View
//               style={{
//                 height: 1,
//                 backgroundColor: '#F3F4F6',
//                 marginVertical: 12,
//               }}
//             />
//             <PriceRow
//               label="Total"
//               value={`₹${totalPrice.toLocaleString('en-IN')}`}
//               bold
//             />
//             <TouchableOpacity
//               onPress={() => setShowPriceModal(false)}
//               style={{
//                 backgroundColor: '#1F8A70',
//                 borderRadius: 12,
//                 paddingVertical: 14,
//                 alignItems: 'center',
//                 marginTop: 20,
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontWeight: '700',
//                   fontSize: 15,
//                   fontFamily: F,
//                 }}
//               >
//                 Close
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const BookingRow = ({ icon, label, sublabel, onPress, btnLabel, isLast }) => (
//   <View
//     style={{
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingVertical: 12,
//       borderBottomWidth: isLast ? 0 : 1,
//       borderBottomColor: '#F3F4F6',
//     }}
//   >
//     <View
//       style={{
//         width: 36,
//         height: 36,
//         borderRadius: 10,
//         backgroundColor: '#F3F4F6',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 12,
//       }}
//     >
//       {icon}
//     </View>
//     <View style={{ flex: 1 }}>
//       <Text
//         style={{
//           fontSize: 14,
//           fontWeight: '600',
//           color: '#111827',
//           fontFamily: F,
//         }}
//       >
//         {label}
//       </Text>
//       <Text
//         style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, fontFamily: F }}
//       >
//         {sublabel}
//       </Text>
//     </View>
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         backgroundColor: '#E6F4EF',
//         paddingHorizontal: 16,
//         paddingVertical: 7,
//         borderRadius: 8,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 13,
//           fontWeight: '600',
//           color: '#374151',
//           fontFamily: F,
//         }}
//       >
//         {btnLabel}
//       </Text>
//     </TouchableOpacity>
//   </View>
// );

// const PolicyRow = ({ text }) => (
//   <View
//     style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}
//   >
//     <Check size={14} color="#1F8A70" style={{ marginTop: 2 }} />
//     <Text
//       style={{
//         marginLeft: 10,
//         fontSize: 13,
//         color: '#374151',
//         flex: 1,
//         fontFamily: F,
//       }}
//     >
//       {text}
//     </Text>
//   </View>
// );

// const PickerModal = ({
//   visible,
//   title,
//   options,
//   selected,
//   onSelect,
//   onClose,
// }) => (
//   <Modal visible={visible} transparent animationType="slide">
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'flex-end',
//         backgroundColor: 'rgba(0,0,0,0.4)',
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: '#fff',
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           padding: 24,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 16,
//             fontWeight: '700',
//             color: '#111827',
//             marginBottom: 16,
//             fontFamily: F,
//           }}
//         >
//           {title}
//         </Text>
//         {options.map(opt => (
//           <TouchableOpacity
//             key={opt}
//             onPress={() => onSelect(opt)}
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingVertical: 14,
//               borderBottomWidth: 1,
//               borderBottomColor: '#F3F4F6',
//             }}
//           >
//             <View
//               style={{
//                 width: 20,
//                 height: 20,
//                 borderRadius: 10,
//                 borderWidth: 2,
//                 borderColor: selected === opt ? '#1F8A70' : '#D1D5DB',
//                 backgroundColor: selected === opt ? '#1F8A70' : '#fff',
//                 marginRight: 12,
//               }}
//             />
//             <Text style={{ fontSize: 14, color: '#111827', fontFamily: F }}>
//               {opt}
//             </Text>
//           </TouchableOpacity>
//         ))}
//         <TouchableOpacity
//           onPress={onClose}
//           style={{ marginTop: 16, alignItems: 'center' }}
//         >
//           <Text style={{ color: '#6B7280', fontSize: 14, fontFamily: F }}>
//             Cancel
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Modal>
// );

// const GuestCounter = ({ label, value, min, onChange }) => (
//   <View
//     style={{
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginBottom: 16,
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 14,
//         color: '#111827',
//         fontWeight: '600',
//         fontFamily: F,
//       }}
//     >
//       {label}
//     </Text>
//     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
//       <TouchableOpacity
//         onPress={() => onChange(Math.max(min, value - 1))}
//         style={{
//           width: 32,
//           height: 32,
//           borderRadius: 16,
//           borderWidth: 1.5,
//           borderColor: '#D1D5DB',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 18,
//             color: '#374151',
//             lineHeight: 22,
//             fontFamily: F,
//           }}
//         >
//           −
//         </Text>
//       </TouchableOpacity>
//       <Text
//         style={{
//           fontSize: 16,
//           fontWeight: '700',
//           color: '#111827',
//           minWidth: 20,
//           textAlign: 'center',
//           fontFamily: F,
//         }}
//       >
//         {value}
//       </Text>
//       <TouchableOpacity
//         onPress={() => onChange(value + 1)}
//         style={{
//           width: 32,
//           height: 32,
//           borderRadius: 16,
//           backgroundColor: '#1F8A70',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Text
//           style={{ fontSize: 18, color: '#fff', lineHeight: 22, fontFamily: F }}
//         >
//           +
//         </Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// const PriceRow = ({ label, value, bold }) => (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 8,
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 14,
//         color: bold ? '#111827' : '#6B7280',
//         fontWeight: bold ? '700' : '400',
//         fontFamily: F,
//       }}
//     >
//       {label}
//     </Text>
//     <Text
//       style={{
//         fontSize: 14,
//         color: '#111827',
//         fontWeight: bold ? '700' : '600',
//         fontFamily: F,
//       }}
//     >
//       {value}
//     </Text>
//   </View>
// );

// export default BookingScreen;















































import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  Check,
  Camera,
  Calendar,
  Users,
  Wallet,
  Tag,
} from 'lucide-react-native';
import './../../android/app/src/utils/globalFont.js';

const F = 'Inter_28pt-Regular';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destination } = route.params;

  const [selectedAddon, setSelectedAddon] = useState(
    destination.addons?.[0]?.name ?? 'None',
  );
  const [selectedDate, setSelectedDate] = useState('10-11 Jan 2026');
  const [guests, setGuests] = useState({ adults: 2, infants: 1 });
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);

  const addonPrice =
    destination.addons?.find(a => a.name === selectedAddon)?.price ?? 0;
  const totalPrice = destination.price + addonPrice;

  const dates = ['10-11 Jan 2026', '12-14 Feb 2026', '15-17 Mar 2026'];

  const guestLabel = `${guests.adults} adult${guests.adults > 1 ? 's' : ''}${
    guests.infants > 0 ? `, ${guests.infants} infant` : ''
  }`;

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  };

  const cardStyle2 = {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
  };

  const cardStyle3 = {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: 24,
            fontWeight: '700',
            color: '#111827',
            textAlign: 'center',
            fontFamily: F,
          }}
        >
          Confirm Booking
        </Text>
        {/* spacer to balance the back arrow */}
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        <View style={{ backgroundColor: "#F9FAFB" }}>
          {/* Destination Card */}
          <View style={cardStyle2}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: destination.image_url }}
                style={{
                  width: 80,
                  height: 72,
                  borderRadius: 10,
                  marginRight: 12,
                }}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: 6,
                    fontFamily: F,
                  }}
                >
                  {destination.title}
                </Text>
                <View
                  style={{
                    backgroundColor: '#E6F4EF',
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 6,
                    alignSelf: 'flex-start',
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#0F172A',
                      fontWeight: '600',
                      fontFamily: F,
                    }}
                  >
                    Guest Favorite
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Star size={13} color="#4CAF50" fill="#4CAF50" />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: '#111827',
                      marginLeft: 3,
                      fontFamily: F,
                    }}
                  >
                    {destination.rating}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#1F8A70',
                      marginLeft: 4,
                      textDecorationLine: 'underline',
                      fontFamily: F,
                    }}
                  >
                    {destination.reviews}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#6B7280',
                      marginLeft: 4,
                      fontFamily: F,
                    }}
                  >
                    • {destination.priceLabel}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Add-Ons Row */}
          <View style={cardStyle}>
            <BookingRow
              icon={<Camera size={18} color="#6B7280" />}
              label={selectedAddon}
              sublabel="Ad-Ons"
              onPress={() => setShowAddonModal(true)}
              btnLabel="Change"
              isLast={false}
            />
          </View>

          {/* Dates Row */}
          <View style={cardStyle}>
            <BookingRow
              icon={<Calendar size={18} color="#6B7280" />}
              label={selectedDate}
              sublabel="Dates"
              onPress={() => setShowDateModal(true)}
              btnLabel="Change"
              isLast={false}
            />
          </View>

          {/* Guests Row */}
          <View style={cardStyle}>
            <BookingRow
              icon={<Users size={18} color="#6B7280" />}
              label={guestLabel}
              sublabel="Guests"
              onPress={() => setShowGuestModal(true)}
              btnLabel="Change"
              isLast={false}
            />
          </View>

          {/* Total Price Row */}
          <View style={cardStyle}>
            <BookingRow
              icon={<Wallet size={18} color="#6B7280" />}
              label={`₹${totalPrice.toLocaleString('en-IN')}`}
              sublabel="Total Price"
              onPress={() => setShowPriceModal(true)}
              btnLabel="Details"
              isLast={true}
            />
          </View>
        </View>

        {/* Apply Discounts */}
        <TouchableOpacity
          style={[cardStyle, { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }]}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: '#F3F4F6',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Tag size={18} color="#6B7280" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#111827',
                fontFamily: F,
              }}
            >
              Apply Discounts
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#9CA3AF',
                marginTop: 2,
                fontFamily: F,
              }}
            >
              Bank Offers & Coupons
            </Text>
          </View>
          <ChevronRight size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Policies */}
        <View style={cardStyle3}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 10,
              marginTop: 10,
              fontFamily: F,
            }}
          >
            Cancellation Policy
          </Text>
          <PolicyRow text="Free cancellation up to 5 days before travel" />
          <PolicyRow text="No refund after that" />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#111827',
              marginTop: 14,
              marginBottom: 10,
              fontFamily: F,
            }}
          >
            Payment Policy
          </Text>
          <PolicyRow text="Pay full amount during booking" />
          <PolicyRow text="Secure online payment" />
        </View>
      </ScrollView>

      {/* Continue to Pay */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          padding: 16,
          paddingBottom: 28,
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#1F8A70',
            borderRadius: 14,
            paddingVertical: 16,
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('BookingDetails', {
              destination,
              selectedDate,
              guests,
              selectedAddon,
            })
          }
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '700',
              fontFamily: F,
            }}
          >
            Continue to pay
          </Text>
        </TouchableOpacity>
      </View>

      {/* Addon Modal */}
      <PickerModal
        visible={showAddonModal}
        title="Select Add-On"
        options={['None', ...(destination.addons?.map(a => a.name) ?? [])]}
        selected={selectedAddon}
        onSelect={v => {
          setSelectedAddon(v);
          setShowAddonModal(false);
        }}
        onClose={() => setShowAddonModal(false)}
      />

      {/* Date Modal */}
      <PickerModal
        visible={showDateModal}
        title="Select Date"
        options={dates}
        selected={selectedDate}
        onSelect={v => {
          setSelectedDate(v);
          setShowDateModal(false);
        }}
        onClose={() => setShowDateModal(false)}
      />

      {/* Guest Modal */}
      <Modal visible={showGuestModal} transparent animationType="slide">
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
              padding: 24,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 20,
                fontFamily: F,
              }}
            >
              Select Guests
            </Text>
            <GuestCounter
              label="Adults"
              value={guests.adults}
              min={1}
              onChange={v => setGuests(g => ({ ...g, adults: v }))}
            />
            <GuestCounter
              label="Infants"
              value={guests.infants}
              min={0}
              onChange={v => setGuests(g => ({ ...g, infants: v }))}
            />
            <TouchableOpacity
              onPress={() => setShowGuestModal(false)}
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
                  fontWeight: '700',
                  fontSize: 15,
                  fontFamily: F,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Price Details Modal */}
      <Modal visible={showPriceModal} transparent animationType="slide">
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
              padding: 24,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 16,
                fontFamily: F,
              }}
            >
              Price Details
            </Text>
            <PriceRow
              label="Base price"
              value={`₹${destination.price?.toLocaleString('en-IN')}`}
            />
            {addonPrice > 0 && (
              <PriceRow
                label={selectedAddon}
                value={`₹${addonPrice.toLocaleString('en-IN')}`}
              />
            )}
            <View
              style={{
                height: 1,
                backgroundColor: '#F3F4F6',
                marginVertical: 12,
              }}
            />
            <PriceRow
              label="Total"
              value={`₹${totalPrice.toLocaleString('en-IN')}`}
              bold
            />
            <TouchableOpacity
              onPress={() => setShowPriceModal(false)}
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
                  fontWeight: '700',
                  fontSize: 15,
                  fontFamily: F,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const BookingRow = ({ icon, label, sublabel, onPress, btnLabel, isLast }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: '#fff',
    }}
  >
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      }}
    >
      {icon}
    </View>
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: '#111827',
          fontFamily: F,
        }}
      >
        {label}
      </Text>
      <Text
        style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, fontFamily: F }}
      >
        {sublabel}
      </Text>
    </View>
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#E6F4EF',
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: '#374151',
          fontFamily: F,
        }}
      >
        {btnLabel}
      </Text>
    </TouchableOpacity>
  </View>
);

const PolicyRow = ({ text }) => (
  <View
    style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}
  >
    <Check size={14} color="#1F8A70" style={{ marginTop: 2 }} />
    <Text
      style={{
        marginLeft: 10,
        fontSize: 13,
        color: '#374151',
        flex: 1,
        fontFamily: F,
      }}
    >
      {text}
    </Text>
  </View>
);

const PickerModal = ({
  visible,
  title,
  options,
  selected,
  onSelect,
  onClose,
}) => (
  <Modal visible={visible} transparent animationType="slide">
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
          padding: 24,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#111827',
            marginBottom: 16,
            fontFamily: F,
          }}
        >
          {title}
        </Text>
        {options.map(opt => (
          <TouchableOpacity
            key={opt}
            onPress={() => onSelect(opt)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#F3F4F6',
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selected === opt ? '#1F8A70' : '#D1D5DB',
                backgroundColor: selected === opt ? '#1F8A70' : '#fff',
                marginRight: 12,
              }}
            />
            <Text style={{ fontSize: 14, color: '#111827', fontFamily: F }}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={onClose}
          style={{ marginTop: 16, alignItems: 'center' }}
        >
          <Text style={{ color: '#6B7280', fontSize: 14, fontFamily: F }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

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
        fontSize: 14,
        color: '#111827',
        fontWeight: '600',
        fontFamily: F,
      }}
    >
      {label}
    </Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <TouchableOpacity
        onPress={() => onChange(Math.max(min, value - 1))}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          borderWidth: 1.5,
          borderColor: '#D1D5DB',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: '#374151',
            lineHeight: 22,
            fontFamily: F,
          }}
        >
          −
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#111827',
          minWidth: 20,
          textAlign: 'center',
          fontFamily: F,
        }}
      >
        {value}
      </Text>
      <TouchableOpacity
        onPress={() => onChange(value + 1)}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: '#1F8A70',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{ fontSize: 18, color: '#fff', lineHeight: 22, fontFamily: F }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const PriceRow = ({ label, value, bold }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    }}
  >
    <Text
      style={{
        fontSize: 14,
        color: bold ? '#111827' : '#6B7280',
        fontWeight: bold ? '700' : '400',
        fontFamily: F,
      }}
    >
      {label}
    </Text>
    <Text
      style={{
        fontSize: 14,
        color: '#111827',
        fontWeight: bold ? '700' : '600',
        fontFamily: F,
      }}
    >
      {value}
    </Text>
  </View>
);

export default BookingScreen;