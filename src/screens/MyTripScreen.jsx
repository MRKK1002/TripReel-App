import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  AlertCircle,
} from 'lucide-react-native';
import { tripBookingsAPI, reviewsAPI, SERVER_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function fmtShort(d) {
  if (!d) return '—';
  const dt = new Date(d);
  return `${dt.toLocaleDateString('en-IN', {
    month: 'short',
  })}\n${dt.getDate()}-`;
}

function fmtDateRange(start, end) {
  if (!start || !end) return '—';
  const s = new Date(start);
  const e = new Date(end);
  const sMonth = s.toLocaleDateString('en-IN', { month: 'short' });
  const eMonth = e.toLocaleDateString('en-IN', { month: 'short' });
  const year = e.getFullYear();
  if (sMonth === eMonth) {
    return `${s.getDate()} - ${e.getDate()}\n${sMonth} ${year}`;
  }
  return `${sMonth} ${s.getDate()} -\n${eMonth} ${e.getDate()}, ${year}`;
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

const resolveImage = url => {
  if (!url) return null;
  if (url.startsWith('http')) {
    if (url.includes('/uploads/')) {
      const path = url.substring(url.indexOf('/uploads/'));
      return `${SERVER_URL}${path}`;
    }
    return url;
  }
  return `${SERVER_URL}${url.startsWith('/') ? url : '/' + url}`;
};

// ── Star Rating Component ─────────────────────────────────────────────────────
const StarRating = ({ rating, onRate, size = 32 }) => (
  <View style={{ flexDirection: 'row', gap: 6 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <TouchableOpacity key={i} onPress={() => onRate(i)} hitSlop={8}>
        <Star
          size={size}
          color="#F59E0B"
          fill={i <= rating ? '#F59E0B' : 'none'}
          strokeWidth={1.5}
        />
      </TouchableOpacity>
    ))}
  </View>
);

// ── Rate Trip Modal ───────────────────────────────────────────────────────────
const RateModal = ({ booking, onClose, onSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating required', 'Please select at least 1 star.');
      return;
    }
    setSubmitting(true);
    try {
      await reviewsAPI.create({
        packageId: booking.packageId?._id || booking.packageId,
        batchId: booking.batchId?._id || booking.batchId,
        bookingId: booking._id,
        rating,
        comment: comment.trim(),
      });
      onSubmitted();
      onClose();
    } catch (err) {
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'Could not submit review.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const pkg = booking.snapshot || {};

  return (
    <Modal
      visible
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.rateBackdrop}>
          <View style={styles.rateSheet}>
            <View style={styles.rateHandle} />
            <Text style={styles.rateTitle}>How was your trip?</Text>
            <Text style={styles.rateSub}>{pkg.packageTitle}</Text>
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <StarRating rating={rating} onRate={setRating} size={40} />
              <Text style={styles.rateLabel}>
                {rating === 0
                  ? 'Tap to rate'
                  : ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][
                      rating
                    ]}
              </Text>
            </View>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Share your experience (optional)…"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              style={styles.rateInput}
              maxLength={500}
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.rateBtn, { backgroundColor: '#F1F5F9' }]}
              >
                <Text
                  style={{ color: '#475569', fontWeight: '600', fontSize: 15 }}
                >
                  Skip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={submitting || rating === 0}
                style={[
                  styles.rateBtn,
                  {
                    backgroundColor: '#1F8A70',
                    opacity: submitting || rating === 0 ? 0.6 : 1,
                  },
                ]}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text
                    style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}
                  >
                    Submit Review
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// ── Booking Card — matches design ─────────────────────────────────────────────
const BookingCard = ({ booking, onRate, onViewDetails }) => {
  const snap = booking.snapshot || {};
  const pkg = booking.packageId || {};
  const imgUrl =
    resolveImage(snap.packageImageUrl || pkg.image_url) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop';

  const startDate = snap.startDate || '';
  const endDate = snap.endDate || '';
  const days = daysUntil(startDate);
  const location = snap.packageLocation || pkg.location || '—';

  // Status
  const statusLabel =
    booking.status === 'CONFIRMED'
      ? 'Confirmed'
      : booking.status === 'COMPLETED'
      ? 'Completed'
      : booking.status === 'CANCELLED'
      ? 'Cancelled'
      : 'Pending';
  const statusColor =
    booking.status === 'CONFIRMED'
      ? '#10B981'
      : booking.status === 'COMPLETED'
      ? '#6366F1'
      : booking.status === 'CANCELLED'
      ? '#EF4444'
      : '#F59E0B';

  const showRateBtn = booking.status === 'COMPLETED' && !booking.hasReviewed;

  return (
    <View style={styles.card}>
      {/* Cover Image */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: imgUrl }}
          style={styles.cardImg}
          resizeMode="cover"
        />
        {/* Trip countdown badge */}
        {days !== null && days > 0 && booking.status === 'CONFIRMED' && (
          <View style={styles.countdownBadge}>
            <Text style={styles.countdownText}>
              Trip start in {days} day{days !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
        {days !== null && days === 0 && booking.status === 'CONFIRMED' && (
          <View style={[styles.countdownBadge, { backgroundColor: '#DCFCE7' }]}>
            <Text style={[styles.countdownText, { color: '#16A34A' }]}>
              Your trip is TODAY!
            </Text>
          </View>
        )}
        {days !== null &&
          days < 0 &&
          booking.status === 'CONFIRMED' &&
          endDate &&
          new Date() <= new Date(endDate) && (
            <View
              style={[styles.countdownBadge, { backgroundColor: '#DBEAFE' }]}
            >
              <Text style={[styles.countdownText, { color: '#2563EB' }]}>
                Day {Math.abs(days) + 1} of{' '}
                {Math.ceil(
                  (new Date(endDate) - new Date(startDate)) /
                    (1000 * 60 * 60 * 24),
                ) + 1}
              </Text>
            </View>
          )}
        {booking.status === 'COMPLETED' && (
          <View style={[styles.countdownBadge, { backgroundColor: '#EDE9FE' }]}>
            <Text style={[styles.countdownText, { color: '#6366F1' }]}>
              Trip Completed
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {snap.packageTitle || pkg.title || 'Trip'}
        </Text>
        <Text style={styles.cardLocation} numberOfLines={1}>
          {location}
        </Text>
        <Text style={[styles.statusLabel, { color: statusColor }]}>
          {statusLabel}
        </Text>

        {/* Refund badge for cancelled bookings */}
        {booking.status === 'CANCELLED' && booking.refundAmount > 0 && (
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
            {booking.refundStatus === 'REFUNDED'
              ? `Refunded ₹${Number(booking.refundAmount).toLocaleString(
                  'en-IN',
                )} ✓`
              : booking.refundStatus === 'FAILED'
              ? 'Refund failed — contact support'
              : `Refund ₹${Number(booking.refundAmount).toLocaleString(
                  'en-IN',
                )} processing`}
          </Text>
        )}

        {/* Date + Location row */}
        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.infoDate}>
              {fmtDateRange(startDate, endDate)}
            </Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={[styles.infoCol, { flex: 1.5 }]}>
            <Text style={styles.infoLocation} numberOfLines={2}>
              {location}
            </Text>
          </View>
        </View>

        {/* Booking ID + Trip Type */}
        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Booking ID</Text>
            <Text style={styles.infoValue}>{booking.bookingId || '—'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Trip Type</Text>
            <Text style={styles.infoValue}>Package</Text>
          </View>
        </View>

        {/* View Details */}
        <TouchableOpacity
          style={styles.viewDetailsBtn}
          onPress={() => onViewDetails(booking)}
          activeOpacity={0.7}
        >
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>

        {/* Rate trip button */}
        {showRateBtn && (
          <TouchableOpacity
            onPress={() => onRate(booking)}
            style={styles.ratePrompt}
            activeOpacity={0.85}
          >
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratePromptText}>Rate your experience</Text>
            <ChevronRight size={14} color="#F59E0B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function MyTripScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ratingBooking, setRatingBooking] = useState(null);
  const [filter, setFilter] = useState('all'); // all | upcoming | completed | cancelled
  const [visibleCount, setVisibleCount] = useState(10); // infinite-scroll page size

  const fetchBookings = useCallback(async () => {
    try {
      const res = await tripBookingsAPI.getMy();
      const data = res.data?.bookings || [];
      setBookings(data);
      AsyncStorage.setItem('@cache_my_bookings', JSON.stringify(data)).catch(
        () => {},
      );
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load cached bookings instantly on mount
  useEffect(() => {
    AsyncStorage.getItem('@cache_my_bookings')
      .then(raw => {
        if (raw && loading) {
          try {
            const cached = JSON.parse(raw);
            if (cached?.length) {
              setBookings(cached);
              setLoading(false);
            }
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBookings();
    }, [fetchBookings]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  // Classify a booking into one of the three tab buckets
  const bucketOf = b => {
    if (b.status === 'CANCELLED') return 'cancelled';
    if (b.status === 'COMPLETED') return 'completed';
    return 'upcoming'; // CONFIRMED + PENDING
  };

  // Sort + filter: nearest upcoming trip first by default
  const visibleBookings = useMemo(() => {
    const now = Date.now();

    // Filter by selected tab
    const filtered =
      filter === 'all'
        ? bookings
        : bookings.filter(b => bucketOf(b) === filter);

    const startMs = b =>
      b.snapshot?.startDate ? new Date(b.snapshot.startDate).getTime() : 0;
    const recentMs = b =>
      new Date(
        b.cancelledAt || b.snapshot?.endDate || b.updatedAt || 0,
      ).getTime();

    // Order: active (upcoming/ongoing) first by nearest start date,
    // then completed (most recent first), then cancelled (most recent first)
    const rank = b => {
      const bucket = bucketOf(b);
      if (bucket === 'upcoming') return 0;
      if (bucket === 'completed') return 1;
      return 2;
    };

    return [...filtered].sort((a, b) => {
      const ra = rank(a);
      const rb = rank(b);
      if (ra !== rb) return ra - rb;
      if (ra === 0) {
        // nearest upcoming start date first (past-but-not-ended still ranked by start)
        return startMs(a) - startMs(b);
      }
      // completed / cancelled → most recent first
      return recentMs(b) - recentMs(a);
    });
  }, [bookings, filter]);

  const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  // Reset infinite-scroll back to the first page whenever the filter changes
  useEffect(() => {
    setVisibleCount(10);
  }, [filter]);

  const pagedBookings = visibleBookings.slice(0, visibleCount);
  const hasMore = visibleCount < visibleBookings.length;

  const loadMore = () => {
    if (hasMore) setVisibleCount(c => c + 10);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
      </View>

      {/* Filter tabs */}
      {!loading && bookings.length > 0 && (
        <View style={styles.filterRow}>
          {FILTERS.map(f => {
            const active = filter === f.key;
            const count =
              f.key === 'all'
                ? bookings.length
                : bookings.filter(b => bucketOf(b) === f.key).length;
            return (
              <TouchableOpacity
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[styles.filterChip, active && styles.filterChipActive]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    active && styles.filterChipTextActive,
                  ]}
                >
                  {f.label}
                  {count > 0 ? ` (${count})` : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1F8A70" />
        </View>
      ) : bookings.length === 0 ? (
        <ScrollView
          contentContainerStyle={styles.center}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#1F8A70']}
            />
          }
        >
          <Calendar size={48} color="#CBD5E1" strokeWidth={1.5} />
          <Text style={styles.emptyTitle}>No trips yet</Text>
          <Text style={styles.emptySub}>
            Book a package to see your trips here
          </Text>
        </ScrollView>
      ) : (
        <FlatList
          data={pagedBookings}
          keyExtractor={b => b._id}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#1F8A70']}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <BookingCard
              booking={item}
              onRate={setRatingBooking}
              onViewDetails={booking =>
                navigation.navigate('BookingDetails', { booking })
              }
            />
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingTop: 60, gap: 8 }}>
              <Calendar size={40} color="#CBD5E1" strokeWidth={1.5} />
              <Text style={styles.emptyTitle}>
                No {filter !== 'all' ? filter : ''} trips
              </Text>
            </View>
          }
          ListFooterComponent={
            hasMore ? (
              <View style={{ paddingVertical: 16, alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#1F8A70" />
              </View>
            ) : (
              <View style={{ height: 20 }} />
            )
          }
        />
      )}

      {ratingBooking && (
        <RateModal
          booking={ratingBooking}
          onClose={() => setRatingBooking(null)}
          onSubmitted={fetchBookings}
        />
      )}
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  filterChipActive: { backgroundColor: '#1F8A70' },
  filterChipText: { fontSize: 12, fontWeight: '600', color: '#475569' },
  filterChipTextActive: { color: '#fff' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  emptySub: { fontSize: 13, color: '#94A3B8', textAlign: 'center' },
  // Card
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  cardImg: { width: '100%', height: 150 },
  countdownBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#E6F4EF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  countdownText: { fontSize: 12, fontWeight: '600', color: '#1F8A70' },
  cardBody: { padding: 14 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  cardLocation: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  statusLabel: { fontSize: 13, fontWeight: '600', marginTop: 4 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  infoCol: { flex: 1 },
  infoDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  infoDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 20,
  },
  infoLocation: { fontSize: 13, color: '#374151', lineHeight: 18 },
  infoLabel: { fontSize: 11, color: '#9CA3AF', marginBottom: 2 },
  infoValue: { fontSize: 13, fontWeight: '600', color: '#111827' },
  viewDetailsBtn: {
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textDecorationLine: 'underline',
  },
  ratePrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF9C3',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  ratePromptText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#92400E',
  },
  // Rate modal
  rateBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.5)',
    justifyContent: 'flex-end',
  },
  rateSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  rateHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  rateTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  rateSub: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginTop: 4,
  },
  rateLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 8,
    fontWeight: '500',
  },
  rateInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  rateBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
});
