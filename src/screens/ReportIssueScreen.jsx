import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  Send,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react-native';
import { reportsAPI } from '../services/api';
import AppModal from '../components/AppModal';

const ISSUE_TYPES = [
  { key: 'booking', label: 'Booking Issue' },
  { key: 'operator', label: 'Operator Problem' },
  { key: 'package', label: 'Package Concern' },
  { key: 'other', label: 'Other' },
];

const ReportIssueScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const bookingId = route.params?.bookingId;
  const packageId = route.params?.packageId;
  const operatorId = route.params?.operatorId;

  const [type, setType] = useState(bookingId ? 'booking' : 'other');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ visible: false });

  const handleSubmit = async () => {
    if (!subject.trim()) {
      setModal({
        visible: true,
        variant: 'error',
        title: 'Subject Required',
        message: 'Please enter a subject for your report.',
      });
      return;
    }

    setSubmitting(true);
    try {
      await reportsAPI.create({
        type,
        subject: subject.trim(),
        description: description.trim(),
        ...(bookingId && { bookingId }),
        ...(packageId && { packageId }),
        ...(operatorId && { operatorId }),
      });
      setModal({
        visible: true,
        variant: 'success',
        title: 'Report Submitted',
        message:
          'Our team will review your report and get back to you within 48 hours.',
        primaryLabel: 'Done',
        onPrimaryPress: () => {
          setModal({ visible: false });
          navigation.goBack();
        },
      });
    } catch (err) {
      setModal({
        visible: true,
        variant: 'error',
        title: 'Failed',
        message:
          err?.response?.data?.message || 'Could not submit report. Try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report an Issue</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Info banner */}
        <View style={styles.infoBanner}>
          <AlertTriangle size={18} color="#D97706" />
          <Text style={styles.infoText}>
            Report any issues with your booking, operator, or trip experience.
            Our team will review and respond within 48 hours.
          </Text>
        </View>

        {/* Issue Type */}
        <Text style={styles.label}>Issue Type</Text>
        <View style={styles.typeGrid}>
          {ISSUE_TYPES.map(t => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setType(t.key)}
              style={[styles.typeChip, type === t.key && styles.typeChipActive]}
            >
              <Text
                style={[
                  styles.typeChipText,
                  type === t.key && styles.typeChipTextActive,
                ]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subject */}
        <Text style={styles.label}>Subject *</Text>
        <TextInput
          value={subject}
          onChangeText={setSubject}
          placeholder="Brief summary of the issue"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          maxLength={100}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the issue in detail (optional)..."
          placeholderTextColor="#9CA3AF"
          style={[styles.input, styles.textarea]}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          maxLength={500}
        />
        <Text style={styles.charCount}>{description.length}/500</Text>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitting}
          style={[styles.submitBtn, submitting && { opacity: 0.6 }]}
          activeOpacity={0.85}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Send size={18} color="#fff" />
              <Text style={styles.submitText}>Submit Report</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      <AppModal {...modal} onClose={() => setModal({ visible: false })} />
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  infoText: { fontSize: 13, color: '#78350F', lineHeight: 19, flex: 1 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  typeChipActive: {
    borderColor: '#1F8A70',
    backgroundColor: '#E6F4EF',
  },
  typeChipText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
  typeChipTextActive: { color: '#1F8A70', fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  textarea: { minHeight: 120, textAlignVertical: 'top' },
  charCount: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 4,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F8A70',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 24,
    gap: 8,
  },
  submitText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});

export default ReportIssueScreen;
