import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';
import {
  Star,
  Share2,
  Bookmark,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';
import './../../android/app/src/utils/globalFont.js';

const { width, height } = Dimensions.get('window');

const ExperiencesReel = ({ experiences, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const experiencesData = experiences || [
    {
      id: 1,
      title: 'Beachside Photos',
      location: 'Baga, Goa',
      rating: 4.5,
      price: 'From ₹8,999/guest',
      badge: 'Popular',
      reviews_count: '2.1k',
      image_url:
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=1200&fit=crop',
      user_name: 'John Smith',
      user_avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      user_verified: true,
      description:
        'Professional beach photography session at sunset. Capture your best moments with stunning ocean views!',
      duration: '2 hours',
      includes: [
        'Professional photographer',
        '20 edited photos',
        'Digital album',
        'Props & accessories',
      ],
    },
    {
      id: 2,
      title: 'Sunset Boat Ride',
      location: 'Alleppey',
      rating: 4.5,
      price: 'From ₹1,500/guest',
      badge: 'Popular',
      reviews_count: '2.1k',
      image_url:
        'https://images.unsplash.com/photo-1593693411512-c20261bcad6e?w=800&h=1200&fit=crop',
      user_name: 'John Smith',
      user_avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      user_verified: true,
      description:
        'Romantic sunset boat ride through the backwaters. Includes snacks, drinks, and traditional music.',
      duration: '1.5 hours',
      includes: [
        'Traditional houseboat',
        'Evening snacks',
        'Sunset photography',
        'Live music',
      ],
    },
    {
      id: 3,
      title: 'Heritage Walking Tour',
      location: 'Jaipur',
      rating: 4.8,
      price: 'From ₹1,200/guest',
      badge: 'Trending',
      reviews_count: '3.4k',
      image_url:
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=1200&fit=crop',
      user_name: 'Priya Sharma',
      user_avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      user_verified: true,
      description:
        'Explore the pink city with expert guides. Visit historical landmarks and hidden gems.',
      duration: '3 hours',
      includes: [
        'Expert guide',
        'Entry tickets',
        'Traditional snacks',
        'Photography tips',
      ],
    },
    {
      id: 4,
      title: 'Street Food Crawl',
      location: 'Delhi',
      rating: 4.7,
      price: 'From ₹899/guest',
      badge: 'Popular',
      reviews_count: '5.2k',
      image_url:
        'https://images.unsplash.com/photo-1559333087-bf0dd562e09c?w=800&h=1200&fit=crop',
      user_name: 'Vikram Singh',
      user_avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      user_verified: true,
      description:
        'Taste the best street food in Delhi. 10+ food tastings at famous local spots.',
      duration: '4 hours',
      includes: [
        '10+ food tastings',
        'Water bottles',
        'Food guide',
        'Local stories',
      ],
    },
    {
      id: 5,
      title: 'Tea Estate Tour',
      location: 'Munnar',
      rating: 4.6,
      price: 'From ₹2,500/guest',
      badge: 'Popular',
      reviews_count: '1.8k',
      image_url:
        'https://images.unsplash.com/photo-1593693411512-c20261bcad6e?w=800&h=1200&fit=crop',
      user_name: 'Lakshmi Nair',
      user_avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      user_verified: true,
      description:
        'Walk through lush tea gardens and learn about tea making process. Includes tea tasting session.',
      duration: '3 hours',
      includes: [
        'Tea garden walk',
        'Factory tour',
        'Tea tasting',
        'Refreshments',
      ],
    },
  ];

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.reelContainer}>
        <Image
          source={{ uri: item.image_url }}
          style={styles.backgroundImage}
          blurRadius={2}
        />
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <ChevronLeft size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.experienceCount}>
              {currentIndex + 1} / {experiencesData.length}
            </Text>
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <Image source={{ uri: item.user_avatar }} style={styles.avatar} />
            <View style={styles.userText}>
              <View style={styles.userNameRow}>
                <Text style={styles.userName}>{item.user_name}</Text>
                {item.user_verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedIcon}>✓</Text>
                  </View>
                )}
              </View>
              <View style={styles.locationRow}>
                <MapPin size={14} color="#FFFFFF" />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>

          {/* Experience Details */}
          <View style={styles.experienceDetails}>
            <Text style={styles.experienceTitle}>{item.title}</Text>
            <Text style={styles.experienceDescription}>{item.description}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.statText}>{item.rating}</Text>
              </View>
              <View style={styles.statItem}>
                <Users size={16} color="#FFFFFF" />
                <Text style={styles.statText}>
                  {item.reviews_count} reviews
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statText}>⏱️ {item.duration}</Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.perGuest}>/guest</Text>
            </View>

            <View style={styles.includesContainer}>
              {item.includes?.slice(0, 3).map((include, idx) => (
                <View key={idx} style={styles.includeTag}>
                  <Text style={styles.includeText}>✓ {include}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={32} color="#FFFFFF" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setSaved(!saved)}
            >
              <Bookmark
                size={32}
                color={saved ? '#F59E0B' : '#FFFFFF'}
                fill={saved ? '#F59E0B' : 'none'}
              />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Gradient */}
          <View style={styles.bottomGradient} />
        </View>
      </View>
    );
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={experiencesData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  reelContainer: {
    width,
    height: '100%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  experienceCount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userText: {
    flex: 1,
    marginLeft: 12,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.9,
  },
  followButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  followText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  experienceDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  experienceTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  experienceDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.9,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  price: {
    color: '#F59E0B',
    fontSize: 20,
    fontWeight: 'bold',
  },
  perGuest: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.8,
  },
  includesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  includeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  includeText: {
    color: '#FFFFFF',
    fontSize: 11,
  },
  actionButtons: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  },
});

export default ExperiencesReel;
