import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import InfoRow from './InfoRow';
import RatingStars from './RatingStars';
import FavoriteButton from './FavoriteButton';

export default function DetailsScreen({ route, getIsFavorite, getRating, setRating, toggleFavorite }) {
  const { item } = route.params;
  const isArtist = item.type === 'musicArtist';
  const isFavorite = getIsFavorite(item);
  const currentRating = getRating(item);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDuration = (timeInMs) => {
    if (!timeInMs) return null;
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = ((timeInMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {!isArtist && item.artworkUrl100 && (
          <Image
            source={{ uri: item.artworkUrl100?.replace('100x100', '600x600') }}
            style={styles.artwork}
          />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {isArtist ? item.artistName : item.trackName}
          </Text>
          {!isArtist && (
            <Text style={styles.artist}>{item.artistName}</Text>
          )}
          <View style={styles.actionContainer}>
            <FavoriteButton
              isFavorite={isFavorite}
              onPress={(e) => {
                e.stopPropagation();
                toggleFavorite && toggleFavorite(item);
              }}
            />
            {isFavorite && (
              <RatingStars rating={currentRating} onRatingChange={(rating) => setRating(item, rating)} />
            )}
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <InfoRow label="Album" value={item.collectionName} />
        <InfoRow label="Genre" value={item.primaryGenreName} />
        <InfoRow label="Date de sortie" value={formatDate(item.releaseDate)} />
        <InfoRow label="Durée" value={formatDuration(item.trackTimeMillis)} />
        <InfoRow label="Prix" value={item.trackPrice ? `${item.trackPrice} €` : null} />
        <InfoRow label="Pays" value={item.country} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  artist: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  actionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 8,
  },
  infoContainer: {
    padding: 16,
  }
});
