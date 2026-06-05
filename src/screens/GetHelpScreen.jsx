import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
} from 'lucide-react-native';

const FAQ_DATA = [
  {
    question: 'How do I book a trip?',
    answer:
      'Browse packages on the home screen, select one you like, choose an available batch date, add traveler details, and confirm your booking. Payment is processed instantly.',
  },
  {
    question: 'Can I cancel my booking?',
    answer:
      'Yes, you can cancel your booking before the trip start date. Refund amount depends on the cancellation policy set for the package. Check the package details for specific refund timelines.',
  },
  {
    question: 'How do I add more travelers to an existing booking?',
    answer:
      'You cannot modify an existing booking. However, you can create a new booking for the same batch with additional travelers. Each booking is independent.',
  },
  {
    question: 'What is the child age policy?',
    answer:
      'Children aged 7 years or below are charged at the child rate. Anyone above 7 years will be charged adult pricing, even if marked as a child.',
  },
  {
    question: 'How do I apply a coupon/discount?',
    answer:
      'On the booking screen, tap "Apply Discount" at the bottom. Available coupons for that batch will be shown. Select one to apply. Note: some coupons require a minimum number of guests.',
  },
  {
    question: 'How do I contact the trip operator?',
    answer:
      'Operator contact details are shown in your booking confirmation. You can also reach out through the app messaging feature once your booking is confirmed.',
  },
  {
    question: 'What happens if a trip is cancelled by the operator?',
    answer:
      'If the operator cancels the trip, you will receive a full refund to your original payment method within 5-7 business days.',
  },
  {
    question: 'How do I leave a review?',
    answer:
      'After your trip ends, go to "My Trips" and you\'ll see a "Rate" option on completed bookings. Tap it to leave your rating and feedback.',
  },
];

const FAQItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        {expanded ? (
          <ChevronUp size={18} color="#6B7280" />
        ) : (
          <ChevronDown size={18} color="#6B7280" />
        )}
      </View>
      {expanded && <Text style={styles.faqAnswer}>{item.answer}</Text>}
    </TouchableOpacity>
  );
};

const GetHelpScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Get Help</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Contact section */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactGrid}>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Linking.openURL('mailto:support@tripreel.com')}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: '#E6F4EF' }]}>
              <Mail size={20} color="#1F8A70" />
            </View>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>support@tripreel.com</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Linking.openURL('tel:+919876543210')}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: '#EDE9FE' }]}>
              <Phone size={20} color="#7C3AED" />
            </View>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>+91 98765 43210</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Linking.openURL('https://wa.me/919876543210')}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: '#D1FAE5' }]}>
              <MessageCircle size={20} color="#059669" />
            </View>
            <Text style={styles.contactLabel}>WhatsApp</Text>
            <Text style={styles.contactValue}>Chat with us</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <View style={styles.faqSection}>
          <View style={styles.faqTitleRow}>
            <HelpCircle size={20} color="#1F8A70" />
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          </View>
          {FAQ_DATA.map((item, idx) => (
            <FAQItem key={idx} item={item} />
          ))}
        </View>

        {/* Still need help */}
        <View style={styles.helpBanner}>
          <Text style={styles.helpBannerTitle}>Still need help?</Text>
          <Text style={styles.helpBannerText}>
            Our support team is available 24/7. Reach out via email or WhatsApp
            and we'll get back to you within 2 hours.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  content: { padding: 16, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  contactGrid: { gap: 10, marginBottom: 28 },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  contactValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
    marginLeft: 'auto',
  },
  faqSection: { marginBottom: 24 },
  faqTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  faqItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: '#4B5563',
  },
  helpBanner: {
    backgroundColor: '#E6F4EF',
    borderRadius: 14,
    padding: 18,
  },
  helpBannerTitle: { fontSize: 15, fontWeight: '700', color: '#1F8A70' },
  helpBannerText: {
    fontSize: 13,
    color: '#374151',
    marginTop: 6,
    lineHeight: 19,
  },
});

export default GetHelpScreen;
