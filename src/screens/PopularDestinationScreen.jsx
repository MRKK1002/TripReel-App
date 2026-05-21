import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Search,
  Star,
  Heart,
  MapPin,
  Clock,
} from 'lucide-react-native';
import  './../../android/app/src/utils/globalFont.js';


const popularDestinations = [
  {
    id: 1,
    title: 'Goa Weekend Escape',
    location: 'Goa, India',
    rating: 4.5,
    reviews: '20K+ bookings',
    price: 12999,
    priceLabel: 'From ₹8,999/guest',
    duration: '3 Days - 2 Nights',
    highlights: ['Beachside stay', 'Airport transfers included'],
    about:
      'Enjoy a short getaway to Goa with comfortable stays, local sightseeing, and relaxed beach time.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Leisure',
        points: [
          'Arrival at Goa airport / railway station',
          'Transfer to hotel',
          'Rest of the day at leisure',
          'Evening at nearby beach',
        ],
      },
      {
        day: 2,
        title: 'Sightseeing',
        points: [
          'North Goa tour',
          'Visit Baga & Calangute beach',
          'Fort Aguada visit',
        ],
      },
      {
        day: 3,
        title: 'Departure',
        points: ['Breakfast at hotel', 'Checkout & transfer'],
      },
    ],
    inclusions: ['Lunch & dinner'],
    exclusions: [
      'Personal expenses',
      'Hotel accommodation (2 nights)',
      'Airport / station transfers',
    ],
    addons: [
      {
        name: 'Professional Photographer',
        price: 2000,
        details: ['Local', '30 min', '2 Reels'],
      },
      {
        name: 'Professional Reel Maker',
        price: 2000,
        details: ['Travel', '30 min', '2 Reels'],
      },
    ],
    image_url:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Himalayan Adventure',
    location: 'Himalayas, India',
    rating: 4.5,
    reviews: '15K+ bookings',
    price: 13999,
    priceLabel: 'From ₹8,999/guest',
    duration: '4 Days - 3 Nights',
    highlights: ['Mountain stay', 'Guided trekking'],
    about:
      'Explore the beauty of the Himalayas with scenic treks, fresh air, and peaceful surroundings.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival',
        points: ['Check-in & rest', 'Local exploration'],
      },
      { day: 2, title: 'Trek Day', points: ['Guided trekking', 'Campfire'] },
      { day: 3, title: 'Leisure', points: ['Village visit', 'Photography'] },
      { day: 4, title: 'Departure', points: ['Checkout'] },
    ],
    inclusions: ['Breakfast & dinner'],
    exclusions: ['Personal expenses'],
    addons: [
      { name: 'Drone Shoot', price: 3000, details: ['Outdoor', '20 min'] },
    ],
    image_url:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'Kerala Backwaters',
    location: 'Kerala, India',
    rating: 4.8,
    reviews: '18K+ bookings',
    price: 11500,
    priceLabel: 'From ₹7,500/guest',
    duration: '3 Days - 2 Nights',
    highlights: ['Houseboat stay', 'Backwater cruise'],
    about:
      "Relax in Kerala's serene backwaters with a peaceful houseboat experience.",
    itinerary: [
      { day: 1, title: 'Arrival', points: ['Check-in houseboat', 'Cruise'] },
      { day: 2, title: 'Explore', points: ['Village walk', 'Local cuisine'] },
      { day: 3, title: 'Departure', points: ['Checkout'] },
    ],
    inclusions: ['All meals'],
    exclusions: ['Personal expenses'],
    addons: [
      { name: 'Candle Light Dinner', price: 1500, details: ['Private setup'] },
    ],
    image_url:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop',
     
  'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?w=800&h=500&fit=crop',
  
  'https://images.pexels.com/photos/2372907/pexels-photo-2372907.jpeg?w=800&h=500&fit=crop'
    ],
  },
  {
    id: 4,
    title: 'Royal Rajasthan Tour',
    location: 'Rajasthan, India',
    rating: 4.7,
    reviews: '12K+ bookings',
    price: 15500,
    priceLabel: 'From ₹10,500/guest',
    duration: '5 Days - 4 Nights',
    highlights: ['Heritage stays', 'Desert safari'],
    about:
      'Experience royal heritage, forts, and desert adventures in Rajasthan.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival Jaipur',
        points: ['Hotel check-in', 'City tour'],
      },
      { day: 2, title: 'Forts Visit', points: ['Amber Fort', 'City Palace'] },
      { day: 3, title: 'Jodhpur', points: ['Travel & sightseeing'] },
      {
        day: 4,
        title: 'Desert Safari',
        points: ['Camel ride', 'Cultural show'],
      },
      { day: 5, title: 'Departure', points: ['Checkout'] },
    ],
    inclusions: ['Breakfast'],
    exclusions: ['Entry tickets'],
    addons: [
      { name: 'Royal Dinner', price: 2500, details: ['Cultural night'] },
    ],
    image_url:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 5,
    title: 'Andaman Island Escape',
    location: 'Andaman Islands, India',
    rating: 4.9,
    reviews: '10K+ bookings',
    price: 19999,
    priceLabel: 'From ₹15,999/guest',
    duration: '4 Days - 3 Nights',
    highlights: ['Beach resort stay', 'Scuba diving'],
    about: 'Discover crystal clear waters and marine life in Andaman Islands.',
    itinerary: [
      { day: 1, title: 'Arrival', points: ['Hotel check-in', 'Beach visit'] },
      {
        day: 2,
        title: 'Water Activities',
        points: ['Scuba diving', 'Snorkeling'],
      },
      { day: 3, title: 'Island Tour', points: ['Boat trip', 'Sightseeing'] },
      { day: 4, title: 'Departure', points: ['Checkout'] },
    ],
    inclusions: ['Breakfast'],
    exclusions: ['Flights'],
    addons: [
      { name: 'Underwater Photoshoot', price: 4000, details: ['HD photos'] },
    ],
    image_url:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&h=500&fit=crop',
    ],
  },
];

const PopularDestinationScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = id => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = popularDestinations.filter(
    d =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('DestinationDetail', { destination: item })
      }
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}
    >
      {/* Image */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: item.image_url }}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
        {/* Badge */}
        <View
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: '#E6F4EF',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Text style={{ color: '#1F8A70', fontSize: 11, fontWeight: '700' }}>
            Popular
          </Text>
        </View>
        {/* Wishlist */}
        <TouchableOpacity
          onPress={() => toggleWishlist(item.id)}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderRadius: 20,
            padding: 6,
          }}
        >
          <Heart
            size={18}
            color={wishlist[item.id] ? '#EF4444' : '#9CA3AF'}
            fill={wishlist[item.id] ? '#EF4444' : 'none'}
          />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={{ padding: 14 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#111827',
            marginBottom: 4,
          }}
        >
          {item.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <MapPin size={13} color="#6B7280" />
          <Text style={{ fontSize: 13, color: '#6B7280', marginLeft: 4 }}>
            {item.location}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Star size={13} color="#F59E0B" fill="#F59E0B" />
              <Text
                style={{
                  fontSize: 13,
                  color: '#374151',
                  marginLeft: 4,
                  fontWeight: '600',
                }}
              >
                {item.rating}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Clock size={13} color="#6B7280" />
              <Text style={{ fontSize: 13, color: '#6B7280', marginLeft: 4 }}>
                {item.duration}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#1F8A70' }}>
            {item.priceLabel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#F0F0F0',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 12 }}
        >
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text
          style={{ fontSize: 18, fontWeight: '700', color: '#111827', flex: 1 }}
        >
          Popular Destinations
        </Text>
        <Text style={{ fontSize: 13, color: '#6B7280' }}>
          {filtered.length} places
        </Text>
      </View>

      {/* Search */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#fff',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
        >
          <Search size={18} color="#9CA3AF" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search destinations..."
            placeholderTextColor="#9CA3AF"
            style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111827' }}
          />
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default PopularDestinationScreen;
