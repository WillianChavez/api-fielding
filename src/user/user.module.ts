/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from './infrastructure/models/user.model';
import { CreateUserController } from './infrastructure/api/create-user/create-user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { RelationalUserRepository } from './infrastructure/repositories/relational.user.repository';
import { CreateUserUseCase } from './application/create-user-use-case/create-user-use-case';
import { UserService } from './domain/services/user.service';
import { AuthService } from '../shared/auth/services/auth.service';
import { CreateUserResource } from './infrastructure/api/create-user/create-user.resource';
import { LoginController } from './infrastructure/api/login/login.controller';
import { LoginUserUseCase } from './application/login-user-use-case/login-user-use-case';
import { AuthModule } from '@/shared/auth/auth.module';
import { LoginUserResource } from './infrastructure/api/login/login-user.resource';
import { EditUserController } from './infrastructure/api/edit-user/edit-user.controller';
import { EditUserUseCase } from './application/edit-user-use-case/edit-user-use-case';
import { EditUserResource } from './infrastructure/api/edit-user/edit-user.resource';

@Module({
  controllers: [CreateUserController, LoginController, EditUserController],
  providers: [
    RelationalUserRepository,
    CreateUserUseCase,
    EditUserUseCase,
    EditUserResource,
    CreateUserResource,
    LoginUserUseCase,
    AuthService,
    LoginUserResource,
    {
      provide: UserRepository,
      useExisting: RelationalUserRepository,
    },
    {
      provide: UserService,
      useClass: AuthService,
    },
  ],
  imports: [SequelizeModule.forFeature([UserModel]), AuthModule],
  exports: [UserRepository],
})
export class UserModule {}
