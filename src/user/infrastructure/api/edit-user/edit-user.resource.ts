import { PrimitiveUser } from '@/user/domain/entities/user.entity';
import { Injectable } from 'src/shared/dependencies';

export interface EditUserHttpResourceJson {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@Injectable()
export class EditUserResource {
  toJson(user: PrimitiveUser): EditUserHttpResourceJson {
    return {
      message: 'User updated successfully',
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
