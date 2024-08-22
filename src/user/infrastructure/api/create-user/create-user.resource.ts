import { PrimitiveUser } from '@/user/domain/entities/user.entity';
import { Injectable } from 'src/shared/dependencies';

export interface UserHttpResourceJson {
  id: string;
  email: string;
  name: string;
  token: string;
}

@Injectable()
export class CreateUserResource {
  toJson({
    user,
    token,
  }: {
    user: PrimitiveUser;
    token: string;
  }): UserHttpResourceJson {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }
}
