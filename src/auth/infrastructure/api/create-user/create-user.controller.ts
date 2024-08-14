import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { USER_ROUTE } from '../../routes/user.route';
import { CreateUserHttpDto } from './create-user-http.dto';
import { CreateUserUseCase } from 'src/auth/application/create-user-use-case/create-user-use-case';
import { EmailAlreadyExistException } from 'src/auth/domain/exceptions/email-already-exist.exception';
import { PasswordAlreadyExistException } from 'src/auth/domain/exceptions/password-already-exist.exception';
import { UserAlreadyExistException } from 'src/auth/domain/exceptions/user-already-exist.exception';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserResource } from './create-user.resource';

@Controller(USER_ROUTE)
@ApiTags(USER_ROUTE)
export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createUserResource: CreateUserResource,
  ) {}

  @Post()
  async run(@Body() createUserHttpDto: CreateUserHttpDto) {
    try {
      const user = await this.createUserUseCase.run(createUserHttpDto);
      return this.createUserResource.toJson(user);
    } catch (error) {
      if (
        error instanceof EmailAlreadyExistException ||
        error instanceof PasswordAlreadyExistException ||
        error instanceof UserAlreadyExistException
      )
        throw new BadRequestException(error.message);

      throw new InternalServerErrorException(error);
    }
  }
}
