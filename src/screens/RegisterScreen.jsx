import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import './../../android/app/src/utils/globalFont.js';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Name, email, and password are required.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await register(
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        password,
      );
      navigation.replace('Main');
    } catch (err) {
      // Detailed logging to help diagnose the issue
      console.log(
        '[Register] response data:',
        JSON.stringify(err?.response?.data),
      );
      console.log('[Register] error message:', err?.message);
      console.log('[Register] error code:', err?.code);
      console.log('[Register] status:', err?.response?.status);

      let message = 'Registration failed. Please try again.';
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (
        err?.code === 'ERR_NETWORK' ||
        err?.code === 'ECONNREFUSED' ||
        err?.message?.toLowerCase().includes('network')
      ) {
        message =
          'Cannot reach the server.\n\n• Make sure the backend is running\n• Ensure your phone and PC are on the same Wi-Fi\n• Server: http://192.168.29.175:5000';
      } else if (err?.code === 'ECONNABORTED') {
        message = 'Request timed out. Check your network connection.';
      } else if (err?.message) {
        message = err.message;
      }
      Alert.alert('Registration Failed', message);
    } finally {
      setLoading(false);
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
            paddingTop: 40,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={{ marginBottom: 32 }}>
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
                marginTop: 20,
              }}
            >
              Create account ✈️
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>
              Join TripReel and start exploring
            </Text>
          </View>

          {/* Full Name */}
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

          {/* Email */}
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

          {/* Phone */}
          <Text style={labelStyle}>Phone</Text>
          <View style={inputContainer}>
            <Phone size={18} color="#9CA3AF" />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              style={inputStyle}
            />
          </View>

          {/* Password */}
          <Text style={labelStyle}>Password</Text>
          <View style={{ ...inputContainer, marginBottom: 28 }}>
            <Lock size={18} color="#9CA3AF" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password (min 6 chars)"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              style={inputStyle}
            />
            <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
              {showPassword ? (
                <EyeOff size={18} color="#9CA3AF" />
              ) : (
                <Eye size={18} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#7EC8B5' : '#1F8A70',
              borderRadius: 14,
              paddingVertical: 16,
              alignItems: 'center',
              marginBottom: 20,
            }}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }} />
            <Text
              style={{ marginHorizontal: 12, fontSize: 13, color: '#9CA3AF' }}
            >
              or continue with
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }} />
          </View>

          {/* Google Button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 14,
              paddingVertical: 14,
              marginBottom: 32,
              backgroundColor: '#fff',
            }}
            activeOpacity={0.85}
          >
            <Text style={{ fontSize: 18, marginRight: 8 }}>G</Text>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#374151' }}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{ fontSize: 14, color: '#1F8A70', fontWeight: '700' }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

export default RegisterScreen;
