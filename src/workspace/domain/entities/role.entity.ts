import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveRole {
  id: string;
  name: string;
}

export class Role {
  constructor(private attributes: PrimitiveRole) {}

  static create(data: { name: string }): Role {
    return new Role({
      id: uuidv4(),
      name: data.name,
    });
  }

  toValue(): PrimitiveRole {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
    };
  }
}
