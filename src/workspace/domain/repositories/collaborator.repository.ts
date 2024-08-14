import { User } from '../entities/user.entity';

export abstract class CollaboratorRepository {
  abstract findAllByUser(user: string, name?: string): Promise<User[]>;
}
