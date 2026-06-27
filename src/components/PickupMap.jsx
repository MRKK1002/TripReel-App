import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Home } from 'lucide-react-native';

/**
 * Airbnb-style "Where you'll be" map.
 * Shows a home marker that smoothly animates between itinerary day pickup points.
 *
 * @param {Array} itinerary - [{ day, title, pickupPoint, pickupLat, pickupLng, isOutsideCity }]
 * @param {number} height - Map height (default 360)
 */
const PickupMap = ({ itinerary = [], height = 360 }) => {
  const mapRef = useRef(null);

  // Only days that have valid coordinates
  const days = itinerary.filter(
    d => typeof d.pickupLat === 'number' && typeof d.pickupLng === 'number',
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Animate camera to the active day's pickup point
  const moveToDay = index => {
    const day = days[index];
    if (!day || !mapRef.current) return;
    setActiveIndex(index);
    mapRef.current.animateCamera(
      {
        center: {
          latitude: day.pickupLat,
          longitude: day.pickupLng,
        },
        zoom: 14,
      },
      { duration: 1000 },
    );
  };

  // Center on first day when map is ready
  useEffect(() => {
    if (days.length === 0) return;
    const t = setTimeout(() => moveToDay(0), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinerary]);

  if (days.length === 0) return null;

  const initialRegion = {
    latitude: days[0].pickupLat,
    longitude: days[0].pickupLng,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const activeDay = days[activeIndex];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Where we meet</Text>
      {activeDay?.pickupPoint ? (
        <Text style={styles.subheading}>{activeDay.pickupPoint}</Text>
      ) : null}

      <View style={[styles.mapBox, { height }]}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={initialRegion}
          rotateEnabled={false}
          pitchEnabled={false}
          userInterfaceStyle="light"
          customMapStyle={[]}
        >
          {days.map((d, i) => (
            <Marker
              key={`day-${d.day ?? i}`}
              coordinate={{ latitude: d.pickupLat, longitude: d.pickupLng }}
              title={`Day ${d.day ?? i + 1}: ${d.title || ''}`}
              description={d.pickupPoint || ''}
              onPress={() => moveToDay(i)}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              {i === activeIndex ? (
                <View style={styles.homePinOuter}>
                  <View style={styles.homePin}>
                    <Home size={20} color="#fff" />
                  </View>
                </View>
              ) : (
                <View
                  style={[
                    styles.dotPin,
                    d.isOutsideCity && { backgroundColor: '#D97706' },
                  ]}
                />
              )}
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Day selector chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {days.map((d, i) => {
          const isActive = i === activeIndex;
          return (
            <TouchableOpacity
              key={`chip-${d.day ?? i}`}
              onPress={() => moveToDay(i)}
              activeOpacity={0.8}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Text
                style={[styles.chipText, isActive && styles.chipTextActive]}
              >
                Day {d.day ?? i + 1}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  mapBox: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  homePinOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(31,138,112,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1F8A70',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 8,
  },
  dotPin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1F8A70',
    borderWidth: 2,
    borderColor: '#fff',
  },
  chipRow: {
    paddingTop: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  chipTextActive: {
    color: '#fff',
  },
});

export default PickupMap;
