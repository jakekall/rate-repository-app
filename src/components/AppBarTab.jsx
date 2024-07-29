import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    padding: 20,
  },
});

const AppBarTab = ({ linkDestination, text }) => {
  return (
    <Link to={linkDestination} style={styles.tab}>
      <Text color='white' fontSize='subheading' fontWeight='bold'>{text}</Text>
    </Link>
  );
};

export default AppBarTab;