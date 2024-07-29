import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

const RepositoryStat = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight='bold'>{formatCount(value)}</Text>
      <Text color='textSecondary'>{label}</Text>
    </View>
  );
};

const formatCount = (count) => count >= 1000 ? (count / 1000).toFixed(1).concat('k') : count;

export default RepositoryStat;