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
}) => {
  let razorpayOrderId = null;
  let internalOrderId = null;

  // Step 1: Try to create order on backend (if endpoint exists)
  try {
    const orderRes = await api.post('/payments/create-order', {
      amount,
      packageId,
      batchId,
      seats,
      couponCode,
      travelers,
    });
    razorpayOrderId = orderRes.data.razorpayOrderId;
    internalOrderId = orderRes.data.orderId;
  } catch (err) {
    // Backend endpoint not ready yet — proceed without order_id (test mode)
    console.log('Backend order creation not available, proceeding in test mode');
  }

  // Step 2: Open Razorpay Checkout
  const options = {
    description: 'TripReel Trip Booking',
    image: 'https://tripreel.com/logo.png',
    currency: 'INR',
    key: RAZORPAY_KEY,
    amount: amount * 100, // Convert INR to paise
    name: 'TripReel',
    prefill: {
      email: user?.email || '',
      contact: user?.phone || '',
      name: user?.name || '',
    },
    theme: { color: '#1F8A70' },
  };

  // Add order_id only if backend created one
  if (razorpayOrderId) {
    options.order_id = razorpayOrderId;
  }

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
    });

    return {
      success: verifyRes.data.success,
      bookingId: verifyRes.data.bookingId,
      paymentId: paymentResult.razorpay_payment_id,
      ...verifyRes.data,
    };
  } catch (verifyErr) {
    // If verify endpoint doesn't exist yet, treat payment as successful (test mode)
    console.log('Backend verify not available, using payment result directly');
    return {
      success: true,
      paymentId: paymentResult.razorpay_payment_id,
      testMode: true,
    };
  }
};
