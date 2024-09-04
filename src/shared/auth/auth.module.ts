import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UserModel from '@/user/infrastructure/models/user.model';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './middleware/auth-guard/auth-role.guard';

@Global()
@Module({
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    SequelizeModule.forFeature([UserModel]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '4h' },
        };
      },
    }),
  ],
  exports: [JwtStrategy, SequelizeModule, PassportModule, JwtModule],
})
export class AuthModule {}
