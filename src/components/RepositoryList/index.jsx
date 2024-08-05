import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderParameters= {
  'latest': { orderBy: 'CREATED_AT', orderDirection: 'DESC', },
  'highest': { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', },
  'lowest': { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', },
};

export const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder }) => {
  const navigate = useNavigate();

  const selectRepository = (id) => {
    return () => navigate('/repositories/' + id);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={selectRepository(item.id)}>
          <RepositoryItem {...item} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
        <Picker
          selectedValue={selectedOrder}
          onValueChange={(itemValue, _itemIndex) =>
            setSelectedOrder(itemValue)
          }
          prompt={'Select an item...'}>
          <Picker.Item label='Latest repositories' value='latest' />
          <Picker.Item label='Highest rated repositories' value='highest' />
          <Picker.Item label='Lowest rated repositories' value='lowest' />
        </Picker>
      )}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const params = orderParameters[selectedOrder];
  const { repositories } = useRepositories(params);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;