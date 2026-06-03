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
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Search,
  ChevronRight,
  Star,
  Heart,
  X,
  Play,
  MapPin,
  Eye,
} from 'lucide-react-native';
import {
  packagesAPI,
  experiencesAPI,
  reelsAPI,
  SERVER_URL,
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useRecentlyViewed, timeAgo } from '../hooks/useRecentlyViewed';
import './../../android/app/src/utils/globalFont.js';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const REEL_COL_WIDTH = (SCREEN_WIDTH - 48) / 2; // 2-column grid with padding

// Resolve relative /uploads/... paths to absolute URLs
const resolveImage = url => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url}`;
};

// ─── Reusable Section Header ──────────────────────────────────────────────────
const SectionHeader = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeaderRow}>
    <Text style={styles.sectionHeading}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity
        onPress={onSeeAll}
        hitSlop={12}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
      >
        <Text style={{ fontSize: 13, color: '#1F8A70', fontWeight: '600' }}>
          See all
        </Text>
        <ChevronRight size={14} color="#1F8A70" />
      </TouchableOpacity>
    )}
  </View>
);

// ─── Package card (used for Popular Destinations, Curated, Experiences Near You) ─
const PackageCard = ({
  item,
  onPress,
  onWishlist,
  inWishlist,
  wide = false,
}) => {
  const width = wide ? 220 : 176;
  const height = wide ? 160 : 176;
  const imageUri =
    resolveImage(item.image_url || item.image) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop';

  const price = item.pricing?.adultPrice || item.price || 0;
  const priceText = price ? `₹${Number(price).toLocaleString('en-IN')}` : null;

  return (
    <TouchableOpacity
      style={{ width, marginRight: 14 }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width, height, borderRadius: 14 }}
          resizeMode="cover"
        />
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={onWishlist}
          hitSlop={8}
        >
          <Heart
            size={17}
            color={inWishlist ? '#EF4444' : '#fff'}
            fill={inWishlist ? '#EF4444' : 'none'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title || item.name}
      </Text>
      {item.location ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 2,
            gap: 3,
          }}
        >
          <MapPin size={11} color="#94A3B8" />
          <Text style={styles.cardLocation} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      ) : null}
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}
      >
        <Star size={12} color="#F59E0B" fill="#F59E0B" />
        <Text style={styles.cardMeta}>
          {item.avgRating || item.rating || 4.5}
          {item.reviewCount ? ` (${item.reviewCount})` : ''}
        </Text>
        {priceText ? (
          <Text style={styles.cardPrice}> · {priceText}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

// ─── Recently Viewed card ─────────────────────────────────────────────────────
const RecentCard = ({ item, onPress }) => {
  const imageUri =
    resolveImage(item.image_url) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop';
  return (
    <TouchableOpacity
      style={{ width: 90, marginRight: 12 }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: 90, height: 90, borderRadius: 10 }}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderRadius: 10,
            padding: 3,
          }}
        >
          <Heart size={13} color="#9CA3AF" fill="none" />
        </View>
      </View>
      <Text
        style={{
          marginTop: 5,
          fontWeight: '600',
          color: '#0F172A',
          fontSize: 12,
        }}
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 2,
          gap: 3,
        }}
      >
        <Star size={10} color="#4CAF50" fill="#4CAF50" />
        <Text style={{ fontSize: 11, color: '#64748B' }}>
          {item.rating || 4.5}
        </Text>
        <Text style={{ fontSize: 11, color: '#CBD5E1' }}>·</Text>
        <Text style={{ fontSize: 11, color: '#94A3B8' }}>
          {timeAgo(item.viewedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ─── Popular Destination card (wider, rating-sorted) ─────────────────────────
const DestCard = ({ item, onPress, onWishlist, inWishlist }) => {
  const imageUri =
    resolveImage(item.image_url || item.image) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop';
  const price = item.price || 0;

  return (
    <TouchableOpacity
      style={{ width: 200, marginRight: 14 }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 150, borderRadius: 14 }}
          resizeMode="cover"
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Popular</Text>
        </View>
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={onWishlist}
          hitSlop={8}
        >
          <Heart
            size={17}
            color={inWishlist ? '#EF4444' : '#fff'}
            fill={inWishlist ? '#EF4444' : 'none'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.name || item.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 2,
          gap: 3,
        }}
      >
        <MapPin size={11} color="#94A3B8" />
        <Text style={styles.cardLocation} numberOfLines={1}>
          {item.location}
        </Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}
      >
        <Star size={12} color="#F59E0B" fill="#F59E0B" />
        <Text style={styles.cardMeta}>
          {item.avgRating || item.rating || 4.5}
          {item.reviewCount ? ` (${item.reviewCount})` : ''}
        </Text>
        {price ? (
          <Text style={styles.cardPrice}>
            {' '}
            · From ₹{Number(price).toLocaleString('en-IN')}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

// ─── Reel card (2-column grid) ────────────────────────────────────────────────
const ReelCard = ({ item, onPress }) => {
  const thumb = item.thumbnail ? resolveImage(item.thumbnail) : null;
  const views = item.views
    ? item.views >= 1000
      ? `${(item.views / 1000).toFixed(1)}k`
      : String(item.views)
    : null;

  return (
    <TouchableOpacity
      style={{ width: REEL_COL_WIDTH, marginBottom: 12 }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View
        style={{ position: 'relative', borderRadius: 14, overflow: 'hidden' }}
      >
        {thumb ? (
          <Image
            source={{ uri: thumb }}
            style={{ width: REEL_COL_WIDTH, height: REEL_COL_WIDTH * 1.4 }}
            resizeMode="cover"
          />
        ) : (
          <Video
            source={{ uri: item.video }}
            style={{ width: REEL_COL_WIDTH, height: REEL_COL_WIDTH * 1.4 }}
            resizeMode="cover"
            muted
            paused
            repeat={false}
          />
        )}
        {/* dark overlay */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.22)',
          }}
        />
        {/* play icon */}
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -16 }, { translateY: -16 }],
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Play size={15} color="#fff" fill="#fff" />
        </View>
        {/* view count */}
        {views ? (
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 10,
              paddingHorizontal: 6,
              paddingVertical: 3,
              gap: 4,
            }}
          >
            <Eye size={11} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>
              {views}
            </Text>
          </View>
        ) : null}
        {/* uploader name */}
        {item.user?.name ? (
          <View style={{ position: 'absolute', bottom: 8, left: 8 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E6F4EF',
                borderRadius: 10,
                paddingHorizontal: 6,
                paddingVertical: 3,
                gap: 4,
              }}
            >
              {item.user.avatar ? (
                <Image
                  source={{ uri: item.user.avatar }}
                  style={{ width: 14, height: 14, borderRadius: 7 }}
                />
              ) : null}
              <Text
                style={{ fontSize: 10, fontWeight: '600', color: '#1F8A70' }}
              >
                {item.user.name}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

// ─── Main HomeScreen ──────────────────────────────────────────────────────────
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { recentlyViewed, addViewed } = useRecentlyViewed();

  // ── State ───────────────────────────────────────────────────────────────────
  const [categoryMap, setCategoryMap] = useState({}); // { catName: [pkg] }
  const [popularDests, setPopularDests] = useState([]); // sorted by rating
  const [nearYouItems, setNearYouItems] = useState([]); // experiences matching state
  const [reels, setReels] = useState([]); // video reels (2-col grid)
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [wishlist, setWishlist] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);

  // ── Data fetching ───────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    try {
      const userState = user?.state?.trim() || '';

      const calls = [
        packagesAPI.getAll({ limit: 100 }), // all packages for curated
        packagesAPI.getPopular(10), // top-rated packages for Popular Destinations
        reelsAPI.getAll({ limit: 20 }),
      ];

      // Only fetch experiences if user has a state set
      if (userState) {
        calls.push(experiencesAPI.getByLocation(userState));
      } else {
        calls.push(experiencesAPI.getAll({ limit: 10 }));
      }

      const [pkgRes, destRes, reelRes, expRes] = await Promise.all(calls);

      // ── Packages → group by category ─────────────────────────────────────
      const allPkgs = (pkgRes.data?.packages || []).map(p => ({
        ...p,
        image_url: resolveImage(p.image_url),
        images: (p.images || []).map(resolveImage).filter(Boolean),
      }));

      const map = {};
      // Put ALL packages in one "Curated Packages" section on home (max 5 shown)
      if (allPkgs.length > 0) {
        map['Curated Packages'] = allPkgs.slice(0, 5);
      }
      setCategoryMap(map);

      // ── Popular Destinations → top-rated packages sorted by avgRating desc ──
      const popularPkgs = destRes.data?.packages || [];
      setPopularDests(popularPkgs);

      // ── Reels ─────────────────────────────────────────────────────────────
      setReels(reelRes.data?.reels || []);

      // ── Experiences Near You ─────────────────────────────────────────────
      // Try experiences API first; if empty, fall back to packages
      // matching the user's state so the section is never empty
      const expItems = expRes.data?.experiences || [];
      if (expItems.length > 0) {
        setNearYouItems(expItems);
      } else {
        // Fallback: packages whose location contains the user's state keyword
        const keyword = userState.toLowerCase();
        const fallback = keyword
          ? allPkgs
              .filter(
                p =>
                  (p.location || '').toLowerCase().includes(keyword) ||
                  (p.destination || '').toLowerCase().includes(keyword),
              )
              .slice(0, 8)
          : allPkgs.slice(0, 8); // no state → just show first 8 packages
        setNearYouItems(fallback);
      }
    } catch (err) {
      console.warn('HomeScreen fetch error:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.state]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // ── Wishlist helpers ────────────────────────────────────────────────────────
  const toggleWishlist = id =>
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));

  const openPackage = pkg => {
    addViewed(pkg);
    navigation.navigate('PackageDetails', { package: pkg });
  };

  const categoryEntries = Object.entries(categoryMap);
  const userState = user?.state?.trim() || '';

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#E6F4EF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F4EF" />

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={styles.searchBar}
          activeOpacity={0.85}
        >
          <Search size={20} color="#64748B" />
          <Text style={styles.searchPlaceholder}>
            Find your next trip or experience
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: '#fff' }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1F8A70']}
          />
        }
      >
        {/* ── Recently Viewed ────────────────────────────────────────────── */}
        {recentlyViewed.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Recently Viewed" />
            <FlatList
              data={recentlyViewed}
              renderItem={({ item }) => (
                <RecentCard
                  item={item}
                  onPress={() =>
                    navigation.navigate('PackageDetails', { package: item })
                  }
                />
              )}
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            />
          </View>
        )}

        {/* ── Popular Destinations ───────────────────────────────────────── */}
        {loading ? (
          <View style={styles.section}>
            <SectionHeader title="Popular Destinations" />
            <ActivityIndicator size="small" color="#1F8A70" />
          </View>
        ) : popularDests.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader
              title="Popular Destinations"
              onSeeAll={() => navigation.navigate('PopularDestinations')}
            />
            <FlatList
              data={popularDests}
              renderItem={({ item }) => (
                <DestCard
                  item={item}
                  onPress={() =>
                    navigation.navigate('DestinationDetail', {
                      destination: item,
                    })
                  }
                  onWishlist={() => toggleWishlist(item._id)}
                  inWishlist={!!wishlist[item._id]}
                />
              )}
              keyExtractor={item => String(item._id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            />
          </View>
        ) : null}

        {/* ── Dynamic category sections (Curated Packages etc.) ─────────── */}
        {loading ? (
          <View style={styles.section}>
            <SectionHeader title="Curated Packages" />
            <ActivityIndicator size="small" color="#1F8A70" />
          </View>
        ) : categoryEntries.length > 0 ? (
          categoryEntries.map(([catName, packages]) => (
            <View key={catName} style={styles.section}>
              <SectionHeader
                title={catName}
                onSeeAll={() =>
                  navigation.navigate('CuratedPackages', {
                    categoryName: catName,
                  })
                }
              />
              <FlatList
                data={packages}
                renderItem={({ item }) => (
                  <PackageCard
                    item={item}
                    onPress={() => openPackage(item)}
                    onWishlist={() => toggleWishlist(item._id)}
                    inWishlist={!!wishlist[item._id]}
                  />
                )}
                keyExtractor={item => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
              />
            </View>
          ))
        ) : !loading ? (
          <View style={styles.section}>
            <SectionHeader title="Curated Packages" />
            <Text style={styles.emptyText}>No packages available yet.</Text>
          </View>
        ) : null}

        {/* ── Experiences Near You (cards) ───────────────────────────────── */}
        {loading ? (
          <View style={styles.section}>
            <SectionHeader
              title={
                userState
                  ? `Experiences in ${userState}`
                  : 'Experiences Near You'
              }
            />
            <ActivityIndicator size="small" color="#1F8A70" />
          </View>
        ) : nearYouItems.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader
              title={
                userState
                  ? `Experiences in ${userState}`
                  : 'Experiences Near You'
              }
              onSeeAll={() => navigation.navigate('ExperiencesNearYou')}
            />
            <FlatList
              data={nearYouItems}
              renderItem={({ item }) => (
                <PackageCard
                  item={{ ...item, title: item.name || item.title }}
                  onPress={() =>
                    navigation.navigate('DestinationDetail', {
                      destination: item,
                    })
                  }
                  onWishlist={() => toggleWishlist(item._id)}
                  inWishlist={!!wishlist[item._id]}
                  wide
                />
              )}
              keyExtractor={item => String(item._id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            />
          </View>
        ) : null}

        {/* ── Experience Reels (2-column video grid) ─────────────────────── */}
        {reels.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="Experiences Near You"
              onSeeAll={() => navigation.navigate('GuestFavorites')}
            />
            {/* 2-col grid */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {reels.map(item => (
                <ReelCard
                  key={item._id}
                  item={item}
                  onPress={() => setActiveVideo(item)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Bottom padding */}
        <View style={{ height: 32 }} />
      </ScrollView>

      {/* ── Fullscreen video modal ───────────────────────────────────────── */}
      <Modal
        visible={!!activeVideo}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setActiveVideo(null)}
      >
        {activeVideo ? (
          <View style={styles.modalContainer}>
            <Video
              source={{ uri: activeVideo.video }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="contain"
              muted={false}
              repeat
              paused={false}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setActiveVideo(null)}
            >
              <X size={22} color="#fff" />
            </TouchableOpacity>
            <View style={styles.modalInfo}>
              <Text style={styles.modalTitle}>{activeVideo.title}</Text>
              {activeVideo.location ? (
                <Text style={styles.modalLocation}>{activeVideo.location}</Text>
              ) : null}
              {activeVideo.user?.name ? (
                <View style={styles.modalUser}>
                  {activeVideo.user.avatar ? (
                    <Image
                      source={{ uri: activeVideo.user.avatar }}
                      style={styles.modalAvatar}
                    />
                  ) : null}
                  <Text style={styles.modalUserName}>
                    {activeVideo.user.name}
                  </Text>
                  {activeVideo.user.role ? (
                    <Text style={styles.modalRole}>
                      {' '}
                      · {activeVideo.user.role}
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
      </Modal>
    </SafeAreaProvider>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: '#E6F4EF',
    marginTop: 44,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  searchPlaceholder: {
    color: '#94A3B8',
    fontSize: 14,
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 4,
    backgroundColor: '#fff',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter_28pt-Regular',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E6F4EF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#1F8A70' },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
  },
  cardTitle: {
    marginTop: 8,
    fontWeight: '600',
    color: '#0F172A',
    fontSize: 14,
  },
  cardLocation: {
    fontSize: 12,
    color: '#94A3B8',
  },
  cardMeta: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748B',
  },
  cardPrice: {
    fontSize: 12,
    color: '#1F8A70',
    fontWeight: '600',
  },
  emptyText: { color: '#94A3B8', fontSize: 13, paddingBottom: 8 },
  // Video modal
  modalContainer: { flex: 1, backgroundColor: '#000' },
  closeBtn: {
    position: 'absolute',
    top: 52,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalInfo: { position: 'absolute', bottom: 48, left: 20, right: 20 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  modalLocation: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    marginTop: 4,
  },
  modalUser: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  modalAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
  modalUserName: { color: '#fff', fontSize: 13, fontWeight: '600' },
  modalRole: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
});

export default HomeScreen;
