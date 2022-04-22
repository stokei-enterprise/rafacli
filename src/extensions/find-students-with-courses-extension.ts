import { print } from 'graphql';
import gql from 'graphql-tag';
import { API_BASE_URL } from '../constants/api';
import {
  FindStudentsWithCoursesRequest,
  FindStudentsWithCoursesResponse
} from '../interfaces/find-students-with-courses.interface';
import { Toolbox } from '../interfaces/toolbox.interface';
import { getAuthorizationToken } from '../utils/get-authorization-token';

module.exports = (toolbox: Toolbox) => {
  toolbox.findStudentsWithCourses = async (
    data: FindStudentsWithCoursesRequest
  ): Promise<FindStudentsWithCoursesResponse> => {
    try {
      const response = await toolbox.http
        .create({
          baseURL: API_BASE_URL,
          headers: {
            ...getAuthorizationToken(data.accessToken)
          }
        })
        .post<{ data: { response: FindStudentsWithCoursesResponse } }>('/', {
          query: print(gql`
            query FindStudentsWithCourses {
              response: students_have_course {
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
