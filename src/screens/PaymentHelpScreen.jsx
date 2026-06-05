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
  Wallet,
  CreditCard,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
} from 'lucide-react-native';

const PAYMENT_FAQS = [
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept UPI, debit cards, credit cards, net banking, and popular wallets like Paytm, PhonePe, and Google Pay. All transactions are processed securely.',
  },
  {
    question: 'When is the payment charged?',
    answer:
      'Payment is charged immediately when you confirm your booking. The booking is auto-confirmed once payment is successful.',
  },
  {
    question: 'How does the refund work on cancellation?',
    answer:
      'Refund amount depends on the cancellation policy of the package. Typically:\n\n• Cancel before 7 days of trip: 80-100% refund\n• Cancel 3-7 days before: 50% refund\n• Cancel within 3 days: No refund\n\nCheck the specific package policy for exact details.',
  },
  {
    question: 'When will I receive my refund?',
    answer:
      'Refunds are processed within 2-3 business days after cancellation approval. The amount will be credited to your original payment method within 5-7 business days depending on your bank.',
  },
  {
    question: 'My payment failed but money was deducted',
    answer:
      "If money was deducted but booking was not confirmed, the amount will be automatically refunded within 24-48 hours. If you don't see the refund after 48 hours, contact our support team.",
  },
  {
    question: 'Can I pay in installments?',
    answer:
      'Currently we do not support installment payments. Full payment is required at the time of booking. However, some credit cards offer EMI options at checkout.',
  },
  {
    question: 'Is my payment information safe?',
    answer:
      'Yes, absolutely. We use industry-standard encryption and secure payment gateways. We never store your card details on our servers. All transactions are PCI-DSS compliant.',
  },
  {
    question: 'What is the platform fee?',
    answer:
      'A small platform fee is charged on each booking to maintain the service. This is shown in the price breakdown on the booking confirmation screen before you pay.',
  },
  {
    question: 'When does the operator receive payment?',
    answer:
      'The operator receives payment 2 days after the trip end date. This ensures quality service — if any issues are reported during the trip, the platform can take action.',
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

const PaymentHelpScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Help</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Quick Info Cards */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <View style={[styles.infoIcon, { backgroundColor: '#D1FAE5' }]}>
              <CheckCircle size={18} color="#059669" />
            </View>
            <Text style={styles.infoTitle}>Secure Payments</Text>
            <Text style={styles.infoDesc}>PCI-DSS compliant</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={[styles.infoIcon, { backgroundColor: '#DBEAFE' }]}>
              <RefreshCw size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoTitle}>Easy Refunds</Text>
            <Text style={styles.infoDesc}>5-7 business days</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={[styles.infoIcon, { backgroundColor: '#FEF3C7' }]}>
              <Clock size={18} color="#D97706" />
            </View>
            <Text style={styles.infoTitle}>Operator Payout</Text>
            <Text style={styles.infoDesc}>Trip end + 2 days</Text>
          </View>
        </View>

        {/* Payment Flow */}
        <View style={styles.flowSection}>
          <Text style={styles.sectionTitle}>How Payment Works</Text>
          <View style={styles.flowSteps}>
            {[
              { step: '1', text: 'You book & pay — amount held by platform' },
              { step: '2', text: 'Trip happens — enjoy your experience' },
              { step: '3', text: 'Trip ends — 2 day review period' },
              {
                step: '4',
                text: 'Operator receives payment (minus platform fee)',
              },
            ].map((item, idx) => (
              <View key={idx} style={styles.flowStep}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNum}>{item.step}</Text>
                </View>
                <Text style={styles.stepText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <Text style={styles.sectionTitle}>Payment FAQs</Text>
        {PAYMENT_FAQS.map((item, idx) => (
          <FAQItem key={idx} item={item} />
        ))}

        {/* Issue Banner */}
        <View style={styles.issueBanner}>
          <AlertTriangle size={20} color="#D97706" />
          <View style={{ flex: 1 }}>
            <Text style={styles.issueBannerTitle}>Facing a payment issue?</Text>
            <Text style={styles.issueBannerText}>
              Contact our payment support team for immediate assistance.
            </Text>
          </View>
        </View>

        {/* Contact */}
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => Linking.openURL('mailto:payments@tripreel.com')}
          activeOpacity={0.8}
        >
          <Mail size={18} color="#fff" />
          <Text style={styles.contactBtnText}>
            Email: payments@tripreel.com
          </Text>
        </TouchableOpacity>
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
  infoGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  infoDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
  flowSection: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },
  flowSteps: { gap: 12 },
  flowStep: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1F8A70',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: { color: '#fff', fontSize: 13, fontWeight: '700' },
  stepText: { fontSize: 13, color: '#374151', flex: 1 },
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
  issueBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginTop: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  issueBannerTitle: { fontSize: 14, fontWeight: '700', color: '#92400E' },
  issueBannerText: { fontSize: 13, color: '#78350F', marginTop: 3 },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F8A70',
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
  },
  contactBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});

export default PaymentHelpScreen;
