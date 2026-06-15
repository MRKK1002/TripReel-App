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
  Camera,
  Video,
} from 'lucide-react-native';
import {
  tripBookingsAPI,
  couponsAPI,
  settingsAPI,
  batchesAPI,
  SERVER_URL,
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { initiateRazorpayPayment } from '../services/paymentService';
import AppModal from '../components/AppModal';
import './../../android/app/src/utils/globalFont.js';

const resolveUrl = url => {
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

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const {
    destination,
    selectedBatch: initialBatch,
    batchId: initialBatchId,
    selectedAddons: routeAddons,
  } = route.params || {};

  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedBatch, setSelectedBatch] = useState(initialBatch || null);
  const [batchId, setBatchId] = useState(initialBatchId || null);
  const [availableBatches, setAvailableBatches] = useState([]);
  const [batchesLoading, setBatchesLoading] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  // Traveler details — { name, gender, age } for each person
  const [travelers, setTravelers] = useState([
    { name: user?.name || '', gender: '', age: '' },
  ]);
  // Addon day selection — { [addonName]: [dayIndex, ...] }
  const [addonDays, setAddonDays] = useState({});
  // App modal (replaces Alert.alert)
  const [modal, setModal] = useState({ visible: false });
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCouponDesc, setAppliedCouponDesc] = useState('');
  const [appliedCouponMinGuests, setAppliedCouponMinGuests] = useState(0);
  // Store coupon details for dynamic recalculation
  const [appliedCouponType, setAppliedCouponType] = useState(''); // 'percentage' or 'flat'
  const [appliedCouponValue, setAppliedCouponValue] = useState(0);
  const [appliedCouponMaxDiscount, setAppliedCouponMaxDiscount] = useState(0);
  const [appliedCouponMinOrder, setAppliedCouponMinOrder] = useState(0);
  const [gstPercent, setGstPercent] = useState(5);
  const [adminPolicies, setAdminPolicies] = useState({
    cancellation: '',
    refund: '',
  });
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState(
    routeAddons && routeAddons.length > 0 ? routeAddons[0].name : null,
  );

  // ── Dynamic addon pricing based on selected days ───────────────────────────
  const itinerary = destination?.itinerary || [];
  const outsideCityCharge = Number(destination?.outsideCityCharge) || 0;
  const ADDON_BASE_PRICE = 2000; // Fixed base per service per day

  // Calculate addon total: sum of (base + surcharge) for each selected day per addon
  const computeAddonTotal = () => {
    if (!routeAddons || routeAddons.length === 0) return 0;
    let total = 0;
    for (const addon of routeAddons) {
      const days = addonDays[addon.name] || [];
      for (const dayIdx of days) {
        const dayInfo = itinerary[dayIdx];
        const surcharge = dayInfo?.isOutsideCity ? outsideCityCharge : 0;
        total += ADDON_BASE_PRICE + surcharge;
      }
    }
    return total;
  };

  const addonPrice = computeAddonTotal();

  // Fetch GST + policies from admin settings
  useEffect(() => {
    settingsAPI
      .getPublic()
      .then(res => {
        setGstPercent(res.data?.gst_percent ?? 5);
        setAdminPolicies({
          cancellation: res.data?.default_cancellation_policy || '',
          refund: res.data?.default_refund_policy || '',
        });
      })
      .catch(() => {});
  }, []);

  // Fetch available batches for date change
  useEffect(() => {
    if (!destination?._id) return;
    setBatchesLoading(true);
    batchesAPI
      .getForPackage(destination._id)
      .then(res => setAvailableBatches(res.data?.batches || []))
      .catch(() => setAvailableBatches([]))
      .finally(() => setBatchesLoading(false));
  }, [destination?._id]);

  // Sync travelers array when guest count changes
  useEffect(() => {
    const total = adults + children;
    setTravelers(prev => {
      if (prev.length === total) return prev;
      if (prev.length < total) {
        const extra = Array.from({ length: total - prev.length }, () => ({
          name: '',
          gender: '',
          age: '',
        }));
        return [...prev, ...extra];
      }
      return prev.slice(0, total);
    });

    // Auto-remove coupon if guest count drops below minimum requirement
    if (
      couponApplied &&
      appliedCouponMinGuests > 0 &&
      total < appliedCouponMinGuests
    ) {
      setDiscountAmount(0);
      setCouponApplied(false);
      setCouponCode('');
      setAppliedCouponDesc('');
      setAppliedCouponMinGuests(0);
      setAppliedCouponType('');
      setAppliedCouponValue(0);
      setAppliedCouponMaxDiscount(0);
      setAppliedCouponMinOrder(0);
    }
  }, [adults, children]);

  const showAppModal = cfg => setModal({ visible: true, ...cfg });
  const closeAppModal = () => setModal(m => ({ ...m, visible: false }));
  const CHILD_MAX_AGE = 7;

  // ── Pricing calculations ───────────────────────────────────────────────────
  const adultPrice = selectedBatch?.adultPrice || destination?.price || 0;
  const childPrice = selectedBatch?.childPrice || 0;
  const totalSeats = adults + children;

  const adultSubtotal = adultPrice * adults;
  const childSubtotal = childPrice * children;
  const packageSubtotal = adultSubtotal + childSubtotal; // Package price only (discount applies here)
  const subtotal = packageSubtotal + addonPrice; // Full subtotal including addons
  const gstAmount = Math.round((subtotal * gstPercent) / 100);

  // Dynamically recalculate discount — applies only on package price, NOT addon charges
  let computedDiscount = 0;
  if (
    couponApplied &&
    totalSeats >= (appliedCouponMinGuests || 0) &&
    (appliedCouponMinOrder <= 0 || packageSubtotal >= appliedCouponMinOrder)
  ) {
    if (appliedCouponType === 'percentage') {
      computedDiscount = Math.round(
        (packageSubtotal * appliedCouponValue) / 100,
      );
      if (
        appliedCouponMaxDiscount > 0 &&
        computedDiscount > appliedCouponMaxDiscount
      ) {
        computedDiscount = appliedCouponMaxDiscount;
      }
    } else {
      computedDiscount = appliedCouponValue;
    }
    if (computedDiscount > packageSubtotal) computedDiscount = packageSubtotal;
  } else if (couponApplied) {
    // Coupon conditions not met — discount is 0
    computedDiscount = 0;
  }

  const totalAmount = subtotal + gstAmount - computedDiscount;

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
    const total = adults + children;
    try {
      const res = await couponsAPI.validate({
        batchId,
        code: code.trim(),
        guests: total,
        subtotal,
      });
      if (res.data.success) {
        const coupon = res.data.coupon || {};
        const matchedCoupon = availableCoupons.find(
          c => c.code === code.trim().toUpperCase(),
        );
        const minGuests = matchedCoupon?.minGuests || coupon.minGuests || 0;

        // Check minimum guests requirement
        if (minGuests > 0 && total < minGuests) {
          showAppModal({
            variant: 'error',
            title: 'Minimum Guests Required',
            message: `This coupon requires at least ${minGuests} guests. You currently have ${total}.`,
          });
          return;
        }

        // Check minimum order amount
        const minOrder =
          matchedCoupon?.minOrderAmount || coupon.minOrderAmount || 0;
        if (minOrder > 0 && subtotal < minOrder) {
          showAppModal({
            variant: 'error',
            title: 'Minimum Order Required',
            message: `This coupon requires a minimum order of ₹${minOrder.toLocaleString(
              'en-IN',
            )}. Your current total is ₹${subtotal.toLocaleString('en-IN')}.`,
          });
          return;
        }

        setCouponCode(code.trim().toUpperCase());
        setCouponApplied(true);
        setAppliedCouponMinGuests(minGuests);
        setAppliedCouponMinOrder(minOrder);
        setAppliedCouponType(coupon.type || 'percentage');
        setAppliedCouponValue(coupon.value || 0);
        setAppliedCouponMaxDiscount(coupon.maxDiscount || 0);
        setDiscountAmount(res.data.discountAmount || 0);
        setAppliedCouponDesc(
          coupon.description ||
            `Get ${coupon.value}${
              coupon.type === 'percentage' ? '%' : '₹'
            } off${
              coupon.maxDiscount ? ` (max ₹${coupon.maxDiscount})` : ''
            } for ${minGuests}+ guests`,
        );
        setShowCouponModal(false);
      }
    } catch (err) {
      showAppModal({
        variant: 'error',
        title: 'Coupon Error',
        message: err?.response?.data?.message || 'Invalid coupon',
      });
    }
  };

  const removeCoupon = () => {
    setDiscountAmount(0);
    setCouponApplied(false);
    setCouponCode('');
    setAppliedCouponDesc('');
    setAppliedCouponMinGuests(0);
    setAppliedCouponType('');
    setAppliedCouponValue(0);
    setAppliedCouponMaxDiscount(0);
    setAppliedCouponMinOrder(0);
  };

  // ── Confirm booking ────────────────────────────────────────────────────────
  const handleConfirmBooking = async () => {
    if (!batchId) {
      showAppModal({
        variant: 'error',
        title: 'No Batch Selected',
        message: 'Please go back and select a departure date.',
      });
      return;
    }
    if (totalSeats > seatsLeft) {
      showAppModal({
        variant: 'error',
        title: 'Not Enough Seats',
        message: 'Only ' + seatsLeft + ' seats available.',
      });
      return;
    }

    // Validate traveler details
    const incomplete = travelers.some(
      t => !t.name?.trim() || !t.gender || !t.age,
    );
    if (incomplete) {
      showAppModal({
        variant: 'error',
        title: 'Incomplete Details',
        message: 'Please fill in name, gender, and age for all travelers.',
      });
      return;
    }

    setBooking(true);
    try {
      // ── Razorpay Payment Flow ──────────────────────────────────────────────
      const paymentResult = await initiateRazorpayPayment({
        amount: totalAmount,
        packageId: destination._id,
        batchId,
        seats: totalSeats,
        couponCode: couponApplied ? couponCode : '',
        travelers: travelers.map(t => ({
          name: t.name || '',
          gender: t.gender || '',
          age: Number(t.age) || 0,
        })),
        user,
        addonDays,
      });

      if (!paymentResult.success) {
        showAppModal({
          variant: 'error',
          title: 'Payment Verification Failed',
          message:
            'Payment was made but could not be verified. Please contact support.',
        });
        return;
      }

      // Snapja addon dispatch is now handled by the backend (held until the
      // booking is locked-in, then sent to Snapja by a cron job).

      showAppModal({
        variant: 'success',
        title: 'Payment Successful! ✓',
        message: `Payment of ₹${totalAmount.toLocaleString(
          'en-IN',
        )} completed. Your booking is confirmed!`,
        primaryLabel: 'Go to My Trips',
        onPrimaryPress: () => {
          closeAppModal();
          navigation.navigate('Main', { screen: 'MyTrip' });
        },
        onClose: () => {
          closeAppModal();
          navigation.navigate('Main', { screen: 'MyTrip' });
        },
      });
    } catch (err) {
      // Razorpay sends error code 0 when user dismisses the checkout
      if (err?.code === 0 || err?.description?.includes('cancelled')) {
        showAppModal({
          variant: 'error',
          title: 'Payment Cancelled',
          message: 'You cancelled the payment. No amount was charged.',
        });
      } else {
        showAppModal({
          variant: 'error',
          title: 'Payment Failed',
          message:
            err?.response?.data?.message ||
            err?.description ||
            'Payment could not be processed. Please try again.',
        });
      }
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
                backgroundColor: '#E6F4EF',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
                alignSelf: 'flex-start',
                marginTop: 4,
              }}
            >
              <Text
                style={{ fontSize: 10, fontWeight: '600', color: '#1F8A70' }}
              >
                Guest Favorite
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
                {destination?.reviewCount || 0} reviews
              </Text>
              <Text style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 4 }}>
                • From ₹{(destination?.price || 0).toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        </View>

        {/* Add-Ons */}
        {routeAddons && routeAddons.length > 0 && (
          <TouchableOpacity
            style={cardStyle}
            onPress={() => navigation.goBack()}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={iconBox}>
                {routeAddons.some(
                  a =>
                    a.name?.toLowerCase().includes('reel') ||
                    a.name?.toLowerCase().includes('video'),
                ) ? (
                  <Video size={18} color="#6B7280" />
                ) : (
                  <Camera size={18} color="#6B7280" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}
                >
                  {routeAddons.map(a => a.name).join(', ')}
                </Text>
                <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                  Ad-Ons
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
        )}

        {/* Addon Day Picker — select which days you want photographer/reelmaker */}
        {routeAddons && routeAddons.length > 0 && itinerary.length > 0 && (
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
                fontSize: 14,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 4,
              }}
            >
              Select Days for Add-Ons
            </Text>
            <Text style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 12 }}>
              Choose which days you'd like the service. Price varies by
              location.
            </Text>

            {routeAddons.map(addon => {
              const isSnapja =
                addon.name?.toLowerCase().includes('photographer') ||
                addon.name?.toLowerCase().includes('reel') ||
                addon.name?.toLowerCase().includes('videographer');
              if (!isSnapja) return null;
              const selectedForAddon = addonDays[addon.name] || [];

              return (
                <View key={addon.name} style={{ marginBottom: 14 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: 8,
                    }}
                  >
                    {addon.name?.toLowerCase().includes('reel') ||
                    addon.name?.toLowerCase().includes('video')
                      ? '🎬'
                      : '📷'}{' '}
                    {addon.name}
                  </Text>
                  {itinerary.map((day, idx) => {
                    const isSelected = selectedForAddon.includes(idx);
                    const surcharge = day.isOutsideCity ? outsideCityCharge : 0;
                    const dayPrice = ADDON_BASE_PRICE + surcharge;
                    const locationLabel = day.isOutsideCity
                      ? '(Outside City)'
                      : '(Within City)';

                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => {
                          setAddonDays(prev => {
                            const current = prev[addon.name] || [];
                            const updated = isSelected
                              ? current.filter(d => d !== idx)
                              : [...current, idx];
                            return { ...prev, [addon.name]: updated };
                          });
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 12,
                          marginBottom: 6,
                          borderRadius: 10,
                          borderWidth: 1.5,
                          borderColor: isSelected ? '#1F8A70' : '#E5E7EB',
                          backgroundColor: isSelected ? '#E6F4EF' : '#F9FAFB',
                        }}
                      >
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 4,
                            borderWidth: 2,
                            borderColor: isSelected ? '#1F8A70' : '#D1D5DB',
                            backgroundColor: isSelected ? '#1F8A70' : '#fff',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 10,
                          }}
                        >
                          {isSelected && <Check size={14} color="#fff" />}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '600',
                              color: '#111827',
                            }}
                          >
                            Day {day.day || idx + 1}: {day.title || 'Untitled'}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              color: day.isOutsideCity ? '#D97706' : '#6B7280',
                              marginTop: 2,
                            }}
                          >
                            {locationLabel}
                            {day.pickupPoint ? ` • ${day.pickupPoint}` : ''}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '700',
                            color: isSelected ? '#1F8A70' : '#374151',
                          }}
                        >
                          ₹{dayPrice.toLocaleString('en-IN')}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}

            {addonPrice > 0 && (
              <View
                style={{
                  backgroundColor: '#E6F4EF',
                  borderRadius: 8,
                  padding: 10,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: '#065F46',
                    textAlign: 'center',
                  }}
                >
                  Add-On Total: ₹{addonPrice.toLocaleString('en-IN')}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Dates — tappable */}
        <TouchableOpacity
          style={cardStyle}
          onPress={() => setShowDateModal(true)}
        >
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
                Dates
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
                Total Price
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

        {/* Traveler Details — name, gender, age for each person */}
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
              fontSize: 14,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 12,
            }}
          >
            Traveler Details
          </Text>
          {travelers.map((t, i) => {
            const isChild = i >= adults; // first N are adults, rest are children
            const ageNum = Number(t.age) || 0;
            const ageWarning = isChild && ageNum > CHILD_MAX_AGE;
            return (
              <View
                key={i}
                style={{
                  marginBottom: 14,
                  borderBottomWidth: i < travelers.length - 1 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                  paddingBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: ageWarning ? '#EF4444' : '#6B7280',
                    marginBottom: 6,
                  }}
                >
                  {isChild
                    ? ageWarning
                      ? `⚠️ Traveler ${i + 1} — Age ${ageNum} counts as Adult`
                      : `Child ${i - adults + 1}`
                    : `Adult ${i + 1}`}
                </Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TextInput
                    value={t.name}
                    onChangeText={v =>
                      setTravelers(prev => {
                        const u = [...prev];
                        u[i] = { ...u[i], name: v };
                        return u;
                      })
                    }
                    placeholder="Full Name *"
                    placeholderTextColor="#9CA3AF"
                    style={{
                      flex: 2,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      fontSize: 13,
                      color: '#111827',
                      backgroundColor: '#F9FAFB',
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 8,
                      backgroundColor: '#F9FAFB',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        const next =
                          t.gender === 'Male'
                            ? 'Female'
                            : t.gender === 'Female'
                            ? 'Other'
                            : 'Male';
                        setTravelers(prev => {
                          const u = [...prev];
                          u[i] = { ...u[i], gender: next };
                          return u;
                        });
                      }}
                      style={{ paddingHorizontal: 10, paddingVertical: 8 }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          color: t.gender ? '#111827' : '#9CA3AF',
                        }}
                      >
                        {t.gender || 'Gender *'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    value={String(t.age || '')}
                    onChangeText={v =>
                      setTravelers(prev => {
                        const u = [...prev];
                        u[i] = { ...u[i], age: v.replace(/[^0-9]/g, '') };
                        return u;
                      })
                    }
                    placeholder="Age *"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    maxLength={2}
                    style={{
                      width: 50,
                      borderWidth: 1,
                      borderColor: ageWarning ? '#EF4444' : '#E5E7EB',
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      fontSize: 13,
                      color: '#111827',
                      backgroundColor: ageWarning ? '#FEF2F2' : '#F9FAFB',
                      textAlign: 'center',
                    }}
                  />
                </View>
                {ageWarning && (
                  <Text
                    style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}
                  >
                    Age {ageNum} is above {CHILD_MAX_AGE} — will be charged
                    adult price
                  </Text>
                )}
              </View>
            );
          })}
        </View>

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
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <View style={[iconBox, { transform: [{ scaleX: -1 }] }]}>
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
                  {computedDiscount.toLocaleString('en-IN')} off
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
          {(
            adminPolicies.cancellation ||
            'Free cancellation up to 5 days before travel.No refund after that'
          )
            .split('.')
            .filter(Boolean)
            .map((line, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: 8,
                }}
              >
                <Check size={14} color="#9CA3AF" style={{ marginTop: 2 }} />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 14,
                    color: '#1E2A45',
                    flex: 1,
                  }}
                >
                  {line.trim()}
                </Text>
              </View>
            ))}
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#111827',
              marginTop: 14,
              marginBottom: 10,
            }}
          >
            Payment Policy
          </Text>
          {(
            adminPolicies.refund ||
            'Pay full amount during booking.Secure online payment'
          )
            .split('.')
            .filter(Boolean)
            .map((line, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: 8,
                }}
              >
                <Check size={14} color="#9CA3AF" style={{ marginTop: 2 }} />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 14,
                    color: '#1E2A45',
                    flex: 1,
                  }}
                >
                  {line.trim()}
                </Text>
              </View>
            ))}
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
              Continue to pay
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
            {addonPrice > 0 && (
              <PriceRow
                label="Add-ons"
                value={`₹${addonPrice.toLocaleString('en-IN')}`}
              />
            )}
            <PriceRow
              label={`GST (${gstPercent}%)`}
              value={`₹${gstAmount.toLocaleString('en-IN')}`}
            />
            {computedDiscount > 0 && (
              <PriceRow
                label={`Coupon (${couponCode})`}
                value={`-₹${computedDiscount.toLocaleString('en-IN')}`}
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
      {/* ── Date Change Modal ────────────────────────────────────────────── */}
      <Modal visible={showDateModal} transparent animationType="slide">
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
              maxHeight: '60%',
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
              Select Date
            </Text>

            {batchesLoading ? (
              <ActivityIndicator
                color="#1F8A70"
                style={{ marginVertical: 24 }}
              />
            ) : availableBatches.filter(b => {
                const now = new Date();
                return (
                  b.isActive &&
                  new Date(b.startDate) > now &&
                  b.totalSeats - b.bookedSeats > 0
                );
              }).length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 24 }}>
                <Calendar size={32} color="#D1D5DB" />
                <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 10 }}>
                  No dates available
                </Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {availableBatches
                  .filter(b => {
                    const now = new Date();
                    return (
                      b.isActive &&
                      new Date(b.startDate) > now &&
                      b.totalSeats - b.bookedSeats > 0
                    );
                  })
                  .map((batch, i) => {
                    const start = new Date(batch.startDate);
                    const end = new Date(batch.endDate);
                    const label = `${start.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })} - ${end.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}`;
                    const seats =
                      (batch.totalSeats || 0) - (batch.bookedSeats || 0);
                    const isCurrentBatch = batch._id === batchId;

                    return (
                      <TouchableOpacity
                        key={batch._id || i}
                        onPress={() => {
                          setSelectedBatch(batch);
                          setBatchId(batch._id);
                          setShowDateModal(false);
                        }}
                        style={{
                          borderWidth: 1.5,
                          borderColor: isCurrentBatch ? '#1F8A70' : '#E5E7EB',
                          backgroundColor: isCurrentBatch
                            ? '#E6F4EF'
                            : '#F9FAFB',
                          borderRadius: 12,
                          padding: 14,
                          marginBottom: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: '#111827',
                              }}
                            >
                              {label}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                color: '#6B7280',
                                marginTop: 2,
                              }}
                            >
                              ₹
                              {Number(batch.adultPrice || 0).toLocaleString(
                                'en-IN',
                              )}
                              /person • {seats} seats left
                            </Text>
                          </View>
                          {isCurrentBatch && (
                            <View
                              style={{
                                backgroundColor: '#1F8A70',
                                paddingHorizontal: 8,
                                paddingVertical: 3,
                                borderRadius: 6,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: '700',
                                  color: '#fff',
                                }}
                              >
                                Selected
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            )}

            <TouchableOpacity
              onPress={() => setShowDateModal(false)}
              style={{
                backgroundColor: '#1F8A70',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
                marginTop: 12,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <AppModal {...modal} onClose={modal.onClose || closeAppModal} />
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
        flex: 1,
        marginRight: 8,
      }}
      numberOfLines={2}
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
