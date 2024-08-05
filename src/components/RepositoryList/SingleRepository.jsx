import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from "react-native";

import ReviewItem from "../ReviewItem";
import RepositoryInfo from "./RepositoryInfo";
import useRepository from "../../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  let { repositoryId } = useParams();
  const { repository, fetchMore } = useRepository({ repositoryId, first: 8 });

  const reviews = repository?.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          text={item.text}
          rating={item.rating}
          createdAt={item.createdAt}
          repositoryId={item.repositoryId}
          name={item.user.username}
        />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => repository && <RepositoryInfo repository={repository} isSingleRepository={true} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;