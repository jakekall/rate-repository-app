import { Image, View, Pressable, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

import Text from '../Text';
import RepositoryStats from './RepositoryStats';
import RepositoryOverview from './RepositoryOverview';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.reprositoryItemBackground,
    padding: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  button: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 7,
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
});

const RepositoryInfo = ({ repository: { ownerAvatarUrl, fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, url }, hasGithubButton }) => {
  const openRepository = () => {
    Linking.openURL(url);
  };
  
  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: ownerAvatarUrl }}
        />
        <RepositoryOverview
          fullName={fullName}
          description={description}
          language={language}
        />
      </View>
      <RepositoryStats
        stargazersCount={stargazersCount}
        forksCount={forksCount}
        reviewCount={reviewCount}
        ratingAverage={ratingAverage}
      />
      {hasGithubButton && <Pressable onPress={openRepository} style={styles.button}>
        <Text color='white' fontWeight='bold' fontSize='subheading'>Open in GitHub</Text>
      </Pressable>}
    </View>
  );
};

export default RepositoryInfo;