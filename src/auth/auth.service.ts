/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import UserModel from './infrastructure/models/user.model';
import { CreateUserHttpDto } from './infrastructure/api/create-user/create-user-http.dto';

@Injectable()
export class AuthService {

  constructor(

  ) {}
  create(createUserHttpDto: CreateUserHttpDto) {
   try {
     
   } catch (error) {
    console.log(error); 
   }
  }
 }