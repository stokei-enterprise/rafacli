import { print } from 'graphql';
import gql from 'graphql-tag';
import { API_BASE_URL, CURRENT_USER_DATA_JSON_PATH } from '../constants/api';
import { AuthorizationTokenNotFound } from '../errors';
import { Login, LoginResponse } from '../interfaces/login.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.login = async ({
    email,
    password
  }: Login): Promise<LoginResponse> => {
    try {
      const sendgridApiKey = toolbox.parameters.options['sendgrid-api-key'];
      const response = await toolbox.http
        .create({
          baseURL: API_BASE_URL
        })
        .post<{ data: { response: string } }>('/', {
          query: print(gql`
            mutation MutationLoginAdmin($input: InputLoginAdmin) {
              response: loginAdmin(input: $input)
            }
          `),
          variables: {
            input: {
              email: email + '',
              password: password + ''
            }
          }
        });
      const accessToken = response.data?.data?.response;
      if (!accessToken) {
        toolbox.print.error(new AuthorizationTokenNotFound().message);
        return null;
      }
      toolbox.filesystem.write(
        CURRENT_USER_DATA_JSON_PATH,
        JSON.stringify({
          accessToken,
          sendgridApiKey
        })
      );
      toolbox.print.success('Logged with success!');
      return { accessToken };
    } catch (error) {
      toolbox.print.error(error);
      return null;
    }
  };
};
