import React, { useState, useCallback } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  Calendar,
  MapPin,
  Users,
  Star,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react-native';
import { tripBookingsAPI, reviewsAPI, SERVER_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function fmtMoney(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`;
}

const resolveImage = url => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url}`;
};

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  PENDING: {
    label: 'Awaiting Confirmation',
    color: '#F59E0B',
    bg: '#FEF3C7',
    icon: Clock,
  },
  CONFIRMED: {
    label: 'Confirmed ✓',
    color: '#10B981',
    bg: '#D1FAE5',
    icon: CheckCircle,
  },
  COMPLETED: {
    label: 'Trip Completed',
    color: '#6366F1',
    bg: '#EDE9FE',
    icon: CheckCircle,
  },
  CANCELLED: {
    label: 'Cancelled',
    color: '#EF4444',
    bg: '#FEE2E2',
    icon: XCircle,
  },
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
      <View style={styles.rateBackdrop}>
        <View style={styles.rateSheet}>
          <View style={styles.rateHandle} />

          <Text style={styles.rateTitle}>How was your trip?</Text>
          <Text style={styles.rateSub}>{pkg.packageTitle}</Text>
          <Text style={styles.rateDates}>
            {fmt(pkg.startDate)} – {fmt(pkg.endDate)}
          </Text>

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
    </Modal>
  );
};

// ── Booking Card ──────────────────────────────────────────────────────────────
const BookingCard = ({ booking, onRate }) => {
  const cfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.PENDING;
  const StatusIcon = cfg.icon;
  const snap = booking.snapshot || {};
  const pkg = booking.packageId || {};
  const imgUrl =
    resolveImage(snap.packageImageUrl || pkg.image_url) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop';

  const showRateBtn = booking.status === 'COMPLETED' && !booking.hasReviewed;

  return (
    <View style={styles.card}>
      {/* Image */}
      <Image
        source={{ uri: imgUrl }}
        style={styles.cardImg}
        resizeMode="cover"
      />

      {/* Status badge */}
      <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
        <StatusIcon size={12} color={cfg.color} strokeWidth={2.5} />
        <Text style={[styles.statusText, { color: cfg.color }]}>
          {cfg.label}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {snap.packageTitle || pkg.title || 'Trip'}
        </Text>

        <View style={styles.cardRow}>
          <MapPin size={13} color="#94A3B8" />
          <Text style={styles.cardMeta} numberOfLines={1}>
            {snap.packageLocation || pkg.location || '—'}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Calendar size={13} color="#94A3B8" />
          <Text style={styles.cardMeta}>
            {fmt(snap.startDate)} – {fmt(snap.endDate)}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Users size={13} color="#94A3B8" />
          <Text style={styles.cardMeta}>
            {booking.seats} seat{booking.seats !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Pricing */}
        <View style={styles.priceRow}>
          <Text style={styles.bookingId}>{booking.bookingId}</Text>
          <Text style={styles.priceText}>
            {fmtMoney(booking.pricing?.totalAmount)}
          </Text>
        </View>

        {/* Cancellation reason */}
        {booking.status === 'CANCELLED' && booking.cancelReason && (
          <View style={styles.cancelNote}>
            <AlertCircle size={12} color="#EF4444" />
            <Text style={styles.cancelText}>{booking.cancelReason}</Text>
          </View>
        )}

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
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ratingBooking, setRatingBooking] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchBookings = useCallback(async () => {
    try {
      const res = await tripBookingsAPI.getMy();
      setBookings(res.data?.bookings || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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

  const filters = ['all', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  const filtered =
    activeFilter === 'all'
      ? bookings
      : bookings.filter(b => b.status === activeFilter);

  const pendingRatingCount = bookings.filter(
    b => b.status === 'COMPLETED' && !b.hasReviewed,
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
        {pendingRatingCount > 0 && (
          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingBadgeText}>
              {pendingRatingCount} to rate
            </Text>
          </View>
        )}
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setActiveFilter(f)}
            style={[
              styles.filterChip,
              activeFilter === f && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === f && styles.filterChipTextActive,
              ]}
            >
              {f === 'all' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1F8A70" />
        </View>
      ) : filtered.length === 0 ? (
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
          <Text style={styles.emptyTitle}>
            {activeFilter === 'all'
              ? 'No trips yet'
              : `No ${activeFilter.toLowerCase()} trips`}
          </Text>
          <Text style={styles.emptySub}>
            Book a package to see your trips here
          </Text>
        </ScrollView>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, gap: 14 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#1F8A70']}
            />
          }
        >
          {filtered.map(b => (
            <BookingCard key={b._id} booking={b} onRate={setRatingBooking} />
          ))}
          <View style={{ height: 20 }} />
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#111827' },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  ratingBadgeText: { fontSize: 12, fontWeight: '600', color: '#92400E' },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  filterChipActive: {
    backgroundColor: '#1F8A70',
    borderColor: '#1F8A70',
  },
  filterChipText: { fontSize: 13, fontWeight: '500', color: '#64748B' },
  filterChipTextActive: { color: '#fff', fontWeight: '600' },
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
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImg: { width: '100%', height: 140 },
  statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: { fontSize: 11, fontWeight: '700' },
  cardBody: { padding: 14, gap: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cardMeta: { fontSize: 13, color: '#64748B', flex: 1 },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  bookingId: { fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' },
  priceText: { fontSize: 15, fontWeight: '700', color: '#1F8A70' },
  cancelNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FEF2F2',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  cancelText: { fontSize: 12, color: '#EF4444', flex: 1 },
  ratePrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF9C3',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
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
  rateDates: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 2,
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
