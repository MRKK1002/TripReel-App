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
import { experiencesAPI, packagesAPI, SERVER_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';

const resolveImage = url => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url}`;
};

const BADGE_COLORS = {
  Trending: { bg: '#FEF3C7', text: '#D97706' },
  Popular: { bg: '#E6F4EF', text: '#1F8A70' },
  New: { bg: '#EDE9FE', text: '#7C3AED' },
};

const ExperiencesNearYouScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState({});
  const [error, setError] = useState('');

  const userState = (user?.state || '').trim();

  const fetchItems = useCallback(async () => {
    try {
      setError('');

      // Try experiences API first
      const expRes = await experiencesAPI.getAll({ limit: 100 });
      const expItems = expRes.data?.experiences || [];

      if (expItems.length > 0) {
        setItems(expItems);
      } else {
        // Fallback: packages from user's state (or all packages if no state)
        const pkgRes = await packagesAPI.getAll({ limit: 100 });
        let pkgs = (pkgRes.data?.packages || []).map(p => ({
          ...p,
          image_url: resolveImage(p.image_url),
        }));
        if (userState) {
          pkgs = pkgs.filter(
            p =>
              (p.location || '')
                .toLowerCase()
                .includes(userState.toLowerCase()) ||
              (p.destination || '')
                .toLowerCase()
                .includes(userState.toLowerCase()),
          );
        }
        setItems(pkgs);
      }
    } catch (err) {
      setError('Failed to load. Pull down to retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userState]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchItems();
  };

  const toggleWishlist = id =>
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));

  const screenTitle = userState
    ? `Experiences in ${userState}`
    : 'Experiences Near You';

  const filtered = items.filter(
    item =>
      (item.title || item.name || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => {
    const id = item._id || item.id;
    const title = item.title || item.name || '';
    const badgeKey = item.badge || 'Popular';
    const badge = BADGE_COLORS[badgeKey] || BADGE_COLORS.Popular;
    const imageUri =
      resolveImage(item.image_url || item.image) ||
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop';
    const price = item.pricing?.adultPrice || item.price || 0;
    const priceLabel = price
      ? `From ₹${Number(price).toLocaleString('en-IN')}/guest`
      : '';

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(
            item.highlights ? 'PackageDetails' : 'DestinationDetail',
            item.highlights ? { package: item } : { destination: item },
          )
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
              {badgeKey}
            </Text>
          </View>
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
              color={wishlist[id] ? '#EF4444' : '#9CA3AF'}
              fill={wishlist[id] ? '#EF4444' : 'none'}
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
                  {item.rating || 4.5}
                </Text>
              </View>
              {item.duration ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Clock size={13} color="#6B7280" />
                  <Text
                    style={{ fontSize: 13, color: '#6B7280', marginLeft: 4 }}
                  >
                    {item.duration}
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
          {screenTitle}
        </Text>
        <Text style={{ fontSize: 13, color: '#6B7280' }}>
          {filtered.length} found
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
            placeholder="Search..."
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
                {userState
                  ? `No experiences found in ${userState} yet.`
                  : 'No experiences found.'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ExperiencesNearYouScreen;
