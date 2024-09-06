import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveRole {
  id: string;
  name: string;
}

export class Role {
  constructor(private attributes: PrimitiveRole) {}

  static create({ name, id = uuidv4() }: PrimitiveRole): Role {
    return new Role({
      id,
      name,
    });
  }

  toValue(): PrimitiveRole {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
    };
  }
}
