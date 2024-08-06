export class RoleNoHaveException extends Error {
  constructor(roleName: string) {
    super(`Must have a role ${roleName}`);
  }
}
