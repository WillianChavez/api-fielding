export class PasswordAlreadyExistException extends Error {
  constructor() {
    super('Password is too short');
  }
}
