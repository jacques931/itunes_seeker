import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import InfoRow from './InfoRow';

export default function DetailsScreen({ route }) {
  const { item } = route.params;

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

        {item.artworkUrl100 && (
          <Image
            source={{ uri: item.artworkUrl100?.replace('100x100', '600x600') }}
            style={styles.artwork}
          />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.trackName || item.artistName}
          </Text>
          {item.trackName && (
            <Text style={styles.artist}>{item.artistName}</Text>
          )}
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
};

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
  },
  infoContainer: {
    padding: 16,
  }
});
