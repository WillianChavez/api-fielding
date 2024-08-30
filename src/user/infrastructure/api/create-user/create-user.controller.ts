import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { USER_ROUTE } from '../../routes/user.route';
import { CreateUserHttpDto } from './create-user-http.dto';
import { CreateUserUseCase } from '@/user/application/create-user-use-case/create-user-use-case';
import { EmailAlreadyExistException } from '@/user/domain/exceptions/email-already-exist.exception';
import { UserAlreadyExistException } from '@/user/domain/exceptions/user-already-exist.exception';
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
      const { user, token } =
        await this.createUserUseCase.run(createUserHttpDto);
      return this.createUserResource.toJson({ user, token });
    } catch (error) {
      if (
        error instanceof EmailAlreadyExistException ||
        error instanceof UserAlreadyExistException
      )
        throw new BadRequestException(error.message);

      throw new InternalServerErrorException(error);
    }
  }
}
