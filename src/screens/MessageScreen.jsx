import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, ChevronLeft, MoreVertical, Phone, Video, Send, Paperclip, Smile } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './../../android/app/src/utils/globalFont.js';

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      lastMessage: 'Hey, are we still meeting tomorrow?',
      time: '10:30 AM',
      unread: 2,
      online: true,
      isTyping: false,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'Thanks for the great tour!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      isTyping: false,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'When does the trip start?',
      time: 'Yesterday',
      unread: 1,
      online: true,
      isTyping: false,
    },
    {
      id: 4,
      name: 'David Kumar',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      lastMessage: 'See you at the airport!',
      time: 'Monday',
      unread: 0,
      online: false,
      isTyping: false,
    },
    {
      id: 5,
      name: 'Priya Sharma',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      lastMessage: 'Can you send me the itinerary?',
      time: 'Monday',
      unread: 0,
      online: true,
      isTyping: true,
    },
    {
      id: 6,
      name: 'James Anderson',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      lastMessage: 'Great experience! Highly recommend',
      time: 'Sunday',
      unread: 0,
      online: false,
      isTyping: false,
    },
  ];

  // Sample messages for selected chat
  const messages = [
    {
      id: 1,
      text: 'Hey! How are you?',
      time: '10:30 AM',
      isSent: false,
    },
    {
      id: 2,
      text: 'I\'m good! Ready for the trip tomorrow?',
      time: '10:31 AM',
      isSent: true,
    },
    {
      id: 3,
      text: 'Yes, excited! What time should we meet?',
      time: '10:32 AM',
      isSent: false,
    },
    {
      id: 4,
      text: 'Let\'s meet at 9 AM at the hotel lobby',
      time: '10:33 AM',
      isSent: true,
    },
    {
      id: 5,
      text: 'Perfect! See you then 👋',
      time: '10:34 AM',
      isSent: false,
    },
  ];

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3 border-b border-gray-100 "
      onPress={() => setSelectedChat(item)}
    >
      <View className="relative">
        <Image
          source={{ uri: item.avatar }}
          className="w-12 h-12 rounded-full"
        />
        {item.online && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </View>
      
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-gray-900">
            {item.name}
          </Text>
          <Text className="text-xs text-gray-400">
            {item.time}
          </Text>
        </View>
        
        <View className="flex-row items-center justify-between mt-1">
          <Text 
            className={`text-sm flex-1 mr-2 ${item.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}
            numberOfLines={1}
          >
            {item.isTyping ? (
              <Text className="text-green-600">Typing...</Text>
            ) : (
              item.lastMessage
            )}
          </Text>
          
          {item.unread > 0 && (
            <View className="items-center justify-center w-5 h-5 bg-green-500 rounded-full">
              <Text className="text-xs font-semibold text-white">
                {item.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => (
    <View className={`px-4 py-2 ${item.isSent ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
          item.isSent
            ? 'bg-green-500 rounded-tr-none'
            : 'bg-gray-100 rounded-tl-none'
        }`}
      >
        <Text
          className={`text-sm ${item.isSent ? 'text-white' : 'text-gray-900'}`}
        >
          {item.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${item.isSent ? 'text-green-100' : 'text-gray-400'}`}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  if (selectedChat) {
    return (
      <SafeAreaProvider className="flex-1 bg-white " style={{marginTop:40}}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Chat Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <TouchableOpacity
            onPress={() => setSelectedChat(null)}
            className="p-1"
          >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          
          <View className="flex-row items-center flex-1 ml-3">
            <Image
              source={{ uri: selectedChat.avatar }}
              className="w-10 h-10 rounded-full"
            />
            <View className="ml-3">
              <Text className="text-base font-semibold text-gray-900">
                {selectedChat.name}
              </Text>
              {selectedChat.isTyping ? (
                <Text className="text-xs text-green-600">Typing...</Text>
              ) : selectedChat.online ? (
                <Text className="text-xs text-green-500">Online</Text>
              ) : null}
            </View>
          </View>
          
          <View className="flex-row">
            <TouchableOpacity className="p-2">
              <Phone size={20} color="#1F8A70" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 ml-2">
              <Video size={20} color="#1F8A70" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 ml-2">
              <MoreVertical size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id.toString()}
          className="flex-1 px-2"
          contentContainerStyle={{ paddingVertical: 16 }}
        />
        
        {/* Message Input */}
        <View className="flex-row items-center px-4 py-3 bg-white border-t border-gray-200">
          <TouchableOpacity className="p-2">
            <Paperclip size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          <View className="flex-row items-center flex-1 px-3 mx-2 bg-gray-100 rounded-full">
            <TextInput
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 py-2 text-base text-gray-900"
              multiline
            />
            <TouchableOpacity className="p-1">
              <Smile size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            className={`p-2 rounded-full ${messageText.trim() ? 'bg-green-500' : 'bg-gray-200'}`}
            disabled={!messageText.trim()}
          >
            <Send size={20} color={messageText.trim() ? '#fff' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View className="px-5 pt-2 pb-3 mt-10 border-b border-gray-200">
        <Text className="text-center text-gray-900" style={{fontSize: 22, fontWeight: '700'}}>
          Messages
        </Text>
      </View>
      
      {/* Tabs */}
      <View className="flex-row px-5 pt-3 border-b border-gray-200">
        <TouchableOpacity
          className={`mr-6 pb-3 ${activeTab === 'messages' ? 'border-b-2 border-green-500' : ''}`}
          onPress={() => setActiveTab('messages')}
        >
          <Text
            className={`text-base font-medium ${
              activeTab === 'messages' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            Messages
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`pb-3 ${activeTab === 'requests' ? 'border-b-2 border-green-500' : ''}`}
          onPress={() => setActiveTab('requests')}
        >
          <Text
            className={`text-base font-medium ${
              activeTab === 'requests' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            Requests
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View className="px-4 py-3">
        <View className="flex-row items-center px-3 py-2 bg-gray-100 rounded-lg">
          <Search size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search messages..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-base text-gray-900"
          />
        </View>
      </View>
      
      {/* Messages List */}
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaProvider>
  );
};

export default MessagesScreen;