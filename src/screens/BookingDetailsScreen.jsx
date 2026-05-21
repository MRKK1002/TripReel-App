import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  Calendar,
  Users,
  Camera,
  Image as ImageIcon,
  Star,
} from 'lucide-react-native';
import  './../../android/app/src/utils/globalFont.js';

const F = 'Inter_28pt-Regular';

const TRACKING_STEPS = [
  {
    label: 'Waiting for photographer',
    status: 'inprogress',
    date: 'Dec 28, 11:00 AM',
  },
  { label: 'Notified photographer', status: 'done', date: 'Dec 28, 11:00 AM' },
  {
    label: 'Tour operator',
    sublabel: 'Tour Operator accepted booking',
    status: 'done',
    date: 'Dec 28, 11:00 AM',
  },
  { label: 'Notified tour operator', status: 'done', date: 'Dec 28, 11:00 AM' },
  {
    label: 'Booking Confirmed',
    sublabel: 'Booking ID #234232324 Submitted',
    status: 'done',
    date: 'Dec 28, 11:00 AM',
  },
];

const BookingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destination, selectedDate, guests, selectedAddon } = route.params;

  const guestLabel = `${guests.adults} adult${guests.adults > 1 ? 's' : ''}${
    guests.infants > 0 ? `, ${guests.infants} infant` : ''
  }`;

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
               Booking Details
             </Text>
             {/* spacer to balance the back arrow */}
             <View style={{ width: 22 }} />
           </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* Package Details */}
        <SectionCard label="Package Details" style={{backgroundColor:"#F8FAFC"}}>
          {/* Destination row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 14,
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#F3F4F6',
            }}
          >
            <Image
              source={{ uri: destination.image_url }}
              style={{
                width: 72,
                height: 60,
                borderRadius: 10,
                marginRight: 12,
              }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: 4,
                }}
              >
                {destination.title}
              </Text>
              <View
                style={{
                  backgroundColor: '#E6F4EF',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 6,
                  alignSelf: 'flex-start',
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{ fontSize: 11, color: '#1F8A70', fontWeight: '600' }}
                >
                  Guest Favourite
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#111827',
                    marginLeft: 4,
                  }}
                >
                  {destination.rating}
                </Text>
                <Text style={{ fontSize: 12, color: '#1F8A70', marginLeft: 4 }}>
                  {destination.reviews}
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}>
                  • {destination.priceLabel}
                </Text>
              </View>
            </View>
          </View>

          <DetailRow
            icon={<Calendar size={16} color="#475569" />}
            label={selectedDate}
            sublabel="Dates"
          />
          <DetailRow
            icon={<Users size={16} color="#475569" />}
            label={guestLabel}
            sublabel="Guests"
            isLast
          />
        </SectionCard>

        {/* Ad-ons Details */}
              
        <SectionCard label="Ad-ons Details" style={{ marginTop: 12,backgroundColor:"#F8FAFC"  }}>
          {/* Photographer row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 14,
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#F3F4F6',
            }}
          >
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/women/44.jpg',
              }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                marginRight: 12,
              }}
              resizeMode="cover"
            />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: 4,
                }}
              >
                Kareena Singh
              </Text>
              <View
                style={{
                  backgroundColor: '#E6F4EF',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 6,
                  alignSelf: 'flex-start',
                }}
              >
                <Text
                  style={{ fontSize: 11, color: '#1F8A70', fontWeight: '600' }}
                >
                  Photographer + Reel Maker
                </Text>
              </View>
            </View>
          </View>

          <DetailRow
            icon={<Camera size={16} color="#6B7280" />}
            label="11 Jan 2026"
            sublabel="Shoot Date"
          />
          <DetailRow
            icon={<ImageIcon size={16} color="#6B7280" />}
            label="Photos & Reels"
            sublabel="Standard"
            isLast
          />
        </SectionCard>

        {/* Track Booking */}
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 16,
            }}
          >
            Track booking
          </Text>
          {TRACKING_STEPS.map((step, i) => (
            <TrackStep
              key={i}
              step={step}
              isLast={i === TRACKING_STEPS.length - 1}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
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
          paddingVertical: 14,
          paddingBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        <BottomBtn
          label="Package"
          onPress={() => navigation.goBack()}
          color="#111827"
        />
        <BottomBtn label="Need Help?" onPress={() => {}} color="#111827" />
        <BottomBtn
          label="Cancel Booking"
          onPress={() => {}}
          color="#EF4444"
          bg="#FEF2F2"
        />
      </View>
    </SafeAreaView>
  );
};

const SectionCard = ({ label, children, style }) => (
  <View
    style={[
      {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      },
      style,
    ]}
  >
    <Text
      style={{
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '600',
        marginBottom: 12,
      }}
    >
      {label}
    </Text>
    {children}
  </View>
);

const DetailRow = ({ icon, label, sublabel, isLast }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: '#F3F4F6',
    }}
  >
    <View
      style={{
        width: 34,
        height: 34,
        borderRadius: 8,
        // backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      }}
    >
      {icon}
    </View>
    <View>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>
        {label}
      </Text>
      <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
        {sublabel}
      </Text>
    </View>
  </View>
);

const TrackStep = ({ step, isLast }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (step.status === 'inprogress') {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, []);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flexDirection: 'row' }}>
      {/* Timeline column */}
      <View style={{ alignItems: 'center', width: 32 }}>
        {step.status === 'inprogress' ? (
          <Animated.View style={{ transform: [{ rotate }] }}>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2.5,
                borderColor: '#F59E0B',
                borderTopColor: 'transparent',
              }}
            />
          </Animated.View>
        ) : (
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: '#1F8A70',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>
              ✓
            </Text>
          </View>
        )}
        {!isLast && (
          <View
            style={{
              width: 2,
              flex: 1,
              backgroundColor: '#D1FAE5',
              marginVertical: 3,
              minHeight: 24,
            }}
          />
        )}
      </View>

      {/* Content */}
      <View
        style={{ flex: 1, paddingLeft: 12, paddingBottom: isLast ? 0 : 20 }}
      >
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>
          {step.label}
        </Text>
        {step.sublabel && (
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
            {step.sublabel}
          </Text>
        )}
        <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
          {step.status === 'inprogress' ? 'Inprogress' : 'Inprogress'} •{' '}
          {step.date}
        </Text>
      </View>
    </View>
  );
};

const BottomBtn = ({ label, onPress, color, bg }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: bg ?? 'transparent',
    }}
  >
    <Text style={{ fontSize: 13, fontWeight: '600', color }}>{label}</Text>
  </TouchableOpacity>
);

export default BookingDetailsScreen;
