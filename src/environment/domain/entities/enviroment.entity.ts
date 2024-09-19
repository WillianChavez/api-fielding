import { PrimitiveEnvironmentUser } from './environment-user.entity';
import { v4 as uuidv4 } from 'uuid';
import { PrimitiveVariable } from './variable.entity';
export interface PrimitiveEnvironment {
  id: string;
  name: string;
  collaborator: PrimitiveEnvironmentUser;
  variables?: PrimitiveVariable[];
}

export class Environment {
  constructor(private attributes: PrimitiveEnvironment) {}

  static create(data: Omit<PrimitiveEnvironment, 'id'>): Environment {
    return new Environment({
      id: uuidv4(),
      name: data.name,
      collaborator: data.collaborator,
      variables: data.variables,
    });
  }

  static from(data: PrimitiveEnvironment): Environment {
    return new Environment(data);
  }

  toValue(): PrimitiveEnvironment {
    return this.attributes;
  }

  get id(): string {
    return this.attributes.id;
  }

  get name(): string {
    return this.attributes.name;
  }
}
