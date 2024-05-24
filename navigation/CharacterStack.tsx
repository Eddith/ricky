import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

export type CharacterStackParamList = {
  CharacterDetail: {characterId: number};
  Favorites: undefined;
};

const Stack = createStackNavigator<CharacterStackParamList>();

const CharacterStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{title: 'Character Detail'}}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: 'Favorites'}}
      />
    </Stack.Navigator>
  );
};

export default CharacterStack;
