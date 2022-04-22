export interface FindAllCoursesRequest {
  readonly accessToken: string;
}

export interface Course {
  readonly id: string;
  readonly name: string;
}

export interface FindAllCoursesResponse {
  readonly totalItems: number;
  readonly items: Course[];
}
