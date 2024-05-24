import React, {useEffect} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEpisodeDetails} from '../redux/actions';
import {RootState} from '../redux/store';
import {useRoute, RouteProp} from '@react-navigation/native';
import {EpisodeStackParamList} from '../navigation/EpisodeStack';

type EpisodeDetailScreenRouteProp = RouteProp<
  EpisodeStackParamList,
  'EpisodeDetail'
>;

const EpisodeDetailScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const route = useRoute<EpisodeDetailScreenRouteProp>();
  const dispatch = useDispatch();
  const episodeDetails = useSelector(
    (state: RootState) => state.episodes.episodeDetails,
  );
  const loading = useSelector((state: RootState) => state.episodes.loading);
  const error = useSelector((state: RootState) => state.episodes.error);

  useEffect(() => {
    dispatch(fetchEpisodeDetails(route.params.episodeId) as any);
  }, [dispatch, route.params.episodeId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episodeDetails?.name}</Text>
      <FlatList
        data={episodeDetails?.characters}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text>{item}</Text>
            <Button
              title="Karakteri Görüntüle"
              onPress={() =>
                navigation.navigate('CharacterDetail', {characterId: item})
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    padding: 16,
    margin: 16,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EpisodeDetailScreen;
