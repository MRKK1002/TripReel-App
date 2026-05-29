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
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Search, Star, Heart, MapPin, Clock } from 'lucide-react-native';
import { packagesAPI, SERVER_URL } from '../services/api';

const BADGE_COLORS = {
  Trending: { bg: '#FEF3C7', text: '#D97706' },
  Popular:  { bg: '#E6F4EF', text: '#1F8A70' },
  New:      { bg: '#EDE9FE', text: '#7C3AED' },
};

// Convert relative /uploads/... paths to full URLs
const resolveImage = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url}`;
};

const CuratedPackagesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // categoryName passed from HomeScreen arrow — filter to that category if provided
  const categoryName = route.params?.categoryName || null;

  const [packages,   setPackages]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search,     setSearch]     = useState('');
  const [wishlist,   setWishlist]   = useState({});
  const [error,      setError]      = useState('');

  const fetchPackages = useCallback(async () => {
    try {
      setError('');
      const params = { limit: 100 };
      if (categoryName) params.category = categoryName;
      const res = await packagesAPI.getAll(params);
      setPackages(res.data?.packages || []);
    } catch (err) {
      setError('Failed to load packages. Pull down to retry.');
      console.warn('CuratedPackages fetch error:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [categoryName]);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  const onRefresh = () => { setRefreshing(true); fetchPackages(); };

  const toggleWishlist = id =>
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));

  const filtered = packages.filter(
    p =>
      (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.location || '').toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => {
    const badgeKey = item.badge || 'Popular';
    const badge = BADGE_COLORS[badgeKey] || BADGE_COLORS.Popular;

    // Build price label
    const discountPrice = item.pricing?.discountPrice;
    const adultPrice    = item.pricing?.adultPrice;
    const basePrice     = item.price;
    const displayPrice  = discountPrice || adultPrice || basePrice || 0;
    const priceLabel    = item.priceLabel && isNaN(Number(item.priceLabel))
      ? item.priceLabel
      : `From ₹${Number(displayPrice).toLocaleString('en-IN')}/guest`;

    // Resolve image URL
    const imageUri = resolveImage(item.image_url) ||
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop';

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('PackageDetails', { package: {
          ...item,
          image_url: resolveImage(item.image_url),
          images: (item.images || []).map(resolveImage).filter(Boolean),
        }})}
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
            source={{ uri: imageUri }}
            style={{ width: '100%', height: 200 }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute', top: 12, left: 12,
              backgroundColor: badge.bg, borderRadius: 20,
              paddingHorizontal: 10, paddingVertical: 4,
            }}
          >
            <Text style={{ color: badge.text, fontSize: 11, fontWeight: '700' }}>
              {badgeKey}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleWishlist(item._id)}
            style={{
              position: 'absolute', top: 10, right: 10,
              backgroundColor: 'rgba(255,255,255,0.85)',
              borderRadius: 20, padding: 6,
            }}
          >
            <Heart
              size={18}
              color={wishlist[item._id] ? '#EF4444' : '#9CA3AF'}
              fill={wishlist[item._id] ? '#EF4444' : 'none'}
            />
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={{ padding: 14 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 2 }}>
            {item.title}
          </Text>
          {item.description ? (
            <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }} numberOfLines={1}>
              {item.description}
            </Text>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <MapPin size={13} color="#6B7280" />
            <Text style={{ fontSize: 13, color: '#6B7280', marginLeft: 4 }}>
              {item.location}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Star size={13} color="#F59E0B" fill="#F59E0B" />
                <Text style={{ fontSize: 13, color: '#374151', marginLeft: 4, fontWeight: '600' }}>
                  {item.rating || 4.5}
                </Text>
              </View>
              {item.duration ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Clock size={13} color="#6B7280" />
                  <Text style={{ fontSize: 13, color: '#6B7280', marginLeft: 4 }}>
                    {item.duration}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#1F8A70' }}>
              {priceLabel}
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
          flexDirection: 'row', alignItems: 'center',
          paddingHorizontal: 16, paddingVertical: 12,
          backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', flex: 1 }}>
          {categoryName === 'Curated Packages' || categoryName === 'Current Packages' || !categoryName
            ? 'Current Packages'
            : categoryName}
        </Text>
        <Text style={{ fontSize: 13, color: '#6B7280' }}>
          {filtered.length} packages
        </Text>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff' }}>
        <View
          style={{
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: '#F3F4F6', borderRadius: 12,
            paddingHorizontal: 12, paddingVertical: 10,
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

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#1F8A70" />
        </View>
      ) : error ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
          <Text style={{ color: '#EF4444', textAlign: 'center', fontSize: 14, marginBottom: 12 }}>
            {error}
          </Text>
          <TouchableOpacity
            onPress={() => { setLoading(true); fetchPackages(); }}
            style={{ backgroundColor: '#1F8A70', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1F8A70']} />
          }
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingTop: 60 }}>
              <Text style={{ color: '#9CA3AF', fontSize: 14 }}>No packages found.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default CuratedPackagesScreen;
