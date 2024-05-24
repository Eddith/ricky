/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, FlatList, TextInput, StyleSheet, Button} from 'react-native';
import apiClient from '../api/apiClient';
import Pagination from '../components/Pagination';
import Card from '../components/Card';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);

  const favorites = useSelector(
    (state: RootState) => state.characters.favorites,
  );

  useEffect(() => {
    fetchEpisodes();
  }, [currentPage, searchQuery]);

  const fetchEpisodes = async () => {
    try {
      const response = await apiClient.get(`/episode`, {
        params: {
          page: currentPage,
          name: searchQuery,
        },
      });
      setEpisodes(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Bölümleri Ara"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
      <Button
        title={`Favorileri Görüntüle (${favorites.length})`}
        onPress={() => navigation.navigate('Favorites')}
      />
      <FlatList
        data={episodes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card
            name={item.name}
            airDate={item.air_date}
            episode={item.episode}
            buttonTitle="Detayları Göster"
            onPress={() =>
              navigation.navigate('EpisodeDetail', {episodeId: item.id})
            }
          />
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default HomeScreen;
