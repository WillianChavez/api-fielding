import { User } from 'src/workspace/domain/entities/user.entity';
import { Injectable } from 'src/shared/dependencies/injectable';
import UserModel from '@/user/infrastructure/models/user.model';
import { BaseMapper } from '@/workspace/domain/mappers/base.mapper';

@Injectable()
export class UserMapper extends BaseMapper<User, UserModel> {
  toPersistence(domain: User): UserModel {
    const user = domain.toValue();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    } as UserModel;
  }
  toDomain(userModel: UserModel): User {
    return new User({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
    });
  }
}
