import { v4 as uuidv4 } from 'uuid';
import { Collaborator } from './collaborator.entity';

export interface PrimitiveWorkspace {
  id: string;
  name: string;
  count_collaborators: number;
  link_hash?: string;
  collaborators: Collaborator[];
}

export class Workspace {
  constructor(private attributes: PrimitiveWorkspace) {}

  static create(data: {
    name: string;
    collaborators: Collaborator[];
  }): Workspace {
    return new Workspace({
      id: uuidv4(),
      name: data.name,
      count_collaborators: data.collaborators.length,
      collaborators: data.collaborators,
    });
  }

  toValue(): PrimitiveWorkspace {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      count_collaborators: this.attributes.count_collaborators,
      link_hash: this.attributes.link_hash,
      collaborators: this.attributes.collaborators,
    };
  }
}
