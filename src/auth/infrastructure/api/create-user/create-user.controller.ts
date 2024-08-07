/* eslint-disable prettier/prettier */
import { Controller,  Post, Body} from '@nestjs/common';
import { AuthService } from '../../../auth.service';
import { CreateUserHttpDto } from './create-user-http.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserHttpDto: CreateUserHttpDto) {
    return this.authService.create(createUserHttpDto);
  }
}
