import { ActiveUser } from '../entities/active-user.entity';

export abstract class UserActiveRepository {
  abstract create(resource: ActiveUser): Promise<ActiveUser>;
  abstract delete(id: string): Promise<void>;
  abstract find(id: string, userId: string): Promise<ActiveUser | null>;
  abstract findAllById(id: string): Promise<ActiveUser[]>;
  abstract deleteByUser(id: string, userId: string): Promise<void>;
}
