import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      {/* Bug in ScrollView https://github.com/facebook/react-native/issues/42874 on Android
          Tried to upgrade react-native to 0.73.7 to fix it but it broke the project so sticking with the bug*/}
      <ScrollView horizontal>
        <AppBarTab text='Repositiories' linkDestination='/' />
        <AppBarTab text='Sign in' linkDestination='/signin' />
      </ScrollView>
    </View>
  );
};

export default AppBar;