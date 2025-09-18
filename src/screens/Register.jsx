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
import { Eye, EyeOff, ArrowLeft, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  // Password validation
  const passwordValidation = {
    minLength: password.length >= 10,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const handleRegister = () => {
    console.log('Register with:', { email, password });
  };

  const goBack = () => {
     navigation.goBack()
  };

   const handleLogin = () => {
      navigation.navigate('Login');
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
                Join the RoamWe{'\n'}community
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
                
                {/* Password Requirements */}
                {password.length > 0 && (
                  <View className="mt-4 space-y-2">
                    <View className="flex-row items-center">
                      <View className={`w-4 h-4 mr-3 ${passwordValidation.minLength ? 'bg-transparent' : 'bg-transparent'}`}>
                        {passwordValidation.minLength ? (
                          <Text className="text-sm text-green-600">✓</Text>
                        ) : (
                          <X size={16} color="#EF4444" />
                        )}
                      </View>
                      <Text className={`text-sm ${passwordValidation.minLength ? 'text-green-600' : 'text-red-500'}`}>
                        At least 10 characters
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className={`w-4 h-4 mr-3 ${passwordValidation.hasSpecialChar ? 'bg-transparent' : 'bg-transparent'}`}>
                        {passwordValidation.hasSpecialChar ? (
                          <Text className="text-sm text-green-600">✓</Text>
                        ) : (
                          <X size={16} color="#EF4444" />
                        )}
                      </View>
                      <Text className={`text-sm ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-500'}`}>
                        Contains a special character
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Register Button */}
            <View className="mt-8">
              <TouchableOpacity
                onPress={handleRegister}
                className={`rounded-full py-4 ${
                  passwordValidation.minLength && passwordValidation.hasSpecialChar && email.length > 0
                    ? 'bg-green-800'
                    : 'bg-gray-400'
                }`}
                activeOpacity={0.8}
                disabled={!passwordValidation.minLength || !passwordValidation.hasSpecialChar || !email.length}
              >
                <Text className="text-base font-semibold text-center text-white">
                  Let's go
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View className="items-center mt-6">
              <TouchableOpacity onPress={() => handleLogin()}>
                <Text className="text-base text-center text-gray-900 w-80">
                  Have an account?{' '}
                  <Text className="font-semibold underline">Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  
};

export default Register;