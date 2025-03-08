import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoriteButton({ isFavorite, onPress, size = 28 }) {
  return (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={onPress}
    >
      <Ionicons 
        name={isFavorite ? 'heart' : 'heart-outline'} 
        size={size} 
        color={isFavorite ? '#ff3b30' : '#666'} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    padding: 8,
  },
});
