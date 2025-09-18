import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StatusBar,
} from 'react-native';
import categories from '../data/categories';
import { SafeAreaView } from 'react-native-safe-area-context';




const PackageScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Your JSON data


  // Flatten all packages into one array
  const allPackages = categories.flatMap(category => 
    category.packages.map(pkg => ({
      ...pkg,
      categoryMood: category.mood,
      categoryName: category.name,
      categoryImage: category.image
    }))
  );

  const filterOptions = [
    { id: 'all', label: 'All', icon: '🌏' },
    { id: 'adventure', label: 'Adventure', icon: '🧗' },
    { id: 'cultural', label: 'Cultural', icon: '🏯' },
    { id: 'honeymoon', label: 'Honeymoon', icon: '💖' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'food', label: 'Food', icon: '🍜' },
    { id: 'workation', label: 'Workation', icon: '💻' },
    { id: 'eco', label: 'Eco', icon: '🌿' },
  ];

  const filteredPackages = allPackages.filter(pkg => {
    const matchesFilter = selectedFilter === 'all' || pkg.categoryMood === selectedFilter;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pkg.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const PackageCard = ({ item }) => (
    <View
      className="mx-4 mb-6 overflow-hidden bg-white shadow-xl rounded-2xl"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      }}
    >
      <View className="relative">
        <Image
          source={{ uri: item.images[0] }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute top-4 right-4">
          <View className="px-3 py-1 rounded-full shadow bg-white/90">
            <Text className="text-xs font-bold text-gray-900">
              {item.categoryName}
            </Text>
          </View>
        </View>
      </View>

      <View className="p-5">
        <View className="flex-row justify-between mb-2">
          <Text className="text-xl font-bold text-gray-900">{item.title}</Text>
          <View className="px-2 py-1 rounded-full bg-blue-50">
            <Text className="text-xs font-medium text-blue-600">
              {item.includes.find(inc => inc.includes("N/")) || "Custom Package"}
            </Text>
          </View>
        </View>

        <Text className="mb-3 text-sm text-gray-600">👥 For {item.people} people</Text>

        <View className="flex-row flex-wrap mb-4">
          {item.includes.slice(0, 3).map((highlight, index) => (
            <View
              key={index}
              className="px-2 py-1 mb-2 mr-2 bg-gray-100 rounded-full"
            >
              <Text className="text-xs text-gray-700">{highlight}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
          <View>
            {item.discount && (
              <Text className="text-xs text-gray-500 line-through">
                ฿{(item.price / (1 - parseInt(item.discount)/100)).toFixed(0)}
              </Text>
            )}
            <Text className="text-xl font-bold text-green-600">
              ฿{item.price}
              {item.discount && (
                <Text className="ml-2 text-xs font-normal text-orange-500">
                  {item.discount} OFF
                </Text>
              )}
            </Text>
          </View>
          <TouchableOpacity className="px-5 py-2 bg-orange-500 rounded-full shadow-sm" onPress={() => handlePackagePress(item)}>
            <Text className="font-semibold text-white">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

   const handlePackagePress = (pkg) => {
    console.log(pkg,"..........................................")
    navigation.navigate('PackageDetails', { package: pkg });
  };

  return (
   <SafeAreaView className="flex-1 bg-[#1b2b51]">
    <StatusBar barStyle="light-content" backgroundColor="#1b2b51" />
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="px-5 pt-2 pb-4 bg-[#1b2b51]">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-bold text-white">
              Thailand Getaways
            </Text>
            <TouchableOpacity
              className="p-2 rounded-full bg-white/20"
              onPress={() => setShowFilters(true)}
            >
              <Text className="text-lg text-white">⚙️</Text>
            </TouchableOpacity>
          </View>
  
          {/* Search Bar */}
          <View className="flex-row items-center h-16 px-3 py-3 bg-white rounded-lg shadow">
            <Text className="mr-3 text-gray-400">🔍</Text>
            <TextInput
              placeholder="Search packages..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-gray-700"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity 
                className="p-1 ml-2"
                onPress={() => setSearchQuery('')}
              >
                <Text className="text-gray-400">✕</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="p-1 ml-2 bg-orange-100 rounded-full">
                <Text className="text-orange-500">✈️</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
  
        {/* Filter Chips */}
        <View className="px-4 py-2 bg-white border-b border-gray-200">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {filterOptions.map(filter => (
              <TouchableOpacity
                key={filter.id}
                className={`mr-2 px-3 py-2 rounded-full flex-row items-center ${
                  selectedFilter === filter.id
                    ? 'bg-orange-500'
                    : 'bg-gray-100'
                }`}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text className="text-sm">{filter.icon}</Text>
                <Text
                  className={`ml-1 text-xs font-medium ${
                    selectedFilter === filter.id ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
  
        {/* Packages List */}
        <ScrollView className="flex-1 mb-24">
          <View className="px-5 pt-4 pb-2">
            <Text className="text-lg font-bold text-gray-800">
              {filteredPackages.length} {selectedFilter === 'all' ? '' : filterOptions.find(f => f.id === selectedFilter)?.label} Packages
              {searchQuery && ` for "${searchQuery}"`}
            </Text>
          </View>
  
          {filteredPackages.length > 0 ? (
            filteredPackages.map(item => (
              <PackageCard key={item.id} item={item} />
            ))
          ) : (
            <View className="items-center justify-center mt-10">
              <Text className="text-lg text-gray-500">No packages found</Text>
              <TouchableOpacity 
                className="px-6 py-2 mt-4 bg-orange-500 rounded-full"
                onPress={() => {
                  setSelectedFilter('all');
                  setSearchQuery('');
                }}
              >
                <Text className="text-white">Reset filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
  
        {/* Filter Modal */}
        <Modal
          visible={showFilters}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowFilters(false)}
        >
          <View className="justify-end flex-1 bg-black/50">
            <View className="p-6 bg-white rounded-t-3xl max-h-[80vh]">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-xl font-bold">Filter Packages</Text>
                <TouchableOpacity
                  onPress={() => setShowFilters(false)}
                  className="p-2"
                >
                  <Text className="text-2xl text-gray-500">×</Text>
                </TouchableOpacity>
              </View>
  
              <ScrollView>
                <View className="mb-6">
                  <Text className="mb-3 text-lg font-semibold">Package Type</Text>
                  <View className="flex-row flex-wrap">
                    {filterOptions.map(filter => (
                      <TouchableOpacity
                        key={filter.id}
                        className={`px-4 py-2 mb-2 mr-2 rounded-full flex-row items-center ${
                          selectedFilter === filter.id
                            ? 'bg-orange-500'
                            : 'bg-gray-100'
                        }`}
                        onPress={() => setSelectedFilter(filter.id)}
                      >
                        <Text className="mr-2">{filter.icon}</Text>
                        <Text
                          className={
                            selectedFilter === filter.id
                              ? 'text-white'
                              : 'text-gray-700'
                          }
                        >
                          {filter.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
  
                <View className="mb-6">
                  <Text className="mb-3 text-lg font-semibold">Price Range</Text>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600">฿0</Text>
                    <Text className="text-gray-600">฿2000+</Text>
                  </View>
                  {/* Would implement a RangeSlider component here */}
                  <View className="h-2 bg-gray-200 rounded-full"></View>
                </View>
  
                <View className="mb-6">
                  <Text className="mb-3 text-lg font-semibold">Duration</Text>
                  <View className="flex-row flex-wrap">
                    {['Weekend', '3-5 Days', '1 Week', '10+ Days'].map(
                      duration => (
                        <TouchableOpacity
                          key={duration}
                          className="px-4 py-2 mb-2 mr-2 bg-gray-100 rounded-full"
                        >
                          <Text className="text-gray-700">{duration}</Text>
                        </TouchableOpacity>
                      ),
                    )}
                  </View>
                </View>
              </ScrollView>
  
              <TouchableOpacity
                className="py-3 bg-orange-500 rounded-full shadow"
                onPress={() => setShowFilters(false)}
              >
                <Text className="font-semibold text-center text-white">
                  Show {filteredPackages.length} Packages
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
   </SafeAreaView>
  );
};

export default PackageScreen;