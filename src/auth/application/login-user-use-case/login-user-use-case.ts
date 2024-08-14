import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { Injectable, Transactional } from 'src/shared/dependencies';
import { LoginUserDto } from './login-user.dto';
import { UnAuthorizedException } from 'src/auth/domain/exceptions/un-authorized.exception';
import { AuthService } from 'src/auth/domain/services/auth.service';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  @Transactional()
  async run(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnAuthorizedException();
    }
    if (!this.authService.comparePasswords(password, user.password)) {
      throw new UnAuthorizedException();
    }
    return { user: user.toValue };
  }
}
