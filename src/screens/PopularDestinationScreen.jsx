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
import { ArrowLeft, Search, Star, Heart, MapPin, Clock } from 'lucide-react-native';
import { destinationsAPI } from '../services/api';

const PopularDestinationScreen = () => {
  const navigation = useNavigation();
  const [destinations, setDestinations] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [search,       setSearch]       = useState('');
  const [wishlist,     setWishlist]     = useState({});
  const [error,        setError]        = useState('');

  const fetchDestinations = useCallback(async () => {
    try {
      setError('');
      const res = await destinationsAPI.getAll({ limit: 100 });
      // backend may return { destinations: [] } or { popularDestinations: [] }
      const data =
        res.data?.destinations ||
        res.data?.popularDestinations ||
        res.data?.data ||
        [];
      setDestinations(data);
    } catch (err) {
      setError('Failed to load destinations. Pull down to retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchDestinations(); }, [fetchDestinations]);

  const onRefresh = () => { setRefreshing(true); fetchDestinations(); };

  const toggleWishlist = id =>
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));

  const filtered = destinations.filter(
    d =>
      (d.title || d.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.location || '').toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => {
    const id = item._id || item.id;
    const title = item.title || item.name || '';
    const priceLabel = item.priceLabel ||
      (item.price ? `From ₹${Number(item.price).toLocaleString('en-IN')}/guest` : '');

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DestinationDetail', { destination: item })}
        style={{
          backgroundColor: '#fff', borderRadius: 16,
          marginHorizontal: 16, marginBottom: 16,
          overflow: 'hidden', shadowColor: '#000',
          shadowOpacity: 0.08, shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 }, elevation: 3,
        }}
      >
        <View style={{ position: 'relative' }}>
          <Image
            source={{
              uri: item.image_url || item.image ||
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
            }}
            style={{ width: '100%', height: 200 }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute', top: 12, left: 12,
              backgroundColor: '#E6F4EF', borderRadius: 20,
              paddingHorizontal: 10, paddingVertical: 4,
            }}
          >
            <Text style={{ color: '#1F8A70', fontSize: 11, fontWeight: '700' }}>Popular</Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleWishlist(id)}
            style={{
              position: 'absolute', top: 10, right: 10,
              backgroundColor: 'rgba(255,255,255,0.85)',
              borderRadius: 20, padding: 6,
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
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 }}>
            {title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
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
            {priceLabel ? (
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1F8A70' }}>
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
          flexDirection: 'row', alignItems: 'center',
          paddingHorizontal: 16, paddingVertical: 12,
          backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', flex: 1 }}>
          Popular Destinations
        </Text>
        <Text style={{ fontSize: 13, color: '#6B7280' }}>{filtered.length} places</Text>
      </View>

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
            placeholder="Search destinations..."
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
          <Text style={{ color: '#6B7280', textAlign: 'center', fontSize: 14 }}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => String(item._id || item.id)}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1F8A70']} />
          }
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingTop: 60 }}>
              <Text style={{ color: '#9CA3AF', fontSize: 14 }}>No destinations found.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default PopularDestinationScreen;
