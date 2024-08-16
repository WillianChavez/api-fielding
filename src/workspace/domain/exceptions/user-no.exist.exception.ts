export class UserNoExistException extends Error {
  constructor(name: string) {
    super(`User ${name} does not exist`);
  }
}
