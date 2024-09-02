import { Injectable } from '@/shared/dependencies';
import { EditUserDto } from './edit-user.dto';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { PrimitiveUser, User } from '@/user/domain/entities/user.entity';
import { EmailNoExistException } from '@/user/domain/exceptions/email-no-exist.exception';

@Injectable()
export class EditUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(editUserDto: EditUserDto): Promise<{ user: PrimitiveUser }> {
    const user = User.create(editUserDto);

    const userExists = await this.userRepository.findByEmail(
      user.toValue().email,
    );

    if (!userExists) throw new EmailNoExistException();

    const userUpdated = await this.userRepository.update(user);

    return { user: userUpdated.toValue() };
  }
}
