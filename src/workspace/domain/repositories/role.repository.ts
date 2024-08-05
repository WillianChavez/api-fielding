export abstract class RoleRepository {
  abstract findExistByIds(ids: string[]): Promise<string[]>;
}
