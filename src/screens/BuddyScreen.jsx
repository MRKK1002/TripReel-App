import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import buddies from '../data/buddies';
import { SafeAreaView } from 'react-native-safe-area-context';

const BuddyScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();



  const locations = [
    'All',
    'Bangkok',
    'Chiang Mai',
    'Phuket',
    'Pattaya',
    'Krabi',
  ];
  const specialties = [
    'All',
    'City Tours',
    'Food Guide',
    'Temple Tours',
    'Adventure',
    'Cultural',
  ];

  const filteredBuddies = buddies.filter(buddy => {
    // Filter by selected location
    const locationMatch =
      selectedFilter === 'all' || buddy.location === selectedFilter;

    // Filter by price range
    const priceMatch =
      buddy.price >= priceRange[0] && buddy.price <= priceRange[1];

    // Filter by search query
    const searchMatch =
      buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.specialties.some(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return locationMatch && priceMatch && searchMatch;
  });

  const handleBuddyPress = (buddy) => {
    navigation.navigate('BuddyDetails', { buddy: buddy });
  };

  const BuddyCard = ({ buddy }) => (
    <View className="p-4 mx-4 my-2 bg-white shadow-sm rounded-xl">
      <View className="flex-row">
        <Image
          source={{ uri: buddy.image }}
          className="w-20 h-20 rounded-full"
        />
        <View className="flex-1 ml-4">
          <View className="flex-row items-center">
            <Text className="text-lg font-bold">{buddy.name}</Text>
            {buddy.verified && <Text className="ml-2 text-blue-500">✓</Text>}
          </View>
          <Text className="text-gray-600">
            {buddy.age} years • {buddy.location}
          </Text>

          <View className="flex-row items-center mt-1">
            <Text className="text-yellow-500">★</Text>
            <Text className="ml-1 text-gray-700">{buddy.rating}</Text>
          </View>

          <View className="flex-row flex-wrap mt-2">
            {buddy.languages.map((lang, index) => (
              <Text
                key={index}
                className="px-2 py-1 mb-1 mr-2 text-xs text-blue-700 rounded-full bg-blue-50"
              >
                {lang}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View className="mt-3">
        <Text className="font-semibold">Specialties:</Text>
        <View className="flex-row flex-wrap mt-1">
          {buddy.specialties.map((spec, index) => (
            <Text
              key={index}
              className="px-2 py-1 mb-1 mr-2 text-xs text-orange-700 rounded-full bg-orange-50"
            >
              {spec}
            </Text>
          ))}
        </View>
      </View>

      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-xl font-bold text-green-600">
          ฿{buddy.price}/day
        </Text>
        <TouchableOpacity
          className="px-4 py-2 bg-orange-500 rounded-full"
          onPress={() => handleBuddyPress(buddy)}
        >
          <Text className="font-medium text-white">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#1b2b51' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1b2b51"  // black status bar
          translucent={false}     // content stays below
        />
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="px-4 pt-2 pb-4 bg-[#1b2b51]">
          <View className="flex-row items-center justify-between">
            <View className="flex items-center flex-column">
              <Text className="text-2xl font-bold text-white">
                Travel Buddies
              </Text>
              {/* <Text className="w-full text-white ">Find local guides in Thailand</Text> */}
            </View>
            <TouchableOpacity
              className="px-4 py-1rounded-full"
              onPress={() => setShowFilters(true)}
            >
              <Text>⚙️</Text>
            </TouchableOpacity>
          </View>
  
          {/* Search Bar */}
          <View className="flex-row items-center px-4 py-2 mt-4 bg-white rounded-lg">
            <Text className="text-gray-400">🔍</Text>
            <TextInput
              placeholder="Search by name or specialty..."
              className="flex-1 ml-2"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
  
        {/* Filter Bar */}
        <View className="px-4 py-3 bg-white border-b border-gray-200">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              className={`px-4 py-1 mr-2 rounded-full ${
                selectedFilter === 'all' ? 'bg-orange-500' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedFilter('all')}
            >
              <Text
                className={
                  selectedFilter === 'all' ? 'text-white' : 'text-gray-700'
                }
              >
                All
              </Text>
            </TouchableOpacity>
  
            {locations
              .filter(loc => loc !== 'All')
              .map(location => (
                <TouchableOpacity
                  key={location}
                  className={`px-4 py-1 mr-2 rounded-full ${
                    selectedFilter === location ? 'bg-orange-500' : 'bg-gray-100'
                  }`}
                  onPress={() => setSelectedFilter(location)}
                >
                  <Text
                    className={
                      selectedFilter === location ? 'text-white' : 'text-gray-700'
                    }
                  >
                    {location}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
  
        {/* Results Count */}
        <View className="px-4 py-3">
          <Text className="text-gray-700">
            {filteredBuddies.length}{' '}
            {filteredBuddies.length === 1 ? 'guide' : 'guides'} available
          </Text>
        </View>
  
        {/* Buddies List */}
        <FlatList
          data={filteredBuddies}
          renderItem={({ item }) => <BuddyCard buddy={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
  
        {/* Filter Modal */}
        <Modal
          visible={showFilters}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowFilters(false)}
        >
          <View className="justify-end flex-1 bg-black/50">
            <View className="p-6 bg-white rounded-t-3xl">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold">Filters</Text>
                <TouchableOpacity onPress={() => setShowFilters(false)}>
                  <Text className="text-2xl">×</Text>
                </TouchableOpacity>
              </View>
  
              <Text className="mb-2 font-bold">Price Range (฿ per day)</Text>
              <View className="flex-row justify-between mb-1">
                <Text>{priceRange[0]}</Text>
                <Text>{priceRange[1]}</Text>
              </View>
              {/* In a real app, you would implement a RangeSlider here */}
  
              <Text className="mt-4 mb-2 font-bold">Specialties</Text>
              <View className="flex-row flex-wrap">
                {specialties.map(spec => (
                  <TouchableOpacity
                    key={spec}
                    className="px-3 py-1 mb-2 mr-2 bg-gray-100 rounded-full"
                  >
                    <Text>{spec}</Text>
                  </TouchableOpacity>
                ))}
              </View>
  
              <TouchableOpacity
                className="py-3 mt-6 bg-orange-500 rounded-full"
                onPress={() => setShowFilters(false)}
              >
                <Text className="font-bold text-center text-white">
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
   </SafeAreaView>
  );
};

export default BuddyScreen;
