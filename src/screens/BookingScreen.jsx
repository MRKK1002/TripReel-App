import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  Check,
  Calendar,
  Users,
  Wallet,
  Tag,
  MapPin,
} from 'lucide-react-native';
import {
  tripBookingsAPI,
  couponsAPI,
  settingsAPI,
  SERVER_URL,
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import './../../android/app/src/utils/globalFont.js';

const resolveUrl = url => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url.startsWith('/') ? url : '/' + url}`;
};

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const { destination, selectedBatch, batchId } = route.params || {};

  // ── State ──────────────────────────────────────────────────────────────────
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCouponDesc, setAppliedCouponDesc] = useState('');
  const [gstPercent, setGstPercent] = useState(5);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [booking, setBooking] = useState(false);

  // Fetch GST from settings
  useEffect(() => {
    settingsAPI
      .getPublic()
      .then(res => {
        setGstPercent(res.data?.gst_percent ?? 5);
      })
      .catch(() => {});
  }, []);

  // ── Pricing calculations ───────────────────────────────────────────────────
  const adultPrice = selectedBatch?.adultPrice || destination?.price || 0;
  const childPrice = selectedBatch?.childPrice || 0;
  const totalSeats = adults + children;

  const adultSubtotal = adultPrice * adults;
  const childSubtotal = childPrice * children;
  const subtotal = adultSubtotal + childSubtotal;
  const gstAmount = Math.round((subtotal * gstPercent) / 100);
  const totalAmount = subtotal + gstAmount - discountAmount;

  const seatsLeft = selectedBatch
    ? (selectedBatch.totalSeats || 0) - (selectedBatch.bookedSeats || 0)
    : 99;

  // ── Apply coupon via API ─────────────────────────────────────────────────────
  const fetchAvailableCoupons = async () => {
    if (!batchId) return;
    setCouponsLoading(true);
    try {
      const res = await couponsAPI.getForBatch(batchId);
      setAvailableCoupons(res.data?.coupons || []);
    } catch {
      setAvailableCoupons([]);
    } finally {
      setCouponsLoading(false);
    }
  };

  const handleApplyCoupon = async code => {
    if (!code?.trim()) return;
    try {
      const res = await couponsAPI.validate({
        batchId,
        code: code.trim(),
        guests: totalSeats,
        subtotal,
      });
      if (res.data.success) {
        setCouponCode(code.trim().toUpperCase());
        setDiscountAmount(res.data.discountAmount);
        setCouponApplied(true);
        setAppliedCouponDesc(
          res.data.coupon?.description ||
            `${res.data.coupon?.value}${
              res.data.coupon?.type === 'percentage' ? '%' : '₹'
            } off`,
        );
        setShowCouponModal(false);
      }
    } catch (err) {
      Alert.alert(
        'Coupon Error',
        err?.response?.data?.message || 'Invalid coupon',
      );
    }
  };

  const removeCoupon = () => {
    setDiscountAmount(0);
    setCouponApplied(false);
    setCouponCode('');
    setAppliedCouponDesc('');
  };

  // ── Confirm booking ────────────────────────────────────────────────────────
  const handleConfirmBooking = async () => {
    if (!batchId) {
      Alert.alert(
        'No Batch Selected',
        'Please go back and select a departure date.',
      );
      return;
    }
    if (totalSeats > seatsLeft) {
      Alert.alert('Not Enough Seats', `Only ${seatsLeft} seats available.`);
      return;
    }

    setBooking(true);
    try {
      await tripBookingsAPI.create({
        packageId: destination._id,
        batchId,
        seats: totalSeats,
        travelerNames: [user?.name || ''],
        couponCode: couponApplied ? couponCode : '',
      });
      Alert.alert(
        'Booking Confirmed! ✓',
        'Your booking is pending operator confirmation. Check "My Trips" for updates.',
        [
          {
            text: 'Go to My Trips',
            onPress: () => navigation.navigate('Main', { screen: 'MyTrip' }),
          },
        ],
      );
    } catch (err) {
      Alert.alert(
        'Booking Failed',
        err?.response?.data?.message || 'Please try again.',
      );
    } finally {
      setBooking(false);
    }
  };

  // ── Date display ───────────────────────────────────────────────────────────
  const fmt = d => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  const dateLabel = selectedBatch
    ? `${fmt(selectedBatch.startDate)} - ${fmt(selectedBatch.endDate)}`
    : 'No date selected';

  const guestLabel = `${adults} adult${adults > 1 ? 's' : ''}${
    children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''
  }`;

  const imageUrl =
    resolveUrl(destination?.image_url) ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop';

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            color: '#111827',
            textAlign: 'center',
          }}
        >
          Confirm Booking
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      >
        {/* Package card */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 12,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 72, height: 64, borderRadius: 10, marginRight: 12 }}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
              numberOfLines={1}
            >
              {destination?.title || 'Package'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <MapPin size={12} color="#9CA3AF" />
              <Text
                style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}
                numberOfLines={1}
              >
                {destination?.location || ''}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <Star size={12} color="#4CAF50" fill="#4CAF50" />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#111827',
                  marginLeft: 3,
                }}
              >
                {destination?.avgRating || destination?.rating || 4.5}
              </Text>
              <Text style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 4 }}>
                • {destination?.reviewCount || 0} reviews
              </Text>
            </View>
          </View>
        </View>

        {/* Dates */}
        <View style={cardStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={iconBox}>
              <Calendar size={18} color="#6B7280" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}
              >
                {dateLabel}
              </Text>
              <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                Travel Dates
              </Text>
            </View>
          </View>
        </View>

        {/* Guests — tappable */}
        <TouchableOpacity
          style={cardStyle}
          onPress={() => setShowGuestModal(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={iconBox}>
              <Users size={18} color="#6B7280" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}
              >
                {guestLabel}
              </Text>
              <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                Guests
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#E6F4EF',
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 8,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: '600', color: '#374151' }}
              >
                Change
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Price summary — tappable */}
        <TouchableOpacity
          style={cardStyle}
          onPress={() => setShowPriceModal(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={iconBox}>
              <Wallet size={18} color="#6B7280" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}
              >
                ₹{totalAmount.toLocaleString('en-IN')}
              </Text>
              <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                Total Price (incl. GST)
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#E6F4EF',
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 8,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: '600', color: '#374151' }}
              >
                Details
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Seats warning */}
        {seatsLeft <= 10 && seatsLeft > 0 && (
          <View
            style={{
              backgroundColor: '#FEF3C7',
              borderRadius: 10,
              padding: 10,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#92400E',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              ⚡ Only {seatsLeft} seats left for this batch!
            </Text>
          </View>
        )}

        {/* Apply Discount — tappable row like design */}
        <TouchableOpacity
          onPress={() => {
            fetchAvailableCoupons();
            setShowCouponModal(true);
          }}
          style={{
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 14,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={iconBox}>
            <Tag size={18} color="#6B7280" />
          </View>
          <View style={{ flex: 1 }}>
            {couponApplied ? (
              <>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#065F46' }}
                >
                  {couponCode} applied
                </Text>
                <Text style={{ fontSize: 11, color: '#10B981', marginTop: 2 }}>
                  {appliedCouponDesc} — ₹
                  {discountAmount.toLocaleString('en-IN')} off
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}
                >
                  Apply Discounts
                </Text>
                <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                  Bank Offers & Coupons
                </Text>
              </>
            )}
          </View>
          {couponApplied ? (
            <TouchableOpacity onPress={removeCoupon} hitSlop={8}>
              <Text
                style={{ fontSize: 12, color: '#EF4444', fontWeight: '600' }}
              >
                Remove
              </Text>
            </TouchableOpacity>
          ) : (
            <ChevronRight size={18} color="#9CA3AF" />
          )}
        </TouchableOpacity>

        {/* Policies */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 14,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 10,
            }}
          >
            Cancellation Policy
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 6,
            }}
          >
            <Check size={14} color="#1F8A70" style={{ marginTop: 2 }} />
            <Text
              style={{ marginLeft: 8, fontSize: 13, color: '#374151', flex: 1 }}
            >
              {destination?.policies?.cancellationPolicy ||
                'Free cancellation up to 7 days before departure'}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#111827',
              marginTop: 12,
              marginBottom: 10,
            }}
          >
            Payment Policy
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 6,
            }}
          >
            <Check size={14} color="#1F8A70" style={{ marginTop: 2 }} />
            <Text
              style={{ marginLeft: 8, fontSize: 13, color: '#374151', flex: 1 }}
            >
              Booking is confirmed once operator approves. No payment collected
              now.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          padding: 16,
          paddingBottom: 28,
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
        }}
      >
        <TouchableOpacity
          onPress={handleConfirmBooking}
          disabled={booking}
          style={{
            backgroundColor: booking ? '#94A3B8' : '#1F8A70',
            borderRadius: 14,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
          }}
        >
          {booking ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
              Confirm Booking — ₹{totalAmount.toLocaleString('en-IN')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Guest Modal ──────────────────────────────────────────────────────── */}
      <Modal visible={showGuestModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 24,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 20,
              }}
            >
              Select Guests
            </Text>
            <GuestCounter
              label="Adults"
              sublabel={`₹${adultPrice.toLocaleString('en-IN')}/person`}
              value={adults}
              min={1}
              max={seatsLeft}
              onChange={setAdults}
            />
            <GuestCounter
              label="Children"
              sublabel={
                childPrice > 0
                  ? `₹${childPrice.toLocaleString('en-IN')}/person`
                  : 'Free'
              }
              value={children}
              min={0}
              max={Math.max(0, seatsLeft - adults)}
              onChange={setChildren}
            />
            <TouchableOpacity
              onPress={() => setShowGuestModal(false)}
              style={{
                backgroundColor: '#1F8A70',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Price Details Modal ───────────────────────────────────────────────── */}
      <Modal visible={showPriceModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 24,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 16,
              }}
            >
              Price Breakdown
            </Text>
            <PriceRow
              label={`Adults (${adults} × ₹${adultPrice.toLocaleString(
                'en-IN',
              )})`}
              value={`₹${adultSubtotal.toLocaleString('en-IN')}`}
            />
            {children > 0 && (
              <PriceRow
                label={`Children (${children} × ₹${childPrice.toLocaleString(
                  'en-IN',
                )})`}
                value={`₹${childSubtotal.toLocaleString('en-IN')}`}
              />
            )}
            <PriceRow
              label={`GST (${gstPercent}%)`}
              value={`₹${gstAmount.toLocaleString('en-IN')}`}
            />
            {discountAmount > 0 && (
              <PriceRow
                label={`Coupon (${couponCode})`}
                value={`-₹${discountAmount.toLocaleString('en-IN')}`}
                green
              />
            )}
            <View
              style={{
                height: 1,
                backgroundColor: '#F3F4F6',
                marginVertical: 12,
              }}
            />
            <PriceRow
              label="Total Amount"
              value={`₹${totalAmount.toLocaleString('en-IN')}`}
              bold
            />
            <TouchableOpacity
              onPress={() => setShowPriceModal(false)}
              style={{
                backgroundColor: '#1F8A70',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Coupon Selection Modal ─────────────────────────────────────────── */}
      <Modal visible={showCouponModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 24,
              maxHeight: '70%',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 16,
              }}
            >
              Available Coupons
            </Text>

            {couponsLoading ? (
              <ActivityIndicator
                color="#1F8A70"
                style={{ marginVertical: 24 }}
              />
            ) : availableCoupons.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 24 }}>
                <Tag size={32} color="#D1D5DB" />
                <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 10 }}>
                  No coupons available for this batch
                </Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {availableCoupons.map((c, i) => (
                  <TouchableOpacity
                    key={c._id || i}
                    onPress={() => handleApplyCoupon(c.code)}
                    style={{
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 12,
                      padding: 14,
                      marginBottom: 10,
                      backgroundColor: '#F9FAFB',
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
                          backgroundColor: '#E6F4EF',
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 6,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: '#1F8A70',
                            letterSpacing: 1,
                          }}
                        >
                          {c.code}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '700',
                          color: '#2563EB',
                        }}
                      >
                        {c.type === 'percentage'
                          ? `${c.value}% OFF`
                          : `₹${c.value} OFF`}
                      </Text>
                    </View>
                    {c.description ? (
                      <Text
                        style={{ fontSize: 12, color: '#374151', marginTop: 8 }}
                      >
                        {c.description}
                      </Text>
                    ) : null}
                    <View
                      style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}
                    >
                      {c.minGuests > 0 && (
                        <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
                          Min {c.minGuests} guests
                        </Text>
                      )}
                      {c.minOrderAmount > 0 && (
                        <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
                          Min ₹{c.minOrderAmount}
                        </Text>
                      )}
                      {c.maxDiscount > 0 && (
                        <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
                          Max ₹{c.maxDiscount} off
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* Manual entry */}
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                marginTop: 12,
                borderTopWidth: 1,
                borderTopColor: '#F3F4F6',
                paddingTop: 12,
              }}
            >
              <TextInput
                value={couponCode}
                onChangeText={setCouponCode}
                placeholder="Or enter code manually"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: '#111827',
                  backgroundColor: '#F9FAFB',
                }}
              />
              <TouchableOpacity
                onPress={() => handleApplyCoupon(couponCode)}
                style={{
                  backgroundColor: '#1F8A70',
                  borderRadius: 10,
                  paddingHorizontal: 16,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}
                >
                  Apply
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setShowCouponModal(false)}
              style={{ marginTop: 16, alignItems: 'center' }}
            >
              <Text style={{ fontSize: 14, color: '#6B7280' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// ── Reusable components ────────────────────────────────────────────────────────
const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 14,
  marginBottom: 12,
};
const iconBox = {
  width: 36,
  height: 36,
  borderRadius: 10,
  backgroundColor: '#F3F4F6',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
};

const GuestCounter = ({ label, sublabel, value, min, max, onChange }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    }}
  >
    <View>
      <Text style={{ fontSize: 14, color: '#111827', fontWeight: '600' }}>
        {label}
      </Text>
      <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
        {sublabel}
      </Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <TouchableOpacity
        onPress={() => onChange(Math.max(min, value - 1))}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          borderWidth: 1.5,
          borderColor: '#D1D5DB',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color: '#374151', lineHeight: 22 }}>
          −
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#111827',
          minWidth: 20,
          textAlign: 'center',
        }}
      >
        {value}
      </Text>
      <TouchableOpacity
        onPress={() => onChange(Math.min(max, value + 1))}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: '#1F8A70',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color: '#fff', lineHeight: 22 }}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const PriceRow = ({ label, value, bold, green }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    }}
  >
    <Text
      style={{
        fontSize: 14,
        color: bold ? '#111827' : '#6B7280',
        fontWeight: bold ? '700' : '400',
      }}
    >
      {label}
    </Text>
    <Text
      style={{
        fontSize: 14,
        color: green ? '#10B981' : '#111827',
        fontWeight: bold ? '700' : '600',
      }}
    >
      {value}
    </Text>
  </View>
);

export default BookingScreen;
