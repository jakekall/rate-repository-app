import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';

const useGetCurrentUser = (includeReviews = false) => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });
  const user = data ? data.me : null;
  return { user, error, loading };
};

export default useGetCurrentUser;