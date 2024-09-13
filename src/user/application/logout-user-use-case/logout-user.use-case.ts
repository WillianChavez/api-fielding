import { UserRepository } from '@/user/domain/repositories/user.repository';
import { UserService } from '@/user/domain/services/user.service';
import { Injectable, Transactional } from '@shared-dependencies';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}
  @Transactional()
  async run(): Promise<void> {
    // await this.userService.logout();
    // Here you can add the logic to logout the user
  }
}
