import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveCollaborator {
  id: string;
  role: string;
  user: string;
}

export enum CollaboratorRole {
  SPECTATOR = 'Espectador',
  ADMIN = 'Admin',
  DEV = 'Dev',
}
export class Collaborator {
  constructor(private attributes: PrimitiveCollaborator) {}

  static create(data: { role: string; user: string }): Collaborator {
    return new Collaborator({
      id: uuidv4(),
      role: data.role,
      user: data.user,
    });
  }

  toValue(): PrimitiveCollaborator {
    return {
      id: this.attributes.id,
      role: this.attributes.role,
      user: this.attributes.user,
    };
  }
}
