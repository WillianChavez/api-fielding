export class UnAuthorizedException extends Error {
  constructor() {
    super('Credentials are not valid');
  }
}
