import { Role } from '../entities/role.entity';

export abstract class RoleRepository {
  abstract findExistByIds(ids: string[]): Promise<string[]>;
  abstract findExistNameByIds(name: string, ids: string[]): Promise<boolean>;
  abstract findAll(): Promise<Role[]>;
  abstract findById(id: string): Promise<Role>;
}
