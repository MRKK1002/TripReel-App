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

const curatedPackages = [
  {
    id: 1,
    title: 'Goa Weekend Escape',
    location: 'Goa, India',
    description: 'Beach stay + sightseeing',
    rating: 4.5,
    reviews: '20K+ bookings',
    price: 12999,
    priceLabel: 'From ₹8,999/guest',
    badge: 'Popular',
    duration: '3 Days - 2 Nights',
    highlights: ['Beachside stay', 'Airport transfers included'],
    about:
      'Enjoy a relaxing Goa getaway with beach vibes, local sightseeing, and comfortable stays.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Leisure',
        points: [
          'Arrival at airport / railway station',
          'Transfer to hotel',
          'Rest day at leisure',
        ],
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
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Honeymoon in Bali',
    location: 'Bali, Indonesia',
    description: 'Private villas & experiences',
    rating: 4.5,
    reviews: '12K+ bookings',
    price: 89999,
    priceLabel: 'From ₹89,999',
    badge: 'Popular',
    duration: '5 Days - 4 Nights',
    highlights: ['Private villa stay', 'Romantic experiences'],
    about:
      'A perfect romantic escape in Bali with private villas, candlelight dinners, and scenic beauty.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival',
        points: ['Airport pickup', 'Villa check-in'],
      },
      {
        day: 2,
        title: 'Romantic Day',
        points: ['Couple spa', 'Candlelight dinner'],
      },
      { day: 3, title: 'Explore', points: ['Ubud tour', 'Temple visit'] },
      { day: 4, title: 'Leisure', points: ['Pool day', 'Shopping'] },
      { day: 5, title: 'Departure', points: ['Checkout'] },
    ],
    inclusions: ['Breakfast', 'Private transfers'],
    exclusions: ['Flights'],
    addons: [{ name: 'Drone Shoot', price: 5000, details: ['Couple shoot'] }],
    image_url:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'Kashmir Great Lakes Trek',
    location: 'Kashmir, India',
    description: '7 days camping + meals',
    rating: 4.9,
    reviews: '8K+ trekkers',
    price: 18500,
    priceLabel: 'From ₹18,500/guest',
    badge: 'Trending',
    duration: '7 Days - 6 Nights',
    highlights: ['High-altitude trekking', 'Camping & meals included'],
    about:
      "Experience one of India's most beautiful treks through alpine lakes and valleys.",
    itinerary: [
      { day: 1, title: 'Base Camp', points: ['Arrival & briefing'] },
      { day: 2, title: 'Trek Start', points: ['First trek route'] },
      { day: 3, title: 'Lake Visit', points: ['Scenic trekking'] },
    ],
    inclusions: ['Meals', 'Guide', 'Camping'],
    exclusions: ['Personal gear'],
    addons: [
      { name: 'Porter Service', price: 3000, details: ['Full trek support'] },
    ],
    image_url:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 4,
    title: 'Thailand Island Hopper',
    location: 'Thailand',
    description: 'Flights + 4 star stays',
    rating: 4.7,
    reviews: '14K+ bookings',
    price: 45999,
    priceLabel: 'From ₹45,999/guest',
    badge: 'Popular',
    duration: '5 Days - 4 Nights',
    highlights: ['Island hopping', '4-star hotels'],
    about:
      "Explore Thailand's top islands with luxury stays and exciting nightlife.",
    itinerary: [
      { day: 1, title: 'Arrival Phuket', points: ['Check-in'] },
      { day: 2, title: 'Island Tour', points: ['Phi Phi islands'] },
      { day: 3, title: 'Leisure', points: ['Beach day'] },
    ],
    inclusions: ['Flights', 'Hotels'],
    exclusions: ['Visa fees'],
    addons: [{ name: 'Jet Ski', price: 2500, details: ['30 min ride'] }],
    image_url:
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578167635648-df79e1565908?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587691254941-bbd1faa13154?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 5,
    title: 'Rishikesh Adventure',
    location: 'Rishikesh, India',
    description: 'Rafting + camping + yoga',
    rating: 4.6,
    reviews: '10K+ bookings',
    price: 5999,
    priceLabel: 'From ₹5,999/guest',
    badge: 'Popular',
    duration: '2 Days - 1 Night',
    highlights: ['River rafting', 'Camping & yoga'],
    about:
      'An adrenaline-packed trip with rafting, camping, and peaceful yoga sessions.',
    itinerary: [
      { day: 1, title: 'Arrival', points: ['Camp check-in', 'Bonfire'] },
      { day: 2, title: 'Adventure', points: ['River rafting', 'Checkout'] },
    ],
    inclusions: ['Meals', 'Activities'],
    exclusions: ['Transport'],
    addons: [{ name: 'Bungee Jump', price: 3500, details: ['One jump'] }],
    image_url:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549887534-3db1bd59dcca?w=800&h=500&fit=crop',
    ],
  },
];

const BADGE_COLORS = {
  Trending: { bg: '#FEF3C7', text: '#D97706' },
  Popular: { bg: '#E6F4EF', text: '#1F8A70' },
};

const CuratedPackagesScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = id =>
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));

  const filtered = curatedPackages.filter(
    p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()),
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
        </View>

        {/* Info */}
        <View style={{ padding: 14 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 2,
            }}
          >
            {item.title}
          </Text>
          <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
            {item.description}
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
          Curated Packages
        </Text>
        <Text style={{ fontSize: 13, color: '#6B7280' }}>
          {filtered.length} packages
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
            placeholder="Search packages..."
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

export default CuratedPackagesScreen;
