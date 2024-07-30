import { View, StyleSheet } from 'react-native';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 7,
    paddingBottom: 10,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 4,
  },
});

const RepositoryOverview = ({ fullName, description, language }) => {
  return (
    <View style={styles.container}>
      <Text fontSize='subheading' fontWeight='bold'>{fullName}</Text>
      <Text color='textSecondary'>{description}</Text>
      <View style={styles.languageContainer}>
        <Text color='white'>{language}</Text>
      </View>
    </View>
  );
};

export default RepositoryOverview;