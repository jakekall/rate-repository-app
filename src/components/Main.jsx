import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SingleRepository from './RepositoryList/SingleRepository';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='createreview' element={<ReviewForm />} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/repositories/:repositoryId' element={<SingleRepository />} />
      </Routes>
    </View>
  );
};

export default Main;