import { Image, View, StyleSheet } from 'react-native';

import RepositoryStats from './RepositoryStats';
import RepositoryOverview from './RepositoryOverview';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.reprositoryItemBackground,
    padding: 10,
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
});

const RepositoryItem = ({ ownerAvatarUrl, fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.avatar}
          source={{uri: ownerAvatarUrl}}
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
    </View>
  );
};

export default RepositoryItem;