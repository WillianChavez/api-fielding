import { PrimitiveUser } from 'src/auth/domain/entities/user.entity';
import { Injectable } from 'src/shared/dependencies';

export interface UserHttpResourceJson {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class CreateUserResource {
  toJson(user: PrimitiveUser): UserHttpResourceJson {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
