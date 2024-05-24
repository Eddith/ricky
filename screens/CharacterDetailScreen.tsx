/* eslint-disable radix */
import React, {useEffect} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCharacterDetails} from '../redux/actions';
import {RootState} from '../redux/store';
import {useRoute, RouteProp} from '@react-navigation/native';
import {CharacterStackParamList} from '../navigation/CharacterStack';
import {addFavorite} from '../redux/slices/characterSlice';

type CharacterDetailScreenRouteProp = RouteProp<
  CharacterStackParamList,
  'CharacterDetail'
>;

const CharacterDetailScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const route = useRoute<CharacterDetailScreenRouteProp>();
  const dispatch = useDispatch();
  const characterDetails = useSelector(
    (state: RootState) => state.characters.characterDetails,
  );
  const loading = useSelector((state: RootState) => state.characters.loading);
  const error = useSelector((state: RootState) => state.characters.error);

  const characterId = parseInt(
    route.params.characterId.toString().split('/')[5],
  );

  useEffect(() => {
    dispatch(fetchCharacterDetails(characterId) as any);
  }, [dispatch, characterId]);

  useEffect(() => {
    console.log(route.params.characterId);
  }, [route.params.characterId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{characterDetails?.name}</Text>
      <Text style={styles.title}>{characterDetails?.status}</Text>
      <Text style={styles.title}>{characterDetails?.species}</Text>
      <Text style={styles.title}>{characterDetails?.type}</Text>
      <Text style={styles.title}>{characterDetails?.gender}</Text>
      <Text style={styles.title}>{characterDetails?.location.name}</Text>
      <Text style={styles.title}>{characterDetails?.created}</Text>
      <Image source={{uri: characterDetails?.image}} style={styles.image} />
      <Button
        title="Favorilere Ekle"
        onPress={() => dispatch(addFavorite(characterDetails))}
      />
      <Button
        title="Favoriler"
        onPress={() => navigation.navigate('Favorites')}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default CharacterDetailScreen;
