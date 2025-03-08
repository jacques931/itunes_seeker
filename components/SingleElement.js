import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import FavoriteButton from './FavoriteButton';
import RatingStars from './RatingStars';

export default function SingleElement({ item, navigation, isFavorite, getRating, onToggleFavorite }) {
  const isArtist = item.type === 'musicArtist';
  const rating = getRating(item);

  return (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <View style={styles.container}>
        {!isArtist && item.artworkUrl60 && (
          <Image 
            source={{ uri: item.artworkUrl60 }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{isArtist ? item.artistName : item.trackName}</Text>
          {!isArtist && (
            <>
              <Text style={styles.itemSubtitle}>{item.artistName}</Text>
              <Text style={styles.itemGenre}>{item.primaryGenreName}</Text>
            </>
          )}
          {isFavorite && rating > 0 && (
            <RatingStars rating={rating} size={12} onRatingChange={() => {}} />
          )}
        </View>
        <FavoriteButton
          isFavorite={isFavorite}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite();
          }}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemGenre: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontStyle: 'italic',
  },
  favoriteButton: {
    padding: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  starIcon: {
    marginRight: 2,
  },
});