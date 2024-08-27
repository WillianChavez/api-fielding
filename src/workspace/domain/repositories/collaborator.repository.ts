import { Member } from '../entities/member.entity';
import { User } from '../entities/user.entity';

export abstract class CollaboratorRepository {
  abstract findAllByUser(user: string, name?: string): Promise<User[]>;
  abstract findExistUserByIds(ids: string[]): Promise<string[]>;
  abstract findUserById(id: string): Promise<User>;
  abstract updateRole(options: {
    user: string;
    role: string;
    workspace: string;
  }): Promise<Member | null>;
  abstract deleteMember(options: {
    workspace: string;
    user: string;
  }): Promise<boolean>;
}
