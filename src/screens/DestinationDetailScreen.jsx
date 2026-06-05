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
import { SERVER_URL, batchesAPI, settingsAPI } from '../services/api';
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

// Resolve relative /uploads/... paths to full URLs
const resolveUrl = url => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SERVER_URL}${path}`;
};

const DestinationDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Handle both navigation patterns: { destination } or { package }
  const destination = route.params?.destination || route.params?.package;

  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [showInclusions, setShowInclusions] = useState(true);
  const [showPolicies, setShowPolicies] = useState(true);
  const [selectedDate, setSelectedDate] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const imageOpacity = useRef(new Animated.Value(1)).current;
  const activeImageIndexRef = useRef(0);

  // ── Dynamic wishlist ────────────────────────────────────────────────────────
  const { isSaved, toggleWishlist } = useWishlist();
  const wishlisted = isSaved(destination?._id);
  const handleToggleWishlist = () => toggleWishlist(destination?._id);

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
      await Share.share({
        message: `Check out ${destination.title} - ${destination.priceLabel}`,
      });
    } catch (_) {}
  };

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
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Heart
                    size={18}
                    color="#fff"
                    fill={wishlisted ? '#fff' : 'none'}
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
              className="border-[#E5E7EB] border-[0.8px]"
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
                    style={{ fontSize: 12, color: '#7B8DB0', marginTop: 1 }}
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
                    style={{ fontSize: 12, color: '#7B8DB0', marginTop: 1 }}
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
            }}
            className="border-[#E5E7EB] border-[0.8px]"
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
              .slice(0, showMoreHighlights ? undefined : 2)
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
            {/* Show More */}
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
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 16,
            }}
          >
            <Text
              style={{
                color: '#111827',
                marginBottom: 8,
                fontSize: 22,
                fontWeight: '700',
              }}
              // className="text-2xl font-medium"
            >
              About this trip
            </Text>
            <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 20 }}>
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
                style={{ marginTop: 6 }}
              >
                <Text
                  style={{ color: '#1F8A70', fontSize: 13, fontWeight: '600' }}
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
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
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
                <View key={i} style={{ marginBottom: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        // backgroundColor: '#E6F4EF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8,
                      }}
                    >
                      <Image
                        source={require('./../assets/Calendar_check.png')}
                        className="w-6 h-6"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#111827',
                      }}
                    >
                      Day {day.day ?? i + 1} • {day.title}
                    </Text>
                  </View>
                  {day.points?.map((pt, j) => (
                    <View
                      key={j}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginBottom: 4,
                        paddingLeft: 36,
                      }}
                    >
                      <Check
                        size={13}
                        color="#1F8A70"
                        style={{ marginTop: 2 }}
                      />
                      <Text
                        style={{
                          marginLeft: 8,
                          fontSize: 13,
                          color: '#374151',
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
              >
                <Text
                  style={{ color: '#1F8A70', fontSize: 13, fontWeight: '600' }}
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
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 16,
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
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {dates.map((d, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => !d.isFull && setSelectedDate(i)}
                    style={{
                      flex: 1,
                      borderWidth: 1.5,
                      borderColor: selectedDate === i ? '#1F8A70' : '#E5E7EB',
                      backgroundColor: d.isFull
                        ? '#F1F5F9'
                        : selectedDate === i
                        ? '#EBFFF8'
                        : '#FFF5F5',
                      borderRadius: 10,
                      padding: 12,
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
              </View>
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
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
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
                {destination.inclusions?.map((inc, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 6,
                    }}
                  >
                    <Check size={14} color="#1F8A70" />
                    <Text
                      style={{ marginLeft: 8, fontSize: 13, color: '#374151' }}
                    >
                      {inc}
                    </Text>
                  </View>
                ))}
                {destination.exclusions?.map((exc, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 6,
                    }}
                  >
                    <X size={14} color="#EF4444" />
                    <Text
                      style={{ marginLeft: 8, fontSize: 13, color: '#374151' }}
                    >
                      {exc}
                    </Text>
                  </View>
                ))}
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

          {/* Add-ons */}
          {destination.addons?.length > 0 && (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                marginHorizontal: 16,
                marginBottom: 12,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: 4,
                }}
              >
                {'Add-ons '}
                <Text
                  style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}
                >
                  - Make your trip memorable
                </Text>
              </Text>
              {destination.addons.map((addon, i) => (
                <View
                  key={i}
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 12,
                    padding: 12,
                    marginTop: 12,
                    backgroundColor: i % 2 === 0 ? '#EFF4FF' : '#F3FAF7', // Alternating backgrounds
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
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#111827',
                        }}
                      >
                        {addon.name}
                      </Text>
                      <Text
                        style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}
                      >
                        No travel required
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
                      backgroundColor: i % 2 === 0 ? '#E7EDFA' : '#E7F2EE',
                      padding: 5,
                      borderRadius: 10,
                    }}
                  >
                    {addon.details?.map((d, j) => (
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
                        fontWeight: '700',
                        color: '#111827',
                      }}
                    >
                      Just{' '}
                      <Text className="text-2xl font-medium">
                        ₹{addon.price?.toLocaleString('en-IN')}
                      </Text>
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#E6F4EF',
                        paddingHorizontal: 24,
                        paddingVertical: 8,
                        borderRadius: 8,
                        borderWidth: 1, // thickness
                        borderColor: '#1F8A70', // color
                        width: 126,
                        height: 40,
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: '#1F8A70',
                          fontWeight: '600',
                          fontSize: 14,
                        }}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      alignItems: 'center',
                      backgroundColor: i % 2 === 0 ? '#E7EDFA' : '#E7F2EE',
                    }}
                    className="w-[100%] h-[36px] flex items-center justify-center rounded-3xl"
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
          )}

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
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 16,
              marginBottom: 100,
              padding: 16,
              elevation: 2,
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
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
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: 8,
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
                            marginBottom: 6,
                          }}
                        >
                          <Check
                            size={14}
                            color="#1F8A70"
                            style={{ marginTop: 2 }}
                          />
                          <Text
                            style={{
                              marginLeft: 8,
                              fontSize: 13,
                              color: '#374151',
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
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: 8,
                      }}
                    >
                      Cancellation Policy
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 6,
                      }}
                    >
                      <Check size={14} color="#1F8A70" />
                      <Text
                        style={{
                          marginLeft: 8,
                          fontSize: 13,
                          color: '#374151',
                        }}
                      >
                        {destination.policies?.cancellationPolicy ||
                          'Contact operator for cancellation policy'}
                      </Text>
                    </View>
                  </>
                )}

                {policies.refund ? (
                  <View style={{ marginTop: 12 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: 8,
                      }}
                    >
                      Refund Policy
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginBottom: 6,
                      }}
                    >
                      <Check
                        size={14}
                        color="#1F8A70"
                        style={{ marginTop: 2 }}
                      />
                      <Text
                        style={{
                          marginLeft: 8,
                          fontSize: 13,
                          color: '#374151',
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
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
            <Text style={{ fontSize: 11, color: '#9CA3AF' }}>From </Text>
            {dates.length > 0 && selectedDate < dates.length
              ? dates[selectedDate].price
              : priceStr}
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280' }}>
              {' '}
              /Guest
            </Text>
          </Text>
          {dates.length > 0 &&
            selectedDate < dates.length &&
            dates[selectedDate].seatsLeft <= 5 &&
            !dates[selectedDate].isFull && (
              <Text
                style={{ fontSize: 11, color: '#F97316', fontWeight: '600' }}
              >
                Only {dates[selectedDate].seatsLeft} seats left
              </Text>
            )}
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
              // No batches — navigate to booking screen as fallback
              navigation.navigate('Booking', { destination });
              return;
            }
            const selected = dates[selectedDate];
            if (selected?.isFull) return;
            // Navigate to booking with batch info
            navigation.navigate('Booking', {
              destination,
              batchId: selected?.batchId,
              selectedBatch: batches[selectedDate],
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
