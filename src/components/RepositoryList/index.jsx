import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchBar: {
    borderRadius: 2,
    margin: 12,
    backgroundColor: 'white',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderParameters = {
  'latest': { orderBy: 'CREATED_AT', orderDirection: 'DESC', },
  'highest': { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', },
  'lowest': { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', },
};

export const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder, selectRepository, searchQuery, setSearchQuery }) => {
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
      ListHeaderComponent={
        <View>
          <Searchbar
            placeholder="Search repositories"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
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
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const params = orderParameters[selectedOrder];
  const { repositories } = useRepositories(params, searchKeyword);

  const navigate = useNavigate();
  const selectRepository = (id) => {
    return () => navigate(`/repositories/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      selectRepository={selectRepository}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;