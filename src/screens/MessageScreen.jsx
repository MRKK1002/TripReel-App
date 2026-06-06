import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
  ActivityIndicator,
  Platform,
  Modal,
  Pressable,
  Keyboard,
  BackHandler,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  Search,
  ChevronLeft,
  MoreVertical,
  Send,
  Paperclip,
  MessageCircle,
  Image as ImageIcon,
  Info,
  X,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import { chatAPI, SERVER_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import api from '../services/api';

const resolveImage = url => {
  if (!url) return null;
  if (url.startsWith('http')) {
    if (url.includes('/uploads/')) {
      const path = url.substring(url.indexOf('/uploads/'));
      return `${SERVER_URL}${path}`;
    }
    return url;
  }
  return `${SERVER_URL}${url.startsWith('/') ? url : '/' + url}`;
};

// Date divider helper
const isSameDay = (d1, d2) => {
  const a = new Date(d1);
  const b = new Date(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const formatDateDivider = d => {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (isSameDay(date, today)) return 'Today';
  if (isSameDay(date, yesterday)) return 'Yesterday';
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const MessagesScreen = () => {
  const navigation = useNavigation();
  const { user, token } = useAuth();

  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [typingUser, setTypingUser] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  const socketRef = useRef(null);
  const flatListRef = useRef(null);
  const typingTimeout = useRef(null);

  // Track keyboard height on Android
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => setKeyboardHeight(e.endCoordinates.height),
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Handle Android back button — close chat instead of navigating away
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (previewImage) {
          setPreviewImage(null);
          return true;
        }
        if (selectedChat) {
          setSelectedChat(null);
          return true;
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, [selectedChat, previewImage]);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      const res = await chatAPI.getConversations();
      setConversations(res.data?.conversations || []);
    } catch {
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchConversations();
    }, [fetchConversations]),
  );

  // WebSocket — connect once globally (not per chat)
  useEffect(() => {
    if (!token) return;

    const socket = io(SERVER_URL, {
      auth: { token, userType: 'user' },
      transports: ['websocket'],
      reconnection: true,
    });

    socket.on('connect', () => console.log('Chat socket connected'));

    // Listen for new messages globally
    socket.on('new_message', msg => {
      // If we're in the chat for this conversation, add to messages
      if (selectedChat && msg.conversationId === selectedChat._id) {
        setMessages(prev => {
          // Avoid duplicates (from optimistic add)
          if (prev.some(m => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
        socket.emit('mark_read', { conversationId: selectedChat._id });
      }

      // Always update conversation list (unread count + preview)
      setConversations(prev =>
        prev.map(c => {
          if (c._id === msg.conversationId) {
            const isCurrentChat = selectedChat?._id === msg.conversationId;
            return {
              ...c,
              lastMessage: msg.text || '📷 Image',
              lastMessageAt: msg.createdAt,
              unreadUser: isCurrentChat
                ? 0
                : (c.unreadUser || 0) + (msg.senderType !== 'user' ? 1 : 0),
            };
          }
          return c;
        }),
      );
    });

    // Message notification when on the list screen
    socket.on('message_notification', ({ conversationId, preview }) => {
      setConversations(prev =>
        prev.map(c =>
          c._id === conversationId
            ? {
                ...c,
                lastMessage: preview,
                lastMessageAt: new Date().toISOString(),
                unreadUser: (c.unreadUser || 0) + 1,
              }
            : c,
        ),
      );
    });

    socket.on('user_typing', ({ conversationId, userType, isTyping }) => {
      if (selectedChat?._id === conversationId && userType !== 'user') {
        setTypingUser(isTyping ? 'Typing...' : null);
      }
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  // Update socket's selectedChat reference
  useEffect(() => {
    if (selectedChat && socketRef.current) {
      socketRef.current.emit('join_conversation', selectedChat._id);
      socketRef.current.emit('mark_read', { conversationId: selectedChat._id });
      // Reset unread in local state
      setConversations(prev =>
        prev.map(c =>
          c._id === selectedChat._id ? { ...c, unreadUser: 0 } : c,
        ),
      );
      return () => {
        socketRef.current?.emit('leave_conversation', selectedChat._id);
      };
    }
  }, [selectedChat?._id]);

  // Fetch messages when chat selected
  useEffect(() => {
    if (!selectedChat) return;
    setMessagesLoading(true);
    chatAPI
      .getMessages(selectedChat._id)
      .then(res => setMessages(res.data?.messages || []))
      .catch(() => setMessages([]))
      .finally(() => setMessagesLoading(false));
  }, [selectedChat?._id]);

  // Send message
  const handleSend = async () => {
    const text = messageText.trim();
    if (!text) return;
    setMessageText('');

    const optimisticMsg = {
      _id: 'opt_' + Date.now(),
      conversationId: selectedChat._id,
      senderId: user?._id,
      senderType: 'user',
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);

    if (socketRef.current?.connected) {
      socketRef.current.emit('send_message', {
        conversationId: selectedChat._id,
        text,
        senderName: user?.name || '',
      });
    } else {
      try {
        await chatAPI.sendMessage(selectedChat._id, { text });
      } catch {}
    }
  };

  // Send image
  const handleAttachment = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      maxWidth: 1024,
    });
    if (result.didCancel || !result.assets?.length) return;

    const asset = result.assets[0];
    setSending(true);
    try {
      // Upload image
      const formData = new FormData();
      formData.append('image', {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || 'chat_image.jpg',
      });
      const uploadRes = await api.post('/upload/chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = uploadRes.data?.url || '';

      if (imageUrl && socketRef.current?.connected) {
        socketRef.current.emit('send_message', {
          conversationId: selectedChat._id,
          text: '',
          imageUrl,
          senderName: user?.name || '',
        });
        setMessages(prev => [
          ...prev,
          {
            _id: 'opt_img_' + Date.now(),
            conversationId: selectedChat._id,
            senderId: user?._id,
            senderType: 'user',
            text: '',
            imageUrl,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.warn('Image upload failed:', err?.message);
    } finally {
      setSending(false);
    }
  };

  // Typing indicator
  const handleTyping = text => {
    setMessageText(text);
    if (socketRef.current && selectedChat) {
      socketRef.current.emit('typing', {
        conversationId: selectedChat._id,
        isTyping: true,
      });
      clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => {
        socketRef.current?.emit('typing', {
          conversationId: selectedChat._id,
          isTyping: false,
        });
      }, 2000);
    }
  };

  // Filter conversations
  const filtered = searchText.trim()
    ? conversations.filter(c =>
        (
          c.operatorId?.contactName ||
          c.operatorId?.businessName ||
          c.packageTitle ||
          ''
        )
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      )
    : conversations;

  // Format time
  const fmtTime = d => {
    if (!d) return '';
    const date = new Date(d);
    const now = new Date();
    const diff = now - date;
    if (diff < 86400000)
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      });
    if (diff < 172800000) return 'Yesterday';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  // Build messages with date dividers
  const messagesWithDates = [];
  let lastDate = null;
  messages.forEach(msg => {
    const msgDate = msg.createdAt
      ? new Date(msg.createdAt).toDateString()
      : null;
    if (msgDate && msgDate !== lastDate) {
      messagesWithDates.push({
        _id: 'date_' + msgDate,
        type: 'date',
        date: msg.createdAt,
      });
      lastDate = msgDate;
    }
    messagesWithDates.push({ ...msg, type: 'message' });
  });

  // Reverse for inverted FlatList — latest messages first
  const invertedData = [...messagesWithDates].reverse();

  // ── Chat View ─────────────────────────────────────────────────────────────
  if (selectedChat) {
    const opName =
      selectedChat.operatorId?.businessName ||
      selectedChat.operatorId?.contactName ||
      'Operator';
    const opAvatar = resolveImage(selectedChat.operatorId?.profilePhoto);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* Chat Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
          }}
        >
          <TouchableOpacity
            onPress={() => setSelectedChat(null)}
            style={{ padding: 4 }}
          >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              marginLeft: 8,
            }}
          >
            {opAvatar ? (
              <Image
                source={{ uri: opAvatar }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#E6F4EF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: '700', color: '#1F8A70' }}
                >
                  {opName.charAt(0)}
                </Text>
              </View>
            )}
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text
                style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}
                numberOfLines={1}
              >
                {opName}
              </Text>
              {typingUser ? (
                <Text style={{ fontSize: 11, color: '#10B981' }}>
                  Typing...
                </Text>
              ) : (
                <Text
                  style={{ fontSize: 11, color: '#9CA3AF' }}
                  numberOfLines={1}
                >
                  {selectedChat.packageTitle}
                </Text>
              )}
            </View>
          </View>

          {/* Three dots menu */}
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={{ padding: 8 }}
          >
            <MoreVertical size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Messages + Input */}
        <View
          style={{
            flex: 1,
            paddingBottom:
              selectedChat && keyboardHeight > 0 ? keyboardHeight - 60 : 0,
          }}
        >
          {messagesLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size="large" color="#1F8A70" />
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={invertedData}
              inverted
              renderItem={({ item }) => {
                // Date divider
                if (item.type === 'date') {
                  return (
                    <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                      <View
                        style={{
                          backgroundColor: '#F3F4F6',
                          borderRadius: 12,
                          paddingHorizontal: 12,
                          paddingVertical: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#6B7280',
                            fontWeight: '500',
                          }}
                        >
                          {formatDateDivider(item.date)}
                        </Text>
                      </View>
                    </View>
                  );
                }

                const isSent = item.senderType === 'user';
                return (
                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 3,
                      alignItems: isSent ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <View
                      style={{
                        maxWidth: '78%',
                        paddingHorizontal: 14,
                        paddingVertical: 9,
                        borderRadius: 18,
                        borderTopRightRadius: isSent ? 4 : 18,
                        borderTopLeftRadius: isSent ? 18 : 4,
                        backgroundColor: isSent ? '#1F8A70' : '#F3F4F6',
                      }}
                    >
                      {item.imageUrl ? (
                        <TouchableOpacity
                          onPress={() =>
                            setPreviewImage(resolveImage(item.imageUrl))
                          }
                          activeOpacity={0.9}
                        >
                          <Image
                            source={{ uri: resolveImage(item.imageUrl) }}
                            style={{
                              width: 200,
                              height: 150,
                              borderRadius: 10,
                              marginBottom: item.text ? 6 : 0,
                            }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      ) : null}
                      {item.text ? (
                        <Text
                          style={{
                            fontSize: 14,
                            color: isSent ? '#fff' : '#111827',
                            lineHeight: 20,
                          }}
                        >
                          {item.text}
                        </Text>
                      ) : null}
                      <Text
                        style={{
                          fontSize: 10,
                          color: isSent ? 'rgba(255,255,255,0.6)' : '#9CA3AF',
                          marginTop: 3,
                          textAlign: 'right',
                        }}
                      >
                        {fmtTime(item.createdAt)}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item._id}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingVertical: 10 }}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
            />
          )}

          {/* Message Input — check if chat expired */}
          {selectedChat.expiresAt &&
          new Date() > new Date(selectedChat.expiresAt) ? (
            <View
              style={{
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
                backgroundColor: '#F9FAFB',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ fontSize: 13, color: '#6B7280', textAlign: 'center' }}
              >
                💬 Chat ended — trip completed. Messages are read-only.
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 8,
                backgroundColor: '#fff',
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
              }}
            >
              <TouchableOpacity
                onPress={handleAttachment}
                style={{ padding: 8 }}
              >
                <Paperclip size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#F3F4F6',
                  borderRadius: 22,
                  paddingHorizontal: 14,
                  marginHorizontal: 6,
                  minHeight: 40,
                }}
              >
                <TextInput
                  value={messageText}
                  onChangeText={handleTyping}
                  placeholder="Type a message..."
                  placeholderTextColor="#9CA3AF"
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: '#111827',
                    maxHeight: 80,
                    paddingVertical: 8,
                  }}
                  multiline
                />
              </View>

              <TouchableOpacity
                onPress={handleSend}
                disabled={!messageText.trim()}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: messageText.trim() ? '#1F8A70' : '#E5E7EB',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Send
                  size={18}
                  color={messageText.trim() ? '#fff' : '#9CA3AF'}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Three dots menu modal */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
            onPress={() => setMenuVisible(false)}
          >
            <View
              style={{
                position: 'absolute',
                top: 60,
                right: 16,
                backgroundColor: '#fff',
                borderRadius: 12,
                paddingVertical: 6,
                minWidth: 180,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  setMenuVisible(false);
                  try {
                    const bookingRes = await api.get(
                      `/trip-bookings/${selectedChat.bookingId}`,
                    );
                    navigation.navigate('BookingDetails', {
                      booking: bookingRes.data?.booking,
                    });
                  } catch {
                    navigation.navigate('BookingDetails', {
                      booking: {
                        _id: selectedChat.bookingId,
                        snapshot: {
                          packageTitle: selectedChat.packageTitle,
                        },
                      },
                    });
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  gap: 10,
                }}
              >
                <Info size={16} color="#374151" />
                <Text style={{ fontSize: 14, color: '#374151' }}>
                  View Booking
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('ReportIssue', {
                    operatorId: selectedChat.operatorId?._id,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  gap: 10,
                }}
              >
                <ImageIcon size={16} color="#EF4444" />
                <Text style={{ fontSize: 14, color: '#EF4444' }}>
                  Report Issue
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Image Preview Modal */}
        <Modal
          visible={!!previewImage}
          transparent
          animationType="fade"
          onRequestClose={() => setPreviewImage(null)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.9)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => setPreviewImage(null)}
              style={{
                position: 'absolute',
                top: 50,
                right: 20,
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={22} color="#fff" />
            </TouchableOpacity>
            {previewImage && (
              <Image
                source={{ uri: previewImage }}
                style={{ width: '90%', height: '70%' }}
                resizeMode="contain"
              />
            )}
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // ── Conversations List View ─────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '700',
            color: '#111827',
          }}
        >
          Messages
        </Text>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Search size={18} color="#9CA3AF" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search messages..."
            placeholderTextColor="#9CA3AF"
            style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111827' }}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <X size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Conversations */}
      {loading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#1F8A70" />
        </View>
      ) : filtered.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
          }}
        >
          <MessageCircle size={48} color="#D1D5DB" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#374151',
              marginTop: 12,
            }}
          >
            {searchText ? 'No results found' : 'No messages yet'}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#9CA3AF',
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            {searchText
              ? 'Try a different search'
              : 'Book a trip to start chatting with the operator'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={({ item }) => {
            const name =
              item.operatorId?.businessName ||
              item.operatorId?.contactName ||
              'Operator';
            const avatar = resolveImage(item.operatorId?.profilePhoto);
            return (
              <TouchableOpacity
                onPress={() => setSelectedChat(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F3F4F6',
                }}
              >
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={{ width: 48, height: 48, borderRadius: 24 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: '#E6F4EF',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#1F8A70',
                      }}
                    >
                      {name.charAt(0)}
                    </Text>
                  </View>
                )}

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: '#111827',
                      }}
                      numberOfLines={1}
                    >
                      {name}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
                      {fmtTime(item.lastMessageAt)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: item.unreadUser > 0 ? '#111827' : '#6B7280',
                        fontWeight: item.unreadUser > 0 ? '600' : '400',
                        flex: 1,
                        marginRight: 8,
                      }}
                      numberOfLines={1}
                    >
                      {item.lastMessage || item.packageTitle}
                    </Text>
                    {item.unreadUser > 0 && (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          backgroundColor: '#1F8A70',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: '700',
                            color: '#fff',
                          }}
                        >
                          {item.unreadUser}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default MessagesScreen;
