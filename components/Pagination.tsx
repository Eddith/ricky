import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Geri"
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Text>{`${currentPage} / ${totalPages}`}</Text>
      <Button
        title="İleri"
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default Pagination;
