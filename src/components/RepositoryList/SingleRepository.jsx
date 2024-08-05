import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from "react-native";

import ReviewItem from "./ReviewItem";
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
  const { repository } = useRepository(repositoryId);

  const reviews = repository?.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem {...item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => repository && <RepositoryInfo repository={repository} hasGithubButton={true} />}
    />
  );
};

export default SingleRepository;