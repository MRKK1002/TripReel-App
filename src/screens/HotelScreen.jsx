import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { Calendar, MapPin, DollarSign, Users, Star, Filter, ChevronDown } from 'lucide-react-native';

const HotelScreen = () => {
  // State for filters
  const [location, setLocation] = useState('Phuket');
  const [checkInDate, setCheckInDate] = useState('15 Oct 2023');
  const [checkOutDate, setCheckOutDate] = useState('20 Oct 2023');
  const [guests, setGuests] = useState(2);
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Sample hotel data
  const hotels = [
    {
      id: 1,
      name: 'The Sarojin Resort',
      location: 'Khao Lak',
      price: 4200,
      rating: 4.8,
      reviews: 1247,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Pool', 'Spa', 'Beachfront'],
      stars: 5
    },
    {
      id: 2,
      name: 'Banyan Tree Bangkok',
      location: 'Bangkok',
      price: 5600,
      rating: 4.7,
      reviews: 2856,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Pool', 'Spa', 'Restaurant'],
      stars: 5
    },
    {
      id: 3,
      name: 'Pai River Corner',
      location: 'Pai',
      price: 1200,
      rating: 4.5,
      reviews: 893,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['River View', 'Restaurant', 'Garden'],
      stars: 4
    },
    {
      id: 4,
      name: 'Rayavadee Krabi',
      location: 'Krabi',
      price: 8900,
      rating: 4.9,
      reviews: 1562,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Private Beach', 'Pool', 'Luxury Spa'],
      stars: 5
    },
    {
      id: 5,
      name: 'Chiang Mai Heritage',
      location: 'Chiang Mai',
      price: 1800,
      rating: 4.3,
      reviews: 765,
      image: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Historic', 'Pool', 'City Center'],
      stars: 4
    },
  ];

  // Filter and sort hotels based on criteria
  const filteredHotels = hotels
    .filter(hotel => hotel.price >= priceRange[0] && hotel.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id; // Default sort
    });

  const renderStars = (count) => {
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
    ));
  };

  const renderHotelItem = ({ item }) => (
    <View className="mb-5 overflow-hidden bg-white shadow-md rounded-xl">
      <Image source={{ uri: item.image }} className="w-full h-48" />
      <View className="p-4">
        <View className="flex-row items-start justify-between mb-2">
          <Text className="flex-1 mr-2 text-lg font-bold">{item.name}</Text>
          <Text className="text-lg font-bold text-blue-600">฿{item.price.toLocaleString()}</Text>
        </View>
        <View className="flex-row items-center mb-2">
          <MapPin size={16} color="#6B7280" />
          <Text className="ml-1 text-gray-600">{item.location}</Text>
        </View>
        <View className="flex-row items-center mb-3">
          {renderStars(item.stars)}
          <Text className="ml-2 text-gray-600">({item.reviews.toLocaleString()})</Text>
        </View>
        <View className="flex-row flex-wrap">
          {item.amenities.map((amenity, index) => (
            <View key={index} className="px-2 py-1 mb-2 mr-2 bg-blue-100 rounded-full">
              <Text className="text-xs text-blue-800">{amenity}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity className="py-3 mt-4 bg-blue-600 rounded-lg">
          <Text className="font-semibold text-center text-white">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 mb-12 bg-gray-100">
      {/* Header */}
      
      <View className="">
        {/* <Text className="text-2xl font-bold text-center text-white">Thailand Hotels</Text> */}
      </View>

      {/* Search and Filters Bar */}
      <View className="px-4 py-3 bg-white shadow-sm">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="flex-row items-center flex-1 px-3 py-2 mr-2 bg-gray-100 rounded-lg">
            <MapPin size={18} color="#4B5563" />
            <Text className="ml-2">{location}</Text>
            <ChevronDown size={16} color="#4B5563" className="ml-auto" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center px-3 py-2 bg-blue-600 rounded-lg"
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} color="white" />
            <Text className="ml-1 text-white">Filters</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-3">
          <TouchableOpacity className="flex-row items-center flex-1 px-3 py-2 mr-2 bg-gray-100 rounded-lg">
            <Calendar size={18} color="#4B5563" />
            <Text className="ml-2">{checkInDate}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center flex-1 px-3 py-2 ml-2 bg-gray-100 rounded-lg">
            <Calendar size={18} color="#4B5563" />
            <Text className="ml-2">{checkOutDate}</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-3">
          <TouchableOpacity className="flex-row items-center flex-1 px-3 py-2 mr-2 bg-gray-100 rounded-lg">
            <Users size={18} color="#4B5563" />
            <Text className="ml-2">{guests} Guests</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center flex-1 px-3 py-2 ml-2 bg-gray-100 rounded-lg">
            <DollarSign size={18} color="#4B5563" />
            <Text className="ml-2">฿{priceRange[0]} - ฿{priceRange[1]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Expanded Filters */}
      {showFilters && (
        <View className="p-4 bg-white shadow-md">
          <Text className="mb-3 text-lg font-bold">Filter Options</Text>
          
          <View className="mb-4">
            <Text className="mb-2 font-semibold">Price Range (฿)</Text>
            <View className="flex-row items-center justify-between">
              <TextInput
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                value={priceRange[0].toString()}
                onChangeText={(text) => setPriceRange([parseInt(text) || 0, priceRange[1]])}
                keyboardType="numeric"
              />
              <Text className="text-gray-500">to</Text>
              <TextInput
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                value={priceRange[1].toString()}
                onChangeText={(text) => setPriceRange([priceRange[0], parseInt(text) || 0])}
                keyboardType="numeric"
              />
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="mb-2 font-semibold">Sort By</Text>
            <View className="flex-row flex-wrap">
              {['recommended', 'priceLow', 'priceHigh', 'rating'].map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                    sortBy === option ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  onPress={() => setSortBy(option)}
                >
                  <Text className={sortBy === option ? 'text-white' : 'text-gray-800'}>
                    {option === 'recommended' && 'Recommended'}
                    {option === 'priceLow' && 'Price: Low to High'}
                    {option === 'priceHigh' && 'Price: High to Low'}
                    {option === 'rating' && 'Rating'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity 
            className="py-3 bg-blue-600 rounded-lg"
            onPress={() => setShowFilters(false)}
          >
            <Text className="font-semibold text-center text-white">Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Results Count */}
      <View className="px-4 py-3 mt-1 bg-white shadow-sm">
        <Text className="text-gray-600">
          {filteredHotels.length} hotels in {location}
        </Text>
      </View>

      {/* Hotels List */}
      <FlatList
        data={filteredHotels}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
        className="px-4 pt-4"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HotelScreen;