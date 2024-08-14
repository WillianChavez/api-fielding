import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { Injectable } from 'src/shared/dependencies/injectable';
import UserModel from '../models/user.model';
import { User } from 'src/auth/domain/entities/user.entity';

@Injectable()
export class RelationalUserRepository extends UserRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {
    super();
  }

  async create(user: User): Promise<User> {
    await this.userModel.create(user.toValue());
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userByEmail = await this.userModel.findOne({ where: { email } });

    if (!userByEmail) return null;

    return User.create({
      name: userByEmail.name,
      email: userByEmail.email,
      password: userByEmail.password,
    });
  }
}
