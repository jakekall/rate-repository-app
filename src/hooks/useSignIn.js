import { useApolloClient, useMutation } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        authenticateCredentials: {
          username,
          password,
        }
      }
    })
    console.log(data.authenticate.accessToken)
    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore();
    console.log(authStorage.getAccessToken())
    return data;
  };

  return [signIn, result];
};

export default useSignIn;