import { Injectable } from 'src/shared/dependencies';
import { PrimitiveUser } from 'src/workspace/domain/entities/user.entity';

export interface CollaboratorResourceJson {
  id: string;
  email: string;
  role: string;
  user: string;
}

@Injectable()
export class CollaboratorResource {
  toJson(user: PrimitiveUser): CollaboratorResourceJson {
    return {
      id: user.id,
      email: user.email,
      user: user.name,
      role: user.role.toValue().name,
    };
  }

  collectionToJson(collaborators: PrimitiveUser[]): CollaboratorResourceJson[] {
    return collaborators.map((collaborator) => {
      return this.toJson(collaborator);
    });
  }
}
