import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';

export type EpisodeStackParamList = {
  EpisodeList: undefined;
  EpisodeDetail: {episodeId: number};
  CharacterDetail: {characterId: number};
};

const Stack = createStackNavigator<EpisodeStackParamList>();

const EpisodeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EpisodeDetail"
        component={EpisodeDetailScreen}
        options={{title: 'Episode Detail'}}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{title: 'Character Detail'}}
      />
    </Stack.Navigator>
  );
};

export default EpisodeStack;
