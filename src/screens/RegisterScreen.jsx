import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Mail,
  User,
  Phone,
  ArrowLeft,
  MapPin,
  ChevronDown,
  Search,
  Check,
  Camera,
} from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../context/AuthContext';
import AppModal from '../components/AppModal';
import './../../android/app/src/utils/globalFont.js';

// ─── India States & UTs ────────────────────────────────────────────────────────
export const INDIA_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

// ─── Reusable State Picker (exported for ProfileScreen) ───────────────────────
export const StatePicker = ({ visible, selected, onSelect, onClose }) => {
  const [search, setSearch] = useState('');
  const filtered = INDIA_STATES.filter(s =>
    s.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(15,23,42,0.5)',
          justifyContent: 'flex-end',
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: '75%',
          }}
          onPress={() => {}}
        >
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#E2E8F0',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 12,
            }}
          />
          <Text
            style={{
              fontSize: 17,
              fontWeight: '800',
              color: '#0F172A',
              paddingHorizontal: 20,
              marginBottom: 12,
            }}
          >
            Select Your State
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 16,
              marginBottom: 8,
              backgroundColor: '#F1F5F9',
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 10,
              gap: 8,
            }}
          >
            <Search size={16} color="#9CA3AF" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search state..."
              placeholderTextColor="#9CA3AF"
              style={{ flex: 1, fontSize: 14, color: '#111827' }}
              autoFocus
            />
          </View>
          <FlatList
            data={filtered}
            keyExtractor={item => item}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  onClose();
                  setSearch('');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F1F5F9',
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: item === selected ? '#1F8A70' : '#111827',
                    fontWeight: item === selected ? '700' : '400',
                  }}
                >
                  {item}
                </Text>
                {item === selected && (
                  <Check size={16} color="#1F8A70" strokeWidth={2.5} />
                )}
              </TouchableOpacity>
            )}
            style={{ paddingBottom: 24 }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { sendSignupOtp, verifySignupOtp, uploadAvatar } = useAuth();

  const [step, setStep] = useState('details'); // 'details' | 'otp'

  // ── Details fields ──────────────────────────────────────────────────────────
  const [avatarLocalUri, setAvatarLocalUri] = useState(null);
  const [avatarAsset, setAvatarAsset] = useState(null); // raw asset for upload later
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [statePickerVisible, setStatePickerVisible] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  // ── OTP fields ──────────────────────────────────────────────────────────────
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  const [modal, setModal] = useState({ visible: false });
  const tickRef = useRef(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    tickRef.current = setTimeout(() => setResendIn(r => r - 1), 1000);
    return () => clearTimeout(tickRef.current);
  }, [resendIn]);

  const startResendTimer = () => setResendIn(30);
  const showModal = cfg => setModal({ visible: true, ...cfg });
  const closeModal = () => setModal(m => ({ ...m, visible: false }));
  const validEmail = e =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);

  // ── Pick photo from gallery (no upload yet — stored locally) ────────────────
  const handlePickPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.75,
      maxWidth: 512,
      maxHeight: 512,
    });
    if (result.didCancel || !result.assets?.length) return;
    const asset = result.assets[0];
    setAvatarLocalUri(asset.uri);
    setAvatarAsset(asset);
  };

  const showOtpDelivered = otp => {
    showModal({
      variant: 'otp',
      title: 'OTP Sent',
      otpCode: otp,
      primaryLabel: 'Tap to autofill',
      onPrimaryPress: () => {
        setCode(otp);
        closeModal();
      },
      secondaryLabel: 'Enter manually',
      onSecondaryPress: closeModal,
    });
  };

  // ── Send OTP ────────────────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    const n = name.trim();
    const e = email.trim().toLowerCase();
    const p = phone.trim();

    if (!n || !e || !p) {
      showModal({
        variant: 'error',
        title: 'Missing fields',
        message: 'Name, email and phone are required.',
      });
      return;
    }
    if (!validEmail(e)) {
      showModal({
        variant: 'error',
        title: 'Invalid email',
        message: 'Please enter a valid email address.',
      });
      return;
    }
    if (p.length !== 10) {
      showModal({
        variant: 'error',
        title: 'Invalid phone',
        message: 'Please enter a 10-digit phone number.',
      });
      return;
    }

    setSendingOtp(true);
    try {
      const res = await sendSignupOtp(n, e, p, state);
      setStep('otp');
      startResendTimer();
      if (res?.otp) showOtpDelivered(res.otp);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Could not send OTP.';
      const isExisting = /already exists|already in use|log in instead/i.test(
        message,
      );
      showModal({
        variant: 'error',
        title: isExisting ? 'Account already exists' : 'Could not send OTP',
        message,
        primaryLabel: isExisting ? 'Go to Login' : 'OK',
        onPrimaryPress: isExisting
          ? () => {
              closeModal();
              navigation.navigate('Login');
            }
          : closeModal,
        secondaryLabel: isExisting ? 'Cancel' : undefined,
        onSecondaryPress: isExisting ? closeModal : undefined,
      });
    } finally {
      setSendingOtp(false);
    }
  };

  // ── Verify OTP → upload photo if picked → go to Main ───────────────────────
  const handleVerify = async () => {
    if (code.length !== 6) {
      showModal({
        variant: 'error',
        title: 'Invalid OTP',
        message: 'Please enter the 6-digit code.',
      });
      return;
    }

    setVerifying(true);
    try {
      // 1. Verify OTP and create account
      await verifySignupOtp(phone.trim(), code);

      // 2. If user picked a photo, upload it now (non-blocking on failure)
      if (avatarAsset) {
        try {
          const formData = new FormData();
          formData.append('avatar', {
            uri: avatarAsset.uri,
            type: avatarAsset.type || 'image/jpeg',
            name: avatarAsset.fileName || 'avatar.jpg',
          });
          await uploadAvatar(formData);
        } catch {
          // Photo upload failure shouldn't block account creation
        }
      }

      // 3. Go to Main
      navigation.replace('Main');
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Verification failed.';
      showModal({ variant: 'error', title: 'Verification failed', message });
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await sendSignupOtp(
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        state,
      );
      startResendTimer();
      if (res?.otp) showOtpDelivered(res.otp);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Could not resend OTP.';
      showModal({ variant: 'error', title: 'Failed to resend', message });
    } finally {
      setResending(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 36,
            paddingBottom: 120,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          {/* ── STEP 1: Details ────────────────────────────────────────────── */}
          {step === 'details' && (
            <>
              {/* Brand */}
              <View style={{ marginBottom: 24 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: '#1F8A70',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}
                    >
                      T
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: '800',
                      color: '#111827',
                      letterSpacing: -0.5,
                    }}
                  >
                    TripReel
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '700',
                    color: '#111827',
                    marginTop: 16,
                  }}
                >
                  Create account ✈️
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>
                  We'll send a one-time code to verify your number
                </Text>
              </View>

              {/* ── Avatar picker ─────────────────────────────────────────── */}
              <View style={{ alignItems: 'center', marginBottom: 24 }}>
                <TouchableOpacity
                  onPress={handlePickPhoto}
                  activeOpacity={0.85}
                >
                  <View
                    style={[
                      styles.avatarCircle,
                      avatarLocalUri
                        ? { borderColor: '#1F8A70', borderStyle: 'solid' }
                        : {},
                    ]}
                  >
                    {avatarLocalUri ? (
                      <Image
                        source={{ uri: avatarLocalUri }}
                        style={styles.avatarImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{ alignItems: 'center' }}>
                        <Camera size={26} color="#9CA3AF" />
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#9CA3AF',
                            marginTop: 4,
                          }}
                        >
                          Add Photo
                        </Text>
                      </View>
                    )}
                  </View>
                  {/* Camera badge */}
                  <View style={styles.cameraBadge}>
                    <Camera size={12} color="#fff" />
                  </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>
                  {avatarLocalUri
                    ? '✓ Photo selected'
                    : 'Profile photo (optional)'}
                </Text>
              </View>

              {/* ── Fields ───────────────────────────────────────────────── */}
              <Text style={labelStyle}>Full Name</Text>
              <View style={inputContainer}>
                <User size={18} color="#9CA3AF" />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  style={inputStyle}
                />
              </View>

              <Text style={labelStyle}>Email</Text>
              <View style={inputContainer}>
                <Mail size={18} color="#9CA3AF" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={inputStyle}
                />
              </View>

              <Text style={labelStyle}>Phone</Text>
              <View style={inputContainer}>
                <Phone size={18} color="#9CA3AF" />
                <TextInput
                  value={phone}
                  onChangeText={t => setPhone(t.replace(/[^\d]/g, ''))}
                  placeholder="10-digit phone number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  maxLength={10}
                  style={inputStyle}
                />
              </View>

              <Text style={labelStyle}>Home State</Text>
              <TouchableOpacity
                onPress={() => setStatePickerVisible(true)}
                style={{
                  ...inputContainer,
                  marginBottom: 28,
                  justifyContent: 'space-between',
                }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <MapPin size={18} color="#9CA3AF" />
                  <Text
                    style={{
                      fontSize: 14,
                      color: state ? '#111827' : '#9CA3AF',
                    }}
                  >
                    {state || 'Select your state'}
                  </Text>
                </View>
                <ChevronDown size={18} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSendOtp}
                disabled={sendingOtp}
                style={{
                  backgroundColor: sendingOtp ? '#7EC8B5' : '#1F8A70',
                  borderRadius: 14,
                  paddingVertical: 16,
                  alignItems: 'center',
                  marginBottom: 20,
                }}
                activeOpacity={0.85}
              >
                {sendingOtp ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}
                  >
                    Send OTP
                  </Text>
                )}
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#1F8A70',
                      fontWeight: '700',
                    }}
                  >
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* ── STEP 2: OTP ────────────────────────────────────────────────── */}
          {step === 'otp' && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setCode('');
                  setStep('details');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
                activeOpacity={0.7}
              >
                <ArrowLeft size={20} color="#111827" />
                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#111827',
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>

              <Text
                style={{ fontSize: 24, fontWeight: '800', color: '#111827' }}
              >
                Verify your number
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#6B7280',
                  marginTop: 8,
                  marginBottom: 28,
                }}
              >
                Enter the 6-digit code we sent to{'\n'}
                <Text style={{ color: '#111827', fontWeight: '600' }}>
                  +91 {phone}
                </Text>
              </Text>

              <Text style={labelStyle}>OTP</Text>
              <View style={{ ...inputContainer, marginBottom: 24 }}>
                <TextInput
                  value={code}
                  onChangeText={t => setCode(t.replace(/[^\d]/g, ''))}
                  placeholder="6-digit code"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={6}
                  autoFocus
                  style={{
                    ...inputStyle,
                    marginLeft: 0,
                    fontSize: 22,
                    letterSpacing: 6,
                    textAlign: 'center',
                    fontWeight: '800',
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={handleVerify}
                disabled={verifying || code.length !== 6}
                style={{
                  backgroundColor:
                    verifying || code.length !== 6 ? '#7EC8B5' : '#1F8A70',
                  borderRadius: 14,
                  paddingVertical: 16,
                  alignItems: 'center',
                  marginBottom: 20,
                }}
                activeOpacity={0.85}
              >
                {verifying ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}
                  >
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 8,
                }}
              >
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  Didn't receive the code?{' '}
                </Text>
                {resendIn > 0 ? (
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#9CA3AF',
                      fontWeight: '600',
                    }}
                  >
                    Resend in {resendIn}s
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleResend} disabled={resending}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: resending ? '#9CA3AF' : '#1F8A70',
                        fontWeight: '700',
                      }}
                    >
                      {resending ? 'Sending...' : 'Resend'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <StatePicker
        visible={statePickerVisible}
        selected={state}
        onSelect={setState}
        onClose={() => setStatePickerVisible(false)}
      />

      <AppModal {...modal} onClose={closeModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1F8A70',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

const labelStyle = {
  fontSize: 13,
  fontWeight: '600',
  color: '#374151',
  marginBottom: 6,
};

const inputContainer = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 13,
  marginBottom: 16,
  backgroundColor: '#F9FAFB',
};

const inputStyle = {
  flex: 1,
  marginLeft: 10,
  fontSize: 14,
  color: '#111827',
};

export default RegisterScreen;
