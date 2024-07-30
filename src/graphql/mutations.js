import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation ($authenticateCredentials: AuthenticateInput) {
    authenticate(credentials: $authenticateCredentials) {
      accessToken
    }
  }
`;