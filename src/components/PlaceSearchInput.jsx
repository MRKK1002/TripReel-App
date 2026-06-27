import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { MapPin, X } from 'lucide-react-native';

const API_KEY = 'AIzaSyDBLj3hgiFNaW6-CVBEKLFg9847oUb_TF4';

/**
 * Google Places search for React Native (Places API New, REST — no native dep).
 *
 * @param {object} value   - { name, lat, lng } currently selected (or null)
 * @param {function} onSelect - called with { name, lat, lng, address }
 * @param {function} onClear  - called when the user clears the selection
 * @param {string} placeholder
 */
const PlaceSearchInput = ({ value, onSelect, onClear, placeholder }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const fetchSuggestions = async input => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        'https://places.googleapis.com/v1/places:autocomplete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
          },
          body: JSON.stringify({
            input,
            includedRegionCodes: ['in'],
            languageCode: 'en',
          }),
        },
      );
      const data = await res.json();
      const items = (data.suggestions || [])
        .filter(s => s.placePrediction)
        .map(s => ({
          placeId: s.placePrediction.placeId,
          mainText:
            s.placePrediction.structuredFormat?.mainText?.text ||
            s.placePrediction.text?.text ||
            '',
          secondaryText:
            s.placePrediction.structuredFormat?.secondaryText?.text || '',
        }));
      setSuggestions(items);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = text => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(text), 300);
  };

  const handleSelect = async s => {
    setSuggestions([]);
    setQuery('');
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${s.placeId}`,
        {
          headers: {
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'displayName,formattedAddress,location',
          },
        },
      );
      const place = await res.json();
      onSelect({
        name: place.displayName?.text || s.mainText,
        address: place.formattedAddress || s.secondaryText,
        lat: place.location?.latitude || null,
        lng: place.location?.longitude || null,
      });
    } catch {
      onSelect({
        name: s.mainText,
        address: s.secondaryText,
        lat: null,
        lng: null,
      });
    }
  };

  // Selected state — show chip with clear button
  if (value?.name) {
    return (
      <View style={styles.selectedBox}>
        <MapPin size={14} color="#1F8A70" />
        <Text style={styles.selectedText} numberOfLines={1}>
          {value.name}
        </Text>
        <TouchableOpacity onPress={onClear} hitSlop={8}>
          <X size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.inputRow}>
        <MapPin size={16} color="#9CA3AF" />
        <TextInput
          value={query}
          onChangeText={handleChange}
          placeholder={placeholder || 'Search a place...'}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
        {loading && <ActivityIndicator size="small" color="#1F8A70" />}
      </View>
      {suggestions.length > 0 && (
        <View style={styles.dropdown}>
          {suggestions.map((s, i) => (
            <TouchableOpacity
              key={s.placeId || i}
              onPress={() => handleSelect(s)}
              style={styles.suggestion}
            >
              <Text style={styles.suggestionMain} numberOfLines={1}>
                {s.mainText}
              </Text>
              {s.secondaryText ? (
                <Text style={styles.suggestionSub} numberOfLines={1}>
                  {s.secondaryText}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFB',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: '#111827',
    paddingVertical: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  suggestion: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionMain: { fontSize: 13, fontWeight: '600', color: '#111827' },
  suggestionSub: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  selectedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#1F8A70',
    backgroundColor: '#E6F4EF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  selectedText: { flex: 1, fontSize: 13, color: '#065F46', fontWeight: '600' },
});

export default PlaceSearchInput;
