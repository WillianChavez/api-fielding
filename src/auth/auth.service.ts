/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './application/create-user-use-case/create-user.dto';
import UserModel from './infrastructure/models/user.model';

@Injectable()
export class AuthService {

  constructor(

  ) {}
  create(createUserDto: CreateUserDto) {
   try {
     
   } catch (error) {
    console.log(error); 
   }
  }
 }