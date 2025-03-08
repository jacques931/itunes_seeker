import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

export default function SingleElement({ item, searchType, navigation }) {
  return (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <View style={styles.container}>
        {searchType === 'song' && (
          <Image 
            source={{ uri: item.artworkUrl60 }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>
            {searchType === 'musicArtist' ? item.artistName : item.trackName}
          </Text>
          {searchType === 'song' && (
            <>
              <Text style={styles.itemSubtitle}>{item.artistName}</Text>
              <Text style={styles.itemGenre}>{item.primaryGenreName}</Text>
            </>
          )}
        </View>
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
});