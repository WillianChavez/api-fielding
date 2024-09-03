import { Injectable } from '@/shared/dependencies';
import { EditUserDto } from './edit-user.dto';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { PrimitiveUser, User } from '@/user/domain/entities/user.entity';
import { UserNoExistException } from '@/user/domain/exceptions/user-no-exist.exception';
import { EmailAlreadyExistException } from '@/user/domain/exceptions/email-already-exist.exception';

@Injectable()
export class EditUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(editUserDto: EditUserDto): Promise<{ user: PrimitiveUser }> {
    const userExists = await this.userRepository.findById(editUserDto.id);

    if (!userExists) throw new UserNoExistException();

    const user = User.update(userExists, editUserDto);

    const { id, email } = user.toValue();

    const emailExists = await this.userRepository.findByEmail(email, id);

    if (emailExists) throw new EmailAlreadyExistException();

    const userUpdated = await this.userRepository.update(user);

    return { user: userUpdated.toValue() };
  }
}
