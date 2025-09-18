// SafePackageDetailScreen.js - Version without navigation dependencies
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  ActivityIndicator,
  StatusBar,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock icons as simple components if heroicons are causing issues
const ChevronLeftIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>←</Text>
);

const StarIcon = ({ size, color, fill }) => (
  <Text style={{ fontSize: size, color: fill || color }}>★</Text>
);

const UserIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>👤</Text>
);

const CalendarIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>📅</Text>
);

const MapPinIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>📍</Text>
);

const ClockIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>⏰</Text>
);

const CheckIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>✓</Text>
);

const XIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>✗</Text>
);

const ShareIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>📤</Text>
);

const WalletIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>💳</Text>
);

const HeartIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>🤍</Text>
);

const HeartIconSolid = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>❤️</Text>
);

const PlayIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>▶️</Text>
);

const PackageIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>🎒</Text>
);

const CultureIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>🏛️</Text>
);

const ItineraryIcon = ({ size, color }) => (
  <Text style={{ fontSize: size, color }}>📋</Text>
);

const PackageDetailScreen = ({ packageData, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedDays, setExpandedDays] = useState({});

  const route = useRoute();
  const navigation = useNavigation();

  // Safely extract package data with defaults
  const pkg = route.params?.package || {};

  // Destructure with defaults
  const {
    title = 'Package Title',
    price = 0,
    discount = '',
    people = 1,
    images = [],
    includes = [],
    excludes = [],
    agents = [],
    description = 'No description available',
    touristPlaces = [],
    itinerary = [],
    packingTips = [],
    culturalNotes = [],
  } = pkg;

  // Loading state
  if (!route.params?.package) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#f59e0b" />
      </View>
    );
  }

  const toggleDayExpansion = day => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2 days ago',
      comment:
        'Absolutely incredible experience! The mystery element made it so exciting. The island was breathtaking and the activities were perfectly organized.',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 5,
      date: '1 week ago',
      comment:
        'Best vacation ever! The surprise destination was amazing and the service was top-notch. Highly recommend for adventure lovers.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      rating: 4,
      date: '2 weeks ago',
      comment:
        "Great concept and beautiful location. The only minor issue was the weather, but that's not their fault. Would definitely book again!",
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 4,
      name: 'David Rodriguez',
      rating: 5,
      date: '3 weeks ago',
      comment:
        'The mystery aspect was brilliant! My partner and I were amazed by the destination. Perfect for couples looking for adventure.',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this amazing ${title} package for just $${price}!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderStars = rating => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          size={14}
          color={i < rating ? '#f59e0b' : '#d1d5db'}
          fill={i < rating ? '#f59e0b' : 'transparent'}
        />,
      );
    }
    return stars;
  };

  const renderImageCarousel = () => {
    if (!images?.length) return null;

    return (
      <View style={{ position: 'relative' }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentImageIndex(index);
          }}
        >
          {images.map((image, index) => (
            <View
              key={index}
              style={{ width, height: width * 0.75, position: 'relative' }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                }}
              />
            </View>
          ))}
        </ScrollView>

        {/* Floating action buttons */}
        <View
          style={{
            position: 'absolute',
            top: 48,
            left: 16,
            right: 16,
            flexDirection: 'row',
            justifyContent: 'flex-end', // Changed from 'space-between' to 'flex-start'
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={handleShare}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.9)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShareIcon size={18} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.9)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isFavorite ? (
                <HeartIconSolid size={18} color="#ef4444" />
              ) : (
                <HeartIcon size={18} color="#333" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Image indicators */}
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            flexDirection: 'row',
            gap: 8,
          }}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  currentImageIndex === index
                    ? '#fff'
                    : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </View>

        {/* Price badge */}
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: '#10b981',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            ${price}
          </Text>
          {discount && (
            <Text
              style={{ color: '#dcfce7', fontSize: 12, textAlign: 'center' }}
            >
              {discount} OFF
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderItineraryTab = () => {
    if (!itinerary?.length) {
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#6b7280' }}>No itinerary available</Text>
        </View>
      );
    }

    return (
      <SafeAreaProvider style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            color: '#1f2937',
          }}
        >
          Daily Itinerary
        </Text>

        {itinerary.map((day, index) => (
          <View
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#f3f4f6',
              marginBottom: 16,
              overflow: 'hidden',
            }}
          >
            <TouchableOpacity
              onPress={() => toggleDayExpansion(day.day)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                backgroundColor: '#f8fafc',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: '#3b82f6',
                    borderRadius: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {day.day}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontWeight: '600', color: '#1f2937' }}>
                    Day {day.day}: {day.theme}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>
                    Budget: ${day.budget}
                  </Text>
                </View>
              </View>
              <Text style={{ color: '#3b82f6' }}>
                {expandedDays[day.day] ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {expandedDays[day.day] && (
              <View style={{ padding: 16 }}>
                {/* Morning */}
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#f59e0b',
                      marginBottom: 8,
                    }}
                  >
                    ☀️ Morning
                  </Text>
                  <Text style={{ color: '#374151', lineHeight: 20 }}>
                    {day.morning}
                  </Text>
                </View>

                {/* Afternoon */}
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#f59e0b',
                      marginBottom: 8,
                    }}
                  >
                    🌞 Afternoon
                  </Text>
                  <Text style={{ color: '#374151', lineHeight: 20 }}>
                    {day.afternoon}
                  </Text>
                </View>

                {/* Evening */}
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#8b5cf6',
                      marginBottom: 8,
                    }}
                  >
                    🌙 Evening
                  </Text>
                  <Text style={{ color: '#374151', lineHeight: 20 }}>
                    {day.evening}
                  </Text>
                </View>

                {/* Dining */}
                {day.dining && (
                  <View
                    style={{
                      backgroundColor: '#f0fdf4',
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#166534',
                        marginBottom: 4,
                      }}
                    >
                      🍽️ Dining Included
                    </Text>
                    <Text style={{ color: '#374151' }}>{day.dining}</Text>
                  </View>
                )}

                {/* Budget */}
                <View
                  style={{
                    backgroundColor: '#fffbeb',
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#d97706',
                      marginBottom: 4,
                    }}
                  >
                    💰 Estimated Daily Budget
                  </Text>
                  <Text style={{ color: '#374151' }}>
                    ${day.budget} per person
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </SafeAreaProvider>
    );
  };

  const renderPackingTipsTab = () => {
    if (!packingTips?.length) {
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#6b7280' }}>No packing tips available</Text>
        </View>
      );
    }

    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            color: '#1f2937',
          }}
        >
          Packing Essentials
        </Text>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#f3f4f6',
            padding: 16,
          }}
        >
          {packingTips.map((tip, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 12,
                padding: 12,
                backgroundColor: '#f8fafc',
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: '#f59e0b',
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  marginTop: 2,
                }}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>
                  {index + 1}
                </Text>
              </View>
              <Text style={{ flex: 1, color: '#374151', lineHeight: 20 }}>
                {tip}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            backgroundColor: '#fffbeb',
            padding: 16,
            borderRadius: 16,
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#fef3c7',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              color: '#92400e',
              marginBottom: 8,
              fontSize: 16,
            }}
          >
            💡 Pro Tip
          </Text>
          <Text style={{ color: '#374151', lineHeight: 20 }}>
            Pack light but smart! Consider the climate and activities planned.
            Roll your clothes to save space and use packing cubes for
            organization.
          </Text>
        </View>
      </View>
    );
  };

  const renderCulturalNotesTab = () => {
    if (!culturalNotes?.length) {
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#6b7280' }}>No cultural notes available</Text>
        </View>
      );
    }

    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            color: '#1f2937',
          }}
        >
          Cultural Guidelines
        </Text>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#f3f4f6',
            padding: 16,
          }}
        >
          {culturalNotes.map((note, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 16,
                padding: 16,
                backgroundColor: index % 2 === 0 ? '#f0f9ff' : '#faf5ff',
                borderRadius: 12,
                borderLeftWidth: 4,
                borderLeftColor: index % 2 === 0 ? '#0ea5e9' : '#8b5cf6',
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: index % 2 === 0 ? '#0ea5e9' : '#8b5cf6',
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {index + 1}
                </Text>
              </View>
              <Text style={{ flex: 1, color: '#374151', lineHeight: 20 }}>
                {note}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            backgroundColor: '#f0fdf4',
            padding: 16,
            borderRadius: 16,
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#bbf7d0',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              color: '#166534',
              marginBottom: 8,
              fontSize: 16,
            }}
          >
            🌟 Cultural Respect
          </Text>
          <Text style={{ color: '#374151', lineHeight: 20 }}>
            Remember that you are a guest in another culture. Being respectful,
            patient, and open-minded will greatly enhance your travel experience
            and help you connect with local people.
          </Text>
        </View>
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View className="mb-20">
            {/* Quick Facts */}
            <View
              style={{
                backgroundColor: '#f8fafc',
                marginHorizontal: 16,
                borderRadius: 16,
                padding: 16,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 16,
                  color: '#1f2937',
                }}
              >
                Quick Facts
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#dbeafe',
                      borderRadius: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <UserIcon size={24} color="#3b82f6" />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1f2937',
                    }}
                  >
                    For {people}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>People</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#dcfce7',
                      borderRadius: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <CalendarIcon size={24} color="#10b981" />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1f2937',
                    }}
                  >
                    3-5 Days
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>
                    Duration
                  </Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#e9d5ff',
                      borderRadius: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <MapPinIcon size={24} color="#8b5cf6" />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1f2937',
                    }}
                  >
                    Mystery
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>
                    Location
                  </Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#fed7aa',
                      borderRadius: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <ClockIcon size={24} color="#f59e0b" />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1f2937',
                    }}
                  >
                    Daily
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Tours</Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 16,
                  color: '#1f2937',
                }}
              >
                About This Experience
              </Text>
              <Text style={{ fontSize: 16, lineHeight: 24, color: '#374151' }}>
                {description}
              </Text>
            </View>

            {/* Includes/Excludes */}
            <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#f3f4f6',
                  overflow: 'hidden',
                }}
              >
                <View style={{ backgroundColor: '#EFF6FF', padding: 16 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#1E40AF',
                      marginBottom: 12,
                    }}
                  >
                    Places You'll Visit
                  </Text>
                  {touristPlaces.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: '#0EA5E9',
                          borderRadius: 12,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 12,
                        }}
                      >
                        <CheckIcon size={14} color="white" />
                      </View>
                      <Text style={{ flex: 1, color: '#1E40AF' }}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ backgroundColor: '#f0fdf4', padding: 16 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#166534',
                      marginBottom: 12,
                    }}
                  >
                    What's Included
                  </Text>
                  {includes.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: '#10b981',
                          borderRadius: 12,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 12,
                        }}
                      >
                        <CheckIcon size={14} color="white" />
                      </View>
                      <Text style={{ flex: 1, color: '#166534' }}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ backgroundColor: '#fef2f2', padding: 16 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#991b1b',
                      marginBottom: 12,
                    }}
                  >
                    Not Included
                  </Text>
                  {excludes.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: '#ef4444',
                          borderRadius: 12,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 12,
                        }}
                      >
                        <XIcon size={14} color="white" />
                      </View>
                      <Text style={{ flex: 1, color: '#991b1b' }}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        );

      case 'reviews':
        return (
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                backgroundColor: '#fffbeb',
                padding: 16,
                borderRadius: 16,
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937' }}
                >
                  4.8
                </Text>
                <View style={{ flexDirection: 'row' }}>{renderStars(5)}</View>
              </View>
              <Text style={{ color: '#6b7280' }}>Based on 127 reviews</Text>
              <Text style={{ color: '#9ca3af', fontSize: 14, marginTop: 4 }}>
                96% of guests recommend this experience
              </Text>
            </View>

            {reviews.map(review => (
              <View
                key={review.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#f3f4f6',
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Image
                    source={{ uri: review.avatar }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '600', color: '#1f2937' }}>
                      {review.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 4,
                      }}
                    >
                      <View style={{ flexDirection: 'row', marginRight: 8 }}>
                        {renderStars(review.rating)}
                      </View>
                      <Text style={{ fontSize: 12, color: '#9ca3af' }}>
                        {review.date}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={{ color: '#374151', lineHeight: 20 }}>
                  {review.comment}
                </Text>
              </View>
            ))}

            <TouchableOpacity
              style={{
                backgroundColor: '#3b82f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>
                Read All Reviews (127)
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 'video':
        return (
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 16,
                color: '#1f2937',
              }}
            >
              Experience Preview
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#1f2937',
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 16,
                position: 'relative',
                height: 220,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() =>
                Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
              }
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                }}
                style={{ width: '100%', height: '100%', opacity: 0.7 }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: '#ef4444',
                    borderRadius: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PlayIcon size={24} color="white" />
                </View>
                <Text
                  style={{ color: 'white', fontWeight: '600', marginTop: 8 }}
                >
                  Watch Video
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={{ color: '#6b7280', marginBottom: 24 }}>
              Watch this video to get a glimpse of the incredible mystery
              adventure that awaits you!
            </Text>

            {/* Additional video thumbnails */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 12,
                  color: '#1f2937',
                }}
              >
                More Videos
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                  {
                    title: 'Island Tour',
                    thumb:
                      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
                  },
                  {
                    title: 'Activities',
                    thumb:
                      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
                  },
                  {
                    title: 'Local Culture',
                    thumb:
                      'https://images.unsplash.com/photo-1573790387438-4da905039392',
                  },
                ].map((video, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginRight: 16,
                      backgroundColor: '#f3f4f6',
                      borderRadius: 12,
                      overflow: 'hidden',
                    }}
                    onPress={() =>
                      Linking.openURL(
                        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                      )
                    }
                  >
                    <Image
                      source={{ uri: video.thumb }}
                      style={{ width: 128, height: 96 }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PlayIcon size={20} color="white" />
                    </View>
                    <Text
                      style={{
                        padding: 8,
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#374151',
                      }}
                    >
                      {video.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        );
      case 'itinerary':
        return renderItineraryTab();

      case 'packing':
        return renderPackingTipsTab();

      case 'culture':
        return renderCulturalNotesTab();

      default:
        return null;
    }
  };

  const renderAgents = () => {
    if (!agents?.length) return null;

    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            color: '#1f2937',
          }}
        >
          Choose Your Adventure Partner
        </Text>
        {agents.map((agent, index) => {
          if (!agent) return null;

          return (
            <TouchableOpacity
              key={`agent-${index}`}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#f3f4f6',
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      backgroundColor: '#f59e0b',
                      borderRadius: 28,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                    >
                      {agent.name?.charAt(0) || 'A'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#1f2937',
                      }}
                    >
                      {agent.name || 'Travel Agency'}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#9ca3af' }}>
                      Verified Partner
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 4,
                      }}
                    >
                      <StarIcon size={12} color="#f59e0b" fill="#f59e0b" />
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#9ca3af',
                          marginLeft: 4,
                        }}
                      >
                        4.9 • 2.3k bookings
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#10b981',
                    }}
                  >
                    ฿{agent.price || 0}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af' }}>
                    per group
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#dcfce7',
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#166534',
                      }}
                    >
                      Best Price
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {renderImageCarousel()}

        {/* Title and Rating */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            backgroundColor: 'white',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 8,
            }}
          >
            {title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', marginRight: 8 }}>
                {renderStars(5)}
              </View>
              <Text style={{ color: '#6b7280' }}>4.8 (127 reviews)</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {discount && (
                <Text
                  style={{
                    fontSize: 14,
                    color: '#9ca3af',
                    textDecorationLine: 'line-through',
                  }}
                >
                  ฿{Math.round(price / (1 - parseInt(discount) / 100))}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View
          style={{
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#f3f4f6',
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingHorizontal: 16 }}
          >
            <View style={{ flexDirection: 'row', paddingVertical: 8, gap: 4 }}>
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'itinerary', label: 'Itinerary' },
                { key: 'packing', label: 'Packing' },
                { key: 'culture', label: 'Culture' },
                { key: 'reviews', label: 'Reviews' },
                { key: 'video', label: 'Video' },
              ].map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={{
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 20,
                    backgroundColor: activeTab === tab.key ? '#000' : '#f3f4f6',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      color: activeTab === tab.key ? 'white' : '#6b7280',
                    }}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View style={{ paddingVertical: 24, backgroundColor: 'white' }}>
          {renderTabContent()}
        </View>

        {/* Agents */}
        <View style={{ paddingVertical: 24, backgroundColor: 'white' }}>
          {renderAgents()}
        </View>

        {/* Bottom spacing for fixed button */}
        <View style={{ height: 96 }} />
      </ScrollView>

      {/* Fixed Book Now Button */}
      <View
        style={{
          position: 'absolute',
          bottom: 35,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#f59e0b',
            paddingVertical: 10,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#f59e0b',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={() => {
            Alert.alert(
              'Booking Confirmed!',
              `You're about to book ${title} for ฿${price}`,
              [{ text: 'OK', onPress: () => console.log('Booking:', title) }],
            );
          }}
        >
          <WalletIcon size={24} color="white" />
          <Text
            style={{
              marginLeft: 8,
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Book Now - ฿{price}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PackageDetailScreen;
