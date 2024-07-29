import {  StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    padding: 20
  }
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable style={styles.tab}>
      <Text color='white' fontSize='subheading' fontWeight='bold'>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;