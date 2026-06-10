import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Alert } from 'react-native';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistContext = createContext(null);

const DEFAULT_WISHLIST_NAME = 'My Wishlist';

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // wishlists: array of wishlist objects from backend
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(false);

  // Flat set of all saved packageIds for quick O(1) lookup
  const [savedIds, setSavedIds] = useState(new Set());

  // ── Helpers ──────────────────────────────────────────────────────────────

  const buildSavedIds = useCallback(lists => {
    const ids = new Set();
    lists.forEach(wl => {
      (wl.packages || []).forEach(pkg => {
        ids.add(typeof pkg === 'object' ? pkg._id : pkg);
      });
    });
    return ids;
  }, []);

  // ── Fetch user's wishlists ────────────────────────────────────────────────

  const fetchWishlists = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlists([]);
      setSavedIds(new Set());
      return;
    }
    try {
      setLoading(true);
      const res = await wishlistAPI.getMyWishlists();
      const lists = res.data.wishlists || [];
      setWishlists(lists);
      setSavedIds(buildSavedIds(lists));
      AsyncStorage.setItem('@cache_wishlists', JSON.stringify(lists)).catch(
        () => {},
      );
    } catch (err) {
      console.warn('WishlistContext: fetchWishlists error', err?.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, buildSavedIds]);

  // Load cached wishlists instantly on mount
  useEffect(() => {
    AsyncStorage.getItem('@cache_wishlists')
      .then(raw => {
        if (raw) {
          try {
            const cached = JSON.parse(raw);
            if (cached?.length) {
              setWishlists(cached);
              setSavedIds(buildSavedIds(cached));
            }
          } catch {}
        }
      })
      .catch(() => {});
  }, [buildSavedIds]);

  // Reload whenever auth state changes
  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  // ── Get or create the default wishlist ───────────────────────────────────

  const getOrCreateDefaultWishlist = useCallback(async () => {
    if (wishlists.length > 0) return wishlists[0];
    // Fetch fresh from server first to avoid creating duplicates
    try {
      const res = await wishlistAPI.getMyWishlists();
      const lists = res.data.wishlists || [];
      if (lists.length > 0) {
        setWishlists(lists);
        setSavedIds(buildSavedIds(lists));
        return lists[0];
      }
    } catch (e) {
      // Fall through to create
    }
    const res = await wishlistAPI.createWishlist({
      name: DEFAULT_WISHLIST_NAME,
    });
    const newList = res.data.wishlist;
    setWishlists([newList]);
    return newList;
  }, [wishlists, buildSavedIds]);

  // ── Toggle save/unsave for a package ─────────────────────────────────────

  const toggleWishlist = useCallback(
    async packageId => {
      if (!isAuthenticated) {
        Alert.alert(
          'Login Required',
          'Please log in to save packages to your wishlist.',
        );
        return false;
      }

      const isSaved = savedIds.has(packageId);

      // Optimistic update
      setSavedIds(prev => {
        const next = new Set(prev);
        isSaved ? next.delete(packageId) : next.add(packageId);
        return next;
      });

      try {
        if (isSaved) {
          // Find which wishlist contains this package and remove it
          const owningList = wishlists.find(wl =>
            (wl.packages || []).some(
              p => (typeof p === 'object' ? p._id : p) === packageId,
            ),
          );
          if (owningList) {
            await wishlistAPI.removePackage(owningList._id, packageId);
          }
        } else {
          const targetList = await getOrCreateDefaultWishlist();
          await wishlistAPI.addPackage(targetList._id, packageId);
        }
        // Refresh to get accurate server state
        await fetchWishlists();
        return !isSaved;
      } catch (err) {
        // Revert optimistic update on failure
        setSavedIds(prev => {
          const next = new Set(prev);
          isSaved ? next.add(packageId) : next.delete(packageId);
          return next;
        });
        Alert.alert(
          'Error',
          err?.response?.data?.message || 'Could not update wishlist.',
        );
        return isSaved;
      }
    },
    [
      isAuthenticated,
      savedIds,
      wishlists,
      getOrCreateDefaultWishlist,
      fetchWishlists,
    ],
  );

  const isSaved = useCallback(packageId => savedIds.has(packageId), [savedIds]);

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        loading,
        savedIds,
        isSaved,
        toggleWishlist,
        fetchWishlists,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
};
