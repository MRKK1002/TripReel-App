// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Image,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react-native';
// import image from './../assets/logo_new_bg.png';
// const Register = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let valid = true;
//     let newErrors = {};

//     // Full name validation
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//       valid = false;
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//       valid = false;
//     }

//     // Phone validation
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//       valid = false;
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       valid = false;
//     }

//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//       valid = false;
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       // Simulate API call
//       Alert.alert('Success', 'Account created successfully!', [
//         { text: 'OK', onPress: () => navigation.navigate('Login') },
//       ]);
//     }
//   };

//   const handleChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: '',
//       });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           {/* Header with back button */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.backButton}
//             >
//               <ArrowLeft size={24} color="#1b2b51" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Create Account</Text>
//             <View style={{ width: 24 }} /> {/* Spacer for balance */}
//           </View>

//           {/* Illustration */}
//           <View style={styles.illustrationContainer}>
//             <Image
//               source={image}
//               style={styles.illustration}
//               resizeMode="contain"
//             />
//           </View>

//           {/* Form */}
//           <View style={styles.formContainer}>
//             {/* Full Name Input */}
//             <View style={styles.inputContainer}>
//               <View style={styles.inputIcon}>
//                 <User size={20} color="#6b7280" />
//               </View>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChangeText={(text) => handleChange('fullName', text)}
//               />
//             </View>
//             {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

//             {/* Email Input */}
//             <View style={styles.inputContainer}>
//               <View style={styles.inputIcon}>
//                 <Mail size={20} color="#6b7280" />
//               </View>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email Address"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={formData.email}
//                 onChangeText={(text) => handleChange('email', text)}
//               />
//             </View>
//             {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

//             {/* Phone Input */}
//             <View style={styles.inputContainer}>
//               <View style={styles.inputIcon}>
//                 <Phone size={20} color="#6b7280" />
//               </View>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Phone Number"
//                 keyboardType="phone-pad"
//                 value={formData.phone}
//                 onChangeText={(text) => handleChange('phone', text)}
//               />
//             </View>
//             {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

//             {/* Password Input */}
//             <View style={styles.inputContainer}>
//               <View style={styles.inputIcon}>
//                 <Lock size={20} color="#6b7280" />
//               </View>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry={!showPassword}
//                 value={formData.password}
//                 onChangeText={(text) => handleChange('password', text)}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff size={20} color="#6b7280" />
//                 ) : (
//                   <Eye size={20} color="#6b7280" />
//                 )}
//               </TouchableOpacity>
//             </View>
//             {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

//             {/* Confirm Password Input */}
//             <View style={styles.inputContainer}>
//               <View style={styles.inputIcon}>
//                 <Lock size={20} color="#6b7280" />
//               </View>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Confirm Password"
//                 secureTextEntry={!showConfirmPassword}
//                 value={formData.confirmPassword}
//                 onChangeText={(text) => handleChange('confirmPassword', text)}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff size={20} color="#6b7280" />
//                 ) : (
//                   <Eye size={20} color="#6b7280" />
//                 )}
//               </TouchableOpacity>
//             </View>
//             {errors.confirmPassword ? (
//               <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//             ) : null}

//             {/* Submit Button */}
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//               <Text style={styles.submitButtonText}>Create Account</Text>
//             </TouchableOpacity>

//             {/* Login Redirect */}
//             <View style={styles.loginRedirect}>
//               <Text style={styles.loginText}>Already have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text style={styles.loginLink}>Sign In</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   keyboardAvoid: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingBottom: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: '#f3f4f6',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1b2b51',
//   },
//   illustrationContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   illustration: {
//     width: 280,
//     height: 280,
//   },
//   formContainer: {
//     marginTop: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 12,
//     marginBottom: 8,
//     backgroundColor: '#f9fafb',
//   },
//   inputIcon: {
//     padding: 12,
//     borderRightWidth: 1,
//     borderRightColor: '#e5e7eb',
//   },
//   input: {
//     flex: 1,
//     padding: 12,
//     fontSize: 16,
//     color: '#374151',
//   },
//   eyeIcon: {
//     padding: 12,
//   },
//   errorText: {
//     color: '#ef4444',
//     fontSize: 12,
//     marginBottom: 12,
//     marginLeft: 8,
//   },
//   submitButton: {
//     backgroundColor: '#1b2b51',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   loginRedirect: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   loginText: {
//     color: '#6b7280',
//     fontSize: 14,
//   },
//   loginLink: {
//     color: '#1b2b51',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// };

// export default Register;

















import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Eye, EyeOff } from 'lucide-react-native';
import google from './../assets/google.png';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Background images for the carousel
  const backgroundImages = [
    {
      uri: 'https://images.unsplash.com/photo-1560018997-467e37a57122?q=80&w=654&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Discover Amazing Places',
      subtitle: 'Explore the world with RoamWe'
    },
    {
      uri: 'https://images.unsplash.com/photo-1579683670728-96c9abc7a088?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Create Memories',
      subtitle: 'Plan your perfect adventure'
    },
    {
      uri: 'https://plus.unsplash.com/premium_photo-1673283243696-497565b6489b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Share Experiences',
      subtitle: 'Connect with fellow travelers'
    },
  ];

  const navigation = useNavigation();

  const handleRegister = () => {
     navigation.navigate('RegisterScreen');
  };

  const handleGoogleSignUp = () => {
    // Add Google sign up logic here
    console.log('Google sign up');
  };

  const renderCarouselItem = ({ item }) => (
    <View className="relative flex-1">
      <Image
        source={{ uri: item.uri }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute inset-0 bg-black/30" />
      {/* <View className="absolute bottom-32 left-6 right-6">
        <Text className="mb-2 text-2xl font-bold text-white">{item.title}</Text>
        <Text className="text-base text-white/90">{item.subtitle}</Text>
      </View> */}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Carousel */}
      <View className="absolute inset-0">
        <Carousel
          width={screenWidth}
          height={screenHeight}
          data={backgroundImages}
          renderItem={renderCarouselItem}
          autoPlay
          autoPlayInterval={4000}
          onSnapToItem={setCurrentIndex}
          loop
        />
      </View>

      {/* Skip Button */}
      <View className="absolute z-10 top-12 right-6">
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text className="text-base font-semibold text-white underline">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel Indicators */}
      <View className="absolute z-10 flex-row top-20 left-6">
        {backgroundImages.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mr-2 ${
              index === currentIndex ? 'bg-green-500' : 'bg-white/50'
            }`}
          />
        ))}
      </View>

      {/* Registration Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="justify-end flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          showsVerticalScrollIndicator={false}
        >
          <View className=" rounded-t-3xl px-6 pt-8 pb-6 min-h-[60%]">
            {/* RoamWe Logo/Brand */}
            <View className="items-center mb-6">
              <View className="items-center justify-center w-40 h-40 mb-4 bg-white rounded-3xl">
                <Image
                  source={require('../assets/logo_new_bg.png')}
                  className="h-60 w-60"
                />
              </View>
              <Text className="mb-2 text-2xl font-bold text-white ">
                Join RoamWe
              </Text>
              <Text className="text-center text-white">
                Plan your best trips and discover amazing destinations
              </Text>
            </View>

        

            {/* Create Account Button */}
            <TouchableOpacity
              onPress={handleRegister}
              className="py-4 mb-4 bg-green-500 rounded-xl"
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-center text-white">
                Create account
              </Text>
            </TouchableOpacity>

            {/* Continue with Google Button */}
            <TouchableOpacity
              onPress={handleGoogleSignUp}
              className="flex-row items-center justify-center py-4 mb-6 bg-white border border-gray-200 rounded-xl"
              activeOpacity={0.8}
            >
              <View className="w-5 h-5 mr-3">
                <Image
                  source={require('../assets/google.png')}
                  className="w-full h-full"
                />
              </View>
              <Text className="text-base font-medium text-gray-900">
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity className="items-center" onPress={() => navigation.navigate('Login')}>
              <Text className="w-full text-base text-center text-white">
                Have an account?{' '}
                <Text className="font-semibold underline">Log in</Text>
              </Text>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <Text className="mt-6 text-xs leading-4 text-center text-gray-50">
              By proceeding, you agree to our Terms of Use and confirm you
              have read our Privacy and Cookie Statement.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;