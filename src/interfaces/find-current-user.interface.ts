export interface CurrentUser {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly fullname: string;
}

export interface CurrentUserJSONData {
  readonly accessToken: string;
}

export interface FindCurrentUserResponse {
  readonly user: CurrentUser;
  readonly loginData: CurrentUserJSONData;
}
