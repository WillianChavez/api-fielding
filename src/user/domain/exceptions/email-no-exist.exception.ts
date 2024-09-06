export class EmailNoExistException extends Error {
  constructor(name?: string) {
    super(`The Email ${name} no exist`);
  }
}
