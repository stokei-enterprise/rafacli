import { print } from 'graphql';
import gql from 'graphql-tag';
import { API_BASE_URL } from '../constants/api';
import {
  FindAllCoursesRequest,
  FindAllCoursesResponse
} from '../interfaces/find-all-courses.interface';
import { Toolbox } from '../interfaces/toolbox.interface';
import { getAuthorizationToken } from '../utils/get-authorization-token';

module.exports = (toolbox: Toolbox) => {
  toolbox.findAllCourses = async (
    data: FindAllCoursesRequest
  ): Promise<FindAllCoursesResponse> => {
    try {
      const response = await toolbox.http
        .create({
          baseURL: API_BASE_URL,
          headers: {
            ...getAuthorizationToken(data.accessToken)
          }
        })
        .post<{ data: { response: FindAllCoursesResponse } }>('/', {
          query: print(gql`
            query FindAllCourses {
              response: courses(orderBy: [{ column: "name" }]) {
                totalItems: total_items
                items {
                  id
                  name
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
