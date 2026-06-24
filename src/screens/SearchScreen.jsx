import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Search,
  MapPin,
  Navigation,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Star,
  SlidersHorizontal,
  X,
  Minus,
  Plus,
} from 'lucide-react-native';
import { packagesAPI, SERVER_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../hooks/useLocation';

const resolveImage = url => {
  if (!url) return null;
  if (url.startsWith('http')) {
    if (url.includes('/uploads/')) {
      const path = url.substring(url.indexOf('/uploads/'));
      return `${SERVER_URL}${path}`;
    }
    return url;
  }
  return `${SERVER_URL}${url.startsWith('/') ? url : '/' + url}`;
};

const SearchScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { state: gpsState } = useLocation();

  const [searchText, setSearchText] = useState('');
  const [whereExpanded, setWhereExpanded] = useState(true);
  const [whenExpanded, setWhenExpanded] = useState(false);
  const [whoExpanded, setWhoExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popularDests, setPopularDests] = useState([]);
  const [allDests, setAllDests] = useState([]);

  // Date filter — range selection
  const [selectedDate, setSelectedDate] = useState(null); // start date
  const [selectedEndDate, setSelectedEndDate] = useState(null); // end date
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const maxCalDate = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 2);
    return d;
  }, []);
  const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = useCallback((y, m) => {
    const firstDay = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  }, []);

  const canGoPrev = !(
    calendarYear === today.getFullYear() && calendarMonth === today.getMonth()
  );
  const canGoNext = !(
    calendarYear === maxCalDate.getFullYear() &&
    calendarMonth === maxCalDate.getMonth()
  );

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    if (calendarMonth === 0) {
      setCalendarYear(y => y - 1);
      setCalendarMonth(11);
    } else setCalendarMonth(m => m - 1);
  }, [canGoPrev, calendarMonth]);

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    if (calendarMonth === 11) {
      setCalendarYear(y => y + 1);
      setCalendarMonth(0);
    } else setCalendarMonth(m => m + 1);
  }, [canGoNext, calendarMonth]);

  const pickShortcut = useCallback(daysFromToday => {
    const now = new Date();
    const d = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysFromToday,
      12,
      0,
      0,
      0,
    );
    setSelectedDate(d);
    setSelectedEndDate(null); // shortcuts = single day, no range
    setCalendarYear(d.getFullYear());
    setCalendarMonth(d.getMonth());
  }, []);

  const calendarMonthLabel = useMemo(
    () =>
      new Date(calendarYear, calendarMonth, 1).toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
      }),
    [calendarYear, calendarMonth],
  );

  // Guest filter
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Fetch popular + all destinations for suggestions
  useEffect(() => {
    // Popular for the label section
    packagesAPI
      .getPopular(10)
      .then(res => {
        const pkgs = res.data?.packages || [];
        const seen = new Set();
        const dests = [];
        pkgs.forEach(p => {
          const loc = p.location || '';
          if (loc && !seen.has(loc.toLowerCase())) {
            seen.add(loc.toLowerCase());
            dests.push({
              id: p._id,
              name: loc,
              subtitle: p.state
                ? `${p.state}, ${p.country || 'India'}`
                : p.country || '',
            });
          }
        });
        setPopularDests(dests);
      })
      .catch(() => {});

    // All destinations for search filtering
    packagesAPI
      .getAll({ limit: 100 })
      .then(res => {
        const pkgs = res.data?.packages || [];
        const seen = new Set();
        const dests = [];
        pkgs.forEach(p => {
          const loc = p.location || '';
          if (loc && !seen.has(loc.toLowerCase())) {
            seen.add(loc.toLowerCase());
            dests.push({
              id: p._id,
              name: loc,
              subtitle: p.state
                ? `${p.state}, ${p.country || 'India'}`
                : p.country || '',
            });
          }
          // Also add by title if different from location
          if (p.title && !seen.has(p.title.toLowerCase())) {
            seen.add(p.title.toLowerCase());
            dests.push({
              id: p._id + '_t',
              name: p.title,
              subtitle: p.location || '',
            });
          }
        });
        setAllDests(dests);
      })
      .catch(() => {});
  }, []);

  // Search — accepts text + date/range explicitly, no stale closure possible
  const doSearch = async (query, startDate, endDate) => {
    if (!query.trim() && !startDate) return;
    setLoading(true);
    setShowResults(true);
    try {
      const params = { limit: 50 };
      if (query.trim()) params.search = query;
      if (startDate && endDate) {
        // Range: show packages that start anywhere in the window
        params.dateFrom = startDate.toISOString().split('T')[0];
        params.dateTo = endDate.toISOString().split('T')[0];
      } else if (startDate) {
        // Single day
        params.date = startDate.toISOString().split('T')[0];
      }
      const totalGuests = adults + children;
      if (totalGuests > 0) params.guests = totalGuests;
      const res = await packagesAPI.getAll(params);
      setResults(res.data?.packages || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () =>
    doSearch(searchText, selectedDate, selectedEndDate);

  const handleClearAll = () => {
    setSearchText('');
    setResults([]);
    setShowResults(false);
    setSelectedDate(null);
    setSelectedEndDate(null);
    setAdults(1);
    setChildren(0);
  };

  const handleSelectSuggestion = name => {
    setSearchText(name);
    doSearch(name, selectedDate, selectedEndDate);
  };

  const handleNearby = () => {
    const state = gpsState || user?.state || '';
    if (state) {
      setSearchText(state);
      doSearch(state, selectedDate, selectedEndDate);
    }
  };

  // Filter suggestions: typing → from all; empty → show popular
  const filteredSuggestions = searchText.trim()
    ? allDests.filter(
        d =>
          d.name.toLowerCase().includes(searchText.toLowerCase()) ||
          d.subtitle.toLowerCase().includes(searchText.toLowerCase()),
      )
    : popularDests;

  // ── Results View ────────────────────────────────────────────────────────────
  if (showResults) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

        {/* Search Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#F9FAFB',
          }}
        >
          <TouchableOpacity
            onPress={() => setShowResults(false)}
            style={{ marginRight: 10 }}
          >
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 24,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <Search size={16} color="#9CA3AF" />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search destinations..."
              placeholderTextColor="#9CA3AF"
              style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111827' }}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={handleClearAll}>
                <X size={16} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results */}
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#1F8A70" />
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={item => item._id}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 60 }}>
                <Search size={40} color="#D1D5DB" />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#9CA3AF',
                    marginTop: 12,
                  }}
                >
                  No results found for "{searchText}"
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const imgUri =
                resolveImage(item.image_url) ||
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop';
              const price = item.pricing?.adultPrice || item.price || 0;
              const duration = item.durationDays
                ? `${item.durationDays} Days · ${
                    (item.durationDays || 1) - 1
                  } Nights`
                : item.duration || '';

              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DestinationDetail', {
                      destination: item,
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    borderRadius: 14,
                    marginBottom: 14,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOpacity: 0.04,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 2,
                  }}
                  activeOpacity={0.85}
                >
                  <Image
                    source={{ uri: imgUri }}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 12,
                      margin: 10,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      paddingRight: 12,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: 4,
                      }}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    {duration ? (
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          backgroundColor: '#E6F4EF',
                          borderRadius: 6,
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          marginBottom: 6,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#1F8A70',
                            fontWeight: '600',
                          }}
                        >
                          {duration}
                        </Text>
                      </View>
                    ) : null}
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Star size={13} color="#F59E0B" fill="#F59E0B" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: '#111827',
                          marginLeft: 3,
                        }}
                      >
                        {item.avgRating || 'New'}
                      </Text>
                      {item.reviewCount > 0 && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#1F8A70',
                            marginLeft: 4,
                          }}
                        >
                          {item.reviewCount} reviews
                        </Text>
                      )}
                      {price > 0 && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#6B7280',
                            marginLeft: 4,
                          }}
                        >
                          • From ₹{Number(price).toLocaleString('en-IN')}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </SafeAreaView>
    );
  }

  // ── Search Form View ────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <X size={18} color="#374151" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
          Search your destination
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Where Section */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginTop: 4,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setWhereExpanded(!whereExpanded)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MapPin size={20} color="#1F8A70" />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
                >
                  Where
                </Text>
                <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
                  Select your destination
                </Text>
              </View>
            </View>
            {whereExpanded ? (
              <ChevronUp size={20} color="#6B7280" />
            ) : (
              <ChevronDown size={20} color="#6B7280" />
            )}
          </TouchableOpacity>

          {whereExpanded && (
            <View style={{ marginTop: 14 }}>
              {/* Search Input */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#F9FAFB',
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 11,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}
              >
                <Search size={18} color="#9CA3AF" />
                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search Destination"
                  placeholderTextColor="#9CA3AF"
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    fontSize: 14,
                    color: '#111827',
                  }}
                  returnKeyType="search"
                  onSubmitEditing={handleSearch}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchText('')}>
                    <X size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Nearby */}
              <TouchableOpacity
                onPress={handleNearby}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  backgroundColor: '#F9FAFB',
                  borderRadius: 12,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}
              >
                <Navigation size={18} color="#1F8A70" />
                <View style={{ marginLeft: 12 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#111827',
                    }}
                  >
                    Nearby
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}
                  >
                    Find destinations near you
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Popular Destinations */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#111827',
                  marginTop: 18,
                  marginBottom: 10,
                }}
              >
                Popular Destinations
              </Text>
              <View
                style={{
                  backgroundColor: '#F9FAFB',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  overflow: 'hidden',
                }}
              >
                {filteredSuggestions.length === 0 ? (
                  <View style={{ padding: 14 }}>
                    <Text style={{ fontSize: 13, color: '#9CA3AF' }}>
                      No matching destinations
                    </Text>
                  </View>
                ) : (
                  filteredSuggestions.map((dest, index) => (
                    <TouchableOpacity
                      key={dest.id}
                      onPress={() => handleSelectSuggestion(dest.name)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 14,
                        borderBottomWidth:
                          index < filteredSuggestions.length - 1 ? 1 : 0,
                        borderBottomColor: '#E5E7EB',
                      }}
                    >
                      <View
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 10,
                          backgroundColor: '#E6F4EF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 12,
                        }}
                      >
                        <MapPin size={18} color="#1F8A70" />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#111827',
                          }}
                        >
                          {dest.name}
                        </Text>
                        {dest.subtitle ? (
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#9CA3AF',
                              marginTop: 1,
                            }}
                          >
                            {dest.subtitle}
                          </Text>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          )}
        </View>

        {/* When Section */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginTop: 10,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setWhenExpanded(!whenExpanded)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar size={20} color="#6B7280" />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
                >
                  {selectedDate && selectedEndDate
                    ? `${selectedDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                      })} → ${selectedEndDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                      })}`
                    : selectedDate
                    ? selectedDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Any week'}
                </Text>
                <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
                  When
                </Text>
              </View>
            </View>
            {whenExpanded ? (
              <ChevronUp size={20} color="#6B7280" />
            ) : (
              <ChevronDown size={20} color="#6B7280" />
            )}
          </TouchableOpacity>

          {whenExpanded && (
            <View style={{ marginTop: 14 }}>
              {/* Quick shortcuts */}
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                {[
                  {
                    label: 'Today',
                    sub: new Date().toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    }),
                    days: 0,
                  },
                  {
                    label: 'Tomorrow',
                    sub: new Date(Date.now() + 86400000).toLocaleDateString(
                      'en-IN',
                      { day: '2-digit', month: 'short' },
                    ),
                    days: 1,
                  },
                  {
                    label: 'This weekend',
                    sub: (() => {
                      const d = new Date();
                      const sat = new Date(d);
                      sat.setDate(d.getDate() + (6 - d.getDay()));
                      const sun = new Date(sat);
                      sun.setDate(sat.getDate() + 1);
                      return `${sat.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                      })} – ${sun.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                      })}`;
                    })(),
                    days: 6 - new Date().getDay(),
                  },
                ].map(sc => {
                  const scDate = new Date(today);
                  scDate.setDate(today.getDate() + sc.days);
                  const isActive =
                    selectedDate &&
                    selectedDate.toDateString() === scDate.toDateString();
                  return (
                    <TouchableOpacity
                      key={sc.label}
                      onPress={() => pickShortcut(sc.days)}
                      style={{
                        flex: 1,
                        borderRadius: 12,
                        borderWidth: 1.5,
                        borderColor: isActive ? '#1F8A70' : '#E5E7EB',
                        backgroundColor: isActive ? '#E6F4EF' : '#fff',
                        paddingVertical: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '700',
                          color: isActive ? '#1F8A70' : '#111827',
                        }}
                      >
                        {sc.label}
                      </Text>
                      <Text
                        style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}
                      >
                        {sc.sub}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Month nav header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <TouchableOpacity
                  onPress={goPrev}
                  disabled={!canGoPrev}
                  style={{ padding: 8, opacity: canGoPrev ? 1 : 0.3 }}
                >
                  <ChevronLeft size={20} color="#374151" />
                </TouchableOpacity>
                <Text
                  style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}
                >
                  {calendarMonthLabel}
                </Text>
                <TouchableOpacity
                  onPress={goNext}
                  disabled={!canGoNext}
                  style={{ padding: 8, opacity: canGoNext ? 1 : 0.3 }}
                >
                  <ChevronRight size={20} color="#374151" />
                </TouchableOpacity>
              </View>

              {/* Day names row */}
              <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                {DAY_NAMES.map((n, i) => (
                  <Text
                    key={i}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#9CA3AF',
                    }}
                  >
                    {n}
                  </Text>
                ))}
              </View>

              {/* Calendar grid */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {getDaysInMonth(calendarYear, calendarMonth).map((day, i) => {
                  if (!day)
                    return (
                      <View
                        key={i}
                        style={{ width: '14.28%', aspectRatio: 1 }}
                      />
                    );
                  const cellDate = new Date(
                    calendarYear,
                    calendarMonth,
                    day,
                    12,
                    0,
                    0,
                    0,
                  );
                  const isPast = cellDate < today;
                  const isStart =
                    selectedDate &&
                    cellDate.toDateString() === selectedDate.toDateString();
                  const isEnd =
                    selectedEndDate &&
                    cellDate.toDateString() === selectedEndDate.toDateString();
                  const isInRange =
                    selectedDate &&
                    selectedEndDate &&
                    cellDate > selectedDate &&
                    cellDate < selectedEndDate;
                  const isSelected = isStart || isEnd;
                  const isToday =
                    cellDate.toDateString() === today.toDateString();
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        if (isPast) return;
                        if (!selectedDate || selectedEndDate) {
                          // Start fresh: first tap = start date
                          setSelectedDate(cellDate);
                          setSelectedEndDate(null);
                        } else {
                          // Second tap: set end if after start, else reset start
                          if (cellDate > selectedDate) {
                            setSelectedEndDate(cellDate);
                          } else {
                            setSelectedDate(cellDate);
                            setSelectedEndDate(null);
                          }
                        }
                      }}
                      activeOpacity={isPast ? 1 : 0.7}
                      style={{
                        width: '14.28%',
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 17,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: isInRange ? 1 : 0,
                          borderColor: isInRange ? '#1F8A70' : 'transparent',
                          borderStyle: 'dashed',
                          backgroundColor: isSelected
                            ? '#1F8A70'
                            : isToday
                            ? '#E6F4EF'
                            : 'transparent',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: isToday || isSelected ? '700' : '400',
                            color: isSelected
                              ? '#fff'
                              : isPast
                              ? '#CBD5E1'
                              : isToday
                              ? '#1F8A70'
                              : isInRange
                              ? '#1F8A70'
                              : '#111827',
                            textDecorationLine: isPast
                              ? 'line-through'
                              : 'none',
                          }}
                        >
                          {day}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Range hint + clear */}
              <View style={{ marginTop: 12, alignItems: 'center' }}>
                {!selectedDate && (
                  <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                    Tap a date to select, tap again to set end date
                  </Text>
                )}
                {selectedDate && !selectedEndDate && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#1F8A70',
                      fontWeight: '600',
                    }}
                  >
                    From{' '}
                    {selectedDate.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}{' '}
                    — tap another date to set end
                  </Text>
                )}
                {selectedDate && selectedEndDate && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#1F8A70',
                      fontWeight: '600',
                    }}
                  >
                    {selectedDate.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}{' '}
                    →{' '}
                    {selectedEndDate.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                )}
                {selectedDate && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedDate(null);
                      setSelectedEndDate(null);
                      doSearch(searchText, null, null);
                    }}
                    style={{
                      marginTop: 6,
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      borderRadius: 20,
                      borderWidth: 1.5,
                      borderColor: '#E5E7EB',
                      backgroundColor: '#F9FAFB',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#374151',
                        fontWeight: '600',
                      }}
                    >
                      Clear dates
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Who Section */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginTop: 10,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setWhoExpanded(!whoExpanded)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Users size={20} color="#6B7280" />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}
                >
                  {adults + children > 1
                    ? `${adults} adult${adults > 1 ? 's' : ''}${
                        children > 0 ? `, ${children} child` : ''
                      }`
                    : 'Add guests'}
                </Text>
                <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 1 }}>
                  Who
                </Text>
              </View>
            </View>
            {whoExpanded ? (
              <ChevronUp size={20} color="#6B7280" />
            ) : (
              <ChevronDown size={20} color="#6B7280" />
            )}
          </TouchableOpacity>

          {whoExpanded && (
            <View style={{ marginTop: 14, gap: 14 }}>
              {/* Adults */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#111827',
                    }}
                  >
                    Adults
                  </Text>
                  <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Age 8+</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setAdults(Math.max(1, adults - 1))}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Minus size={14} color="#6B7280" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#111827',
                      width: 20,
                      textAlign: 'center',
                    }}
                  >
                    {adults}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setAdults(adults + 1)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Plus size={14} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Children */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#111827',
                    }}
                  >
                    Children
                  </Text>
                  <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                    Age 7 or below
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setChildren(Math.max(0, children - 1))}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Minus size={14} color="#6B7280" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#111827',
                      width: 20,
                      textAlign: 'center',
                    }}
                  >
                    {children}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setChildren(children + 1)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Plus size={14} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        }}
      >
        <TouchableOpacity onPress={handleClearAll}>
          <Text
            style={{
              fontSize: 15,
              color: '#374151',
              textDecorationLine: 'underline',
              fontWeight: '500',
            }}
          >
            Clear All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: '#1F8A70',
            paddingHorizontal: 36,
            paddingVertical: 14,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
