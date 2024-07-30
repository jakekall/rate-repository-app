import { View, StyleSheet } from 'react-native';

import RepositoryStat from './RepositoryStat';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const RepositoryStats = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View style={styles.container}>
      <RepositoryStat label='Stars' value={stargazersCount}></RepositoryStat>
      <RepositoryStat label='Forks' value={forksCount}></RepositoryStat>
      <RepositoryStat label='Reviews' value={reviewCount}></RepositoryStat>
      <RepositoryStat label='Rating' value={ratingAverage}></RepositoryStat>
    </View>
  );
};

export default RepositoryStats;