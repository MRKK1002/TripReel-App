import RazorpayCheckout from 'react-native-razorpay';
import api from './api';

// Razorpay key (this is the public key, safe to include in client code)
// Replace with your live key for production: rzp_live_XXXXX
const RAZORPAY_KEY = 'rzp_test_Rxi9hK6s8SQexH';

/**
 * Opens Razorpay checkout and processes payment.
 *
 * Flow:
 * 1. Calls backend to create a Razorpay order (if backend is ready)
 * 2. Opens Razorpay Checkout UI
 * 3. On success, verifies payment on backend & confirms booking
 *
 * @param {Object} params
 * @param {number} params.amount - Amount in INR (e.g. 5999)
 * @param {string} params.packageId - Package being booked
 * @param {string} params.batchId - Batch being booked
 * @param {number} params.seats - Total seats
 * @param {string} params.couponCode - Applied coupon (if any)
 * @param {Array}  params.travelers - Traveler details array
 * @param {Object} params.user - Current user object { name, email, phone }
 * @returns {Promise<Object>} - Payment result
 */
export const initiateRazorpayPayment = async ({
  amount,
  packageId,
  batchId,
  seats,
  couponCode,
  travelers,
  user,
  addonDays,
}) => {
  let razorpayOrderId = null;
  let internalOrderId = null;
  let serverAmount = amount;
  let serverKeyId = RAZORPAY_KEY;

  // Step 1: Create the order on the backend (REQUIRED — the server computes the
  // authoritative amount; we never let the client decide what gets charged).
  try {
    const orderRes = await api.post('/payments/create-order', {
      packageId,
      batchId,
      seats,
      couponCode,
      addonDays,
    });
    razorpayOrderId = orderRes.data.razorpayOrderId;
    internalOrderId = orderRes.data.orderId;
    if (orderRes.data.amount) serverAmount = orderRes.data.amount;
    // Use the SAME key the backend used to create the order, so the checkout
    // and the signature verification always belong to the same account.
    if (orderRes.data.keyId) serverKeyId = orderRes.data.keyId;
  } catch (err) {
    // Without a server order we cannot safely charge — abort.
    return {
      success: false,
      error:
        err?.response?.data?.message ||
        'Could not start payment. Please try again.',
    };
  }

  if (!razorpayOrderId) {
    return { success: false, error: 'Payment could not be initialised.' };
  }

  // Step 2: Open Razorpay Checkout. With order_id set, Razorpay charges the
  // ORDER's amount (server-controlled), regardless of the amount field.
  const options = {
    description: 'TripReel Trip Booking',
    image: 'https://tripreel.com/logo.png',
    currency: 'INR',
    key: serverKeyId,
    amount: Math.round(serverAmount * 100),
    name: 'TripReel',
    order_id: razorpayOrderId,
    prefill: {
      email: user?.email || '',
      contact: user?.phone || '',
      name: user?.name || '',
    },
    theme: { color: '#1F8A70' },
  };

  const paymentResult = await RazorpayCheckout.open(options);

  // Step 3: Verify payment on backend & create booking
  try {
    const verifyRes = await api.post('/payments/verify', {
      razorpay_order_id: paymentResult.razorpay_order_id || razorpayOrderId,
      razorpay_payment_id: paymentResult.razorpay_payment_id,
      razorpay_signature: paymentResult.razorpay_signature,
      orderId: internalOrderId,
      // Send booking data so backend can create the booking after payment verification
      packageId,
      batchId,
      seats,
      couponCode,
      travelers,
      addonDays,
    });

    return {
      success: verifyRes.data.success,
      bookingId: verifyRes.data.bookingId,
      paymentId: paymentResult.razorpay_payment_id,
      ...verifyRes.data,
    };
  } catch (verifyErr) {
    // Payment was collected by Razorpay but backend verification failed
    // This is a critical state — payment exists but booking may not
    console.warn(
      'Payment verify failed:',
      verifyErr?.response?.data?.message || verifyErr.message,
    );
    return {
      success: false,
      paymentId: paymentResult.razorpay_payment_id,
      error:
        'Payment received but booking creation failed. Please contact support with your payment ID.',
    };
  }
};
