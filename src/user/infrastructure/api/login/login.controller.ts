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
import { LoginUserResource } from './login-user.resource';
import { ApiTags } from '@nestjs/swagger';

@Controller(LOGIN_ROUTE)
@ApiTags(LOGIN_ROUTE)
export class LoginController {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly loginResource: LoginUserResource,
  ) {}

  @Post()
  async run(@Body() LoginUserHttpDto: LoginUserHttpDto) {
    try {
      const { token } = await this.loginUserUseCase.run(LoginUserHttpDto);
      return this.loginResource.toJson({ token });
      // return await this.loginUserUseCase.run(LoginUserHttpDto);
    } catch (error) {
      if (error instanceof UnAuthorizedException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
