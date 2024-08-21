import { Role } from './role.entity';
import { v4 as uuidv4 } from 'uuid';

export class PrimitiveMember {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export class Member {
  constructor(private readonly attributes: PrimitiveMember) {}

  static create(data: { name: string; email: string; role: Role }) {
    return new Member({
      id: uuidv4(),
      name: data.name,
      email: data.email,
      role: data.role,
    });
  }

  toValue(): PrimitiveMember {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      role: this.attributes.role,
    };
  }
}
