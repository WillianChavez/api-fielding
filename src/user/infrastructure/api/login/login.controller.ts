// import { Controller } from "@nestjs/common";

import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { LOGIN_ROUTE } from '../../routes/login.route';
import { LoginUserUseCase } from '@/user/application/login-user-use-case/login-user-use-case';
import { LoginUserHttpDto } from './login-user.http.dto';
import { UnAuthorizedException } from '@/user/domain/exceptions/un-authorized.exception';
import { IncorrectPasswordException } from '@/user/domain/exceptions/incorrect-password.exception';

@Controller(LOGIN_ROUTE)
export class LoginController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  @Post()
  async run(@Body() LoginUserHttpDto: LoginUserHttpDto) {
    try {
      return await this.loginUserUseCase.run(LoginUserHttpDto);
    } catch (error) {
      if (
        error instanceof UnAuthorizedException ||
        error instanceof IncorrectPasswordException
      ) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
