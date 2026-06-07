import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  RefreshControl,
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
import { packagesAPI, SERVER_URL } from '../services/api';
import { useWishlist } from '../context/WishlistContext';

// Resolve image URLs
const resolveImage = url => {
  if (!url) return null;
  if (url.startsWith('http')) {
    if (url.includes('/uploads/')) {
      const path = url.substring(url.indexOf('/uploads/'));
      return `${SERVER_URL}${path}`;
    }
    return url;
  }
  return `${SERVER_URL}${url}`;
};

const PopularDestinationScreen = () => {
  const navigation = useNavigation();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  // Global wishlist context
  const { isSaved, toggleWishlist } = useWishlist();

  const fetchDestinations = useCallback(async () => {
    try {
      setError('');
      const res = await packagesAPI.getPopular(10);
      const data = res.data?.packages || [];
      setDestinations(data);
    } catch (err) {
      setError('Failed to load destinations. Pull down to retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDestinations();
  };

  const filtered = destinations.filter(
    d =>
      (d.title || d.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.location || '').toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => {
    const id = item._id || item.id;
    const title = item.title || item.name || '';
    const price =
      item.batchPrice || item.pricing?.adultPrice || item.price || 0;
    const priceLabel = price
      ? `From ₹${Number(price).toLocaleString('en-IN')}/guest`
      : '';
    const imageUri =
      resolveImage(item.image_url || item.image) ||
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop';
    // Popular badge — earned via bookings or good rating
    const showPopularBadge =
      (item.bookingCount || 0) >= 1 ||
      ((item.avgRating || 0) >= 4.0 && (item.reviewCount || 0) >= 1);

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
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: '100%', height: 200 }}
            resizeMode="cover"
          />
          {showPopularBadge && (
            <View
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: '#1F8A70',
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>
                Popular
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => toggleWishlist(id)}
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
              color={isSaved(id) ? '#EF4444' : '#9CA3AF'}
              fill={isSaved(id) ? '#EF4444' : 'none'}
            />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 14 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 4,
            }}
          >
            {title}
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
                  {item.avgRating || 'New'}
                </Text>
                {item.reviewCount ? (
                  <Text
                    style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 3 }}
                  >
                    ({item.reviewCount})
                  </Text>
                ) : null}
              </View>
              {item.duration || item.durationDays ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Clock size={13} color="#6B7280" />
                  <Text
                    style={{ fontSize: 13, color: '#6B7280', marginLeft: 4 }}
                  >
                    {item.duration ||
                      `${item.durationDays}D/${(item.durationDays || 1) - 1}N`}
                  </Text>
                </View>
              ) : null}
            </View>
            {priceLabel ? (
              <Text
                style={{ fontSize: 14, fontWeight: '700', color: '#1F8A70' }}
              >
                {priceLabel}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

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

      {loading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#1F8A70" />
        </View>
      ) : error ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 32,
          }}
        >
          <Text style={{ color: '#6B7280', textAlign: 'center', fontSize: 14 }}>
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => String(item._id || item.id)}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#1F8A70']}
            />
          }
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingTop: 60 }}>
              <Text style={{ color: '#9CA3AF', fontSize: 14 }}>
                No destinations found.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default PopularDestinationScreen;
