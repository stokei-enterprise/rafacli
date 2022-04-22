export interface Student {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

export interface FindStudentsWithoutCoursesRequest {
  readonly accessToken: string;
}

export interface FindStudentsWithoutCoursesResponse {
  readonly totalItems: number;
  readonly items: Student[];
}
