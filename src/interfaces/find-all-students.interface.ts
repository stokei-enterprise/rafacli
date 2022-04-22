import { Mail } from './send-mail.interface';

export interface FindAllStudentsRequest {
  readonly accessToken: string;
}

export interface FindAllStudentsResponse {
  readonly totalItems: number;
  readonly items: Mail[];
}
