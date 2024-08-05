import { View, StyleSheet } from "react-native";
import { format } from 'date-fns';

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.reprositoryItemBackground,
  },
  separator: {
    height: 10,
  },
  ratingContainer: {
    margin: 10,
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 40 / 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    marginTop: 5,
  }
});

const ReviewItem = ({ text, rating, createdAt, name }) => {
  const createdAtFormatted = format(new Date(createdAt), 'dd.MM.yyyy')

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text color='primary' fontSize='subheading' fontWeight='bold' style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontSize='subheading' fontWeight='bold'>{name}</Text>
        <Text color='textSecondary'>{createdAtFormatted}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;