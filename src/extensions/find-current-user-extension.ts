import { print } from 'graphql';
import gql from 'graphql-tag';
import { API_BASE_URL, CURRENT_USER_DATA_JSON_PATH } from '../constants/api';
import { AuthorizationTokenNotFound } from '../errors';
import {
  CurrentUser,
  FindCurrentUserResponse
} from '../interfaces/find-current-user.interface';
import { Toolbox } from '../interfaces/toolbox.interface';
import { convertCurrentUserFileToJson } from '../utils/convert-current-user-file-to-json';
import { getAuthorizationToken } from '../utils/get-authorization-token';

module.exports = (toolbox: Toolbox) => {
  toolbox.findCurrentUser = async (): Promise<FindCurrentUserResponse> => {
    try {
      const currentUserJSONData = convertCurrentUserFileToJson(
        toolbox.filesystem.read(CURRENT_USER_DATA_JSON_PATH)
      );
      if (!currentUserJSONData) {
        toolbox.print.error(new AuthorizationTokenNotFound().message);
        return null;
      }
      const response = await toolbox.http
        .create({
          baseURL: API_BASE_URL,
          headers: {
            ...getAuthorizationToken(currentUserJSONData.accessToken)
          }
        })
        .post<{ data: { response: CurrentUser } }>('/', {
          query: print(gql`
            query FindCurrentUser {
              response: me_admin {
                id
                name
                lastname
                fullname: full_name
              }
            }
          `)
        });
      const currentUser = response?.data?.data?.response;
      if (!currentUser) {
        toolbox.print.error(new AuthorizationTokenNotFound().message);
        return null;
      }
      return {
        user: currentUser,
        loginData: currentUserJSONData
      };
    } catch (error) {
      toolbox.print.error(error);
      return null;
    }
  };
};
