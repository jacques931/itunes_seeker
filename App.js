import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import SearchScreen from './components/SearchScreen';
import DetailsScreen from './components/DetailsScreen';
import FavoritesScreen from './components/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SearchStack({ getIsFavorite, getRating, setRating, toggleFavorite }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" options={{ title: 'Recherche iTunes' }}>
        {props => <SearchScreen {...props} getIsFavorite={getIsFavorite} getRating={getRating} setRating={setRating} toggleFavorite={toggleFavorite} />}
      </Stack.Screen>
      <Stack.Screen name="Details" options={{ title: 'Détails' }}>
        {props => <DetailsScreen {...props} getIsFavorite={getIsFavorite} getRating={getRating} setRating={setRating} toggleFavorite={toggleFavorite} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function FavoritesStack({ favorites, getIsFavorite, getRating, setRating, toggleFavorite }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesScreen" options={{ title: 'Favoris' }}>
        {props => <FavoritesScreen {...props} favorites={favorites} getRating={getRating} toggleFavorite={toggleFavorite} />}
      </Stack.Screen>
      <Stack.Screen name="Details" options={{ title: 'Détails' }}>
        {props => <DetailsScreen {...props} getIsFavorite={getIsFavorite} getRating={getRating} setRating={setRating} toggleFavorite={toggleFavorite} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    const isFavorite = getIsFavorite(item);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => 
        item.type === 'musicArtist'  
          ? fav.artistId !== item.artistId 
          : fav.trackId !== item.trackId
      ));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const getIsFavorite = (item) => {
    return favorites.some(fav => 
      item.type === 'musicArtist' 
        ? fav.artistId === item.artistId 
        : fav.trackId === item.trackId
    );
  };

  const getRating = (item) => {
    const isFavorite = getIsFavorite(item);
    return isFavorite 
      ? favorites.find(fav => 
          item.type === 'musicArtist' 
            ? fav.artistId === item.artistId 
            : fav.trackId === item.trackId
        )?.rating || 0
    : 0;
  };

  const setRating = (item, rating) => {
    const isFavorite = getIsFavorite(item);
    if (!isFavorite) {
      setFavorites([...favorites, { ...item, rating }]);
    } else {
      setFavorites(favorites.map(fav => 
        (item.type === 'musicArtist' ? fav.artistId === item.artistId : fav.trackId === item.trackId)
          ? { ...fav, rating }
          : fav
      ));
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Search" options={{ headerShown: false, title: 'Recherche iTunes' }}>
          {props => <SearchStack {...props} getIsFavorite={getIsFavorite} getRating={getRating} setRating={setRating} toggleFavorite={toggleFavorite} />}
        </Tab.Screen>
        <Tab.Screen name="Favorites" options={{ headerShown: false, title: 'Favoris' }}>
          {props => <FavoritesStack {...props} favorites={favorites} getIsFavorite={getIsFavorite} getRating={getRating} setRating={setRating} toggleFavorite={toggleFavorite} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
