import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  Tag,
  Calendar,
  Star,
  MapPin,
  AlertTriangle,
  Gift,
  XCircle,
  Wallet,
  MessageCircle,
} from 'lucide-react-native';
import { notificationsAPI } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TYPE_CONFIG = {
  booking_confirmed: { icon: CheckCircle, color: '#10B981', bg: '#D1FAE5' },
  booking_cancelled: { icon: XCircle, color: '#EF4444', bg: '#FEE2E2' },
  trip_reminder: { icon: Calendar, color: '#3B82F6', bg: '#DBEAFE' },
  trip_completed: { icon: Star, color: '#F59E0B', bg: '#FEF9C3' },
  new_booking: { icon: CheckCircle, color: '#10B981', bg: '#D1FAE5' },
  package_approved: { icon: CheckCircle, color: '#10B981', bg: '#D1FAE5' },
  package_rejected: { icon: XCircle, color: '#EF4444', bg: '#FEE2E2' },
  package_revision: { icon: AlertTriangle, color: '#F59E0B', bg: '#FEF3C7' },
  wallet_credited: { icon: Wallet, color: '#8B5CF6', bg: '#EDE9FE' },
  new_review: { icon: Star, color: '#F59E0B', bg: '#FEF9C3' },
  report_resolved: { icon: CheckCircle, color: '#10B981', bg: '#D1FAE5' },
  offer: { icon: Tag, color: '#F59E0B', bg: '#FEF3C7' },
  general: { icon: Bell, color: '#6B7280', bg: '#F3F4F6' },
};

const fmtTime = d => {
  if (!d) return '';
  const date = new Date(d);
  const now = new Date();
  const diff = now - date;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 172800000) return 'Yesterday';
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
};

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await notificationsAPI.getMy();
      const data = res.data?.notifications || [];
      setNotifications(data);
      AsyncStorage.setItem('@cache_notifications', JSON.stringify(data)).catch(
        () => {},
      );
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load cached notifications on mount
  useEffect(() => {
    AsyncStorage.getItem('@cache_notifications')
      .then(raw => {
        if (raw && loading) {
          try {
            const cached = JSON.parse(raw);
            if (cached?.length) {
              setNotifications(cached);
              setLoading(false);
            }
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
      // Mark all as read after a short delay (so user sees unread state first)
      setTimeout(() => {
        notificationsAPI
          .markAllRead()
          .then(() => {
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
          })
          .catch(() => {});
      }, 2000);
    }, [fetchNotifications]),
  );

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered =
    activeTab === 'all' ? notifications : notifications.filter(n => !n.read);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          onPress={() => setActiveTab('all')}
          style={[styles.tab, activeTab === 'all' && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.tabTextActive,
            ]}
          >
            All ({notifications.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('unread')}
          style={[styles.tab, activeTab === 'unread' && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'unread' && styles.tabTextActive,
            ]}
          >
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1F8A70" />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchNotifications();
              }}
              colors={['#1F8A70']}
            />
          }
        >
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Bell size={48} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptyText}>You're all caught up!</Text>
            </View>
          ) : (
            filtered.map(item => {
              const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
              const Icon = config.icon;
              return (
                <View
                  key={item._id}
                  style={[styles.card, !item.read && styles.cardUnread]}
                >
                  <View
                    style={[styles.iconBox, { backgroundColor: config.bg }]}
                  >
                    <Icon size={18} color={config.color} />
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Text
                        style={[
                          styles.cardTitle,
                          !item.read && { fontWeight: '700' },
                        ]}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.cardBody} numberOfLines={2}>
                      {item.body}
                    </Text>
                    <Text style={styles.cardTime}>
                      {fmtTime(item.createdAt)}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tabActive: { backgroundColor: '#1F8A70' },
  tabText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
  tabTextActive: { color: '#fff', fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { alignItems: 'center', paddingTop: 80, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: '#374151' },
  emptyText: { fontSize: 13, color: '#9CA3AF' },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardUnread: { backgroundColor: '#F8FFFE', borderColor: '#D1FAE5' },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#111827', flex: 1 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1F8A70',
    marginLeft: 8,
  },
  cardBody: { fontSize: 13, color: '#6B7280', lineHeight: 18, marginBottom: 4 },
  cardTime: { fontSize: 11, color: '#9CA3AF' },
});

export default NotificationScreen;
