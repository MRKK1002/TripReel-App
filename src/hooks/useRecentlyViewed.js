import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@tripreel_recently_viewed';
const MAX = 10;

export function useRecentlyViewed() {
  const [items, setItems] = useState([]);

  // Load on mount
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then(raw => {
        if (raw) setItems(JSON.parse(raw));
      })
      .catch(() => {});
  }, []);

  // Call this when user opens a package
  const addViewed = useCallback(async pkg => {
    if (!pkg?._id) return;
    setItems(prev => {
      // Remove if already exists, add to front, trim to MAX
      const filtered = prev.filter(p => p._id !== pkg._id);
      const next = [
        {
          _id: pkg._id,
          title: pkg.title,
          image_url: pkg.image_url,
          rating: pkg.rating,
          location: pkg.location,
          viewedAt: Date.now(),
        },
        ...filtered,
      ].slice(0, MAX);

      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  return { recentlyViewed: items, addViewed };
}

// Format "2 hours ago", "3 days ago" etc.
export function timeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}
