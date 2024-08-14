export class RoleNoExistException extends Error {
  constructor(roleName: string) {
    super(`Role ${roleName} no exist`);
  }
}
