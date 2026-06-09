import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Linking,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  Calendar,
  Users,
  Star,
  CheckCircle,
  MapPin,
  AlertTriangle,
  X,
} from 'lucide-react-native';
import { SERVER_URL, tripBookingsAPI } from '../services/api';

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

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function fmtDateRange(start, end) {
  if (!start || !end) return '—';
  const s = new Date(start);
  const e = new Date(end);
  const sDay = s.getDate();
  const eDay = e.getDate();
  const sMonth = s.toLocaleDateString('en-IN', { month: 'short' });
  const eMonth = e.toLocaleDateString('en-IN', { month: 'short' });
  const year = e.getFullYear();
  if (sMonth === eMonth) return `${sDay}-${eDay} ${sMonth} ${year}`;
  return `${sDay} ${sMonth} - ${eDay} ${eMonth} ${year}`;
}

function fmtMoney(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`;
}

// ── Track Step ────────────────────────────────────────────────────────────────
const TrackStep = ({ label, sublabel, status, date, isLast }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (status === 'inprogress') {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, []);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ alignItems: 'center', width: 32 }}>
        {status === 'inprogress' ? (
          <Animated.View style={{ transform: [{ rotate }] }}>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2.5,
                borderColor: '#F59E0B',
                borderTopColor: 'transparent',
              }}
            />
          </Animated.View>
        ) : (
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: '#1F8A70',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>
              ✓
            </Text>
          </View>
        )}
        {!isLast && (
          <View
            style={{
              width: 2,
              flex: 1,
              backgroundColor: '#D1FAE5',
              marginVertical: 3,
              minHeight: 24,
            }}
          />
        )}
      </View>
      <View
        style={{ flex: 1, paddingLeft: 12, paddingBottom: isLast ? 0 : 20 }}
      >
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>
          {label}
        </Text>
        {sublabel && (
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
            {sublabel}
          </Text>
        )}
        <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
          {date}
        </Text>
      </View>
    </View>
  );
};

// ── Main Screen ───────────────────────────────────────────────────────────────
const BookingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const booking = route.params?.booking;

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [refundPreview, setRefundPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const CANCEL_REASONS = [
    'Plans changed',
    'Found a better option',
    'Emergency / health issue',
    'Weather concerns',
    'Other',
  ];
  const [selectedReason, setSelectedReason] = useState('');

  const handleCancelPress = async () => {
    setShowCancelModal(true);
    setPreviewLoading(true);
    try {
      const res = await tripBookingsAPI.getRefundPreview(booking._id);
      setRefundPreview(res.data);
    } catch {
      setRefundPreview({
        refundPercent: 0,
        refundAmount: 0,
        totalPaid: booking.pricing?.totalAmount || 0,
        daysBeforeTrip: 0,
      });
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!selectedReason) return;
    setCancelLoading(true);
    try {
      await tripBookingsAPI.cancel(booking._id, { reason: selectedReason });
      setShowCancelModal(false);
      navigation.goBack();
    } catch (err) {
      setCancelLoading(false);
    }
  };

  if (!booking) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#6B7280' }}>No booking data</Text>
      </SafeAreaView>
    );
  }

  const snap = booking.snapshot || {};
  const pkg = booking.packageId || {};
  const imgUrl =
    resolveImage(snap.packageImageUrl || pkg.image_url) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop';

  const title = snap.packageTitle || pkg.title || 'Trip';
  const location = snap.packageLocation || pkg.location || '—';
  const dateLabel = fmtDateRange(snap.startDate, snap.endDate);
  const price = fmtMoney(snap.adultPrice || pkg.pricing?.adultPrice || 0);

  // Guest summary
  const travelers = booking.travelers || [];
  const adultCount =
    travelers.filter(t => (t.age || 99) > 7).length || booking.seats || 0;
  const childCount = travelers.filter(t => (t.age || 99) <= 7).length;
  const guestLabel = `${adultCount} adult${adultCount !== 1 ? 's' : ''}${
    childCount > 0 ? `, ${childCount} child` : ''
  }`;

  // Build tracking steps from booking status
  const createdAt = booking.createdAt
    ? new Date(booking.createdAt).toLocaleDateString('en-IN', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const trackingSteps = [
    {
      label: 'Booking Confirmed',
      sublabel: `Booking ID ${booking.bookingId} Submitted`,
      status: 'done',
      date: createdAt,
    },
    {
      label: 'Notified tour operator',
      sublabel: 'Operator has been notified',
      status: 'done',
      date: createdAt,
    },
    {
      label: 'Tour operator',
      sublabel: 'Tour Operator accepted booking',
      status:
        booking.status === 'CONFIRMED' ||
        booking.status === 'COMPLETED' ||
        booking.status === 'CANCELLED'
          ? 'done'
          : 'inprogress',
      date: createdAt,
    },
  ];

  if (booking.status === 'COMPLETED') {
    trackingSteps.push({
      label: 'Trip Completed',
      sublabel: 'Your trip has been completed successfully',
      status: 'done',
      date: fmtDate(snap.endDate),
    });
  }

  if (booking.status === 'CANCELLED') {
    trackingSteps.push({
      label: 'Booking Cancelled',
      sublabel: booking.cancelReason || 'This booking was cancelled',
      status: 'done',
      date: '',
    });
  }

  // Reverse so latest is on top
  const reversedSteps = [...trackingSteps].reverse();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: '700',
            color: '#111827',
            textAlign: 'center',
          }}
        >
          Booking Details
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* Package Details */}
        <View style={cardStyle}>
          <Text style={sectionLabel}>Package Details</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 14,
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#F3F4F6',
            }}
          >
            <Image
              source={{ uri: imgUrl }}
              style={{
                width: 72,
                height: 60,
                borderRadius: 10,
                marginRight: 12,
              }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: 4,
                }}
              >
                {title}
              </Text>
              {(pkg.avgRating || 0) > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}
                >
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#111827',
                      marginLeft: 4,
                    }}
                  >
                    {pkg.avgRating}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}
                  >
                    {pkg.reviewCount ? `${pkg.reviewCount} reviews` : ''} • From{' '}
                    {price}
                  </Text>
                </View>
              )}
              {!(pkg.avgRating > 0) && (
                <Text style={{ fontSize: 12, color: '#6B7280' }}>
                  From {price}
                </Text>
              )}
            </View>
          </View>

          {/* Date row */}
          <View style={detailRow}>
            <View style={iconBox}>
              <Calendar size={16} color="#475569" />
            </View>
            <View>
              <Text style={detailValue}>{dateLabel}</Text>
              <Text style={detailLabel}>Dates</Text>
            </View>
          </View>

          {/* Guests row */}
          <View style={[detailRow, { borderBottomWidth: 0 }]}>
            <View style={iconBox}>
              <Users size={16} color="#475569" />
            </View>
            <View>
              <Text style={detailValue}>{guestLabel}</Text>
              <Text style={detailLabel}>Guests</Text>
            </View>
          </View>
        </View>

        {/* Traveler Details */}
        {travelers.length > 0 && (
          <View style={[cardStyle, { marginTop: 12 }]}>
            <Text style={sectionLabel}>Traveler Details</Text>
            {travelers.map((t, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderBottomWidth: i < travelers.length - 1 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#E6F4EF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: '#1F8A70',
                    }}
                  >
                    {i + 1}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: '#111827',
                    }}
                  >
                    {t.name}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
                    {t.gender}
                    {t.age ? ` • Age ${t.age}` : ''}
                    {(t.age || 99) <= 7 ? ' (Child)' : ''}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Price Breakdown */}
        <View style={[cardStyle, { marginTop: 12 }]}>
          <Text style={sectionLabel}>Price Breakdown</Text>
          <View style={priceRow}>
            <Text style={priceLabel}>Adults ({adultCount})</Text>
            <Text style={priceVal}>
              {fmtMoney((snap.adultPrice || 0) * adultCount)}
            </Text>
          </View>
          {childCount > 0 && (
            <View style={priceRow}>
              <Text style={priceLabel}>Children ({childCount})</Text>
              <Text style={priceVal}>
                {fmtMoney((snap.childPrice || 0) * childCount)}
              </Text>
            </View>
          )}
          {booking.pricing?.gstAmount > 0 && (
            <View style={priceRow}>
              <Text style={priceLabel}>
                GST ({booking.pricing.gstPercent || 5}%)
              </Text>
              <Text style={priceVal}>
                {fmtMoney(booking.pricing.gstAmount)}
              </Text>
            </View>
          )}
          {(booking.pricing?.discount > 0 ||
            booking.pricing?.discountAmount > 0) && (
            <View style={priceRow}>
              <Text style={[priceLabel, { color: '#10B981' }]}>Discount</Text>
              <Text style={[priceVal, { color: '#10B981' }]}>
                -
                {fmtMoney(
                  booking.pricing.discount || booking.pricing.discountAmount,
                )}
              </Text>
            </View>
          )}
          {booking.pricing?.couponCode ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F0FDF9',
                borderRadius: 8,
                padding: 8,
                marginTop: 4,
                marginBottom: 6,
              }}
            >
              <View
                style={{
                  backgroundColor: '#1F8A70',
                  borderRadius: 4,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{ fontSize: 11, fontWeight: '700', color: '#fff' }}
                >
                  COUPON
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#1F8A70',
                  flex: 1,
                }}
              >
                {booking.pricing.couponCode}
              </Text>
              <Text
                style={{ fontSize: 12, color: '#10B981', fontWeight: '600' }}
              >
                -
                {fmtMoney(
                  booking.pricing.discountAmount ||
                    booking.pricing.discount ||
                    0,
                )}{' '}
                off
              </Text>
            </View>
          ) : null}
          <View
            style={[
              priceRow,
              {
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
                paddingTop: 10,
                marginTop: 6,
              },
            ]}
          >
            <Text style={[priceLabel, { fontWeight: '700', color: '#111827' }]}>
              Total
            </Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#1F8A70' }}>
              {fmtMoney(booking.pricing?.totalAmount)}
            </Text>
          </View>
        </View>

        {/* Track Booking */}
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 16,
            }}
          >
            Track booking
          </Text>
          {reversedSteps.map((step, i) => (
            <TrackStep
              key={i}
              label={step.label}
              sublabel={step.sublabel}
              status={step.status}
              date={step.date}
              isLast={i === reversedSteps.length - 1}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
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
          paddingVertical: 14,
          paddingBottom: 28,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            const dest = pkg._id ? pkg : { _id: booking.packageId };
            navigation.navigate('DestinationDetail', { destination: dest });
          }}
          style={bottomBtn}
        >
          <Text style={bottomBtnText}>Package</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ReportIssue', {
              bookingId: booking._id,
              packageId: booking.packageId?._id || booking.packageId,
              operatorId: booking.operatorId,
            })
          }
          style={bottomBtn}
        >
          <Text style={bottomBtnText}>Need Help?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[bottomBtn, { backgroundColor: '#FEF2F2' }]}
          onPress={handleCancelPress}
          disabled={
            booking.status === 'CANCELLED' || booking.status === 'COMPLETED'
          }
        >
          <Text
            style={[
              bottomBtnText,
              {
                color:
                  booking.status === 'CANCELLED' ||
                  booking.status === 'COMPLETED'
                    ? '#D1D5DB'
                    : '#EF4444',
              },
            ]}
          >
            Cancel Booking
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cancel Confirmation Modal */}
      <Modal
        visible={showCancelModal}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowCancelModal(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(15,23,42,0.5)',
            justifyContent: 'flex-end',
          }}
          onPress={() => setShowCancelModal(false)}
        >
          <Pressable
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 22,
              paddingBottom: 36,
            }}
            onPress={() => {}}
          >
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#E2E8F0',
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 18,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
              }}
            >
              <AlertTriangle size={22} color="#EF4444" />
              <Text
                style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}
              >
                Cancel Booking?
              </Text>
            </View>

            {previewLoading ? (
              <ActivityIndicator
                size="small"
                color="#1F8A70"
                style={{ marginVertical: 20 }}
              />
            ) : refundPreview ? (
              <View
                style={{
                  backgroundColor: '#FEF2F2',
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}
                >
                  Trip starts in{' '}
                  <Text style={{ fontWeight: '700' }}>
                    {refundPreview.daysBeforeTrip} days
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: 4,
                  }}
                >
                  Refund: {refundPreview.refundPercent}% → ₹
                  {Number(refundPreview.refundAmount).toLocaleString('en-IN')}
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>
                  of ₹{Number(refundPreview.totalPaid).toLocaleString('en-IN')}{' '}
                  paid
                </Text>
                {refundPreview.refundPercent === 0 && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#EF4444',
                      fontWeight: '600',
                      marginTop: 6,
                    }}
                  >
                    No refund — less than 3 days before departure
                  </Text>
                )}
              </View>
            ) : null}

            {/* Reason selection */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#111827',
                marginBottom: 10,
              }}
            >
              Select a reason
            </Text>
            <View style={{ gap: 8, marginBottom: 20 }}>
              {CANCEL_REASONS.map(r => (
                <TouchableOpacity
                  key={r}
                  onPress={() => setSelectedReason(r)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor: selectedReason === r ? '#EF4444' : '#E5E7EB',
                    backgroundColor:
                      selectedReason === r ? '#FEF2F2' : '#F9FAFB',
                  }}
                >
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 2,
                      borderColor: selectedReason === r ? '#EF4444' : '#D1D5DB',
                      backgroundColor:
                        selectedReason === r ? '#EF4444' : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}
                  >
                    {selectedReason === r && (
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: '#fff',
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#374151',
                      fontWeight: '500',
                    }}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Actions */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => setShowCancelModal(false)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: '#F1F5F9',
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: '600', color: '#475569' }}
                >
                  Keep Booking
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmCancel}
                disabled={!selectedReason || cancelLoading}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: '#EF4444',
                  opacity: !selectedReason || cancelLoading ? 0.5 : 1,
                }}
              >
                {cancelLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text
                    style={{ fontSize: 15, fontWeight: '700', color: '#fff' }}
                  >
                    Confirm Cancel
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

// ── Inline styles ─────────────────────────────────────────────────────────────
const cardStyle = {
  backgroundColor: '#F8FAFC',
  borderRadius: 14,
  padding: 14,
  borderWidth: 1,
  borderColor: '#E5E7EB',
};
const sectionLabel = {
  fontSize: 12,
  color: '#9CA3AF',
  fontWeight: '600',
  marginBottom: 12,
};
const detailRow = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#F3F4F6',
};
const iconBox = {
  width: 34,
  height: 34,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
};
const detailValue = { fontSize: 14, fontWeight: '600', color: '#111827' };
const detailLabel = { fontSize: 12, color: '#9CA3AF', marginTop: 2 };
const priceRow = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 6,
};
const priceLabel = { fontSize: 13, color: '#6B7280' };
const priceVal = { fontSize: 13, fontWeight: '600', color: '#111827' };
const bottomBtn = {
  flex: 1,
  alignItems: 'center',
  paddingVertical: 10,
  borderRadius: 10,
};
const bottomBtnText = { fontSize: 13, fontWeight: '600', color: '#111827' };

export default BookingDetailsScreen;
