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


const experiencesNearYou = [
  {
    id: 1,
    title: 'Beachside Photoshoot',
    location: 'Baga, Goa',
    rating: 4.5,
    reviews: '2.1k reviews',
    price: 8999,
    priceLabel: 'From ₹8,999/guest',
    badge: 'Popular',
    duration: '30 mins',
    highlights: ['Professional photographer', 'Beachside shoot'],
    about:
      'Capture stunning beach memories with a professional photoshoot at Baga Beach.',
    itinerary: [
      {
        step: 1,
        title: 'Meet Photographer',
        points: ['Meet at Baga beach location'],
      },
      {
        step: 2,
        title: 'Photoshoot Session',
        points: ['Guided poses', 'Candid shots'],
      },
      {
        step: 3,
        title: 'Delivery',
        points: ['Edited photos delivered digitally'],
      },
    ],
    inclusions: ['Photographer', 'Edited photos'],
    exclusions: ['Travel to location'],
    addons: [{ name: 'Drone Shots', price: 2000, details: ['Aerial shots'] }],
    image_url:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Sunset Boat Ride',
    location: 'Alleppey, Kerala',
    rating: 4.5,
    reviews: '2.1k reviews',
    price: 1500,
    priceLabel: 'From ₹1,500/guest',
    badge: 'Popular',
    duration: '1 hour',
    highlights: ['Backwater experience', 'Sunset views'],
    about:
      'Enjoy a peaceful sunset boat ride through the beautiful backwaters of Alleppey.',
    itinerary: [
      { step: 1, title: 'Boarding', points: ['Reach starting point'] },
      { step: 2, title: 'Cruise', points: ['Scenic backwater ride'] },
      { step: 3, title: 'Sunset View', points: ['Relax & enjoy sunset'] },
    ],
    inclusions: ['Boat ride'],
    exclusions: ['Meals'],
    addons: [
      { name: 'Private Boat', price: 3000, details: ['Exclusive ride'] },
    ],
    image_url:
       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'Heritage Walking Tour',
    location: 'Jaipur, Rajasthan',
    rating: 4.8,
    reviews: '3.4k reviews',
    price: 1200,
    priceLabel: 'From ₹1,200/guest',
    badge: 'Trending',
    duration: '2 hours',
    highlights: ['Local guide', 'Historic landmarks'],
    about:
      "Explore Jaipur's rich heritage through guided walking tours of iconic spots.",
    itinerary: [
      { step: 1, title: 'Start Point', points: ['Meet guide'] },
      {
        step: 2,
        title: 'City Walk',
        points: ['Visit monuments', 'Local stories'],
      },
      { step: 3, title: 'End Tour', points: ['Wrap-up & tips'] },
    ],
    inclusions: ['Guide'],
    exclusions: ['Entry tickets'],
    addons: [{ name: 'Photography', price: 1500, details: ['Tour coverage'] }],
    image_url:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 4,
    title: 'Street Food Crawl',
    location: 'Delhi, India',
    rating: 4.7,
    reviews: '5.2k reviews',
    price: 899,
    priceLabel: 'From ₹899/guest',
    badge: 'Popular',
    duration: '3 hours',
    highlights: ['Local food tasting', 'Guided tour'],
    about:
      'Taste the best street food in Delhi with a guided culinary experience.',
    itinerary: [
      { step: 1, title: 'Meet Guide', points: ['Start at food hub'] },
      { step: 2, title: 'Food Tasting', points: ['Multiple food stops'] },
      { step: 3, title: 'End Tour', points: ['Dessert & wrap-up'] },
    ],
    inclusions: ['Food tasting'],
    exclusions: ['Transport'],
    addons: [
      { name: 'Premium Food Stops', price: 500, details: ['Extra dishes'] },
    ],
    image_url:
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1559333087-bf0dd562e09c?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 5,
    title: 'Tea Estate Tour',
    location: 'Munnar, Kerala',
    rating: 4.6,
    reviews: '1.8k reviews',
    price: 2500,
    priceLabel: 'From ₹2,500/guest',
    badge: 'Popular',
    duration: '2 hours',
    highlights: ['Tea plantation visit', 'Guided tour'],
    about:
      'Walk through lush tea estates and learn about tea processing in Munnar.',
    itinerary: [
      { step: 1, title: 'Arrival', points: ['Reach estate'] },
      { step: 2, title: 'Tour', points: ['Tea process explanation'] },
      { step: 3, title: 'Tasting', points: ['Tea tasting session'] },
    ],
    inclusions: ['Guide', 'Tea tasting'],
    exclusions: ['Transport'],
    addons: [{ name: 'Tea Pack', price: 800, details: ['Premium tea'] }],
    image_url:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1576675784201-0e142b423952?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
    ],
  },
];

const BADGE_COLORS = {
  Trending: { bg: '#FEF3C7', text: '#D97706' },
  Popular: { bg: '#E6F4EF', text: '#1F8A70' },
};

const ExperiencesNearYouScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = id =>
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));

  const filtered = experiencesNearYou.filter(
    e =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => {
    const badge = BADGE_COLORS[item.badge] || BADGE_COLORS.Popular;
    return (
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
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: badge.bg,
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{ color: badge.text, fontSize: 11, fontWeight: '700' }}
            >
              {item.badge}
            </Text>
          </View>
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
          {/* Reviews pill */}
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              backgroundColor: 'rgba(0,0,0,0.65)',
              borderRadius: 20,
              paddingHorizontal: 8,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Star size={11} color="#F59E0B" fill="#F59E0B" />
            <Text style={{ color: '#fff', fontSize: 11, marginLeft: 4 }}>
              {item.reviews}
            </Text>
          </View>
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
              marginBottom: 8,
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
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
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
  };

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
          Experiences Near You
        </Text>
        <Text style={{ fontSize: 13, color: '#6B7280' }}>
          {filtered.length} experiences
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
            placeholder="Search experiences..."
            placeholderTextColor="#9CA3AF"
            style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111827' }}
          />
        </View>
      </View>

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

export default ExperiencesNearYouScreen;
