import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  './../../android/app/src/utils/globalFont.js';


const trips = [
  {
    id: 1,
    title: 'Goa Weekend Escape',
    location: 'Goa, India',
    status: 'Confirmed',
    dateRange: 'Jan\n26 - 29\n2026',
    address: 'North Goa,\nMaharashtra, India',
    bookingId: 'EZH-TRP-24891',
    tripType: 'Package',
    daysRemaining: 3,
    image_url:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Himalayan Trek',
    location: 'Manali, India',
    status: 'Upcoming',
    dateRange: 'Feb\n15 - 22\n2026',
    address: 'Manali,\nHimachal Pradesh, India',
    bookingId: 'EZH-TRP-24892',
    tripType: 'Package',
    daysRemaining: 25,
    image_url:
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=400&fit=crop',
  },
];

const MyTripScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View className="items-center pt-4 pb-3 mt-10">
          <Text style={{fontSize: 22, fontWeight: '700'}} className="text-gray-900 ">My Trips</Text>
        </View>

        {/* Trips List */}
        <View className="px-4 mt-2">
          {trips.map(trip => (
            <View
              key={trip.id}
              className="mb-5 overflow-hidden bg-white rounded-2xl"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              {/* Image with badge overlay */}
              <View>
                <Image
                  source={{ uri: trip.image_url }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                {/* Trip start badge */}
                <View className="absolute px-3 py-1 rounded-full top-3 left-3 bg-teal-500/80">
                  <Text className="text-xs font-medium text-white">
                    Trip start in {trip.daysRemaining} days
                  </Text>
                </View>
              </View>

              {/* Card Body */}
              <View className="p-4">
                {/* Title + Status */}
                <Text className="text-xl font-bold text-gray-900">
                  {trip.title}
                </Text>
                <Text className="mt-0.5 text-sm text-gray-400">
                  {trip.location}
                </Text>
                <View className="mt-1 self-start px-2 py-0.5 rounded-full border border-green-500">
                  <Text className="text-xs text-green-600">{trip.status}</Text>
                </View>

                {/* Divider */}
                <View className="h-px my-3 bg-gray-100" />

                {/* Date + Address row */}
                <View className="flex-row">
                  <Text className="flex-1 text-sm font-medium leading-5 text-teal-600">
                    {trip.dateRange}
                  </Text>
                  <Text className="flex-1 text-sm font-medium leading-5 text-gray-800">
                    {trip.address}
                  </Text>
                </View>

                {/* Divider */}
                <View className="h-px my-3 bg-gray-100" />

                {/* Booking ID + Trip Type row */}
                <View className="flex-row">
                  <View className="flex-1">
                    <Text className="text-xs text-gray-400">Booking ID</Text>
                    <Text className="mt-0.5 text-sm font-semibold text-gray-900">
                      {trip.bookingId}
                    </Text>
                  </View>
                  {/* Vertical divider */}
                  <View className="w-px mx-3 bg-gray-200" />
                  <View className="flex-1">
                    <Text className="text-xs text-gray-400">Trip Type</Text>
                    <Text className="mt-0.5 text-sm font-semibold text-gray-900">
                      {trip.tripType}
                    </Text>
                  </View>
                </View>

                {/* Divider */}
                <View className="h-px my-3 bg-gray-100" />

                {/* View Details */}
                <TouchableOpacity
                  className="items-center"
                  onPress={() => {}}
                  activeOpacity={0.7}
                >
                  <Text
                    className="text-sm font-semibold text-gray-900"
                    style={{ textDecorationLine: 'underline' }}
                  >
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default MyTripScreen;
