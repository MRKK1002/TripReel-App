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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Phone, ArrowLeft } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import AppModal from '../components/AppModal';
import { signInWithGoogle } from '../services/googleAuth';
import './../../android/app/src/utils/globalFont.js';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { sendLoginOtp, verifyLoginOtp, googleLogin } = useAuth();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  const [modal, setModal] = useState({ visible: false });
  const [googleLoading, setGoogleLoading] = useState(false);

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

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.cancelled) {
        setGoogleLoading(false);
        return;
      }
      const data = await googleLogin(result.idToken);
      if (data.isNewUser) {
        navigation.reset({ index: 0, routes: [{ name: 'CompleteProfile' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      }
    } catch (err) {
      showModal({
        variant: 'error',
        title: 'Google Sign-In Failed',
        message:
          err?.response?.data?.message || err.message || 'Something went wrong',
        primaryLabel: 'OK',
        onPrimaryPress: closeModal,
      });
    } finally {
      setGoogleLoading(false);
    }
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
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {/* Background Image */}
      <Image
        source={require('../assets/loginbgimage.png')}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        resizeMode="cover"
      />
      {/* Dark overlay for readability */}
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingBottom: 24,
            paddingTop: 20,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 'phone' ? (
            <>
              {/* Logo at top */}
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
                <Image
                  source={require('../assets/logobgremove.jpeg')}
                  style={{ width: 160, height: 160, borderRadius: 80 }}
                  resizeMode="cover"
                />
              </View>

              {/* Glass card */}
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.82)',
                  borderRadius: 24,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.4)',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.2,
                  shadowRadius: 24,
                  elevation: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '800',
                    color: '#111827',
                    textAlign: 'center',
                  }}
                >
                  Welcome back 👋
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#6B7280',
                    textAlign: 'center',
                    marginTop: 6,
                    marginBottom: 4,
                  }}
                >
                  Sign in with your phone number
                </Text>
                <View
                  style={{
                    width: 40,
                    height: 3,
                    backgroundColor: '#1F8A70',
                    borderRadius: 2,
                    alignSelf: 'center',
                    marginBottom: 24,
                  }}
                />

                <Text style={labelStyle}>Phone</Text>
                <View style={{ ...inputContainer, marginBottom: 20 }}>
                  <Phone size={22} color="#9CA3AF" />
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
                  activeOpacity={0.85}
                  style={{ marginBottom: 20 }}
                >
                  <LinearGradient
                    colors={['#14B8A6', '#0F766E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      borderRadius: 14,
                      paddingVertical: 14,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: sendingOtp ? 0.6 : 1,
                    }}
                  >
                    {sendingOtp ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: '700',
                          }}
                        >
                          Send OTP
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 20,
                            marginLeft: 10,
                          }}
                        >
                          →
                        </Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
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

                {/* Divider */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 16,
                  }}
                >
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }}
                  />
                  <Text
                    style={{
                      marginHorizontal: 12,
                      fontSize: 13,
                      color: '#9CA3AF',
                    }}
                  >
                    or
                  </Text>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }}
                  />
                </View>

                {/* Google Sign-In */}
                <TouchableOpacity
                  onPress={handleGoogleSignIn}
                  disabled={googleLoading}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 12,
                    paddingVertical: 14,
                    gap: 10,
                    opacity: googleLoading ? 0.6 : 1,
                  }}
                >
                  {googleLoading ? (
                    <ActivityIndicator size="small" color="#4285F4" />
                  ) : (
                    <Image
                      source={require('../assets/google.png')}
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#374151',
                    }}
                  >
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                {/* Trust badges — inside card */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 16,
                    paddingTop: 16,
                    borderTopWidth: 1,
                    borderTopColor: '#F3F4F6',
                  }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        borderWidth: 1.5,
                        borderColor: '#1F8A70',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>
                        <MaterialCommunityIcons
                          name="shield-check-outline"
                          size={18}
                          color="#1F8A70"
                        />
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '600',
                        color: '#374151',
                        marginTop: 4,
                      }}
                    >
                      Secure & Private
                    </Text>
                    <Text style={{ fontSize: 8, color: '#9CA3AF' }}>
                      Your data is safe with us
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        borderWidth: 1.5,
                        borderColor: '#F59E0B',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>
                        <MaterialCommunityIcons
                          name="lightning-bolt-outline"
                          size={18}
                          color="#F59E0B"
                        />
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '600',
                        color: '#374151',
                        marginTop: 4,
                      }}
                    >
                      Quick & Easy
                    </Text>
                    <Text style={{ fontSize: 8, color: '#9CA3AF' }}>
                      Get started in seconds
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        borderWidth: 1.5,
                        borderColor: '#EF4444',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>
                        <MaterialCommunityIcons
                          name="map-marker-outline"
                          size={18}
                          color="#EF4444"
                        />
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '600',
                        color: '#374151',
                        marginTop: 4,
                      }}
                    >
                      Made for Travelers
                    </Text>
                    <Text style={{ fontSize: 8, color: '#9CA3AF' }}>
                      Share. Explore. Inspire.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Terms — below card */}
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.85)',
                  textAlign: 'center',
                  marginTop: 14,
                }}
              >
                🔒 By continuing, you agree to our{' '}
                <Text
                  style={{ color: '#14B8A6', fontWeight: '600' }}
                  onPress={() => navigation.navigate('Privacy')}
                >
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text
                  style={{ color: '#14B8A6', fontWeight: '600' }}
                  onPress={() => navigation.navigate('Privacy')}
                >
                  Privacy Policy
                </Text>
              </Text>
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
    </View>
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
  paddingVertical: 10,
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
