export class NotAddVariableException extends Error {
  constructor() {
    super('Not possible to add variable to environment');
  }
}
