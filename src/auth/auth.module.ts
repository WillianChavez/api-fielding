/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from './infrastructure/models/user.model';

@Module({
  controllers: [],
  providers: [],
  imports: [SequelizeModule.forFeature([UserModel])],
})
export class AuthModule {}
