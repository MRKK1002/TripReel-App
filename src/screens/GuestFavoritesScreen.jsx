import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Eye, Play, X } from 'lucide-react-native';
import { reelsAPI, SERVER_URL } from '../services/api';
import './../../android/app/src/utils/globalFont.js';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = (width - 16 * 2 - 8) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

// Fix URLs that have wrong hostname
const resolveUrl = url => {
  if (!url) return null;
  if (url.startsWith('http') && url.includes('/uploads/')) {
    const path = url.substring(url.indexOf('/uploads/'));
    return `${SERVER_URL}${path}`;
  }
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url.startsWith('/') ? url : '/' + url}`;
};

const GuestFavoritesScreen = () => {
  const navigation = useNavigation();
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchReels = async (pageNum = 1, append = false) => {
    try {
      const res = await reelsAPI.getAll({ limit: 20, page: pageNum });
      const newReels = res.data?.reels || [];
      if (append) {
        setReels(prev => [...prev, ...newReels]);
      } else {
        setReels(newReels);
      }
      setHasMore(newReels.length === 20);
      setPage(pageNum);
    } catch {
      if (!append) setReels([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchReels(page + 1, true);
    }
  };

  const renderReelCard = ({ item }) => {
    const thumb = item.thumbnail ? resolveUrl(item.thumbnail) : null;
    const videoUrl = item.video ? resolveUrl(item.video) : null;
    const views = item.views
      ? item.views >= 1000
        ? `${(item.views / 1000).toFixed(1)}k`
        : String(item.views)
      : null;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => setActiveVideo({ ...item, video: videoUrl })}
      >
        <View style={styles.cardInner}>
          {thumb ? (
            <Image
              source={{ uri: thumb }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          ) : videoUrl ? (
            <Video
              source={{ uri: videoUrl }}
              style={styles.cardImage}
              resizeMode="cover"
              muted
              paused
              repeat={false}
            />
          ) : (
            <View
              style={[
                styles.cardImage,
                {
                  backgroundColor: '#E2E8F0',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Play size={24} color="#94A3B8" />
            </View>
          )}

          {/* Dark overlay */}
          <View style={StyleSheet.absoluteFillObject} />

          {/* Play icon */}
          <View style={styles.playBtn}>
            <Play size={14} color="#fff" fill="#fff" />
          </View>

          {/* View count */}
          {views && (
            <View style={styles.viewBadge}>
              <Eye size={10} color="#fff" />
              <Text style={styles.viewText}>{views}</Text>
            </View>
          )}

          {/* User chip */}
          {item.user?.name && (
            <View style={styles.userChip}>
              {item.user.avatar ? (
                <Image
                  source={{ uri: resolveUrl(item.user.avatar) }}
                  style={styles.userAvatar}
                />
              ) : (
                <View
                  style={[styles.userAvatar, { backgroundColor: '#1F8A70' }]}
                />
              )}
              <Text style={styles.userName} numberOfLines={1}>
                {item.user.name}
              </Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        {item.location ? (
          <Text style={styles.cardLocation} numberOfLines={1}>
            {item.location}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Experience Reels</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#1F8A70" />
        </View>
      ) : reels.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
          }}
        >
          <Play size={48} color="#CBD5E1" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#374151',
              marginTop: 12,
            }}
          >
            No reels yet
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#9CA3AF',
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            Check back later for travel reels
          </Text>
        </View>
      ) : (
        <FlatList
          data={reels}
          renderItem={renderReelCard}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={{ gap: 8, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingVertical: 16, gap: 12 }}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#1F8A70" />
              </View>
            ) : null
          }
        />
      )}

      {/* Fullscreen Video Modal */}
      <Modal
        visible={!!activeVideo}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setActiveVideo(null)}
      >
        {activeVideo && (
          <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Video
              source={{
                uri: activeVideo.video,
                type: 'mp4',
              }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="contain"
              repeat
              paused={false}
              muted={false}
              onError={e =>
                console.log('Video Error:', JSON.stringify(e.error))
              }
              onLoad={() => console.log('Video loaded successfully')}
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
              {activeVideo.user?.name && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                >
                  {activeVideo.user.avatar && (
                    <Image
                      source={{ uri: resolveUrl(activeVideo.user.avatar) }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        marginRight: 8,
                      }}
                    />
                  )}
                  <Text
                    style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}
                  >
                    {activeVideo.user.name}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  card: { width: CARD_WIDTH, marginBottom: 4 },
  cardInner: { position: 'relative', borderRadius: 14, overflow: 'hidden' },
  cardImage: { width: CARD_WIDTH, height: CARD_HEIGHT },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -14 }, { translateY: -14 }],
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 3,
  },
  viewText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  userChip: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 4,
    maxWidth: CARD_WIDTH - 16,
  },
  userAvatar: { width: 14, height: 14, borderRadius: 7 },
  userName: { fontSize: 10, fontWeight: '700', color: '#0F172A' },
  cardTitle: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  cardLocation: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
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
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  modalLocation: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
});

export default GuestFavoritesScreen;
