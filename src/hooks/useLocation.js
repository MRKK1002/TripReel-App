/**
 * useLocation hook
 *
 * Requests device GPS on mount, reverse geocodes coordinates to
 * Indian state (or country for abroad) using a static bounding-box lookup.
 * No API call required — works fully offline for India.
 *
 * Returns: { country, state, loading, error, retry }
 *   - country: "India" | "UAE" | etc. (best-effort for abroad)
 *   - state:   Indian state name matching our DB, or "" if abroad/unknown
 *   - loading: true while requesting permission + getting coordinates
 *   - error:   "denied" | "unavailable" | null
 *   - retry:   function to re-request location
 */

import { useState, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// ── Indian state bounding boxes ────────────────────────────────────────────
// Format: [minLat, maxLat, minLng, maxLng]
// Ordered roughly largest → smallest to avoid false positives
const INDIA_STATE_BOUNDS = [
  ['Rajasthan', 23.0, 30.2, 69.5, 78.3],
  ['Madhya Pradesh', 21.1, 26.9, 74.0, 82.8],
  ['Maharashtra', 15.6, 22.0, 72.6, 80.9],
  ['Uttar Pradesh', 23.9, 30.4, 77.1, 84.7],
  ['Gujarat', 20.1, 24.7, 68.2, 74.5],
  ['Karnataka', 11.6, 18.5, 74.1, 78.6],
  ['Andhra Pradesh', 12.6, 19.9, 77.0, 84.8],
  ['Telangana', 15.8, 19.9, 77.0, 81.3],
  ['Odisha', 17.8, 22.6, 81.4, 87.5],
  ['Chhattisgarh', 17.8, 24.1, 80.2, 84.4],
  ['Tamil Nadu', 8.1, 13.6, 76.3, 80.3],
  ['West Bengal', 21.5, 27.2, 85.8, 89.9],
  ['Bihar', 24.3, 27.5, 83.3, 88.3],
  ['Jharkhand', 21.9, 25.4, 83.3, 87.5],
  ['Assam', 24.1, 27.9, 89.7, 96.0],
  ['Himachal Pradesh', 30.4, 33.2, 75.6, 79.0],
  ['Uttarakhand', 28.7, 31.5, 77.6, 81.0],
  ['Punjab', 29.5, 32.5, 73.9, 76.9],
  ['Haryana', 27.7, 30.9, 74.4, 77.6],
  ['Kerala', 8.3, 12.8, 76.2, 77.4],
  ['Jammu and Kashmir', 32.3, 37.1, 73.7, 80.4],
  ['Ladakh', 32.3, 36.0, 75.0, 80.4],
  ['Arunachal Pradesh', 26.6, 29.5, 91.5, 97.4],
  ['Meghalaya', 25.0, 26.1, 89.8, 92.8],
  ['Manipur', 23.8, 25.7, 93.0, 94.8],
  ['Nagaland', 25.2, 27.0, 93.3, 95.3],
  ['Mizoram', 21.9, 24.5, 92.3, 93.5],
  ['Tripura', 22.9, 24.5, 91.1, 92.4],
  ['Sikkim', 27.1, 28.1, 88.0, 88.9],
  ['Goa', 14.9, 15.8, 73.7, 74.4],
  ['Delhi', 28.4, 28.9, 76.8, 77.4],
  ['Chandigarh', 30.6, 30.8, 76.7, 76.9],
  ['Puducherry', 11.9, 12.1, 79.7, 79.9],
  ['Andaman and Nicobar Islands', 6.0, 13.7, 92.2, 93.9],
  ['Lakshadweep', 10.0, 12.0, 72.0, 73.0],
  ['Dadra and Nagar Haveli and Daman and Diu', 20.1, 20.6, 72.8, 73.1],
];

// Basic country bounding boxes (for abroad detection)
const COUNTRY_BOUNDS = [
  ['UAE', 22.6, 26.1, 51.6, 56.4],
  ['Nepal', 26.3, 30.4, 80.0, 88.2],
  ['Bhutan', 26.7, 28.3, 88.8, 92.1],
  ['Sri Lanka', 5.9, 9.8, 79.7, 81.9],
  ['Maldives', -0.7, 7.1, 72.7, 73.7],
  ['Thailand', 5.6, 20.5, 97.3, 105.6],
  ['Singapore', 1.1, 1.5, 103.6, 104.0],
  ['Malaysia', 1.0, 7.4, 99.6, 119.3],
];

function coordsToLocation(lat, lng) {
  // First check if in India
  if (lat >= 8 && lat <= 37 && lng >= 68 && lng <= 98) {
    for (const [state, minLat, maxLat, minLng, maxLng] of INDIA_STATE_BOUNDS) {
      if (lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng) {
        return { country: 'India', state };
      }
    }
    return { country: 'India', state: '' };
  }

  // Check other countries
  for (const [country, minLat, maxLat, minLng, maxLng] of COUNTRY_BOUNDS) {
    if (lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng) {
      return { country, state: '' };
    }
  }

  return { country: '', state: '' };
}

async function requestAndroidPermission() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Permission',
      message:
        'TripReel uses your location to show nearby trips and experiences.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export function useLocation() {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // "denied" | "unavailable" | null

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Request permission
      if (Platform.OS === 'android') {
        const granted = await requestAndroidPermission();
        if (!granted) {
          setError('denied');
          setLoading(false);
          return;
        }
      } else {
        // iOS — request permission
        const status = await Geolocation.requestAuthorization('whenInUse');
        if (status !== 'granted') {
          setError('denied');
          setLoading(false);
          return;
        }
      }

      // Get coordinates with timeout
      Geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          const result = coordsToLocation(latitude, longitude);
          setCountry(result.country);
          setState(result.state);
          setLoading(false);
        },
        err => {
          setError('unavailable');
          setLoading(false);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
      );
    } catch {
      setError('unavailable');
      setLoading(false);
    }
  }, []);

  return { country, state, loading, error, retry: getLocation, getLocation };
}
