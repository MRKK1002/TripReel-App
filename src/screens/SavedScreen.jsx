import React from 'react';
import { View, Text, ScrollView, Image, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SavedScreen = () => {
  const savedBuddies = [
    {
      id: 1,
      name: 'Nattawut S.',
      age: 28,
      rating: 4.9,
      price: 800,
      languages: ['English', 'Thai'],
      specialties: ['City Tours', 'Food Guide', 'Photography'],
      location: 'Bangkok',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: true,
    },
    {
      id: 4,
      name: 'Araya W.',
      age: 27,
      rating: 4.9,
      price: 950,
      languages: ['English', 'French'],
      specialties: ['Cultural Tours', 'Cooking Classes'],
      location: 'Bangkok',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      verified: true,
    }
  ];

  const savedPackages = [
    {
      id: "MW-101",
      title: "Secret Island Escape",
      price: 450,
      discount: "15%",
      people: 2,
      image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1701&auto=format&fit=crop",
      category: "Mystery Wanderlust"
    },
    {
      id: "IHB-901",
      title: "Phuket - Phi Phi - Krabi Cruise",
      price: 850,
      discount: "22%",
      people: 2,
      image: "https://images.unsplash.com/photo-1585824435346-2b9f8246b115?q=80&w=1740&auto=format&fit=crop",
      category: "Island Hopping Bliss"
    },
    {
      id: "RTE-1101",
      title: "Phuket Honeymoon Delight",
      price: 1200,
      discount: "25%",
      people: 2,
      image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
      category: "Romantic Thai Escape"
    }
  ];

  const renderBuddyItem = ({ item }) => (
    <View className="mr-4 bg-white shadow-lg rounded-xl w-80 shadow-black/10 ">
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-40 rounded-t-xl"
      />
      <View className="p-4">
        <View className="flex-row items-center mb-1">
          <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
          {item.verified && (
            <Text className="px-2 py-1 ml-2 text-xs text-white bg-blue-500 rounded-lg">✓</Text>
          )}
        </View>
        <Text className="mb-1 text-sm text-gray-600">
          {item.age} years • {item.location}
        </Text>
        <Text className="mb-1 text-sm text-amber-500">⭐ {item.rating}</Text>
        <Text className="mb-2 text-lg font-bold text-blue-600">฿{item.price}/day</Text>
        <View className="flex-row flex-wrap">
          {item.specialties.slice(0, 2).map((specialty, index) => (
            <Text key={index} className="px-3 py-1 mb-2 mr-2 text-xs text-blue-800 bg-blue-100 rounded-full">
              {specialty}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPackageItem = ({ item }) => (
    <View className="mr-4 bg-white shadow-lg rounded-xl w-80 shadow-black/10">
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-48 rounded-t-xl"
      />
      <View className="p-4">
        <Text className="mb-1 text-xs tracking-wide text-gray-600 uppercase">
          {item.category}
        </Text>
        <Text className="mb-2 text-xl font-bold text-gray-900">{item.title}</Text>
        <View className="flex-row items-center mb-1">
          <Text className="mr-3 text-xl font-bold text-blue-600">฿{item.price}</Text>
          <Text className="text-sm font-semibold text-red-500">Save {item.discount}</Text>
        </View>
        <Text className="text-sm text-gray-600">For {item.people} people</Text>
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
      <ScrollView className="flex-1 p-4 bg-gray-50">
        <Text className="mb-4 text-2xl font-bold text-gray-900">
          Saved Buddies ({savedBuddies.length})
        </Text>
        
        {savedBuddies.length > 0 ? (
          <FlatList
            data={savedBuddies}
            renderItem={renderBuddyItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          />
        ) : (
          <Text className="my-8 text-lg text-center text-gray-500">
            No buddies saved yet
          </Text>
        )}
  
        <Text className="mb-4 text-2xl font-bold text-gray-900">
          Saved Packages ({savedPackages.length})
        </Text>
        
        {savedPackages.length > 0 ? (
          <FlatList
            data={savedPackages}
            renderItem={renderPackageItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          />
        ) : (
          <Text className="my-8 text-lg text-center text-gray-500">
            No packages saved yet
          </Text>
        )}
      </ScrollView>
   </SafeAreaView>
  );
};

export default SavedScreen;