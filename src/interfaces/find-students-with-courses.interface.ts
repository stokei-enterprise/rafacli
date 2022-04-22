export interface Student {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

export interface FindStudentsWithCoursesRequest {
  readonly accessToken: string;
}

export interface FindStudentsWithCoursesResponse {
  readonly totalItems: number;
  readonly items: Student[];
}
