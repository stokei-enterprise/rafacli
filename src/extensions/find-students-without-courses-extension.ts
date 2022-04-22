import { print } from 'graphql';
import gql from 'graphql-tag';
import { API_BASE_URL } from '../constants/api';
import {
  FindStudentsWithoutCoursesRequest,
  FindStudentsWithoutCoursesResponse
} from '../interfaces/find-students-without-courses.interface';
import { Toolbox } from '../interfaces/toolbox.interface';
import { getAuthorizationToken } from '../utils/get-authorization-token';

module.exports = (toolbox: Toolbox) => {
  toolbox.findStudentsWithoutCourses = async (
    data: FindStudentsWithoutCoursesRequest
  ): Promise<FindStudentsWithoutCoursesResponse> => {
    try {
      const response = await toolbox.http
        .create({
          baseURL: API_BASE_URL,
          headers: {
            ...getAuthorizationToken(data.accessToken)
          }
        })
        .post<{ data: { response: FindStudentsWithoutCoursesResponse } }>('/', {
          query: print(gql`
            query FindStudentsWithoutCourses {
              response: students_no_course {
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
