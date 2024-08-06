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

  async update(id: string, user: User): Promise<User> {
    const { name, email, password } = user.toValue();
    await this.userModel.update({ name, email, password }, { where: { id } });
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
  //   async findAll(): Promise<User[]> {
  //     const usersResponse = await this.userModel.findAll();
  //     const users: User[] = usersResponse.map((user) => {
  //       new User({
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         password: user.password,
  //       });
  //     });
  //     return users;
  //   }

  async findByName(name: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { name } });
    if (!user) return null;
    const userByName: User = new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return userByName;
  }
}
