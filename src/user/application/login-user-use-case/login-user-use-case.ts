import { UserRepository } from '@/user/domain/repositories/user.repository';
import { Injectable, Transactional } from 'src/shared/dependencies';
import { LoginUserDto } from './login-user.dto';
import { UnAuthorizedException } from '@/user/domain/exceptions/un-authorized.exception';
import { AuthService } from '@/user/domain/services/auth.service';
import { IncorrectPasswordException } from '@/user/domain/exceptions/incorrect-password.exception';
import { PrimitiveUser } from '@/user/domain/entities/user.entity';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  @Transactional()
  async run(
    loginUserDto: LoginUserDto,
  ): Promise<{ user: PrimitiveUser; token: string }> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnAuthorizedException();
    }
    const userValue = user.toValue();

    const isPasswordValid = await this.authService.comparePasswords(
      password,
      userValue.password,
    );

    if (!isPasswordValid) {
      throw new IncorrectPasswordException();
    }

    const token = this.authService.generateToken({ id: userValue.id });
    return {
      user: userValue,
      token,
    };
  }
}
