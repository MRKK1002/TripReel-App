import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Share, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarIcon, GiftIcon, ArrowRightIcon, ShareIcon } from 'react-native-heroicons/solid';

const OffersScreen = () => {
  const [referralCode, setReferralCode] = useState('TRAVEL24');
  const [copied, setCopied] = useState(false);

  const offers = [
    {
      id: 1,
      title: 'Summer Getaway',
      description: 'Get 25% off on all beach destinations',
      discount: '25% OFF',
      validUntil: 'Valid until August 31, 2025',
      color: 'bg-blue-500',
      image: '🏖️'
    },
    {
      id: 2,
      title: 'Mountain Escape',
      description: 'Enjoy 30% off on mountain resorts',
      discount: '30% OFF',
      validUntil: 'Valid until September 15, 2025',
      color: 'bg-green-500',
      image: '🏔️'
    },
    {
      id: 3,
      title: 'City Break',
      description: '15% off on urban hotel bookings',
      discount: '15% OFF',
      validUntil: 'Valid until October 10, 2025',
      color: 'bg-purple-500',
      image: '🏙️'
    },
    {
      id: 4,
      title: 'Early Bird Special',
      description: 'Book 60 days in advance and save 20%',
      discount: '20% OFF',
      validUntil: 'Valid until December 31, 2025',
      color: 'bg-amber-500',
      image: '🐦'
    }
  ];

  const copyToClipboard = () => {
    setCopied(true);
    // In a real app, you would use Clipboard API here
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferralCode = async () => {
    try {
      await Share.share({
        message: `Use my referral code ${referralCode} on TravelApp to get $10 off your first booking!`,
      });
    } catch (error) {
      Alert.alert('Error sharing referral code');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
        <StatusBar backgroundColor="#1b2b51" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-6 bg-white shadow-sm">
          <Text className="text-3xl font-bold text-gray-800">Offers & Rewards</Text>
          <Text className="mt-1 text-gray-500">Exclusive deals and referral benefits</Text>
        </View>

        {/* Refer and Earn Section */}
        <View className="p-6 mx-4 my-6 shadow-lg bg-[#1b2b51] rounded-2xl">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">Refer & Earn</Text>
              <Text className="mt-2 text-white">Invite friends and get up to $50 in travel credits</Text>
              
              <View className="flex-row items-center mt-4">
                <View className="flex-row items-center flex-1 p-2 mr-2 bg-white rounded-lg bg-opacity-20">
                  <Text className="flex-1 font-semibold text-white">{referralCode}</Text>
                  <TouchableOpacity onPress={copyToClipboard}>
                    <Text className="font-bold text-white">{copied ? 'Copied!' : 'Copy'}</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  onPress={shareReferralCode}
                  className="p-3 bg-white rounded-lg"
                >
                  <ShareIcon size={20} color="#6366f1" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View className="ml-4">
              <GiftIcon size={40} color="white" />
            </View>
          </View>
          
          <View className="flex-row justify-between mt-6">
            <View className="items-center">
              <Text className="text-xl font-bold text-white">$10</Text>
              <Text className="text-xs text-white">For you</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-white">$15</Text>
              <Text className="text-xs text-white">For your friend</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-white">3</Text>
              <Text className="text-xs text-white">Max referrals</Text>
            </View>
          </View>
        </View>

        {/* Current Offers */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-800">Current Offers</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600">View all</Text>
            </TouchableOpacity>
          </View>

          {offers.map(offer => (
            <View key={offer.id} className={`${offer.color} rounded-2xl p-4 mb-4 shadow-md`}>
              <View className="flex-row items-center">
                <View className="items-center justify-center w-16 h-16 mr-4 bg-white rounded-full bg-opacity-20">
                  <Text className="text-3xl">{offer.image}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-white">{offer.title}</Text>
                  <Text className="mt-1 text-sm text-white">{offer.description}</Text>
                  <Text className="mt-2 text-xs text-white">{offer.validUntil}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-2xl font-bold text-white">{offer.discount}</Text>
                  <TouchableOpacity className="flex-row items-center mt-2">
                    <Text className="mr-1 text-sm text-white">Details</Text>
                    <ArrowRightIcon size={14} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Rewards Program */}
        <View className="p-6 mx-4 mb-6 bg-white shadow-md rounded-2xl">
          <Text className="text-xl font-bold text-gray-800">Loyalty Program</Text>
          <Text className="mt-2 text-gray-500">Earn points on every booking and redeem for rewards</Text>
          
          <View className="flex-row items-center p-4 mt-6 bg-blue-50 rounded-xl">
            <View className="p-3 mr-4 bg-blue-100 rounded-full">
              <StarIcon size={24} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">345 points</Text>
              <Text className="text-sm text-gray-500">You're 155 points away from Silver status</Text>
            </View>
          </View>
          
          <View className="h-2 mt-4 bg-gray-100 rounded-full">
            <View className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></View>
          </View>
          
          <View className="flex-row justify-between mt-2">
            <Text className="text-xs text-gray-500">Bronze</Text>
            <Text className="text-xs text-gray-500">Silver: 500 pts</Text>
            <Text className="text-xs text-gray-500">Gold: 1000 pts</Text>
          </View>
          
          <TouchableOpacity className="flex-row items-center justify-between p-4 mt-6 bg-indigo-100 rounded-xl">
            <Text className="font-semibold text-indigo-700">View all rewards</Text>
            <ArrowRightIcon size={16} color="#4f46e5" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OffersScreen;