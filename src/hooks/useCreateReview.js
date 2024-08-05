import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const ratingAsNum = Number(rating)
    const { data } = await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating: ratingAsNum,
          text,
        }
      }
    })
    return data.createReview;
  };
  return [createReview, result];
};

export default useCreateReview;