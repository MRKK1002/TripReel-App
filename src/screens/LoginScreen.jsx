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
} from 'react-native';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login with:', { email, password });
    // Add your login logic here
  };

  const goBack = () => {
    // Navigate back or to register screen
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Go back');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
    // Navigate to forgot password screen
  };

  const navigateToRegister = () => {
    // Navigate to register screen
    if (navigation) {
      navigation.navigate('Register');
    } else {
      console.log('Navigate to register');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-4 pb-8">
            <TouchableOpacity onPress={goBack}>
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="flex-1 px-6">
            {/* Title */}
            <View className="mb-8">
              <Text className="text-3xl font-bold leading-tight text-gray-900">
                Hey there, welcome back
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-6">
              {/* Email Input */}
              <View>
                <Text className="mb-3 text-base font-medium text-gray-900">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email address"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="px-4 py-4 text-base text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50"
                />
              </View>

              {/* Password Input */}
              <View>
                <Text className="mb-3 text-base font-medium text-gray-900">Password</Text>
                <View className="relative">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    className="px-4 py-4 pr-12 text-base text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    <Eye size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Forgot Password */}
            <View className="mt-4">
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text className="text-base font-medium text-gray-900 underline">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <View className="mt-8">
              <TouchableOpacity
                onPress={handleLogin}
                className={`rounded-full py-4 ${
                  email.length > 0 && password.length > 0
                    ? 'bg-green-800'
                    : 'bg-gray-400'
                }`}
                activeOpacity={0.8}
                disabled={!email.length || !password.length}
              >
                <Text className="text-base font-semibold text-center text-white">
                  Let's go
                </Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="items-center mt-6">
              <TouchableOpacity onPress={navigateToRegister}>
                <Text className="text-base text-center text-gray-900 w-80">
                  Don't have an account?{' '}
                  <Text className="font-semibold underline">Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;