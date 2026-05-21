import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  RefreshControl,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import './../../android/app/src/utils/globalFont.js';
import { packagesAPI, reelsAPI } from '../services/api';
import { Search, ChevronRight, Star, Heart, X, Play } from 'lucide-react-native';

// ─── Recently Viewed — static local history (no backend yet) ─────────────────
const recentlyViewed = [
  { id: 1, title: 'Hyderabad',  rating: 4.5, duration: '2 hours', image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop' },
  { id: 2, title: 'Goa, India', rating: 4.5, duration: '2 hours', image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop' },
  { id: 3, title: 'Beachside',  rating: 4.5, duration: '2 hours', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop' },
  { id: 4, title: 'Hyderabad',  rating: 4.5, duration: '2 hours', image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop' },
  { id: 5, title: 'Mumbai',     rating: 4.6, duration: '3 hours', image_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&h=300&fit=crop' },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  // ── State ───────────────────────────────────────────────────────────────────
  // categoryMap: { [categoryName: string]: Package[] }
  // Built dynamically from backend — whatever categories exist, max 5 each
  const [categoryMap,    setCategoryMap]    = useState({});
  const [guestFavorites, setGuestFavorites] = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [refreshing,     setRefreshing]     = useState(false);
  const [activeVideo,    setActiveVideo]    = useState(null);
  const [wishlist,       setWishlist]       = useState({});

  // ── Data fetching ───────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    try {
      // One call for all approved packages + one for reels — no hardcoded categories
      const [pkgRes, reelRes] = await Promise.all([
        packagesAPI.getAll({ limit: 100 }),
        reelsAPI.getAll({ limit: 10 }),
      ]);

      const allPackages = pkgRes.data?.packages || [];

      // Group packages by their `category` field, max 5 per category
      // Order of categories follows first-seen order in the response
      const map = {};
      for (const pkg of allPackages) {
        const cat = (pkg.category || '').trim();
        if (!cat) continue;                   // skip uncategorised packages
        if (!map[cat]) map[cat] = [];
        if (map[cat].length < 5) map[cat].push(pkg);
      }

      setCategoryMap(map);
      setGuestFavorites(reelRes.data?.reels || []);
    } catch (err) {
      console.warn('HomeScreen fetch error:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // ── Wishlist helpers ────────────────────────────────────────────────────────
  const toggleWishlist = (id, type) =>
    setWishlist(prev => {
      const key = `${type}_${id}`;
      const next = { ...prev };
      if (next[key]) delete next[key]; else next[key] = true;
      return next;
    });

  const isInWishlist = (id, type) => !!wishlist[`${type}_${id}`];

  const openPackage = pkg => navigation.navigate('PackageDetails', { package: pkg });

  // ── Renderers ───────────────────────────────────────────────────────────────

  // Recently Viewed card
  const renderRecentlyViewedItem = ({ item }) => (
    <TouchableOpacity style={{ width: 160, marginRight: 16 }} activeOpacity={0.9}>
      <View style={{ position: 'relative' }}>
        <Image source={{ uri: item.image_url }} style={{ width: 160, height: 160, borderRadius: 12 }} resizeMode="cover" />
        <TouchableOpacity
          style={{ position: 'absolute', top: 8, right: 8, padding: 6 }}
          onPress={() => toggleWishlist(item.id, 'recent')}
        >
          <Heart size={18} color={isInWishlist(item.id, 'recent') ? '#EF4444' : '#fff'} fill={isInWishlist(item.id, 'recent') ? '#EF4444' : 'none'} />
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 8, fontWeight: '600', color: '#0F172A', fontSize: 14 }} numberOfLines={1}>{item.title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Star size={13} color="#4CAF50" fill="#4CAF50" />
        <Text style={{ marginLeft: 4, fontSize: 12, color: '#475569' }}>{item.rating} · {item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  // Universal package card — used for every dynamic category section
  const renderPackageItem = ({ item }) => (
    <TouchableOpacity style={{ width: 176, marginRight: 16 }} activeOpacity={0.9} onPress={() => openPackage(item)}>
      <View style={{ position: 'relative' }}>
        <Image source={{ uri: item.image_url }} style={{ width: 176, height: 176, borderRadius: 12 }} resizeMode="cover" />
        {item.badge ? (
          <View style={{ position: 'absolute', top: 8, left: 8, backgroundColor: '#E6F4EF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#1F8A70' }}>{item.badge}</Text>
          </View>
        ) : null}
        <TouchableOpacity style={{ position: 'absolute', top: 8, right: 8, padding: 6 }} onPress={() => toggleWishlist(item._id, 'pkg')}>
          <Heart size={18} color={isInWishlist(item._id, 'pkg') ? '#EF4444' : '#fff'} fill={isInWishlist(item._id, 'pkg') ? '#EF4444' : 'none'} />
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 8, fontWeight: '600', color: '#0F172A', fontSize: 14 }} numberOfLines={1}>{item.title}</Text>
      {item.location ? (
        <Text style={{ fontSize: 12, color: '#64748B', marginTop: 2 }} numberOfLines={1}>{item.location}</Text>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Star size={12} color="#4CAF50" fill="#4CAF50" />
        <Text style={{ marginLeft: 4, fontSize: 12, color: '#475569' }}>
          {item.rating} · ₹{item.price?.toLocaleString('en-IN')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Guest Favorites (reels) card
  const renderGuestFavoriteItem = ({ item }) => (
    <TouchableOpacity style={{ width: 194, marginRight: 16 }} activeOpacity={0.9} onPress={() => setActiveVideo(item)}>
      <View style={{ position: 'relative' }}>
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={{ width: 194, height: 291, borderRadius: 12 }} resizeMode="cover" />
        ) : (
          <Video source={{ uri: item.video }} style={{ width: 194, height: 291, borderRadius: 12 }} resizeMode="cover" muted paused repeat={false} />
        )}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.25)' }} />
        <View style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -18 }, { translateY: -18 }], width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={18} color="#fff" fill="#fff" />
        </View>
        {item.user?.name ? (
          <View style={{ position: 'absolute', bottom: 8, left: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, backgroundColor: '#E6F4EF' }}>
              {item.user.avatar ? <Image source={{ uri: item.user.avatar }} style={{ width: 18, height: 18, borderRadius: 9, marginRight: 6 }} /> : null}
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#1F8A70' }}>{item.user.name}</Text>
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  // Video fullscreen modal
  const VideoModal = ({ visible, item, onClose }) => {
    if (!item) return null;
    return (
      <Modal visible={visible} animationType="fade" statusBarTranslucent onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <Video source={{ uri: item.video }} style={StyleSheet.absoluteFillObject} resizeMode="contain" muted={false} repeat paused={false} />
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.modalInfo}>
            <Text style={styles.modalTitle}>{item.title}</Text>
            <Text style={styles.modalLocation}>{item.location}</Text>
            {item.user?.name ? (
              <View style={styles.modalUser}>
                {item.user.avatar ? <Image source={{ uri: item.user.avatar }} style={styles.modalAvatar} /> : null}
                <Text style={styles.modalUserName}>{item.user.name}</Text>
                {item.user.role ? <Text style={styles.modalRole}> · {item.user.role}</Text> : null}
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    );
  };

  const SectionLoader = () => (
    <View style={{ paddingVertical: 12 }}>
      <ActivityIndicator size="small" color="#1F8A70" />
    </View>
  );

  const EmptySection = ({ message = 'No packages available yet.' }) => (
    <View style={{ paddingVertical: 8 }}>
      <Text style={{ color: '#94A3B8', fontSize: 13 }}>{message}</Text>
    </View>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  const categoryEntries = Object.entries(categoryMap); // [[catName, [pkg,...]], ...]

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#E6F4EF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F4EF" />

      {/* Search bar header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, backgroundColor: '#E6F4EF', marginTop: 48 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{ flexDirection: 'row', alignItems: 'center', height: 56, borderRadius: 28, backgroundColor: '#FFFFFF', paddingHorizontal: 16, gap: 4, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 }}
        >
          <Search size={20} color="#4A5568" />
          <Text style={{ color: '#4A5568', fontFamily: 'Inter_24pt-Regular', fontSize: 15, marginLeft: 4 }}>
            Find your next trip or experience
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: '#fff' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1F8A70']} />}
      >
        {/* ── Recently Viewed (static) ── */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24, backgroundColor: '#fff' }}>
          <Text style={styles.sectionHeading}>Recently viewed</Text>
          <FlatList
            data={recentlyViewed}
            renderItem={renderRecentlyViewedItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* ── Dynamic category sections ── */}
        {loading ? (
          <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
            <SectionLoader />
          </View>
        ) : categoryEntries.length === 0 ? (
          <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
            <EmptySection message="No packages available yet." />
          </View>
        ) : (
          categoryEntries.map(([categoryName, packages]) => (
            <View key={categoryName} style={{ paddingHorizontal: 16, paddingVertical: 24, marginTop: 2, backgroundColor: '#fff' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={styles.sectionHeading}>{categoryName}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PackageDetails', { categoryName })}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <ChevronRight size={16} color="#1F8A70" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={packages}
                renderItem={renderPackageItem}
                keyExtractor={item => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ))
        )}

        {/* ── Guest Favorites (reels from backend) ── */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24, marginTop: 2, marginBottom: 8, backgroundColor: '#fff' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={styles.sectionHeading}>Guest Favorites</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GuestFavorites')} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ChevronRight size={16} color="#1F8A70" />
            </TouchableOpacity>
          </View>
          {loading ? (
            <SectionLoader />
          ) : guestFavorites.length === 0 ? (
            <EmptySection message="No guest favorites yet." />
          ) : (
            <FlatList
              data={guestFavorites}
              renderItem={renderGuestFavoriteItem}
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>

      <VideoModal visible={!!activeVideo} item={activeVideo} onClose={() => setActiveVideo(null)} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionHeading: {
    fontFamily: 'Inter_28pt-Regular',
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalContainer: { flex: 1, backgroundColor: '#000' },
  closeBtn: {
    position: 'absolute', top: 50, left: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center', justifyContent: 'center', zIndex: 10,
  },
  modalInfo: { position: 'absolute', bottom: 40, left: 20, right: 20 },
  modalTitle:    { color: '#fff', fontSize: 20, fontWeight: '700' },
  modalLocation: { color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 4 },
  modalUser:     { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  modalAvatar:   { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
  modalUserName: { color: '#fff', fontSize: 13, fontWeight: '600' },
  modalRole:     { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
});

export default HomeScreen;
