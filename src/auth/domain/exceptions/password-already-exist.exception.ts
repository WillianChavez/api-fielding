export class PasswordAlreadyExistException extends Error {
  constructor() {
    super('Password already exist');
  }
}
