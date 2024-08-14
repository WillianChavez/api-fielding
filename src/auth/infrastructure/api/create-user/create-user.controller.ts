import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
// import { AuthService } from 'src/auth/domain/services/auth.service';
import { CreateUserUseCase } from 'src/auth/application/create-user-use-case/create-user-use-case';
import { CreateUserHttpDto } from './create-user-http.dto';
import { EmailAlreadyExistException } from 'src/auth/domain/exceptions/email-already-exist.exception';

@Controller('create-user')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserHttpDto) {
    try {
      const user = await this.createUserUseCase.run(createUserDto);
      return user;
    } catch (error) {
      if (error instanceof EmailAlreadyExistException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
