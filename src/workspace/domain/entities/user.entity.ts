import { Role } from './role.entity';
import { v4 as uuidv4 } from 'uuid';
export interface PrimitiveUser {
  id: string;
  name: string;
  email: string;
}

export class User {
  constructor(private attributes: PrimitiveUser) {}

  static create(data: { name: string; email: string; role: Role }): User {
    return new User({
      id: uuidv4(),
      name: data.name,
      email: data.email,
    });
  }

  toValue(): PrimitiveUser {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
    };
  }
}
