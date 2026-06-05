import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Trash2,
  Lock,
} from 'lucide-react-native';

const SECTIONS = [
  {
    icon: Database,
    title: 'Information We Collect',
    color: '#E6F4EF',
    iconColor: '#1F8A70',
    content: [
      'Personal information: name, phone number, email address, home state',
      'Location data: GPS coordinates (only when you grant permission) to show nearby experiences',
      'Booking data: trip details, traveler information, payment records',
      'Usage data: app interactions, search history, recently viewed packages',
      'Device information: device model, OS version for troubleshooting',
    ],
  },
  {
    icon: Eye,
    title: 'How We Use Your Data',
    color: '#EDE9FE',
    iconColor: '#7C3AED',
    content: [
      'Personalize your experience by showing nearby trips and relevant recommendations',
      'Process bookings and communicate trip details',
      'Send booking confirmations, trip reminders, and important updates',
      'Improve app performance and user experience',
      'Resolve customer support requests',
    ],
  },
  {
    icon: Shield,
    title: 'Data Protection',
    color: '#FEF3C7',
    iconColor: '#D97706',
    content: [
      'All data is encrypted in transit using industry-standard TLS/SSL',
      'Payment information is processed securely — we do not store card details',
      'Access to personal data is restricted to authorized personnel only',
      'Regular security audits and monitoring protect against breaches',
      'Data is stored on secure servers with enterprise-grade protection',
    ],
  },
  {
    icon: Lock,
    title: 'Data Sharing',
    color: '#DBEAFE',
    iconColor: '#2563EB',
    content: [
      'We share booking details with the trip operator to fulfill your reservation',
      'We do NOT sell your personal data to third parties',
      'Analytics data (anonymized) may be used to improve services',
      'We may disclose data if required by law or legal proceedings',
      'Third-party services (payments, notifications) receive only necessary data',
    ],
  },
  {
    icon: Trash2,
    title: 'Your Rights',
    color: '#FEE2E2',
    iconColor: '#DC2626',
    content: [
      'Access: Request a copy of all personal data we hold about you',
      'Correction: Update or correct any inaccurate information',
      'Deletion: Request deletion of your account and associated data',
      'Opt-out: Unsubscribe from marketing communications at any time',
      'Contact us at privacy@tripreel.com for any data-related requests',
    ],
  },
];

const PrivacyScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Intro */}
        <View style={styles.introBanner}>
          <Shield size={24} color="#1F8A70" />
          <View style={{ flex: 1 }}>
            <Text style={styles.introTitle}>Your Privacy Matters</Text>
            <Text style={styles.introText}>
              We are committed to protecting your personal information. This
              policy explains what data we collect and how we use it.
            </Text>
          </View>
        </View>

        <Text style={styles.lastUpdated}>Last updated: June 2026</Text>

        {/* Sections */}
        {SECTIONS.map((section, idx) => {
          const Icon = section.icon;
          return (
            <View key={idx} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View
                  style={[
                    styles.sectionIcon,
                    { backgroundColor: section.color },
                  ]}
                >
                  <Icon size={18} color={section.iconColor} />
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              {section.content.map((item, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          );
        })}

        {/* Footer */}
        <View style={styles.footerBanner}>
          <Text style={styles.footerTitle}>Questions about your privacy?</Text>
          <Text style={styles.footerText}>
            Contact us at privacy@tripreel.com and we'll respond within 48
            hours.
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
  introBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF9',
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginBottom: 8,
  },
  introTitle: { fontSize: 15, fontWeight: '700', color: '#1F8A70' },
  introText: {
    fontSize: 13,
    color: '#374151',
    marginTop: 4,
    lineHeight: 19,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 20,
    textAlign: 'right',
  },
  section: { marginBottom: 22 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  sectionIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
    paddingLeft: 4,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
    marginTop: 7,
  },
  bulletText: { fontSize: 13, color: '#4B5563', lineHeight: 19, flex: 1 },
  footerBanner: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 8,
  },
  footerTitle: { fontSize: 14, fontWeight: '700', color: '#374151' },
  footerText: { fontSize: 13, color: '#6B7280', marginTop: 4, lineHeight: 19 },
});

export default PrivacyScreen;
