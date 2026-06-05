import axios from 'axios';

const BASE_URL = 'http://192.168.0.127:5001/api';
export const SERVER_URL = 'http://192.168.0.127:5001';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request if available
api.interceptors.request.use(
  config => {
    // Token is injected by AuthContext via setAuthToken helper
    return config;
  },
  error => Promise.reject(error),
);

export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth endpoints
export const authAPI = {
  register: data => api.post('/auth/register', data),
  login: data => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),

  // OTP-based auth (mobile app)
  signupSendOtp: data => api.post('/auth/signup/send-otp', data),
  signupVerifyOtp: data => api.post('/auth/signup/verify-otp', data),
  loginSendOtp: data => api.post('/auth/login/send-otp', data),
  loginVerifyOtp: data => api.post('/auth/login/verify-otp', data),
};

// Profile endpoints (logged-in user)
export const profileAPI = {
  get: () => api.get('/profile'),
  update: data => api.patch('/profile', data),
  uploadAvatar: formData =>
    api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Package endpoints (public — only approved packages)
export const packagesAPI = {
  // All packages — pass userCountry + userState for nearby-first Curated sort
  getAll: (params = {}) => api.get('/packages', { params }),
  getByCategory: (category, limit = 5) =>
    api.get('/packages', { params: { category, limit } }),
  // Popular = ranked by bookingCount + avgRating combined score
  getPopular: (limit = 10) =>
    api.get('/packages/popular', { params: { limit } }),
  getById: id => api.get(`/packages/${id}`),
};

// Review endpoints
export const reviewsAPI = {
  getForPackage: (packageId, params = {}) =>
    api.get(`/reviews/${packageId}`, { params }),
  getMyReview: packageId => api.get(`/reviews/my/${packageId}`),
  create: data => api.post('/reviews', data),
  delete: id => api.delete(`/reviews/${id}`),
};

// Popular Destinations endpoints
export const destinationsAPI = {
  getAll: (params = {}) => api.get('/popular-destinations', { params }),
  getById: id => api.get(`/popular-destinations/${id}`),
};

// Experiences endpoints
export const experiencesAPI = {
  getAll: (params = {}) => api.get('/experiences', { params }),
  // Get experiences filtered by user's country + state (for "Experiences Near You")
  getByLocation: ({ country = 'India', state = '' } = {}, params = {}) =>
    api.get('/experiences', {
      params: { ...params, country, state, limit: 10 },
    }),
  getById: id => api.get(`/experiences/${id}`),
};

// Reel endpoints (public — only active reels)
export const reelsAPI = {
  getAll: (params = {}) => api.get('/reels', { params }),
  // Get reels filtered by user's country + state
  getByLocation: ({ country = 'India', state = '' } = {}, params = {}) =>
    api.get('/reels', { params: { ...params, country, state, limit: 20 } }),
};

// Wishlist endpoints (user — requires auth)
export const wishlistAPI = {
  getMyWishlists: () => api.get('/wishlists/my'),
  createWishlist: data => api.post('/wishlists', data),
  addPackage: (wishlistId, packageId) =>
    api.post(`/wishlists/${wishlistId}/packages`, { packageId }),
  removePackage: (wishlistId, packageId) =>
    api.delete(`/wishlists/${wishlistId}/packages/${packageId}`),
};

// ── New booking system ────────────────────────────────────────────────────────

// Batch endpoints — upcoming departures for a package
export const batchesAPI = {
  getForPackage: packageId => api.get('/batches', { params: { packageId } }),
  getById: id => api.get(`/batches/${id}`),
};

// Trip Booking endpoints (user)
export const tripBookingsAPI = {
  create: data => api.post('/trip-bookings', data),
  getMy: () => api.get('/trip-bookings/my'),
  getById: id => api.get(`/trip-bookings/${id}`),
  getRefundPreview: id => api.get(`/trip-bookings/${id}/refund-preview`),
  cancel: (id, data) => api.post(`/trip-bookings/${id}/cancel`, data),
};

// Platform settings — public (gst_percent for display)
export const settingsAPI = {
  getPublic: () => api.get('/settings/public'),
};

// Coupon endpoints
export const couponsAPI = {
  // Get available coupons for a batch (shown in "Apply Discounts" sheet)
  getForBatch: batchId => api.get('/coupons', { params: { batchId } }),
  // Validate a coupon code
  validate: data => api.post('/coupons/validate', data),
};

// Report Issue endpoints (user reports problems)
export const reportsAPI = {
  create: data => api.post('/reports', data),
  getMy: () => api.get('/reports/my'),
};

export default api;
