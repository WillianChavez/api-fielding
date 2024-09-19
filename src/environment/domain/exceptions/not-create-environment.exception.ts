export class NotCreateEnvironmentException extends Error {
  constructor() {
    super('Not possible to create environment');
  }
}
