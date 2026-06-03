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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Phone, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import AppModal from '../components/AppModal';
import './../../android/app/src/utils/globalFont.js';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { sendLoginOtp, verifyLoginOtp } = useAuth();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const [sendingOtp, setSendingOtp] = useState(false);
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

  const showModal = config => setModal({ visible: true, ...config });
  const closeModal = () => setModal(m => ({ ...m, visible: false }));

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

  const handleSendOtp = async () => {
    const p = phone.trim();
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
      const res = await sendLoginOtp(p);
      setStep('otp');
      startResendTimer();
      if (res?.otp) {
        showOtpDelivered(res.otp);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Could not send OTP. Please try again.';

      const isNoAccount =
        err?.response?.status === 404 ||
        /no account|please sign up/i.test(message);

      showModal({
        variant: 'error',
        title: isNoAccount ? 'No account found' : 'Could not send OTP',
        message: isNoAccount
          ? "We couldn't find an account with this phone number. Would you like to create one?"
          : message,
        primaryLabel: isNoAccount ? 'Sign Up' : 'OK',
        onPrimaryPress: isNoAccount
          ? () => {
              closeModal();
              navigation.navigate('RegisterScreen');
            }
          : closeModal,
        secondaryLabel: isNoAccount ? 'Cancel' : undefined,
        onSecondaryPress: isNoAccount ? closeModal : undefined,
      });
    } finally {
      setSendingOtp(false);
    }
  };

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
      await verifyLoginOtp(phone.trim(), code);
      navigation.replace('Main');
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Please try again.';
      showModal({
        variant: 'error',
        title: 'Login failed',
        message,
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await sendLoginOtp(phone.trim());
      startResendTimer();
      if (res?.otp) {
        showOtpDelivered(res.otp);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Could not resend OTP.';
      showModal({
        variant: 'error',
        title: 'Failed to resend',
        message,
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 48,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 'phone' ? (
            <>
              {/* Brand */}
              <View style={{ marginBottom: 40 }}>
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
                    marginTop: 24,
                  }}
                >
                  Welcome back 👋
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>
                  Sign in with your phone number
                </Text>
              </View>

              <Text style={labelStyle}>Phone</Text>
              <View style={{ ...inputContainer, marginBottom: 28 }}>
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

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('RegisterScreen')}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#1F8A70',
                      fontWeight: '700',
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setCode('');
                  setStep('phone');
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
                Enter OTP
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#6B7280',
                  marginTop: 8,
                  marginBottom: 28,
                }}
              >
                We sent a 6-digit code to{'\n'}
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
                  style={{
                    ...inputStyle,
                    marginLeft: 0,
                    fontSize: 18,
                    letterSpacing: 4,
                    textAlign: 'center',
                    fontWeight: '700',
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
                    Verify & Log In
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

      <AppModal {...modal} onClose={closeModal} />
    </SafeAreaView>
  );
};

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

export default LoginScreen;
