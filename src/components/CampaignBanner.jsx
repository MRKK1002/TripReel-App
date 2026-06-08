import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Linking,
} from 'react-native';
import { X } from 'lucide-react-native';
import { campaignsAPI, SERVER_URL } from '../services/api';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CampaignBanner({ navigation }) {
  const [campaign, setCampaign] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      const res = await campaignsAPI.getActive();
      console.log('Campaign response:', JSON.stringify(res.data));
      if (res.data?.campaign) {
        setCampaign(res.data.campaign);
        // Slide up animation after a short delay
        setTimeout(() => {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 9,
          }).start();
        }, 1000);
      }
    } catch (err) {
      console.log('Campaign fetch error:', err?.message);
    }
  };

  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setDismissed(true);
    });
  };

  const handleCTA = async () => {
    if (!campaign) return;

    // Track click
    try {
      campaignsAPI.trackClick(campaign._id);
    } catch {}

    // Navigate or open link
    if (campaign.packageId) {
      handleDismiss();
      // Navigate to package detail
      setTimeout(() => {
        navigation?.navigate?.('DestinationDetail', {
          destination: { _id: campaign.packageId },
        });
      }, 300);
    } else if (campaign.ctaLink) {
      if (campaign.ctaLink.startsWith('http')) {
        Linking.openURL(campaign.ctaLink);
      }
      handleDismiss();
    } else {
      handleDismiss();
    }
  };

  if (dismissed || !campaign) return null;

  const resolveImg = url => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${SERVER_URL}${url.startsWith('/') ? url : '/' + url}`;
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 20,
          overflow: 'hidden',
        }}
      >
        {/* Close button */}
        <TouchableOpacity
          onPress={handleDismiss}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: 'rgba(255,255,255,0.9)',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <X size={18} color="#374151" />
        </TouchableOpacity>

        {/* Campaign Image */}
        {campaign.imageUrl ? (
          <Image
            source={{ uri: resolveImg(campaign.imageUrl) }}
            style={{ width: '100%', height: 200 }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{ width: '100%', height: 120, backgroundColor: '#E0F2FE' }}
          />
        )}

        {/* Content */}
        <View style={{ padding: 20, paddingBottom: 32 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#111827',
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            {campaign.title}
          </Text>

          {campaign.description ? (
            <Text
              style={{
                fontSize: 14,
                color: '#6B7280',
                textAlign: 'center',
                lineHeight: 20,
                marginBottom: 16,
              }}
            >
              {campaign.description}
            </Text>
          ) : null}

          {/* CTA Button */}
          <TouchableOpacity
            onPress={handleCTA}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#E91E63',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '700',
              }}
            >
              {campaign.ctaText || 'View Offer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
