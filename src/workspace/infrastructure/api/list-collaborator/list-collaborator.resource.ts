import { PrimitiveUser } from 'src/workspace/domain/entities/user.entity';

export interface CollaboratorResourceJson {
  id: string;
  email: string;
  role: string;
  user: string;
}

export class CollaboratorResource {
  constructor(private readonly collaborator: PrimitiveUser) {}

  toJson(): CollaboratorResourceJson {
    return {
      id: this.collaborator.id,
      email: this.collaborator.email,
      user: this.collaborator.name,
      role: this.collaborator.role.toValue().name,
    };
  }

  static collectionToJson(
    collaborators: PrimitiveUser[],
  ): CollaboratorResourceJson[] {
    return collaborators.map((collaborator) => {
      return new CollaboratorResource(collaborator).toJson();
    });
  }
}
