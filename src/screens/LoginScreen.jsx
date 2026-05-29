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
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import './../../android/app/src/utils/globalFont.js';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
      navigation.replace('Main');
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Login Failed', message);
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
            paddingTop: 48,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / Brand */}
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
              Sign in to continue your journey
            </Text>
          </View>

          {/* Email */}
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: '#374151',
              marginBottom: 6,
            }}
          >
            Email
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 13,
              marginBottom: 16,
              backgroundColor: '#F9FAFB',
            }}
          >
            <Mail size={18} color="#9CA3AF" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 14,
                color: '#111827',
              }}
            />
          </View>

          {/* Password */}
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: '#374151',
              marginBottom: 6,
            }}
          >
            Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 13,
              marginBottom: 8,
              backgroundColor: '#F9FAFB',
            }}
          >
            <Lock size={18} color="#9CA3AF" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 14,
                color: '#111827',
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
              {showPassword ? (
                <EyeOff size={18} color="#9CA3AF" />
              ) : (
                <Eye size={18} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 28 }}>
            <Text style={{ fontSize: 13, color: '#1F8A70', fontWeight: '600' }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
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
                Log In
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          {/* <View
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
          </View> */}

          {/* Google Button */}
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}

          {/* Register Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              <Text
                style={{ fontSize: 14, color: '#1F8A70', fontWeight: '700' }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
