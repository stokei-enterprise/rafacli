import { print } from 'graphql';
import gql from 'graphql-tag';
import { API_BASE_URL } from '../constants/api';
import {
  FindAllStudentsRequest,
  FindAllStudentsResponse
} from '../interfaces/find-all-students.interface';
import { Toolbox } from '../interfaces/toolbox.interface';
import { getAuthorizationToken } from '../utils/get-authorization-token';

module.exports = (toolbox: Toolbox) => {
  toolbox.findAllStudents = async (
    data: FindAllStudentsRequest
  ): Promise<FindAllStudentsResponse> => {
    try {
      const response = await toolbox.http
        .create({
          baseURL: API_BASE_URL,
          headers: {
            ...getAuthorizationToken(data.accessToken)
          }
        })
        .post<{ data: { response: FindAllStudentsResponse } }>('/', {
          query: print(gql`
            query FindAllStudents {
              response: students(orderBy: [{ column: "name" }]) {
                totalItems: total_items
                items {
                  id
                  name: full_name
                  email
                }
              }
            }
          `)
        });
      return response.data?.data?.response;
    } catch (error) {
      toolbox.print.error(error);
      return null;
    }
  };
};
