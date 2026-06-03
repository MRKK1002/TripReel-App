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
  getAll: (params = {}) => api.get('/packages', { params }),
  getByCategory: (category, limit = 5) =>
    api.get('/packages', { params: { category, limit } }),
  // Popular = sorted by avgRating descending
  getPopular: (limit = 10) =>
    api.get('/packages', { params: { sortBy: 'rating_desc', limit } }),
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
  // Get experiences filtered by state/location keyword (for "Experiences Near You")
  getByLocation: (locationKeyword, params = {}) =>
    api.get('/experiences', {
      params: { ...params, search: locationKeyword, limit: 10 },
    }),
  getById: id => api.get(`/experiences/${id}`),
};

// Reel endpoints (public — only active reels)
export const reelsAPI = {
  getAll: (params = {}) => api.get('/reels', { params }),
};

export default api;
