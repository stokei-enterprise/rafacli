import { AuthorizationTokenNotFound } from '../../errors';
import { CurrentUserJSONData } from '../../interfaces/find-current-user.interface';

export const convertCurrentUserFileToJson = (
  fileResponse: string
): CurrentUserJSONData => {
  if (!fileResponse) {
    console.error(new AuthorizationTokenNotFound().message);
    return null;
  }
  const user = JSON.parse(fileResponse);
  if (!user) {
    console.error(new AuthorizationTokenNotFound().message);
    return null;
  }
  return user;
};
