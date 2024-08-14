export class PasswordNotLength extends Error {
  constructor() {
    super('Password already exist');
  }
}
