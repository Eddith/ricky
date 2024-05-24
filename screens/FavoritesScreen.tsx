import React from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {removeFavorite} from '../redux/slices/characterSlice';

const FavoritesScreen: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.characters.favorites,
  );
  const dispatch = useDispatch();

  const handleRemoveFavorite = (characterId: number, characterName: string) => {
    Alert.alert(
      'Favoriyi Kaldır',
      `${characterName} karakterini favorilerinizden çıkarmak istediğinizden emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => dispatch(removeFavorite(characterId) as any),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Favoriler ({favorites.length.toString()})
      </Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.title}>{item.status}</Text>
              <Text style={styles.title}>{item.species}</Text>
              <Text style={styles.title}>{item.type}</Text>
              <Text style={styles.title}>{item.gender}</Text>
              <Text style={styles.title}>{item.location.name}</Text>
              <Text style={styles.title}>{item.created}</Text>
              <Image source={{uri: item?.image}} style={styles.image} />
              <Button
                title="Kaldır"
                onPress={() => handleRemoveFavorite(item.id, item.name)}
              />
            </View>
          )}
        />
      ) : (
        <Text style={styles.title}>Favori karakteriniz bulunmamaktadır.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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

export default FavoritesScreen;
