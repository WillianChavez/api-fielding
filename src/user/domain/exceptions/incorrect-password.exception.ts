export class IncorrectPasswordException extends Error {
  constructor() {
    super('Passwords do not match');
  }
}
