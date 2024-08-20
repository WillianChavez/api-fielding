/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from './infrastructure/models/user.model';
import { CreateUserController } from './infrastructure/api/create-user/create-user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { RelationalUserRepository } from './infrastructure/repositories/relational.user.repository';
import { CreateUserUseCase } from './application/create-user-use-case/create-user-use-case';
import { AuthService } from './domain/services/auth.service';
import { AuthenticateService } from './infrastructure/services/authenticate.service';
import { CreateUserResource } from './infrastructure/api/create-user/create-user.resource';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [CreateUserController],
  providers: [
    RelationalUserRepository,
    CreateUserUseCase,
    CreateUserResource,
    AuthenticateService,
    {
      provide: UserRepository,
      useExisting: RelationalUserRepository,
    },
    {
      provide: AuthService,
      useExisting: AuthenticateService,
    },
  ],
  imports: [
    SequelizeModule.forFeature([UserModel]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if(!configService.get('JWT_SECRET')) {
          throw new Error('JWT_SECRET not defined');
        }
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '4h' },
        };
      },
    }),
  ],
})
export class AuthModule {}
