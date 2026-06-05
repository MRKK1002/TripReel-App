

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
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SERVER_URL } from '../services/api';
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
  const { destination } = route.params;

  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [showInclusions, setShowInclusions] = useState(true);
  const [showPolicies, setShowPolicies] = useState(true);
  const [selectedDate, setSelectedDate] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const scrollViewRef = useRef(null);
  const imageOpacity = useRef(new Animated.Value(1)).current;
  const activeImageIndexRef = useRef(0);

  // Build image list: cover first + all operator-uploaded images, fully resolved
  const rawImages = [
    destination?.image_url,
    ...(destination?.images || []),
  ];
  const images = rawImages.map(resolveUrl).filter(Boolean);
  const priceStr = `₹${destination.price?.toLocaleString('en-IN') ?? '12,999'}`;
  const dates = [
    { label: '12-14 Feb 2026', price: priceStr },
    { label: '12-14 Feb 2028', price: priceStr },
  ];

  const handleImageChange = (newIndex) => {
    if (newIndex === activeImageIndexRef.current) return;
    if (newIndex >= 0 && newIndex < images.length) {
      Animated.sequence([
        Animated.timing(imageOpacity, { 
          toValue: 0, 
          duration: 150, 
          useNativeDriver: true 
        }),
        Animated.timing(imageOpacity, { 
          toValue: 1, 
          duration: 150, 
          useNativeDriver: true 
        }),
      ]).start();

      activeImageIndexRef.current = newIndex; // ✅ update ref
      setActiveImageIndex(newIndex);          // ✅ update state for UI
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
      onPanResponderGrant: () => {
        if (scrollViewRef.current) scrollViewRef.current.setNativeProps({ scrollEnabled: false });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (scrollViewRef.current) scrollViewRef.current.setNativeProps({ scrollEnabled: true });

        if (Math.abs(gestureState.dx) > 50) {
          if (gestureState.dx > 0 && activeImageIndexRef.current > 0) {
            handleImageChange(activeImageIndexRef.current - 1); // ✅ reads latest
          } else if (gestureState.dx < 0 && activeImageIndexRef.current < images.length - 1) {
            handleImageChange(activeImageIndexRef.current + 1); // ✅ reads latest
          }
        }
      },
      onPanResponderTerminate: () => {
        if (scrollViewRef.current) scrollViewRef.current.setNativeProps({ scrollEnabled: true });
      },
    })
  ).current;

  const handleImagePress = (index) => {
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
        <View 
          style={{ height: 300 }}
          {...panResponder.panHandlers}
        >
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
                  backgroundColor: i === activeImageIndex ? '#fff' : 'rgba(255,255,255,0.5)',
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
                  onPress={() => setWishlisted(w => !w)}
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
                {destination.rating}
              </Text>
              <Text style={{ fontSize: 13, color: '#9CA3AF', marginLeft: 6 }}>
                • {destination.reviews} reviews
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
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16, marginBottom: 12 }} />

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
                {destination.duration}
              </Text>
            </View>
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
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16, marginBottom: 12 }} />

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
                ? destination.about
                : destination.about?.slice(0, 100) +
                  (destination.about?.length > 100 ? '...' : '')}
            </Text>
            {destination.about?.length > 100 && (
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
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16, marginBottom: 12 }} />

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
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16, marginBottom: 12 }} />

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
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {dates.map((d, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedDate(i)}
                  style={{
                    flex: 1,
                    borderWidth: 1.5,
                    borderColor: selectedDate === i ? '#1F8A70' : '#E5E7EB',
                    backgroundColor: selectedDate === i ? '#EBFFF8' : '#FFF6F6',
                    borderRadius: 10,
                    padding: 10,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}
                    className="w-full"
                  >
                    {d.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: '#2563EB',
                    }}
                  >
                    {d.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16, marginBottom: 12 }} />

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
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16, marginBottom: 12 }} />

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
                      backgroundColor:
                              i % 2 === 0 ? '#E7EDFA' : '#E7F2EE' ,
                              padding:5,
                              borderRadius:10
                    }}
                  >
                    {addon.details?.map((d, j) => (
                      <View key={j} style={{ alignItems: 'center', flex: 1,    }}>
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
                            width:"100%"
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
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16, marginBottom: 12 }} />

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
                    style={{ marginLeft: 8, fontSize: 13, color: '#374151' }}
                  >
                    Free cancellation up to 5 days before travel
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Check size={14} color="#1F8A70" />
                  <Text
                    style={{ marginLeft: 8, fontSize: 13, color: '#374151' }}
                  >
                    No refund after that
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}
                >
                  Payment Policy
                </Text>
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
            {priceStr}
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280' }}>
              {' '}
              /Guest
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#1F8A70',
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
          }}
          onPress={() => navigation.navigate('Booking', { destination })}
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