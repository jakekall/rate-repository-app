import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';

import useAuthStorage from '../hooks/useAuthStorage';

const SignOut = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  useEffect(() => {
    navigate('/')
  }, [])

  authStorage.removeAccessToken()
  apolloClient.resetStore()
  return null
};

export default SignOut;