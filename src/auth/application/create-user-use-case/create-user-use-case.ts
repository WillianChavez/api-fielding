import { PasswordNotLength } from 'src/auth/domain/exceptions/password-not-length.exception';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from './create-user.dto';
import { PrimitiveUser, User } from 'src/auth/domain/entities/user.entity';
import { EmailAlreadyExistException } from 'src/auth/domain/exceptions/email-already-exist.exception';
import { AuthService } from '../../domain/services/auth.service';
import { Injectable } from '../../../shared/dependencies/injectable';
import { Transactional } from './../../../shared/dependencies/transactional';
@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  @Transactional()
  async run(createUserDto: CreateUserDto): Promise<PrimitiveUser> {
    const { name, email, password } = createUserDto;

    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new EmailAlreadyExistException();
    }

    if (password.length < 6) {
      throw new PasswordNotLength();
    }

    const encryptedPassword = await this.authService.encryptPassword(password);

    const newUser = User.create({
      name,
      email,
      password: encryptedPassword,
    });
    await this.userRepository.create(newUser);

    return newUser.toValue();
  }
}
