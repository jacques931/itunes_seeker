import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SingleElement from './SingleElement';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('song');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchItunes = async () => {
    try {
      setHasSearched(true);
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=${searchType}`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Erreur de recherche:', error);
      setResults([]);
    }
  };

  const handleSearchType = (type) => {
    setSearchType(type);
    setSearchQuery('');
    setResults([]);
    setHasSearched(false);
  };

  const renderEmptyList = () => {
    if (!hasSearched) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Aucun résultat trouvé pour "{searchQuery}"
        </Text>
        <Text style={styles.emptySubText}>
          Essayez avec des mots-clés différents
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher..."
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={searchItunes}
          >
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.typeContainer}>
        <TouchableOpacity
            style={[styles.typeButton, searchType === 'song' && styles.activeType]}
            onPress={() => handleSearchType('song')}
          >
            <Text style={styles.typeText}>Titres</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, searchType === 'musicArtist' && styles.activeType]}
            onPress={() => handleSearchType('musicArtist')}
          >
            <Text style={styles.typeText}>Artistes</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={results}
        renderItem={({ item }) => (
          <SingleElement item={item} searchType={searchType} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        ListEmptyComponent={renderEmptyList}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  activeType: {
    backgroundColor: '#007AFF',
  },
  typeText: {
    fontWeight: '600',
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
  }
});
