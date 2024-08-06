/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './infrastructure/api/auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from './infrastructure/models/user.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [SequelizeModule.forFeature([UserModel])],
})
export class AuthModule {}
