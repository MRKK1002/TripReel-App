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
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed, timeAgo } from '../hooks/useRecentlyViewed';
import { useLocation } from '../hooks/useLocation';
import './../../android/app/src/utils/globalFont.js';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// 2-col reel grid: 16px padding each side + 12px gap between columns
const REEL_COL_WIDTH = (SCREEN_WIDTH - 32 - 12) / 2;

// Resolve relative /uploads/... paths to absolute URLs
// Also fix admin-uploaded absolute URLs that have wrong hostname
const resolveImage = url => {
  if (!url) return null;
  if (url.startsWith('http')) {
    // Replace hostname if it's a local upload URL with wrong IP
    if (url.includes('/uploads/')) {
      const path = url.substring(url.indexOf('/uploads/'));
      return `${SERVER_URL}${path}`;
    }
    return url;
  }
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
        <Text style={{ fontSize: 14, color: '#1F8A70', fontWeight: '600' }}>
          See all
        </Text>
        <ChevronRight size={15} color="#1F8A70" strokeWidth={2.5} />
      </TouchableOpacity>
    )}
  </View>
);

// ─── Package card (Curated Packages, Experiences Near You, Popular) ──────────
const PackageCard = ({ item, onPress, onWishlist, inWishlist }) => {
  const CARD_WIDTH = 165;
  const CARD_HEIGHT = 155;
  const imageUri =
    resolveImage(item.image_url || item.image) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop';

  const price = item.pricing?.adultPrice || item.price || 0;
  const priceText = price ? `₹${Number(price).toLocaleString('en-IN')}` : null;

  return (
    <TouchableOpacity
      style={{ width: CARD_WIDTH, marginRight: 12 }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 14 }}
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
            size={16}
            color={inWishlist ? '#EF4444' : '#9CA3AF'}
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
            marginTop: 3,
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
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
      >
        <Star size={12} color="#F59E0B" fill="#F59E0B" />
        <Text style={styles.cardMeta}>
          {' '}
          {item.avgRating || item.rating || 'New'}
        </Text>
        {priceText ? <Text style={styles.cardMeta}> · </Text> : null}
        {priceText ? (
          <Text style={styles.cardPrice}>From {priceText}</Text>
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
      style={{ width: 100, marginRight: 14 }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: 100, height: 100, borderRadius: 14 }}
          resizeMode="cover"
        />
        {/* White square heart button — matches design */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 7,
            right: 7,
            width: 26,
            height: 26,
            borderRadius: 7,
            backgroundColor: 'rgba(255,255,255,0.92)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          hitSlop={6}
        >
          <Heart size={14} color="#9CA3AF" fill="none" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 6,
          fontWeight: '700',
          color: '#0F172A',
          fontSize: 13,
        }}
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 3,
          gap: 4,
        }}
      >
        <Star size={11} color="#4CAF50" fill="#4CAF50" />
        <Text style={{ fontSize: 12, color: '#64748B', fontWeight: '500' }}>
          {item.avgRating || item.rating || 'New'}
        </Text>
        <Text style={{ fontSize: 12, color: '#CBD5E1' }}>·</Text>
        <Text style={{ fontSize: 12, color: '#94A3B8' }}>
          {timeAgo(item.viewedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ─── Popular Destination card ─────────────────────────────────────────────────
const DestCard = ({ item, onPress, onWishlist, inWishlist }) => {
  const imageUri =
    resolveImage(item.image_url || item.image) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop';
  const price = item.pricing?.adultPrice || item.price || 0;

  return (
    <TouchableOpacity
      style={{ width: 165, marginRight: 12 }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: 165, height: 155, borderRadius: 14 }}
          resizeMode="cover"
        />
        {/* Teal badge — solid teal bg, white text */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Popular</Text>
        </View>
        {/* White circle heart — matches design */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={onWishlist}
          hitSlop={8}
        >
          <Heart
            size={16}
            color={inWishlist ? '#EF4444' : '#9CA3AF'}
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
          marginTop: 3,
          gap: 3,
        }}
      >
        <MapPin size={11} color="#94A3B8" />
        <Text style={styles.cardLocation} numberOfLines={1}>
          {item.location}
        </Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
      >
        <Star size={12} color="#F59E0B" fill="#F59E0B" />
        <Text style={styles.cardMeta}>
          {' '}
          {item.avgRating || item.rating || 'New'}
        </Text>
        {price ? (
          <>
            <Text style={styles.cardMeta}> · </Text>
            <Text style={styles.cardPrice}>
              From ₹{Number(price).toLocaleString('en-IN')}
            </Text>
          </>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

// ─── Reel card (2-column grid) ────────────────────────────────────────────────
// Matches Figma: tall portrait cards, view count top-right, uploader chip bottom-left
// No center play button — clean poster feel matching the design
const ReelCard = ({ item, onPress }) => {
  const thumb = item.thumbnail ? resolveImage(item.thumbnail) : null;
  const videoUri = item.video ? resolveImage(item.video) : null;
  const CARD_HEIGHT = REEL_COL_WIDTH * 1.6; // taller portrait ratio matching Figma

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
        style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}
      >
        {thumb ? (
          <Image
            source={{ uri: thumb }}
            style={{ width: REEL_COL_WIDTH, height: CARD_HEIGHT }}
            resizeMode="cover"
          />
        ) : videoUri ? (
          <Video
            source={{ uri: videoUri }}
            style={{ width: REEL_COL_WIDTH, height: CARD_HEIGHT }}
            resizeMode="cover"
            muted
            paused
            repeat={false}
          />
        ) : (
          <View
            style={{
              width: REEL_COL_WIDTH,
              height: CARD_HEIGHT,
              backgroundColor: '#E2E8F0',
            }}
          />
        )}

        {/* Subtle dark gradient overlay at bottom for readability */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.12)',
          }}
        />

        {/* View count — top right, matches Figma */}
        {views ? (
          <View
            style={{
              position: 'absolute',
              top: 9,
              right: 9,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.52)',
              borderRadius: 12,
              paddingHorizontal: 7,
              paddingVertical: 4,
              gap: 4,
            }}
          >
            <Eye size={11} color="#fff" strokeWidth={2} />
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>
              {views}
            </Text>
          </View>
        ) : null}

        {/* Uploader chip — bottom left, matches Figma (avatar + name on white/teal pill) */}
        {item.user?.name ? (
          <View
            style={{
              position: 'absolute',
              bottom: 9,
              left: 9,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.93)',
              borderRadius: 20,
              paddingHorizontal: 8,
              paddingVertical: 4,
              gap: 5,
              maxWidth: REEL_COL_WIDTH - 18,
            }}
          >
            {item.user.avatar ? (
              <Image
                source={{ uri: resolveImage(item.user.avatar) }}
                style={{ width: 16, height: 16, borderRadius: 8 }}
              />
            ) : (
              // Fallback colored circle if no avatar
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: '#1F8A70',
                }}
              />
            )}
            <Text
              style={{ fontSize: 11, fontWeight: '700', color: '#0F172A' }}
              numberOfLines={1}
            >
              {item.user.name}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

// ─── Main HomeScreen ──────────────────────────────────────────────────────────
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuth();
  const { recentlyViewed, addViewed } = useRecentlyViewed();
  // GPS location — used first; falls back to profile state if denied/unavailable
  const { country: gpsCountry, state: gpsState, getLocation } = useLocation();

  // ── State ───────────────────────────────────────────────────────────────────
  const [categoryMap, setCategoryMap] = useState({});
  const [popularDests, setPopularDests] = useState([]);
  const [nearYouItems, setNearYouItems] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  // Wishlist from context — real backend API
  const { isSaved, toggleWishlist: ctxToggleWishlist } = useWishlist();

  // Request GPS once on mount (non-blocking — if denied, profile state is used)
  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-update profile state when GPS detects a different location
  useEffect(() => {
    if (!gpsState || !user) return;
    // Only update if GPS state is different from profile state
    if (gpsState !== user.state) {
      updateProfile({ state: gpsState, country: gpsCountry || 'India' }).catch(
        () => {},
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gpsState]);

  // ── Data fetching — GPS location takes priority over profile state ─────────
  const fetchData = useCallback(async () => {
    try {
      // GPS location takes priority; fall back to profile state if GPS denied/unavailable
      const effectiveState = (gpsState || user?.state || '').trim();
      const effectiveCountry = (gpsCountry || user?.country || 'India').trim();
      const hasLocation = !!(effectiveState || effectiveCountry);

      const calls = [
        // ALL packages — nearby-first sort (backend aggregation handles priority)
        packagesAPI.getAll({
          limit: 100,
          ...(hasLocation
            ? { userCountry: effectiveCountry, userState: effectiveState }
            : {}),
        }),
        // Popular Destinations — scored by bookingCount + avgRating
        packagesAPI.getPopular(10),
        // Experience Reels
        reelsAPI.getAll({ limit: 20 }),
      ];

      const [pkgRes, destRes, reelRes] = await Promise.all(calls);

      // ── Packages → all sections sourced from same data ─────────────────────
      const allPkgs = (pkgRes.data?.packages || []).map(p => ({
        ...p,
        image_url: resolveImage(p.image_url),
        images: (p.images || []).map(resolveImage).filter(Boolean),
      }));

      // Curated Packages — first 6 (already nearby-sorted by backend)
      const map = {};
      if (allPkgs.length > 0) {
        map['Curated Packages'] = allPkgs.slice(0, 6);
      }
      setCategoryMap(map);

      // ── Popular Destinations — scored by bookingCount + avgRating ──────────
      const popularPkgs = (destRes.data?.packages || []).map(p => ({
        ...p,
        image_url: resolveImage(p.image_url),
        images: (p.images || []).map(resolveImage).filter(Boolean),
      }));
      setPopularDests(popularPkgs);

      // ── Experiences Near You — packages matching user's state ──────────────
      const nearbyPkgs = effectiveState
        ? allPkgs.filter(
            p => (p.state || '').toLowerCase() === effectiveState.toLowerCase(),
          )
        : [];
      // If state-filtered has results use them, else show first 8 from all
      setNearYouItems(
        nearbyPkgs.length > 0 ? nearbyPkgs.slice(0, 8) : allPkgs.slice(0, 8),
      );

      // ── Experience Reels — show all (already fetched without filter) ───────
      setReels(reelRes.data?.reels || []);
    } catch {
      // Silently fail — sections will just be empty
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.state, user?.country, gpsState, gpsCountry]);

  // Re-fetch when GPS location becomes available (may fire after initial render)
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // ── Wishlist — uses real backend via WishlistContext ─────────────────────────
  const toggleWishlist = id => ctxToggleWishlist(id);

  const openPackage = pkg => {
    addViewed(pkg);
    navigation.navigate('DestinationDetail', { destination: pkg });
  };

  // Popular Destinations and Experiences Near You navigate to DestinationDetail
  // but still need to be tracked in recently viewed
  const openDestination = item => {
    // Normalize so addViewed always has title + image_url
    const normalized = {
      ...item,
      title: item.title || item.name || '',
      image_url: item.image_url || item.image || '',
    };
    addViewed(normalized);
    navigation.navigate('DestinationDetail', { destination: item });
  };

  const categoryEntries = Object.entries(categoryMap);
  const userState = user?.state?.trim() || '';
  const userCountry = user?.country?.trim() || 'India';
  // Effective location — GPS first, profile fallback
  const effectiveState = (gpsState || userState).trim();
  const effectiveCountry = (gpsCountry || userCountry).trim();
  // Label for "Experiences Near You" section
  const nearYouLabel = effectiveState
    ? `Experiences in ${effectiveState}`
    : effectiveCountry && effectiveCountry !== 'India'
    ? `Experiences in ${effectiveCountry}`
    : 'Experiences Near You';
  // Label for reel section
  const reelLabel = effectiveState
    ? `Experience Reels in ${effectiveState}`
    : effectiveCountry && effectiveCountry !== 'India'
    ? `Experience Reels in ${effectiveCountry}`
    : 'Experience Reels';

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
          <Search size={22} color="#374151" strokeWidth={2.5} />
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
                    navigation.navigate('DestinationDetail', {
                      destination: item,
                    })
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
                  onPress={() => openDestination(item)}
                  onWishlist={() => toggleWishlist(item._id)}
                  inWishlist={isSaved(item._id)}
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
                    inWishlist={isSaved(item._id)}
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
            <SectionHeader title={nearYouLabel} />
            <ActivityIndicator size="small" color="#1F8A70" />
          </View>
        ) : nearYouItems.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader
              title={nearYouLabel}
              onSeeAll={() => navigation.navigate('ExperiencesNearYou')}
            />
            <FlatList
              data={nearYouItems}
              renderItem={({ item }) => (
                <PackageCard
                  item={{ ...item, title: item.name || item.title }}
                  onPress={() => openDestination(item)}
                  onWishlist={() => toggleWishlist(item._id)}
                  inWishlist={isSaved(item._id)}
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
              title={reelLabel}
              onSeeAll={() => navigation.navigate('GuestFavorites')}
            />
            {/* 2-col reel grid — matches Figma layout */}
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
    paddingHorizontal: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchPlaceholder: {
    color: '#94A3B8',
    fontSize: 15,
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 6,
    backgroundColor: '#fff',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  // Badge — solid teal background, white text (matches design)
  badge: {
    position: 'absolute',
    top: 9,
    left: 9,
    backgroundColor: '#1F8A70',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },
  // Heart button — white circle background, gray heart (matches design)
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    marginTop: 9,
    fontWeight: '700',
    color: '#0F172A',
    fontSize: 15,
  },
  cardLocation: {
    fontSize: 12,
    color: '#94A3B8',
    flex: 1,
  },
  cardMeta: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  cardPrice: {
    fontSize: 13,
    color: '#1F8A70',
    fontWeight: '700',
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
