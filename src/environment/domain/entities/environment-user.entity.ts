import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveEnvironmentUser {
  id: string;
  userId: string;
  environmentId?: string;
}

export class EnvironmentUser {
  constructor(private attributes: PrimitiveEnvironmentUser) {}

  static create(data: Omit<PrimitiveEnvironmentUser, 'id'>): EnvironmentUser {
    return new EnvironmentUser({
      id: uuidv4(),
      userId: data.userId,
      environmentId: data.environmentId,
    });
  }

  toValue(): PrimitiveEnvironmentUser {
    return this.attributes;
  }

  get id(): string {
    return this.attributes.id;
  }
}
