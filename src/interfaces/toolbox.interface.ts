import { GluegunToolbox } from 'gluegun';
import {
  FindAllCoursesRequest,
  FindAllCoursesResponse
} from './find-all-courses.interface';
import {
  FindAllStudentsRequest,
  FindAllStudentsResponse
} from './find-all-students.interface';
import { FindCurrentUserResponse } from './find-current-user.interface';
import {
  FindStudentsWithCoursesRequest,
  FindStudentsWithCoursesResponse
} from './find-students-with-courses.interface';
import {
  FindStudentsWithoutCoursesRequest,
  FindStudentsWithoutCoursesResponse
} from './find-students-without-courses.interface';
import { Login, LoginResponse } from './login.interface';
import { SendMailConfig } from './send-mail.interface';
import { SaveSendgridConfig } from './sendgrid.interface';

export interface Toolbox extends GluegunToolbox {
  sendMails: (config: SendMailConfig) => Promise<any>;
  login: (data: Login) => Promise<LoginResponse>;
  saveSendgridConfig: (data: SaveSendgridConfig) => Promise<void>;
  findCurrentUser: () => Promise<FindCurrentUserResponse>;
  findAllStudents: (
    data: FindAllStudentsRequest
  ) => Promise<FindAllStudentsResponse>;
  findAllCourses: (
    data: FindAllCoursesRequest
  ) => Promise<FindAllCoursesResponse>;
  findStudentsWithCourses: (
    data: FindStudentsWithCoursesRequest
  ) => Promise<FindStudentsWithCoursesResponse>;
  findStudentsWithoutCourses: (
    data: FindStudentsWithoutCoursesRequest
  ) => Promise<FindStudentsWithoutCoursesResponse>;
}
