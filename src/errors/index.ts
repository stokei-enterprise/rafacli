export class EmailNotFound extends Error {
  constructor() {
    super('Email not found!');
  }
}
export class NameNotFound extends Error {
  constructor() {
    super('Name not found!');
  }
}

export class PasswordNotFound extends Error {
  constructor() {
    super('Password not found!');
  }
}

export class AuthorizationTokenNotFound extends Error {
  constructor() {
    super('Authorization token not found!');
  }
}

export class SendgridApiKeyNotFound extends Error {
  constructor() {
    super('Sendgrid api key not found!');
  }
}

export class CommandNotFound extends Error {
  constructor() {
    super('Command not found!');
  }
}
