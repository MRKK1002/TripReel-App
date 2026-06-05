import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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
  Trash2,
} from 'lucide-react-native';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'booking',
    icon: CheckCircle,
    iconColor: '#10B981',
    iconBg: '#D1FAE5',
    title: 'Booking Confirmed',
    message:
      'Your trip to Nandi Hills has been confirmed. Get ready for an amazing experience!',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'offer',
    icon: Tag,
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7',
    title: 'New Offer Available',
    message:
      'Get 20% off on Goa Weekend Escape. Use code GOA20 before it expires.',
    time: '5 hours ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'reminder',
    icon: Calendar,
    iconColor: '#3B82F6',
    iconBg: '#DBEAFE',
    title: 'Trip Reminder',
    message:
      "Your trip to Nandi Hills starts in 3 days. Don't forget to pack your essentials!",
    time: '1 day ago',
    isRead: false,
  },
  {
    id: 4,
    type: 'review',
    icon: Star,
    iconColor: '#F59E0B',
    iconBg: '#FEF9C3',
    title: 'Rate Your Trip',
    message:
      'How was your experience at Goa Weekend Escape? Share your feedback with others.',
    time: '2 days ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'destination',
    icon: MapPin,
    iconColor: '#1F8A70',
    iconBg: '#E6F4EF',
    title: 'New Destination Added',
    message:
      'Explore the beautiful beaches of Kerala with our newly curated packages starting from ₹8,999.',
    time: '3 days ago',
    isRead: true,
  },
  {
    id: 6,
    type: 'alert',
    icon: AlertTriangle,
    iconColor: '#EF4444',
    iconBg: '#FEE2E2',
    title: 'Payment Processed',
    message:
      'Your payment of ₹12,840 for Nandi Hills trip has been successfully processed.',
    time: '4 days ago',
    isRead: true,
  },
  {
    id: 7,
    type: 'reward',
    icon: Gift,
    iconColor: '#8B5CF6',
    iconBg: '#EDE9FE',
    title: 'Welcome Reward',
    message:
      'Congratulations! You earned a ₹500 reward for your first booking. Use it on your next trip.',
    time: '1 week ago',
    isRead: true,
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filtered =
    activeTab === 'all' ? notifications : notifications.filter(n => !n.isRead);

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 ? (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Read all</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 50 }} />
        )}
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
            All
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
            Unread{unreadCount > 0 ? ` (${unreadCount})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Bell size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>
              You're all caught up! Check back later.
            </Text>
          </View>
        ) : (
          filtered.map(item => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, !item.isRead && styles.cardUnread]}
                onPress={() => markAsRead(item.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[styles.iconBox, { backgroundColor: item.iconBg }]}
                >
                  <Icon size={18} color={item.iconColor} />
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text
                      style={[
                        styles.cardTitle,
                        !item.isRead && { fontWeight: '700' },
                      ]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    {!item.isRead && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.cardMessage} numberOfLines={2}>
                    {item.message}
                  </Text>
                  <Text style={styles.cardTime}>{item.time}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteNotification(item.id)}
                  hitSlop={10}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={14} color="#D1D5DB" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
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
  markAllText: { fontSize: 13, fontWeight: '600', color: '#1F8A70' },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  cardUnread: {
    backgroundColor: '#F8FFFE',
    borderColor: '#D1FAE5',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1F8A70',
    marginLeft: 8,
  },
  cardMessage: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 4,
  },
  cardTime: { fontSize: 11, color: '#9CA3AF' },
  deleteBtn: { padding: 6, marginLeft: 4 },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 10,
  },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: '#374151' },
  emptyText: { fontSize: 13, color: '#9CA3AF', textAlign: 'center' },
});

export default NotificationScreen;
