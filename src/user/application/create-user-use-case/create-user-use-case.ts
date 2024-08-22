import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from './create-user.dto';
import { PrimitiveUser, User } from '@/user/domain/entities/user.entity';
import { EmailAlreadyExistException } from '@/user/domain/exceptions/email-already-exist.exception';
import { UserService } from '../../domain/services/user.service';
import { Injectable, Transactional } from 'src/shared/dependencies';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly UserService: UserService,
  ) {}

  @Transactional()
  async run(
    createUserDto: CreateUserDto,
  ): Promise<{ user: PrimitiveUser; token: string }> {
    const { name, email, password } = createUserDto;

    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new EmailAlreadyExistException();
    }
    const encryptedPassword = await this.UserService.encryptPassword(password);

    const newUser = User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const userSaved = await this.userRepository.create(newUser);
    const userValue = userSaved.toValue();
    const token = this.UserService.generateToken({ id: userValue.id });

    return {
      user: userValue,
      token,
    };
  }
}
