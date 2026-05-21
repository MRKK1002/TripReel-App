import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PenLine } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  './../../android/app/src/utils/globalFont.js';

const WishlistScreen = () => {
  const navigation = useNavigation();

  const wishlists = [
    {
      id: 1,
      name: 'Recently Viewed',
      subtitle: 'Today',
      image:
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400',
    },
    {
      id: 2,
      name: 'Hill Station',
      subtitle: '3 Saved',
      image:
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400',
    },
    {
      id: 3,
      name: 'Himalayas',
      subtitle: '1 Saved',
      image:
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400',
    },
  ];

  const renderCard = item => (
    <TouchableOpacity
      key={item.id}
      className="w-[48%] mb-5"
      onPress={() => navigation.navigate('PlaceDetail', { place: item })}
      activeOpacity={0.8}
    >
      <View className="w-full overflow-hidden bg-gray-100 aspect-square rounded-2xl">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <Text className="mt-2 text-sm font-semibold text-gray-900">
        {item.name}
      </Text>
      <Text className="text-xs text-gray-400">{item.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-center px-6 pt-4 pb-3 mt-10 border-b border-gray-100">
          <Text className=" font-semibold text-[#0F172A]" style={{fontSize:24}}>Wishlists</Text>
          <TouchableOpacity className="absolute right-6">
            <PenLine size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Grid */}
        <View className="flex-row flex-wrap justify-between px-5 mt-5">
          {wishlists.map(renderCard)}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default WishlistScreen;
