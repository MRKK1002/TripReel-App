import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Share,
  Alert,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  Upload,
  Heart,
  MapPin,
  Tag,
  Star,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { useWishlist } from '../context/WishlistContext';

const { width } = Dimensions.get('window');

// ─── Divider ──────────────────────────────────────────────────────────────────
const Divider = () => <View style={{ height: 1, backgroundColor: '#f3f4f6', marginVertical: 4 }} />;

// ─── Section wrapper ─────────────────────────────────────────────────────────
const Section = ({ children, style }) => (
  <View style={[{ paddingHorizontal: 20, paddingVertical: 20 }, style]}>{children}</View>
);
const SectionTitle = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PackageDetailScreen = () => {
  const route      = useRoute();
  const navigation = useNavigation();
  const { isSaved, toggleWishlist } = useWishlist();

  const [currentImageIdx,    setCurrentImageIdx]    = useState(0);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const [aboutExpanded,      setAboutExpanded]      = useState(false);
  const [itineraryExpanded,  setItineraryExpanded]  = useState(true);
  const [expandedDays,       setExpandedDays]       = useState({ 0: true });
  const [showAllDays,        setShowAllDays]        = useState(false);
  const [selectedDate,       setSelectedDate]       = useState(0);
  const [inclExclExpanded,   setInclExclExpanded]   = useState(true);
  const [showMoreInclExcl,   setShowMoreInclExcl]   = useState(false);
  const [policiesExpanded,   setPoliciesExpanded]   = useState(true);
  const [savingWishlist,     setSavingWishlist]      = useState(false);
  const [addedAddons,        setAddedAddons]         = useState({});

  // Toast
  const [toastMsg,  setToastMsg]  = useState('');
  const [toastType, setToastType] = useState('save');
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTimer   = useRef(null);

  const showToast = useCallback((msg, type = 'save') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastType(type);
    Animated.sequence([
      Animated.timing(toastOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(1800),
      Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
    toastTimer.current = setTimeout(() => setToastMsg(''), 2400);
  }, [toastOpacity]);

  if (!route.params?.package) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#1F8A70" />
      </View>
    );
  }

  const pkg = route.params.package;

  const title      = pkg.title      || 'Package';
  const price      = pkg.price      || 0;
  const location   = pkg.location   || '';
  const rating     = pkg.rating     || 4.5;
  const reviews    = pkg.reviews    || '20k reviews';
  const booked     = pkg.booked     || '100K+ booked';
  const about      = pkg.about      || pkg.description || 'No description available.';
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights : [];
  const inclusions = Array.isArray(pkg.inclusions) ? pkg.inclusions : [];
  const exclusions = Array.isArray(pkg.exclusions) ? pkg.exclusions : [];
  const itinerary  = Array.isArray(pkg.itinerary)  ? pkg.itinerary  : [];
  const addons     = Array.isArray(pkg.addons)     ? pkg.addons     : [];
  const dates      = Array.isArray(pkg.dates)      ? pkg.dates      : [];
  const policies   = pkg.policies || {};

  const imageList =
    Array.isArray(pkg.images) && pkg.images.length > 0
      ? pkg.images
      : pkg.image_url
      ? [pkg.image_url]
      : [];

  const handleShare = async () => {
    try {
      await Share.share({ message: `Check out this amazing ${title} package for just ₹${price}!` });
    } catch (e) {}
  };

  const toggleDay = (i) =>
    setExpandedDays(prev => ({ ...prev, [i]: !prev[i] }));

  // ── Image Carousel ────────────────────────────────────────────────────────
  const renderImageCarousel = () => (
    <View style={{ backgroundColor: '#000' }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentImageIdx(idx);
        }}
      >
        {imageList.length > 0
          ? imageList.map((img, i) => (
              <Image
                key={i}
                source={{ uri: img }}
                style={{ width, height: width * 0.72 }}
                resizeMode="cover"
              />
            ))
          : (
            <View style={{ width, height: width * 0.72, backgroundColor: '#E6F4EF', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#94A3B8' }}>No images available</Text>
            </View>
          )
        }
      </ScrollView>

      {/* Back */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <ArrowLeft size={20} color="#1f2937" strokeWidth={2.5} />
      </TouchableOpacity>

      {/* Share + Heart */}
      <View style={styles.carouselActions}>
        <TouchableOpacity onPress={handleShare} style={styles.actionBtn}>
          <Upload size={17} color="#1f2937" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            if (savingWishlist) return;
            setSavingWishlist(true);
            const wasSaved = isSaved(pkg._id);
            await toggleWishlist(pkg._id);
            showToast(wasSaved ? 'Removed from wishlist' : 'Saved to wishlist', wasSaved ? 'remove' : 'save');
            setSavingWishlist(false);
          }}
          style={styles.actionBtn}
        >
          {savingWishlist
            ? <ActivityIndicator size="small" color="#1F8A70" />
            : <Heart
                size={17}
                color={isSaved(pkg._id) ? '#EF4444' : '#1f2937'}
                fill={isSaved(pkg._id) ? '#EF4444' : 'none'}
                strokeWidth={2}
              />
          }
        </TouchableOpacity>
      </View>

      {/* Dot indicators: active = filled white pill, inactive = white outline circle */}
      {imageList.length > 1 && (
        <View style={styles.dotRow}>
          {imageList.map((_, i) => (
            <View
              key={i}
              style={currentImageIdx === i ? styles.dotActive : styles.dotInactive}
            />
          ))}
        </View>
      )}
    </View>
  );

  // ── Title Block ───────────────────────────────────────────────────────────
  const renderTitleBlock = () => (
    <View style={styles.titleBlock}>
      <Text style={styles.titleText}>{title}</Text>

      {/* Rating row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 5 }}>
        <Star size={14} color="#4CAF50" fill="#4CAF50" />
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#1f2937' }}>{rating}</Text>
        <TouchableOpacity>
          <Text style={styles.reviewLink}>{reviews}</Text>
        </TouchableOpacity>
        <Text style={{ color: '#9ca3af', fontSize: 13 }}>•</Text>
        <Text style={{ color: '#6b7280', fontSize: 13 }}>{booked}</Text>
      </View>

      {/* Location + Price row */}
      <View style={styles.metaRow}>
        {/* Destination */}
        <View style={styles.metaItem}>
          <MapPin size={18} color="#6b7280" strokeWidth={1.8} />
          <View>
            <Text style={styles.metaValue}>{location || 'Location'}</Text>
            <Text style={styles.metaLabel}>Destination</Text>
          </View>
        </View>

        <View style={styles.metaDividerV} />

        {/* Price */}
        <View style={styles.metaItem}>
          <Tag size={18} color="#6b7280" strokeWidth={1.8} />
          <View>
            <Text style={styles.metaValue}>From ₹{price.toLocaleString('en-IN')}/guest</Text>
            <Text style={styles.metaLabel}>Price</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // ── Highlights ────────────────────────────────────────────────────────────
  const renderHighlights = () => {
    if (!highlights.length) return null;
    const visible = highlightsExpanded ? highlights : highlights.slice(0, 3);
    return (
      <View style={styles.highlightBox}>
        {visible.map((h, i) => (
          <View key={i} style={styles.checkRow}>
            <Check size={14} color="#1F8A70" strokeWidth={2.5} />
            <Text style={styles.checkText}>{h}</Text>
          </View>
        ))}
        {highlights.length > 3 && (
          <TouchableOpacity onPress={() => setHighlightsExpanded(!highlightsExpanded)}>
            <Text style={styles.showMoreLink}>
              {highlightsExpanded ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // ── About ─────────────────────────────────────────────────────────────────
  const renderAbout = () => {
    const SHORT = 120;
    const isLong = about.length > SHORT;
    const displayText = aboutExpanded || !isLong ? about : about.slice(0, SHORT) + '...';
    return (
      <Section style={{ paddingTop: 0 }}>
        <SectionTitle>About this trip</SectionTitle>
        <Text style={styles.bodyText}>{displayText}</Text>
        {isLong && (
          <TouchableOpacity onPress={() => setAboutExpanded(!aboutExpanded)}>
            <Text style={styles.showMoreLink}>{aboutExpanded ? 'Read Less' : 'Read More'}</Text>
          </TouchableOpacity>
        )}
      </Section>
    );
  };

  // ── Itinerary ─────────────────────────────────────────────────────────────
  const renderItinerary = () => {
    if (!itinerary.length) return null;
    const visibleDays = showAllDays ? itinerary : itinerary.slice(0, 1);

    return (
      <Section style={styles.graySection}>
        <View style={styles.collapsibleHeader}>
          <SectionTitle>Itinerary</SectionTitle>
          <TouchableOpacity onPress={() => setItineraryExpanded(!itineraryExpanded)}>
            {itineraryExpanded ? <ChevronUp /> : <ChevronDown />}
          </TouchableOpacity>
        </View>

        {itineraryExpanded && (
          <>
            {visibleDays.map((day, i) => (
              <View key={i} style={styles.dayBlock}>
                {/* Day header */}
                <TouchableOpacity style={styles.dayHeader} onPress={() => toggleDay(i)} activeOpacity={0.8}>
                  <View style={styles.dayIconBox}>
                    <Check size={18} color="#1F8A70" strokeWidth={2.5} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dayTitle}>Day {day.day ?? i + 1}</Text>
                    <Text style={styles.daySubtitle}>{day.title || 'Activities'}</Text>
                  </View>
                  {expandedDays[i]
                    ? <ChevronUp size={16} color="#9ca3af" />
                    : <ChevronDown size={16} color="#9ca3af" />
                  }
                </TouchableOpacity>

                {/* Day points */}
                {expandedDays[i] && Array.isArray(day.points) && day.points.map((point, j) => (
                  <View key={j} style={styles.checkRow}>
                    <Check size={14} color="#1F8A70" strokeWidth={2.5} />
                    <Text style={styles.checkText}>{point}</Text>
                  </View>
                ))}
              </View>
            ))}

            {itinerary.length > 1 && (
              <TouchableOpacity onPress={() => setShowAllDays(!showAllDays)}>
                <Text style={[styles.showMoreLink, { textAlign: 'center', marginTop: 8 }]}>
                  {showAllDays ? 'Show less' : `Show full ${itinerary.length} days`}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </Section>
    );
  };

  // ── Available Dates & Pricing ─────────────────────────────────────────────
  const renderDates = () => {
    if (!dates.length) return null;
    return (
      <Section>
        <SectionTitle>Available Dates &amp; Pricing</SectionTitle>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 4 }}>
          {dates.map((d, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setSelectedDate(i)}
              style={[styles.dateCard, selectedDate === i && styles.dateCardSelected]}
            >
              {selectedDate === i && (
                <View style={styles.dateRadio}>
                  <View style={styles.dateRadioInner} />
                </View>
              )}
              <Text style={[styles.dateText, selectedDate === i && { color: '#1F8A70' }]}>
                {d.label || d.date}
              </Text>
              <Text style={[styles.datePriceText, selectedDate === i && { color: '#1F8A70' }]}>
                ₹{(d.price || price).toLocaleString('en-IN')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Section>
    );
  };

  const renderInclExcl = () => {
    if (!inclusions.length && !exclusions.length) return null;

    const combined = [
      ...inclusions.map(t => ({ text: t, included: true })),
      ...exclusions.map(t => ({ text: t, included: false })),
    ];
    const visible = showMoreInclExcl ? combined : combined.slice(0, 4);

    return (
      <Section style={styles.graySection}>
        <View style={styles.collapsibleHeader}>
          <SectionTitle>Inclusions / Exclusions</SectionTitle>
          <TouchableOpacity onPress={() => setInclExclExpanded(!inclExclExpanded)}>
            {inclExclExpanded ? <ChevronUp /> : <ChevronDown />}
          </TouchableOpacity>
        </View>

        {inclExclExpanded && (
          <>
            {visible.map((item, i) => (
              <View key={i} style={styles.checkRow}>
                {item.included
                  ? <Check size={14} color="#1F8A70" strokeWidth={2.5} />
                  : <X size={14} color="#ef4444" strokeWidth={2.5} />
                }
                <Text style={styles.checkText}>{item.text}</Text>
              </View>
            ))}
            {combined.length > 4 && (
              <TouchableOpacity onPress={() => setShowMoreInclExcl(!showMoreInclExcl)}>
                <Text style={styles.showMoreLink}>{showMoreInclExcl ? 'Show Less' : 'Show More'}</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </Section>
    );
  };
  const renderAddons = () => {
    if (!addons.length) return null;
    return (
      <Section>
        <Text style={styles.sectionTitle}>
          Add-ons - <Text style={{ fontStyle: 'italic', fontWeight: '400' }}>Make your trip memorable</Text>
        </Text>

        {addons.map((addon, i) => {
          const isAdded = addedAddons[i];
          return (
            <View key={i} style={styles.addonCard}>
              {/* Top row: text + image */}
              <View style={styles.addonTopRow}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={styles.addonName}>{addon.name}</Text>
                  <Text style={styles.addonSub}>{addon.subtitle || (Array.isArray(addon.details) ? addon.details.join(' & ') : '')}</Text>
                </View>
                {addon.image ? (
                  <Image source={{ uri: addon.image }} style={styles.addonImage} />
                ) : (
                  <View style={[styles.addonImage, { backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' }]}>
                    <Text style={{ fontSize: 24 }}>📷</Text>
                  </View>
                )}
              </View>

              {/* Chips row */}
              {Array.isArray(addon.chips) && addon.chips.length > 0 && (
                <View style={styles.chipsRow}>
                  {addon.chips.map((chip, j) => (
                    <View key={j} style={styles.chip}>
                      <Text style={styles.chipIcon}>{chip.icon || '•'}</Text>
                      <Text style={styles.chipText}>{chip.label}</Text>
                    </View>
                  ))}
                </View>
              )}
              {/* Fallback: details as chips */}
              {(!Array.isArray(addon.chips) || addon.chips.length === 0) && Array.isArray(addon.details) && addon.details.length > 0 && (
                <View style={styles.chipsRow}>
                  {addon.details.map((d, j) => (
                    <View key={j} style={styles.chip}>
                      <Text style={styles.chipText}>{d}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Price + Add button */}
              <View style={styles.addonFooter}>
                <Text style={styles.addonPrice}>
                  Just <Text style={{ fontWeight: '700' }}>₹{(addon.price || 0).toLocaleString('en-IN')}</Text>
                </Text>
                <TouchableOpacity
                  style={[styles.addBtn, isAdded && styles.addBtnAdded]}
                  onPress={() => setAddedAddons(prev => ({ ...prev, [i]: !prev[i] }))}
                >
                  <Text style={[styles.addBtnText, isAdded && { color: '#fff' }]}>
                    {isAdded ? 'Added ✓' : 'Add'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Watch Demo Videos */}
              <TouchableOpacity style={styles.demoBtn}>
                <Text style={styles.demoBtnText}>Watch Demo Videos</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </Section>
    );
  };
  const renderPolicies = () => {
    const cancellation = policies.cancellation || [];
    const payment      = policies.payment      || [];
    if (!cancellation.length && !payment.length) return null;

    return (
      <Section style={styles.graySection}>
        <View style={styles.collapsibleHeader}>
          <SectionTitle>Policies</SectionTitle>
          <TouchableOpacity onPress={() => setPoliciesExpanded(!policiesExpanded)}>
            {policiesExpanded ? <ChevronUp /> : <ChevronDown />}
          </TouchableOpacity>
        </View>

        {policiesExpanded && (
          <>
            {cancellation.length > 0 && (
              <>
                <Text style={styles.policySubTitle}>Cancellation Policy</Text>
                {cancellation.map((p, i) => (
                  <View key={i} style={styles.checkRow}>
                    <Check size={14} color="#1F8A70" strokeWidth={2.5} />
                    <Text style={styles.checkText}>{p}</Text>
                  </View>
                ))}
              </>
            )}
            {payment.length > 0 && (
              <>
                <Text style={[styles.policySubTitle, { marginTop: 14 }]}>Payment Policy</Text>
                {payment.map((p, i) => (
                  <View key={i} style={styles.checkRow}>
                    <Check size={14} color="#1F8A70" strokeWidth={2.5} />
                    <Text style={styles.checkText}>{p}</Text>
                  </View>
                ))}
              </>
            )}
          </>
        )}
      </Section>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} bounces style={{ flex: 1 }}>

        {/* Hero image — sits behind the content sheet */}
        {renderImageCarousel()}

        {/* Content sheet — overlaps image with rounded top corners */}
        <View style={styles.contentSheet}>
          {renderTitleBlock()}
          <Divider />
          {renderHighlights()}
          {renderAbout()}
          <Divider />
          {renderItinerary()}
          <Divider />
          {renderDates()}
          <Divider />
          {renderInclExcl()}
          <Divider />
          {renderAddons()}
          <Divider />
          {renderPolicies()}
          <View style={{ height: 100 }} />
        </View>

      </ScrollView>

      {/* Fixed bottom bar */}
      <View style={styles.bookBar}>
        <View>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>From</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
            <Text style={styles.bookPrice}>₹{price.toLocaleString('en-IN')}</Text>
            <Text style={{ fontSize: 13, color: '#6b7280' }}>/Guest</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() =>
            Alert.alert('Book Package', `You're about to book "${title}" for ₹${price.toLocaleString('en-IN')}`, [{ text: 'OK' }])
          }
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Toast */}
      {toastMsg ? (
        <Animated.View
          style={[styles.toast, toastType === 'save' ? styles.toastSave : styles.toastRemove, { opacity: toastOpacity }]}
          pointerEvents="none"
        >
          <Text style={styles.toastText}>{toastMsg}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Carousel
  backBtn: {
    position: 'absolute', top: 48, left: 16,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center', justifyContent: 'center',
  },
  carouselActions: {
    position: 'absolute', top: 48, right: 16,
    flexDirection: 'row', gap: 10,
  },
  actionBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center', justifyContent: 'center',
  },
  dotRow: {
    position: 'absolute', bottom: 12,
    width: '100%', flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center', gap: 6,
  },
  // Active: bright white rounded square
  dotActive: {
    width: 8, height: 8, borderRadius: 2,
    backgroundColor: '#fff',
  },
  // Inactive: same shape, low opacity
  dotInactive: {
    width: 8, height: 8, borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  // Content sheet — overlaps image
  contentSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  // Title block
  titleBlock: {
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 22, fontWeight: '800', color: '#111827', letterSpacing: -0.3,
  },
  reviewLink: {
    color: '#1F8A70', fontSize: 13, fontWeight: '600',
    textDecorationLine: 'underline',
  },
  metaRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 14, backgroundColor: '#f8fafc',
    borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14,
    gap: 12,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 8 },
  metaIcon: { fontSize: 18 },
  metaValue: { fontSize: 13, fontWeight: '600', color: '#1f2937' },
  metaLabel: { fontSize: 11, color: '#9ca3af', marginTop: 1 },
  metaDividerV: { width: 1, height: 32, backgroundColor: '#e5e7eb' },

  // Highlight box
  highlightBox: {
    marginHorizontal: 20, marginVertical: 4,
    backgroundColor: '#f9fafb', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: '#f3f4f6',
  },

  // Shared row
  checkRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 8, paddingVertical: 4,
  },
  checkText: {
    flex: 1, fontSize: 14, color: '#374151', lineHeight: 20,
  },

  showMoreLink: {
    color: '#1F8A70', fontSize: 13, fontWeight: '600',
    marginTop: 6, textDecorationLine: 'underline',
  },

  // Section
  sectionTitle: {
    fontSize: 17, fontWeight: '700', color: '#111827', marginBottom: 12,
  },
  bodyText: { fontSize: 14, lineHeight: 22, color: '#374151' },
  graySection: { backgroundColor: '#f9fafb' },
  collapsibleHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },

  // Itinerary
  dayBlock: { marginBottom: 12 },
  dayHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginBottom: 8,
  },
  dayIconBox: {
    width: 32, height: 32,
    alignItems: 'center', justifyContent: 'center',
  },
  dayTitle: { fontSize: 13, fontWeight: '700', color: '#111827' },
  daySubtitle: { fontSize: 12, color: '#6b7280', marginTop: 1 },

  // Date cards
  dateCard: {
    borderWidth: 1, borderColor: '#e5e7eb',
    borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12,
    marginRight: 10, minWidth: 130,
  },
  dateCardSelected: {
    borderColor: '#1F8A70', backgroundColor: '#f0fdf4',
  },
  dateRadio: {
    width: 16, height: 16, borderRadius: 8,
    borderWidth: 1.5, borderColor: '#1F8A70',
    alignItems: 'center', justifyContent: 'center',
    position: 'absolute', top: 10, right: 10,
  },
  dateRadioInner: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#1F8A70',
  },
  dateText: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 4 },
  datePriceText: { fontSize: 14, fontWeight: '700', color: '#374151' },

  // Add-ons
  addonCard: {
    backgroundColor: '#fff',
    borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb',
    padding: 16, marginBottom: 14,
  },
  addonTopRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  addonName: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 3 },
  addonSub: { fontSize: 13, color: '#6b7280', lineHeight: 18 },
  addonImage: { width: 68, height: 68, borderRadius: 10 },
  chipsRow: { flexDirection: 'row', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#f3f4f6', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  chipIcon: { fontSize: 14 },
  chipText: { fontSize: 12, color: '#374151', fontWeight: '500' },
  addonFooter: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 10,
  },
  addonPrice: { fontSize: 14, color: '#374151' },
  addBtn: {
    borderWidth: 1.5, borderColor: '#1F8A70',
    borderRadius: 8, paddingHorizontal: 24, paddingVertical: 8,
  },
  addBtnAdded: { backgroundColor: '#1F8A70' },
  addBtnText: { color: '#1F8A70', fontWeight: '700', fontSize: 14 },
  demoBtn: {
    backgroundColor: '#f3f4f6', borderRadius: 8,
    paddingVertical: 10, alignItems: 'center',
  },
  demoBtnText: { color: '#374151', fontWeight: '600', fontSize: 13 },

  // Policies
  policySubTitle: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 8 },

  // Book bar
  bookBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#f3f4f6',
    paddingHorizontal: 20, paddingVertical: 12,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookPrice: { fontSize: 20, fontWeight: '800', color: '#111827' },
  bookBtn: {
    backgroundColor: '#1F8A70',
    paddingHorizontal: 32, paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#1F8A70', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  bookBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // Toast
  toast: {
    position: 'absolute', bottom: 100, alignSelf: 'center',
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18, shadowRadius: 6, elevation: 8,
  },
  toastSave:   { backgroundColor: '#1F8A70' },
  toastRemove: { backgroundColor: '#374151' },
  toastText:   { color: '#fff', fontSize: 14, fontWeight: '600' },
});

export default PackageDetailScreen;