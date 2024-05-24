import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

interface CardProps {
  name: string;
  airDate: string;
  episode: string;
  onPress: () => void;
  buttonTitle: string;
}

const Card: React.FC<CardProps> = ({
  name,
  airDate,
  episode,
  onPress,
  buttonTitle,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{airDate}</Text>
      <Text style={styles.title}>{episode}</Text>
      <Button title={buttonTitle} onPress={() => onPress()} />
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
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
});

export default Card;
