import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import SingleElement from './SingleElement';

export default function FavoritesScreen({ navigation, favorites = [], getRating, toggleFavorite }) {
  // Function to render an empty list
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Aucun favori pour le moment
      </Text>
      <Text style={styles.emptySubText}>
        Ajoutez des musiques ou artistes depuis la recherche
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <SingleElement 
            item={item} 
            getRating={getRating}
            navigation={navigation}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
