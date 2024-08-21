/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from './infrastructure/models/user.model';
import { CreateUserController } from './infrastructure/api/create-user/create-user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { RelationalUserRepository } from './infrastructure/repositories/relational.user.repository';
import { CreateUserUseCase } from './application/create-user-use-case/create-user-use-case';
import { AuthService } from './domain/services/auth.service';
import { AuthenticateService } from '../shared/auth/services/authenticate.service';
import { CreateUserResource } from './infrastructure/api/create-user/create-user.resource';
import { LoginController } from './infrastructure/api/login/login.controller';
import { LoginUserUseCase } from './application/login-user-use-case/login-user-use-case';

@Module({
  controllers: [CreateUserController, LoginController],
  providers: [
    RelationalUserRepository,
    CreateUserUseCase,
    CreateUserResource,
    LoginUserUseCase,
    AuthenticateService,
    {
      provide: UserRepository,
      useExisting: RelationalUserRepository,
    },
    {
      provide: AuthService,
      useClass: AuthenticateService,
    },
  ],
  imports: [
    SequelizeModule.forFeature([UserModel]),
  ],
})
export class UserModule {}
