import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { user, loading, error } = useGetCurrentUser();
  
  if (loading || error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Bug in ScrollView https://github.com/facebook/react-native/issues/42874 on Android
          Tried to upgrade react-native to 0.73.7 to fix it but it broke the project so sticking with the bug*/}
      <ScrollView horizontal>
        <AppBarTab text='Repositiories' linkDestination='/' />
        {user && <AppBarTab text='Create a review' linkDestination='/createreview' />}
        {user && <AppBarTab text='My reviews' linkDestination='/myreviews' />}
        {user && <AppBarTab text='Sign out' linkDestination='/signout' />}
        {!user && <AppBarTab text='Sign in' linkDestination='/signin' />}
        {!user && <AppBarTab text='Sign up' linkDestination='/signup' />}
      </ScrollView>
    </View>
  );
};

export default AppBar;