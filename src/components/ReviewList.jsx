import { FlatList, StyleSheet, View } from "react-native";

import ReviewItem from "./ReviewItem";
import useGetCurrentUser from "../hooks/useGetCurrentUser";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = () => {
  const { user } = useGetCurrentUser(true);
  const reviews = user?.reviews
    ? user.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          text={item.text}
          rating={item.rating}
          createdAt={item.createdAt}
          name={item.repository.fullName}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ReviewList;