import { Alert, View, StyleSheet, Pressable } from "react-native";
import { format } from 'date-fns';
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import useDeleteReview from "../hooks/useDeleteReview";

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
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 7,
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewItem = ({ id, text, rating, createdAt, name, repositoryId, isReviewer, refetchReviews }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();
  const createdAtFormatted = format(new Date(createdAt), 'dd.MM.yyyy');

  const deleteButtonAlert = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'DELETE',
        onPress: async () => {
          try {
            await deleteReview(id);
            refetchReviews()
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text color='primary' fontSize='subheading' fontWeight='bold' style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontSize='subheading' fontWeight='bold'>{name}</Text>
        <Text color='textSecondary'>{createdAtFormatted}</Text>
        <Text style={styles.text}>{text}</Text>
        {isReviewer && <View style={styles.buttonContainer}>
          <Pressable onPress={() => navigate(`/repositories/${repositoryId}`)} style={[styles.button, styles.viewButton]}>
            <Text color='white' fontWeight='bold' fontSize='subheading'>View repository</Text>
          </Pressable>
          <Pressable onPress={deleteButtonAlert} style={[styles.button, styles.deleteButton]}>
            <Text color='white' fontWeight='bold' fontSize='subheading'>Delete review</Text>
          </Pressable>
        </View>}
      </View>
    </View>
  );
};

export default ReviewItem;