/* eslint-disable prettier/prettier */
import { Controller,  Post, Body} from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { CreateUserDto } from '../../application/create-user-use-case/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
