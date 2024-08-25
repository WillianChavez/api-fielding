import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UserModel from '@/user/infrastructure/models/user.model';

@Module({
  providers: [JwtStrategy],
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
