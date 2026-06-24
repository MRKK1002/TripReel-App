import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Phone, MapPin, ChevronDown } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const INDIA_STATES = [
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
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
];

const CompleteProfileScreen = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuth();

  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [showStates, setShowStates] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    setError('');
    const p = phone.replace(/\D/g, '');
    if (p.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    if (!state) {
      setError('Please select your state');
      return;
    }

    setSaving(true);
    try {
      await updateProfile({
        name: user?.name,
        phone: p,
        state,
        country: 'India',
      });
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Failed to save. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingTop: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: '800',
            color: '#111827',
            marginBottom: 8,
          }}
        >
          Almost there! 🎉
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#6B7280',
            marginBottom: 32,
            lineHeight: 22,
          }}
        >
          Welcome {user?.name || ''}! We just need your phone number and
          location to complete your profile.
        </Text>

        {/* Phone */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#374151',
            marginBottom: 8,
          }}
        >
          Phone Number *
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 14,
            marginBottom: 20,
          }}
        >
          <Phone size={18} color="#9CA3AF" />
          <Text style={{ fontSize: 15, color: '#374151', marginLeft: 8 }}>
            +91
          </Text>
          <TextInput
            value={phone}
            onChangeText={t => setPhone(t.replace(/\D/g, '').slice(0, 10))}
            placeholder="9876543210"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            maxLength={10}
            style={{ flex: 1, marginLeft: 8, fontSize: 15, color: '#111827' }}
          />
        </View>

        {/* State */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#374151',
            marginBottom: 8,
          }}
        >
          State *
        </Text>
        <TouchableOpacity
          onPress={() => setShowStates(!showStates)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 14,
            marginBottom: showStates ? 4 : 20,
          }}
        >
          <MapPin size={18} color="#9CA3AF" />
          <Text
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 15,
              color: state ? '#111827' : '#9CA3AF',
            }}
          >
            {state || 'Select your state'}
          </Text>
          <ChevronDown size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {showStates && (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 12,
              maxHeight: 200,
              marginBottom: 20,
              backgroundColor: '#F9FAFB',
            }}
          >
            <ScrollView nestedScrollEnabled>
              {INDIA_STATES.map(s => (
                <TouchableOpacity
                  key={s}
                  onPress={() => {
                    setState(s);
                    setShowStates(false);
                  }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                    backgroundColor: state === s ? '#E6F4EF' : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: state === s ? '#1F8A70' : '#374151',
                    }}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {error ? (
          <Text style={{ color: '#EF4444', fontSize: 13, marginBottom: 16 }}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={handleContinue}
          disabled={saving}
          style={{
            backgroundColor: '#1F8A70',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
              Continue
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
          }
          style={{ marginTop: 16, alignItems: 'center' }}
        >
          <Text style={{ fontSize: 14, color: '#9CA3AF' }}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfileScreen;
