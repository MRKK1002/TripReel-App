import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  Share,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  SERVER_URL,
  batchesAPI,
  settingsAPI,
  packagesAPI,
} from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import {
  ArrowLeft,
  MapPin,
  Star,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Upload,
  Heart,
  Tag,
} from 'lucide-react-native';
import './../../android/app/src/utils/globalFont.js';

const { width } = Dimensions.get('window');

// Resolve relative /uploads/... paths to full URLs (also fix wrong hostname)
const resolveUrl = url => {
  if (!url) return null;
  if (url.startsWith('http')) {
    if (url.includes('/uploads/')) {
      const path = url.substring(url.indexOf('/uploads/'));
      return `${SERVER_URL}${path}`;
    }
    return url;
  }
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SERVER_URL}${path}`;
};

const DestinationDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Handle both navigation patterns: { destination } or { package }
  const routeData = route.params?.destination || route.params?.package;

  const [destination, setDestination] = useState(routeData);
  const [pageLoading, setPageLoading] = useState(false);
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [showInclusions, setShowInclusions] = useState(true);
  const [showMoreInclusions, setShowMoreInclusions] = useState(false);
  const [showPolicies, setShowPolicies] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const imageOpacity = useRef(new Animated.Value(1)).current;
  const activeImageIndexRef = useRef(0);

  // ── Dynamic wishlist ────────────────────────────────────────────────────────
  const { isSaved, toggleWishlist } = useWishlist();
  const wishlisted = isSaved(destination?._id);
  const handleToggleWishlist = () => toggleWishlist(destination?._id);

  // ── Fetch full package data if opened with partial data (e.g. from Recently Viewed)
  useEffect(() => {
    if (!routeData?._id) return;
    // If data is complete (has pricing or highlights), no need to re-fetch
    if (routeData.pricing || routeData.highlights || routeData.inclusions) {
      setDestination(routeData);
      return;
    }
    // Fetch full package from API
    setPageLoading(true);
    packagesAPI
      .getById(routeData._id)
      .then(res => {
        const pkg = res.data?.package;
        if (pkg) setDestination(pkg);
      })
      .catch(() => {})
      .finally(() => setPageLoading(false));
  }, [routeData?._id]);

  // ── Dynamic batches (real dates from API) ──────────────────────────────────
  const [batches, setBatches] = useState([]);
  const [batchesLoading, setBatchesLoading] = useState(false);

  // ── Platform policies from admin settings ──────────────────────────────────
  const [policies, setPolicies] = useState({
    cancellation: '',
    refund: '',
    terms: '',
  });

  useEffect(() => {
    if (!destination?._id) return;
    setBatchesLoading(true);
    Promise.all([
      batchesAPI.getForPackage(destination._id),
      settingsAPI.getPublic(),
    ])
      .then(([batchRes, settingsRes]) => {
        setBatches(batchRes.data?.batches || []);
        const s = settingsRes.data || {};
        setPolicies({
          cancellation: s.default_cancellation_policy || '',
          refund: s.default_refund_policy || '',
          terms: s.default_terms || '',
        });
      })
      .catch(() => setBatches([]))
      .finally(() => setBatchesLoading(false));
  }, [destination?._id]);

  // Build image list: cover first + all operator-uploaded images, fully resolved
  const rawImages = [destination?.image_url, ...(destination?.images || [])];
  const images = rawImages.map(resolveUrl).filter(Boolean);
  const priceStr = `₹${destination.price?.toLocaleString('en-IN') ?? '12,999'}`;

  // Dates come from real batches now — compact format: "12-14 Feb 2026"
  const dates = batches.map((b, i) => {
    const start = new Date(b.startDate);
    const end = new Date(b.endDate);
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = start.toLocaleDateString('en-IN', { month: 'short' });
    const endMonth = end.toLocaleDateString('en-IN', { month: 'short' });
    const year = end.getFullYear();
    const label =
      startMonth === endMonth
        ? `${startDay}-${endDay} ${startMonth} ${year}`
        : `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    return {
      label,
      price: `₹${Number(b.adultPrice || destination.price || 0).toLocaleString(
        'en-IN',
      )}`,
      batchId: b._id,
      isFull: b.totalSeats > 0 && b.bookedSeats >= b.totalSeats,
      seatsLeft: (b.totalSeats || 0) - (b.bookedSeats || 0),
    };
  });

  const handleImageChange = newIndex => {
    if (newIndex === activeImageIndexRef.current) return;
    if (newIndex >= 0 && newIndex < images.length) {
      Animated.sequence([
        Animated.timing(imageOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      activeImageIndexRef.current = newIndex; // ✅ update ref
      setActiveImageIndex(newIndex); // ✅ update state for UI
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderGrant: () => {
        if (scrollViewRef.current)
          scrollViewRef.current.setNativeProps({ scrollEnabled: false });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (scrollViewRef.current)
          scrollViewRef.current.setNativeProps({ scrollEnabled: true });

        if (Math.abs(gestureState.dx) > 50) {
          if (gestureState.dx > 0 && activeImageIndexRef.current > 0) {
            handleImageChange(activeImageIndexRef.current - 1); // ✅ reads latest
          } else if (
            gestureState.dx < 0 &&
            activeImageIndexRef.current < images.length - 1
          ) {
            handleImageChange(activeImageIndexRef.current + 1); // ✅ reads latest
          }
        }
      },
      onPanResponderTerminate: () => {
        if (scrollViewRef.current)
          scrollViewRef.current.setNativeProps({ scrollEnabled: true });
      },
    }),
  ).current;

  const handleImagePress = index => {
    handleImageChange(index);
  };

  const handleShare = async () => {
    try {
      const price = destination.pricing?.adultPrice || destination.price || '';
      const priceText = price
        ? ` starting from ₹${Number(price).toLocaleString('en-IN')}`
        : '';
      await Share.share({
        message: `🌴 Check out "${destination.title}" on TripReel!\n\n📍 ${
          destination.location || ''
        }${priceText}\n\nDownload TripReel app to book: https://tripreel.com/package/${
          destination._id
        }`,
        title: destination.title,
      });
    } catch (_) {}
  };

  if (pageLoading || !destination) {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#1F8A70" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#F8FAFC' }}
      >
        {/* Hero Image Carousel */}
        <View style={{ height: 300 }} {...panResponder.panHandlers}>
          {images.map((img, i) => (
            <Animated.Image
              key={i}
              source={{ uri: img }}
              style={{
                position: 'absolute',
                width,
                height: 300,
                opacity: i === activeImageIndex ? imageOpacity : 0,
              }}
              resizeMode="cover"
            />
          ))}

          {/* Indicator lines - clickable with gaps */}
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 16,
              gap: 8,
            }}
          >
            {images.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleImagePress(i)}
                style={{
                  flex: 1,
                  height: 3,
                  backgroundColor:
                    i === activeImageIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                  borderRadius: 2,
                }}
              />
            ))}
          </View>

          {/* Overlay buttons */}
          <SafeAreaView
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(0,0,0,0.35)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowLeft size={20} color="#fff" />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  onPress={handleShare}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Upload size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleToggleWishlist}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: wishlisted
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(0,0,0,0.35)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Heart
                    size={18}
                    color={wishlisted ? '#EF4444' : '#fff'}
                    fill={wishlisted ? '#EF4444' : 'none'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View style={{ backgroundColor: '#F8FAFC' }}>
          {/* Title */}
          <View
            style={{
              backgroundColor: '#F8FAFC',
              paddingHorizontal: 16,
              paddingTop: 18,
              paddingBottom: 4,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 6,
              }}
            >
              {destination.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Star size={15} color="#4CAF50" fill="#4CAF50" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#111827',
                  marginLeft: 5,
                }}
              >
                {destination.avgRating || destination.rating || 4.5}
              </Text>
              <Text style={{ fontSize: 13, color: '#9CA3AF', marginLeft: 6 }}>
                • {destination.reviewCount || 0} reviews
                {destination.bookingCount > 0
                  ? ` • ${
                      destination.bookingCount >= 1000
                        ? `${(destination.bookingCount / 1000).toFixed(1)}K`
                        : destination.bookingCount
                    }+ booked`
                  : ''}
              </Text>
            </View>
          </View>

          {/* Destination + Price card */}
          <View
            style={{ marginHorizontal: 16, marginTop: 12, marginBottom: 12 }}
          >
            <View
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: 14,
                flexDirection: 'row',
                overflow: 'hidden',
              }}
            >
              {/* Left: Destination */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 14,
                }}
              >
                <MapPin size={20} color="#3B4A6B" strokeWidth={1.8} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#1E2A45',
                    }}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.7}
                  >
                    {destination.location}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}
                  >
                    Destination
                  </Text>
                </View>
              </View>
              {/* Divider */}
              <View
                style={{
                  width: 1,
                  alignSelf: 'stretch',
                  backgroundColor: '#C7D0E8',
                  marginVertical: 10,
                }}
              />
              {/* Right: Price */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 14,
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transform: [{ scaleX: -1 }],
                  }}
                >
                  <Tag size={20} color="#3B4A6B" strokeWidth={1.8} />
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#1E2A45',
                    }}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.7}
                  >
                    {destination.priceLabel}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}
                  >
                    Price
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          />

          {/* Highlights card */}
          <View
            style={{
              marginHorizontal: 16,
              marginBottom: 12,
              backgroundColor: '#F8FAFC',
              borderRadius: 16,
              padding: 18,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            {/* Duration row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <Text style={{ fontSize: 16, color: '#6B7280', marginRight: 10 }}>
                ✓
              </Text>
              <Text
                style={{ fontSize: 16, color: '#1E2A45', fontWeight: '500' }}
              >
                {destination.duration ||
                  `${destination.durationDays || 0} Days / ${
                    destination.durationNights || 0
                  } Nights`}
              </Text>
            </View>
            {/* Transport — checkmark style matching design */}
            {destination.transportDetails?.flightIncluded && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: '#6B7280', marginRight: 10 }}
                >
                  ✓
                </Text>
                <Text
                  style={{ fontSize: 16, color: '#1E2A45', fontWeight: '500' }}
                >
                  Flight included
                </Text>
              </View>
            )}
            {destination.transportDetails?.busIncluded && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: '#6B7280', marginRight: 10 }}
                >
                  ✓
                </Text>
                <Text
                  style={{ fontSize: 16, color: '#1E2A45', fontWeight: '500' }}
                >
                  Bus included
                </Text>
              </View>
            )}
            {destination.transportDetails?.cabIncluded && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: '#6B7280', marginRight: 10 }}
                >
                  ✓
                </Text>
                <Text
                  style={{ fontSize: 16, color: '#1E2A45', fontWeight: '500' }}
                >
                  Cab included
                </Text>
              </View>
            )}
            {destination.transportDetails?.pickupDrop ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: '#6B7280', marginRight: 10 }}
                >
                  ✓
                </Text>
                <Text
                  style={{ fontSize: 16, color: '#1E2A45', fontWeight: '500' }}
                >
                  {destination.transportDetails.pickupDrop}
                </Text>
              </View>
            ) : null}
            {/* Highlights */}
            {(destination.highlights ?? [])
              .slice(0, showMoreHighlights ? undefined : 3)
              .map((h, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 14,
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: '#6B7280', marginRight: 10 }}
                  >
                    ✓
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#1E2A45',
                      fontWeight: '500',
                    }}
                  >
                    {h}
                  </Text>
                </View>
              ))}
            {/* Show More — only if more than 3 highlights */}
            {(destination.highlights ?? []).length > 3 && (
              <TouchableOpacity
                onPress={() => setShowMoreHighlights(!showMoreHighlights)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#1E2A45',
                    textDecorationLine: 'underline',
                  }}
                >
                  {showMoreHighlights ? 'Show Less' : 'Show More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          />

          {/* About This Trip */}
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 12,
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                color: '#111827',
                marginBottom: 8,
                fontSize: 22,
                fontWeight: '700',
              }}
            >
              About this trip
            </Text>
            <Text style={{ fontSize: 15, color: '#374151', lineHeight: 22 }}>
              {showFullAbout
                ? destination.aboutThisTrip ||
                  destination.about ||
                  'No description available'
                : (
                    destination.aboutThisTrip ||
                    destination.about ||
                    'No description available'
                  )?.slice(0, 100) +
                  ((destination.aboutThisTrip || destination.about || '')
                    ?.length > 100
                    ? '...'
                    : '')}
            </Text>
            {(destination.aboutThisTrip || destination.about || '').length >
              100 && (
              <TouchableOpacity
                onPress={() => setShowFullAbout(!showFullAbout)}
                style={{ marginTop: 10 }}
              >
                <Text
                  style={{ color: '#111827', fontSize: 15, fontWeight: '700', textDecorationLine: 'underline' }}
                >
                  {showFullAbout ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          />

          {/* Itinerary */}
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 12,
              paddingVertical: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
              onPress={() => setShowFullItinerary(!showFullItinerary)}
            >
              <Text
                style={{ color: '#111827', fontSize: 22, fontWeight: '700' }}
              >
                Itinerary
              </Text>
              {showFullItinerary ? (
                <ChevronUp size={18} color="#6B7280" />
              ) : (
                <ChevronDown size={18} color="#6B7280" />
              )}
            </TouchableOpacity>

            {destination.itinerary
              ?.slice(0, showFullItinerary ? undefined : 1)
              .map((day, i) => (
                <View key={i} style={{ marginBottom: 16 }}>
                  {/* Day header with background */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#F1F5F9',
                      borderRadius: 10,
                      padding: 12,
                      marginBottom: 14,
                    }}
                  >
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 10,
                      }}
                    >
                      <Image
                        source={require('./../assets/Calendar_check.png')}
                        style={{ width: 24, height: 24 }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#111827',
                        }}
                      >
                        Day {day.day ?? i + 1}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#64748B',
                          marginTop: 2,
                        }}
                      >
                        {day.title}
                      </Text>
                    </View>
                  </View>
                  {/* Day points */}
                  {day.points?.map((pt, j) => (
                    <View
                      key={j}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginBottom: 12,
                        paddingLeft: 8,
                      }}
                    >
                      <Check
                        size={14}
                        color="#9CA3AF"
                        style={{ marginTop: 3 }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 15,
                          color: '#1E2A45',
                          fontWeight: '500',
                          flex: 1,
                        }}
                      >
                        {pt}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}

            {destination.itinerary?.length > 1 && (
              <TouchableOpacity
                onPress={() => setShowFullItinerary(!showFullItinerary)}
                style={{
                  backgroundColor: '#F1F5F9',
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: '#111827',
                    fontSize: 15,
                    fontWeight: '700',
                    textDecorationLine: 'underline',
                  }}
                >
                  {showFullItinerary
                    ? 'Show less'
                    : `Show full ${destination.itinerary.length} days`}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          />

          {/* Available Dates & Pricing */}
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 12,
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 12,
              }}
            >
              Available Dates & Pricing
            </Text>
            {batchesLoading ? (
              <ActivityIndicator
                color="#1F8A70"
                style={{ marginVertical: 12 }}
              />
            ) : dates.length === 0 ? (
              <View
                style={{
                  backgroundColor: '#FEF3C7',
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                <Text
                  style={{ fontSize: 13, color: '#92400E', fontWeight: '500' }}
                >
                  No upcoming departures scheduled
                </Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingRight: 4 }}
              >
                {dates.map((d, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => !d.isFull && setSelectedDate(i)}
                    style={{
                      width: 160,
                      borderColor: selectedDate === i ? '#1F8A70' : 'transparent',
                      borderWidth: 0,
                      backgroundColor: d.isFull
                        ? '#F1F5F9'
                        : selectedDate === i
                        ? '#EBFFF8'
                        : '#FFF1F0',
                      borderRadius: 10,
                      padding: 14,
                      opacity: d.isFull ? 0.6 : 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#374151',
                          fontWeight: '500',
                        }}
                      >
                        {d.label}
                      </Text>
                      {/* Radio circle */}
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 9,
                          borderWidth: 2,
                          borderColor:
                            selectedDate === i ? '#1F8A70' : '#D1D5DB',
                          backgroundColor:
                            selectedDate === i ? '#1F8A70' : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {selectedDate === i && (
                          <View
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: '#fff',
                            }}
                          />
                        )}
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: d.isFull ? '#9CA3AF' : '#2563EB',
                        marginTop: 6,
                      }}
                    >
                      {d.price}
                    </Text>
                    {d.isFull ? (
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#EF4444',
                          fontWeight: '600',
                          marginTop: 3,
                        }}
                      >
                        FULL
                      </Text>
                    ) : d.seatsLeft <= 5 ? (
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#F97316',
                          fontWeight: '600',
                          marginTop: 3,
                        }}
                      >
                        {d.seatsLeft} left
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          />

          {/* Inclusions / Exclusions */}
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 12,
              paddingVertical: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
              onPress={() => setShowInclusions(!showInclusions)}
            >
              <Text
                style={{ fontSize: 22, fontWeight: '700', color: '#111827' }}
              >
                Inclusions / Exclusions
              </Text>
              {showInclusions ? (
                <ChevronUp size={18} color="#6B7280" />
              ) : (
                <ChevronDown size={18} color="#6B7280" />
              )}
            </TouchableOpacity>
            {showInclusions && (
              <>
                {(() => {
                  const allItems = [
                    ...(destination.inclusions || []).map(item => ({ type: 'inc', text: item })),
                    ...(destination.exclusions || []).map(item => ({ type: 'exc', text: item })),
                  ];
                  const showAll = showMoreInclusions;
                  const visibleItems = showAll ? allItems : allItems.slice(0, 4);
                  return (
                    <>
                      {visibleItems.map((item, i) => (
                        <View
                          key={i}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 12,
                            paddingLeft: 4,
                          }}
                        >
                          {item.type === 'inc' ? (
                            <Check size={14} color="#1F8A70" />
                          ) : (
                            <X size={14} color="#EF4444" />
                          )}
                          <Text
                            style={{ marginLeft: 10, fontSize: 15, color: '#1E2A45', fontWeight: '500' }}
                          >
                            {item.text}
                          </Text>
                        </View>
                      ))}
                      {allItems.length > 4 && (
                        <TouchableOpacity
                          onPress={() => setShowMoreInclusions(!showMoreInclusions)}
                          style={{
                            backgroundColor: '#F1F5F9',
                            borderRadius: 10,
                            paddingVertical: 12,
                            alignItems: 'center',
                            marginTop: 8,
                          }}
                        >
                          <Text
                            style={{
                              color: '#111827',
                              fontSize: 15,
                              fontWeight: '700',
                              textDecorationLine: 'underline',
                            }}
                          >
                            {showAll ? 'Show Less' : 'Show More'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  );
                })()}
              </>
            )}
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          />

          {/* Add-ons — Static, always visible */}
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 12,
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 4,
              }}
            >
              {'Add-ons - '}
              <Text
                style={{ fontSize: 18, fontWeight: '400', color: '#111827', fontStyle: 'italic' }}
              >
                Make your trip memorable
              </Text>
            </Text>
            {[
              {
                name: 'Professional Photographer',
                subtitle: 'No travel required',
                price: 2000,
                details: ['Local', '30 min', '2 Reels'],
                color: '#EFF4FF',
                detailsBg: '#E7EDFA',
              },
              {
                name: 'Professional Reel maker',
                subtitle: 'Shoot on iPhone & Travel to your location',
                price: 2000,
                details: ['Travel', '30 min', '2 Reels'],
                color: '#F3FAF7',
                detailsBg: '#E7F2EE',
              },
            ].map((addon, i) => (
              <View
                key={i}
                style={{
                  borderRadius: 12,
                  padding: 12,
                  marginTop: 12,
                  backgroundColor: addon.color,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#111827',
                      }}
                    >
                      {addon.name}
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}
                    >
                      {addon.subtitle}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop',
                    }}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 10,
                      marginLeft: 12,
                    }}
                    resizeMode="cover"
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    backgroundColor: addon.detailsBg,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  {addon.details.map((d, j) => (
                    <View key={j} style={{ alignItems: 'center', flex: 1 }}>
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 2,
                        }}
                      >
                        {j === 0 ? (
                          <Image
                            source={require('./../assets/local.png')}
                            style={{ width: 24, height: 24 }}
                          />
                        ) : j === 1 ? (
                          <Image
                            source={require('./../assets/duration.png')}
                            style={{ width: 24, height: 24 }}
                          />
                        ) : (
                          <Image
                            source={require('./../assets/reel.png')}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </View>
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#334155',
                          textAlign: 'center',
                          width: '100%',
                        }}
                      >
                        {d}
                      </Text>
                    </View>
                  ))}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#111827',
                    }}
                  >
                    Just{' '}
                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>
                      ₹{addon.price.toLocaleString('en-IN')}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAddons(prev => {
                        const exists = prev.find(a => a.name === addon.name);
                        if (exists) {
                          return prev.filter(a => a.name !== addon.name);
                        }
                        return [...prev, { name: addon.name, price: addon.price }];
                      });
                    }}
                    style={{
                      backgroundColor: selectedAddons.find(a => a.name === addon.name) ? '#1F8A70' : '#E6F4EF',
                      paddingHorizontal: 24,
                      paddingVertical: 8,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#1F8A70',
                      width: 126,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: selectedAddons.find(a => a.name === addon.name) ? '#FFFFFF' : '#1F8A70',
                        fontWeight: '600',
                        fontSize: 14,
                      }}
                    >
                      {selectedAddons.find(a => a.name === addon.name) ? 'Added ✓' : 'Add'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 8,
                    alignItems: 'center',
                    backgroundColor: addon.detailsBg,
                    height: 36,
                    justifyContent: 'center',
                    borderRadius: 18,
                  }}
                >
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 13,
                      fontWeight: '500',
                      textDecorationLine: 'underline',
                    }}
                  >
                    Watch Demo Videos
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          />

          {/* Policies */}
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 100,
              paddingVertical: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
              onPress={() => setShowPolicies(!showPolicies)}
            >
              <Text
                style={{ fontSize: 22, fontWeight: '700', color: '#111827' }}
              >
                Policies
              </Text>
              {showPolicies ? (
                <ChevronUp size={18} color="#6B7280" />
              ) : (
                <ChevronDown size={18} color="#6B7280" />
              )}
            </TouchableOpacity>
            {showPolicies && (
              <>
                {policies.cancellation ? (
                  <>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: 10,
                      }}
                    >
                      Cancellation Policy
                    </Text>
                    {policies.cancellation
                      .split('.')
                      .filter(Boolean)
                      .map((line, i) => (
                        <View
                          key={i}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginBottom: 10,
                            paddingLeft: 4,
                          }}
                        >
                          <Check
                            size={14}
                            color="#9CA3AF"
                            style={{ marginTop: 3 }}
                          />
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 15,
                              color: '#1E2A45',
                              fontWeight: '500',
                              flex: 1,
                            }}
                          >
                            {line.trim()}
                          </Text>
                        </View>
                      ))}
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: 10,
                      }}
                    >
                      Cancellation Policy
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        paddingLeft: 4,
                      }}
                    >
                      <Check size={14} color="#9CA3AF" />
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 15,
                          color: '#1E2A45',
                          fontWeight: '500',
                        }}
                      >
                        {destination.policies?.cancellationPolicy ||
                          'Contact operator for cancellation policy'}
                      </Text>
                    </View>
                  </>
                )}

                {policies.refund ? (
                  <View style={{ marginTop: 16 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: 10,
                      }}
                    >
                      Payment Policy
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginBottom: 10,
                        paddingLeft: 4,
                      }}
                    >
                      <Check
                        size={14}
                        color="#9CA3AF"
                        style={{ marginTop: 3 }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 15,
                          color: '#1E2A45',
                          fontWeight: '500',
                          flex: 1,
                        }}
                      >
                        {policies.refund}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* Seats available info */}
                {batches.length > 0 && selectedDate < batches.length && (
                  <View
                    style={{
                      marginTop: 16,
                      backgroundColor: '#F0FDF4',
                      borderRadius: 10,
                      padding: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#166534',
                      }}
                    >
                      {(() => {
                        const b = batches[selectedDate];
                        const left = (b.totalSeats || 0) - (b.bookedSeats || 0);
                        if (left <= 0) return '❌ This batch is fully booked';
                        if (left <= 10)
                          return `⚡ Only ${left} seats left — book soon!`;
                        return `✅ ${left} seats available`;
                      })()}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Book Now Bar */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          paddingBottom: 24,
        }}
      >
        <View>
          <Text style={{ fontSize: 12, color: '#6B7280' }}>From</Text>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>
            {dates.length > 0 && selectedDate < dates.length
              ? dates[selectedDate].price
              : priceStr}
            <Text style={{ fontSize: 13, fontWeight: '400', color: '#6B7280' }}>
              {' '}/Guest
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor:
              dates.length > 0 && dates[selectedDate]?.isFull
                ? '#94A3B8'
                : '#1F8A70',
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
          }}
          onPress={() => {
            if (dates.length === 0) {
              navigation.navigate('Booking', { destination, selectedAddons });
              return;
            }
            const selected = dates[selectedDate];
            if (selected?.isFull) return;
            navigation.navigate('Booking', {
              destination,
              batchId: selected?.batchId,
              selectedBatch: batches[selectedDate],
              selectedAddons,
            });
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default DestinationDetailScreen;
