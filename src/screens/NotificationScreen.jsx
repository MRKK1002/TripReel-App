import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';

const NotificationScreen = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    bookingUpdates: true,
    flightAlerts: true,
    priceDrops: false,
    recommendations: true,
    socialUpdates: false,
  });

  const notifications = [
    {
      id: 1,
      type: 'booking',
      icon: '✈️',
      title: 'Flight Confirmation',
      message: 'Your flight to Tokyo has been confirmed for March 15th',
      time: '2 hours ago',
      isRead: false,
      priority: 'high',
    },
    {
      id: 2,
      type: 'price',
      icon: '💰',
      title: 'Price Drop Alert',
      message: 'Flight prices to Paris dropped by 25%! Book now to save.',
      time: '4 hours ago',
      isRead: false,
      priority: 'medium',
    },
    {
      id: 3,
      type: 'reminder',
      icon: '🎒',
      title: 'Packing Reminder',
      message: 'Don\'t forget to pack your travel documents for tomorrow\'s trip',
      time: '6 hours ago',
      isRead: true,
      priority: 'low',
    },
    {
      id: 4,
      type: 'social',
      icon: '📸',
      title: 'Photo Memories',
      message: 'Sarah liked your photo from Santorini trip',
      time: '1 day ago',
      isRead: true,
      priority: 'low',
    },
    {
      id: 5,
      type: 'weather',
      icon: '🌤️',
      title: 'Weather Update',
      message: 'Sunny weather expected in Bali during your visit next week',
      time: '1 day ago',
      isRead: false,
      priority: 'medium',
    },
    {
      id: 6,
      type: 'recommendation',
      icon: '🏨',
      title: 'Hotel Recommendation',
      message: 'Based on your preferences, we found 3 perfect hotels in Rome',
      time: '2 days ago',
      isRead: true,
      priority: 'low',
    },
    {
      id: 7,
      type: 'booking',
      icon: '🚗',
      title: 'Car Rental Confirmed',
      message: 'Your car rental in Barcelona is confirmed. Pickup at 10 AM',
      time: '3 days ago',
      isRead: true,
      priority: 'high',
    },
    {
      id: 8,
      type: 'alert',
      icon: '⚠️',
      title: 'Travel Advisory',
      message: 'New entry requirements for Italy. Check your documents.',
      time: '1 week ago',
      isRead: false,
      priority: 'high',
    },
  ];

  const [activeTab, setActiveTab] = useState('all');

  const toggleSetting = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const markAsRead = (id) => {
    // In a real app, this would update the backend
    Alert.alert('Marked as Read', 'Notification marked as read');
  };

  const markAllAsRead = () => {
    Alert.alert('All Read', 'All notifications marked as read');
  };

  const deleteNotification = (id) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive' }
      ]
    );
  };

  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === activeTab);
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return '#EF4444';
    if (type === 'price') return '#10B981';
    if (type === 'booking') return '#3B82F6';
    if (type === 'weather') return '#F59E0B';
    return '#6B7280';
  };

  const renderNotificationItem = (notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.isRead && styles.unreadNotification
      ]}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={styles.notificationLeft}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: getNotificationColor(notification.type, notification.priority) + '20' }
        ]}>
          <Text style={styles.notificationIcon}>{notification.icon}</Text>
        </View>
        
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={[
              styles.notificationTitle,
              !notification.isRead && styles.unreadTitle
            ]}>
              {notification.title}
            </Text>
            {!notification.isRead && <View style={styles.unreadDot} />}
          </View>
          
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>
          
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(notification.id)}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSettings = () => (
    <View style={styles.settingsContainer}>
      <Text style={styles.settingsTitle}>Notification Settings</Text>
      
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Booking Updates</Text>
            <Text style={styles.settingDescription}>Flight confirmations and changes</Text>
          </View>
          <Switch
            value={notificationSettings.bookingUpdates}
            onValueChange={() => toggleSetting('bookingUpdates')}
            trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Flight Alerts</Text>
            <Text style={styles.settingDescription}>Delays, gate changes, and updates</Text>
          </View>
          <Switch
            value={notificationSettings.flightAlerts}
            onValueChange={() => toggleSetting('flightAlerts')}
            trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Price Drop Alerts</Text>
            <Text style={styles.settingDescription}>Get notified when prices drop</Text>
          </View>
          <Switch
            value={notificationSettings.priceDrops}
            onValueChange={() => toggleSetting('priceDrops')}
            trackColor={{ false: '#E5E7EB', true: '#10B981' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Recommendations</Text>
            <Text style={styles.settingDescription}>Personalized travel suggestions</Text>
          </View>
          <Switch
            value={notificationSettings.recommendations}
            onValueChange={() => toggleSetting('recommendations')}
            trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Social Updates</Text>
            <Text style={styles.settingDescription}>Likes, comments, and follows</Text>
          </View>
          <Switch
            value={notificationSettings.socialUpdates}
            onValueChange={() => toggleSetting('socialUpdates')}
            trackColor={{ false: '#E5E7EB', true: '#EC4899' }}
          />
        </View>
      </View>
    </View>
  );

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
        
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all as read ({unreadCount})</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsRow}>
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'booking', label: 'Bookings', count: notifications.filter(n => n.type === 'booking').length },
              { key: 'price', label: 'Deals', count: notifications.filter(n => n.type === 'price').length },
              { key: 'settings', label: 'Settings', count: 0 },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tab,
                  activeTab === tab.key && styles.activeTab
                ]}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
                {tab.count > 0 && tab.key !== 'settings' && (
                  <View style={[
                    styles.tabBadge,
                    activeTab === tab.key && styles.activeTabBadge
                  ]}>
                    <Text style={[
                      styles.tabBadgeText,
                      activeTab === tab.key && styles.activeTabBadgeText
                    ]}>
                      {tab.count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'settings' ? (
          renderSettings()
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(renderNotificationItem)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔔</Text>
                <Text style={styles.emptyTitle}>No notifications</Text>
                <Text style={styles.emptyMessage}>
                  You're all caught up! Check back later for updates.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
  },
  markAllButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  markAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    minWidth: 20,
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: '#FFFFFF',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  activeTabBadgeText: {
    color: '#3B82F6',
  },
  content: {
    flex: 1,
  },
  notificationsList: {
    padding: 20,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  notificationLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 18,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  unreadTitle: {
    color: '#111827',
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  settingsContainer: {
    padding: 20,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  settingsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default NotificationScreen;