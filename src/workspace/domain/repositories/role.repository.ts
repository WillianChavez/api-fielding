export abstract class RoleRepository {
  abstract findExistByIds(ids: string[]): Promise<string[]>;
  abstract findExistNameByIds(name: string, ids: string[]): Promise<boolean>;
}
