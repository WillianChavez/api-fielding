import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { Injectable } from 'src/shared/dependencies/injectable';
import UserModel from '../models/user.model';
import { User } from '@/user/domain/entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class RelationalUserRepository extends UserRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {
    super();
  }

  async create(user: User): Promise<User> {
    const userCreated = await this.userModel.create(user.toValue());
    const newUser = User.create({
      id: userCreated.id,
      email: userCreated.email,
      name: userCreated.name,
      password: userCreated.password,
      urlPhoto: userCreated.urlPhoto,
    });
    return newUser;
  }

  async findByEmail(email: string, ignore?: string): Promise<User | null> {
    const userByEmail = await this.userModel.unscoped().findOne({
      where: {
        email,
        id: {
          [Op.ne]: ignore || null,
        },
      },
    });

    if (!userByEmail) return null;

    return User.create({
      id: userByEmail.id,
      name: userByEmail.name,
      email: userByEmail.email,
      password: userByEmail.password,
    });
  }

  async update(user: User): Promise<User> {
    const userData = user.toValue();

    await this.userModel.update(userData, {
      where: { id: userData.id },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const userById = await this.userModel.findByPk(id);

    if (!userById) return null;

    return User.create({
      id: userById.id,
      name: userById.name,
      email: userById.email,
      password: userById.password,
      urlPhoto: userById.urlPhoto,
    });
  }
}
