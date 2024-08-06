import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract update(id: string, user: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract findOne(id: string): Promise<User>;
  // abstract findAll(): Promise<User[]>;
  abstract findByName(name: string): Promise<User>;
}
