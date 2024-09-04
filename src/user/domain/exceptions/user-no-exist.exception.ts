export class UserNoExistException extends Error {
  constructor(name?: string) {
    super(`The User ${name} no exist`);
  }
}
