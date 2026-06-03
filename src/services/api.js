import axios from 'axios';

const BASE_URL = 'http://192.168.1.43:5001/api';
export const SERVER_URL = 'http://192.168.1.43:5001';

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
};

// Package endpoints (public — only approved packages)
export const packagesAPI = {
    getAll: (params = {}) => api.get('/packages', { params }),
    getByCategory: (category, limit = 5) =>
        api.get('/packages', { params: { category, limit } }),
    getById: id => api.get(`/packages/${id}`),
};

// Popular Destinations endpoints
export const destinationsAPI = {
    getAll: (params = {}) => api.get('/popular-destinations', { params }),
    getById: id => api.get(`/popular-destinations/${id}`),
};

// Experiences endpoints
export const experiencesAPI = {
    getAll: (params = {}) => api.get('/experiences', { params }),
    getById: id => api.get(`/experiences/${id}`),
};

// Reel endpoints (public — only active reels)
export const reelsAPI = {
    getAll: (params = {}) => api.get('/reels', { params }),
};

// Wishlist endpoints (requires auth)
export const wishlistAPI = {
    getMyWishlists: ()                           => api.get('/wishlists/my'),
    createWishlist: (data)                       => api.post('/wishlists', data),
    addPackage: (wishlistId, packageId)          => api.post(`/wishlists/${wishlistId}/packages`, { packageId }),
    removePackage: (wishlistId, packageId)       => api.delete(`/wishlists/${wishlistId}/packages/${packageId}`),
    deleteWishlist: (id)                         => api.delete(`/wishlists/${id}`),
};

export default api;
