import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation Authenticate($authenticateCredentials: AuthenticateInput) {
    authenticate(credentials: $authenticateCredentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;
