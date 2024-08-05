import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { ME } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
});

const AppBar = () => {

  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading || error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Bug in ScrollView https://github.com/facebook/react-native/issues/42874 on Android
          Tried to upgrade react-native to 0.73.7 to fix it but it broke the project so sticking with the bug*/}
      <ScrollView horizontal>
        <AppBarTab text='Repositiories' linkDestination='/' />
        {data.me && <AppBarTab text='Create a review' linkDestination='/createreview' />}
        {data.me && <AppBarTab text='Sign out' linkDestination='/signout' />}
        {!data.me && <AppBarTab text='Sign in' linkDestination='/signin' />}
        {!data.me && <AppBarTab text='Sign up' linkDestination='/signup' />}
      </ScrollView>
    </View>
  );
};

export default AppBar;