export class EmailAlreadyExistException extends Error {
  constructor() {
    super('Email already exist');
  }
}
