import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PenLine, Heart, Trash2 } from 'lucide-react-native';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { wishlistAPI, packagesAPI } from '../services/api';
import { SERVER_URL } from '../services/api';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400';

// ── Resolve image URL ─────────────────────────────────────────────────────────
const resolveImage = pkg => {
  if (!pkg) return PLACEHOLDER;

  // Helper to fix any URL (wrong hostname or relative path)
  const fixUrl = url => {
    if (!url) return null;
    if (url.startsWith('http')) {
      if (url.includes('/uploads/')) {
        const path = url.substring(url.indexOf('/uploads/'));
        return `${SERVER_URL}${path}`;
      }
      return url;
    }
    return `${SERVER_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Use image_url first (main cover image)
  if (pkg.image_url) {
    return fixUrl(pkg.image_url) || PLACEHOLDER;
  }

  // Fall back to first in images[] array
  if (Array.isArray(pkg.images) && pkg.images.length > 0) {
    return fixUrl(pkg.images[0]) || PLACEHOLDER;
  }

  return PLACEHOLDER;
};

const WishlistScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const { wishlists, loading, fetchWishlists, toggleWishlist } = useWishlist();

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toastMsg, setToastMsg] = useState('');
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef(null);

  const showToast = useCallback(
    msg => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToastMsg(msg);
      Animated.sequence([
        Animated.timing(toastOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1800),
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      toastTimer.current = setTimeout(() => setToastMsg(''), 2400);
    },
    [toastOpacity],
  );

  // ── Open full package detail ──────────────────────────────────────────────
  const [loadingPkg, setLoadingPkg] = useState(null); // stores _id while loading

  const openPackage = useCallback(
    async pkgObj => {
      if (!pkgObj?._id) return;
      try {
        setLoadingPkg(pkgObj._id);
        const res = await packagesAPI.getById(pkgObj._id);
        const fullPkg = res.data?.package || res.data;
        navigation.navigate('PackageDetails', { package: fullPkg });
      } catch {
        // fallback: navigate with partial data we already have
        navigation.navigate('PackageDetails', { package: pkgObj });
      } finally {
        setLoadingPkg(null);
      }
    },
    [navigation],
  );

  const onRefresh = useCallback(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  const handleDeleteWishlist = useCallback(
    (wishlistId, wishlistName) => {
      Alert.alert(
        'Delete Wishlist',
        `Delete "${wishlistName}"? This cannot be undone.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await wishlistAPI.deleteWishlist(wishlistId);
                await fetchWishlists();
              } catch (err) {
                Alert.alert(
                  'Error',
                  err?.response?.data?.message || 'Could not delete wishlist.',
                );
              }
            },
          },
        ],
      );
    },
    [fetchWishlists],
  );

  // ── Not logged in ─────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 32,
          }}
        >
          <Heart size={56} color="#E5E7EB" strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#111827',
              marginTop: 16,
              textAlign: 'center',
            }}
          >
            Save your favourites
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              marginTop: 8,
              textAlign: 'center',
              lineHeight: 22,
            }}
          >
            Log in to save packages and access them anytime.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              marginTop: 24,
              backgroundColor: '#1F8A70',
              paddingHorizontal: 36,
              paddingVertical: 14,
              borderRadius: 14,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading && wishlists.length === 0) {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#1F8A70" />
          <Text style={{ color: '#6B7280', marginTop: 12 }}>
            Loading wishlists…
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  const totalPackages = wishlists.reduce(
    (sum, wl) => sum + (wl.packages?.length || 0),
    0,
  );

  if (!loading && (wishlists.length === 0 || totalPackages === 0)) {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingTop: 52,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#0F172A' }}>
            Wishlists
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 32,
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor="#1F8A70"
            />
          }
        >
          <Heart size={56} color="#E5E7EB" strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#111827',
              marginTop: 16,
              textAlign: 'center',
            }}
          >
            No saved packages yet
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              marginTop: 8,
              textAlign: 'center',
              lineHeight: 22,
            }}
          >
            Tap the ❤️ on any package to save it here.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Explore')}
            style={{
              marginTop: 24,
              backgroundColor: '#1F8A70',
              paddingHorizontal: 36,
              paddingVertical: 14,
              borderRadius: 14,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
              Browse Packages
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaProvider>
    );
  }

  // ── Main view ─────────────────────────────────────────────────────────────
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor="#1F8A70"
          />
        }
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingTop: 52,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#0F172A' }}>
            Wishlists
          </Text>
        </View>

        {/* Wishlists */}
        {wishlists.map(wl => {
          const packages = wl.packages || [];
          if (packages.length === 0) return null;

          return (
            <View key={wl._id} style={{ marginTop: 24 }}>
              {/* Package cards grid */}
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingHorizontal: 16,
                  gap: 12,
                }}
              >
                {packages.map(pkg => {
                  const pkgObj = typeof pkg === 'object' ? pkg : { _id: pkg };
                  const imageUri = resolveImage(pkgObj);
                  const pkgTitle = pkgObj.title || 'Package';
                  const pkgPrice = pkgObj.price;

                  return (
                    <TouchableOpacity
                      key={pkgObj._id}
                      style={{ width: '47%' }}
                      activeOpacity={0.85}
                      onPress={() => openPackage(pkgObj)}
                    >
                      {/* Image */}
                      <View
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                          borderRadius: 16,
                          overflow: 'hidden',
                          backgroundColor: '#F3F4F6',
                        }}
                      >
                        <Image
                          source={{ uri: imageUri }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover"
                        />
                        {/* Loading overlay while fetching full package */}
                        {loadingPkg === pkgObj._id && (
                          <View
                            style={{
                              position: 'absolute',
                              inset: 0,
                              backgroundColor: 'rgba(0,0,0,0.35)',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 16,
                            }}
                          >
                            <ActivityIndicator color="#fff" size="small" />
                          </View>
                        )}
                        {/* Trash icon on card to remove from wishlist */}
                        <TouchableOpacity
                          onPress={async () => {
                            await toggleWishlist(pkgObj._id);
                            showToast('Removed from wishlist');
                          }}
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Trash2 size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {/* Info */}
                      <Text
                        style={{
                          marginTop: 8,
                          fontSize: 13,
                          fontWeight: '600',
                          color: '#111827',
                        }}
                        numberOfLines={2}
                      >
                        {pkgTitle}
                      </Text>
                      {pkgPrice != null && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#1F8A70',
                            fontWeight: '700',
                            marginTop: 2,
                          }}
                        >
                          ₹{pkgPrice.toLocaleString('en-IN')}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Toast */}
      {toastMsg ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
            backgroundColor: '#374151',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 24,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.18,
            shadowRadius: 6,
            opacity: toastOpacity,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
            {toastMsg}
          </Text>
        </Animated.View>
      ) : null}
    </SafeAreaProvider>
  );
};

export default WishlistScreen;
