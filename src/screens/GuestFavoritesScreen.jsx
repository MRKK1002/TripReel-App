import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Eye, Play, X } from 'lucide-react-native';
import './../../android/app/src/utils/globalFont.js';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = (width - 16 * 2 - 8) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const guestFavorites = [
  {
    id: 1,
    title: 'Street Food Crawl',
    location: 'Delhi',
    rating: 4.7,
    price: 'From ₹899/guest',
    badge: 'Popular',
    reviews_count: '5.2k',
    user: {
      name: 'Priya Sharma',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      role: 'Food Expert',
    },
    video: require('../assets/video/video1.mp4'),
  },
  {
    id: 2,
    title: 'Tea Estate Tour',
    location: 'Munnar',
    rating: 4.6,
    price: 'From ₹2,500/guest',
    badge: 'Popular',
    reviews_count: '1.8k',
    user: {
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      role: 'Tea Expert',
    },
    video: require('../assets/video/video2.mp4'),
  },
  {
    id: 3,
    title: 'Beachside Photos',
    location: 'Baga, Goa',
    rating: 4.5,
    price: 'From ₹8,999/guest',
    badge: 'Popular',
    reviews_count: '2.1k',
    user: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Photographer',
    },
    video: require('../assets/video/video3.mp4'),
  },
  {
    id: 4,
    title: 'Sunset Boat Ride',
    location: 'Alleppey',
    rating: 4.5,
    price: 'From ₹1,500/guest',
    badge: 'Popular',
    reviews_count: '2.1k',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      role: 'Guide',
    },
    video: require('../assets/video/video4.mp4'),
  },
  {
    id: 5,
    title: 'Heritage Walking Tour',
    location: 'Jaipur',
    rating: 4.8,
    price: 'From ₹1,200/guest',
    badge: 'Trending',
    reviews_count: '3.4k',
    user: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      role: 'Historian',
    },
    video: require('../assets/video/video5.mp4'),
  },
  {
    id: 6,
    title: 'Jungle Safari',
    location: 'Coorg',
    rating: 4.7,
    price: 'From ₹3,500/guest',
    badge: 'Popular',
    reviews_count: '1.2k',
    user: {
      name: 'Riya Patel',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      role: 'Nature Guide',
    },
    video: require('../assets/video/video6.mp4'),
  },
  {
    id: 7,
    title: 'Pottery Workshop',
    location: 'Jaipur',
    rating: 4.6,
    price: 'From ₹999/guest',
    badge: 'Popular',
    reviews_count: '980',
    user: {
      name: 'Arjun Mehta',
      avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
      role: 'Artisan',
    },
    video: require('../assets/video/video1.mp4'),
  },
  {
    id: 8,
    title: 'Mountain Photography',
    location: 'Manali',
    rating: 4.9,
    price: 'From ₹4,500/guest',
    badge: 'Trending',
    reviews_count: '2.7k',
    user: {
      name: 'Neha Singh',
      avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
      role: 'Photographer',
    },
    video: require('../assets/video/video2.mp4'),
  },
];

const GuestFavoritesScreen = () => {
  const navigation = useNavigation();
  const [activeVideo, setActiveVideo] = useState(null); // holds the selected item

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setActiveVideo(item)}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 14,
        overflow: 'hidden',
        marginLeft: index % 2 === 0 ? 0 : 8,
        marginBottom: 8,
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* First-frame thumbnail — paused video */}
      <Video
        source={item.video}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        muted
        paused={true}
        repeat={false}
      />

      {/* Dark overlay */}
      <View style={styles.cardOverlay} />

      {/* Play icon center */}
      <View style={styles.playIconWrap}>
        <Play size={28} color="#fff" fill="#fff" />
      </View>

      {/* Views — top right */}
      {/* <View style={styles.viewsBadge}>
        <Eye size={11} color="#fff" />
        <Text style={styles.viewsText}>{item.reviews_count}</Text>
      </View> */}

      {/* Title — center bottom */}
      <View style={styles.cardBottom}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
      </View>

      {/* User — bottom left */}
      <View style={styles.userBadge}>
        <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
        <Text style={styles.userName}>{item.user.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 12 }}
        >
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Demo videos</Text>
      </View>

      {/* 2-column grid */}
      <FlatList
        data={guestFavorites}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Full-screen video modal — only ONE video at a time */}
      <Modal
        visible={!!activeVideo}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setActiveVideo(null)}
      >
        <View style={styles.modalContainer}>
          {activeVideo && (
            <Video
              source={activeVideo.video}
              style={StyleSheet.absoluteFillObject}
              resizeMode="contain"
              muted={false}
              repeat
              paused={false}
            />
          )}

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setActiveVideo(null)}
          >
            <X size={22} color="#fff" />
          </TouchableOpacity>

          {/* Info overlay at bottom */}
          {activeVideo && (
            <View style={styles.modalInfo}>
              <Text style={styles.modalTitle}>{activeVideo.title}</Text>
              <Text style={styles.modalLocation}>{activeVideo.location}</Text>
              <View style={styles.modalUser}>
                <Image
                  source={{ uri: activeVideo.user.avatar }}
                  style={styles.modalAvatar}
                />
                <Text style={styles.modalUserName}>
                  {activeVideo.user.name}
                </Text>
                <Text style={styles.modalRole}> · {activeVideo.user.role}</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  playIconWrap: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewsBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  viewsText: {
    color: '#fff',
    fontSize: 11,
    marginLeft: 3,
    fontWeight: '600',
  },
  cardBottom: {
    position: 'absolute',
    bottom: 36,
    left: 8,
    right: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  cardLocation: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: 2,
  },
  userBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EF',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  userAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 5,
  },
  userName: {
    color: '#1F8A70',
    fontSize: 11,
    fontWeight: '600',
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalInfo: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  modalLocation: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    marginTop: 4,
  },
  modalUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  modalAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  modalUserName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  modalRole: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
});

export default GuestFavoritesScreen;
