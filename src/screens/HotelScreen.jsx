import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HotelScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hotel Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
});
