import { AUTHORIZATION_HEADER_NAME } from '../../constants/api';

export const getAuthorizationToken = (token: string) => ({
  [AUTHORIZATION_HEADER_NAME]: `Bearer ${token}`
});
