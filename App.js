import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './components/SearchScreen';
import DetailsScreen from './components/DetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ title: 'Recherche iTunes' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Détails' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
