import { Injectable } from '@/shared/dependencies';
import { EditUserDto } from './edit-user.dto';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { PrimitiveUser, User } from '@/user/domain/entities/user.entity';
import { UserNoExistException } from '@/user/domain/exceptions/user-no-exist.exception';

@Injectable()
export class EditUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(editUserDto: EditUserDto): Promise<{ user: PrimitiveUser }> {
    const user = User.create(editUserDto);

    const userExists = await this.userRepository.findById(user.toValue().id);

    if (!userExists) throw new UserNoExistException();

    const userUpdated = await this.userRepository.update(user);

    return { user: userUpdated.toValue() };
  }
}
