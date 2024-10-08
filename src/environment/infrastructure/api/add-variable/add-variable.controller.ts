import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ENVIRONMENT_ROUTE, ENVIRONMENT_VARIABLE_ROUTE } from '../../routes';
import { AddVariableUseCase } from '@/environment/application/add-variable-use-case/add-variable-use-case';
import { AddVariableHttpDto } from './add-variable-http.dto';
import { AuthGuard } from '@nestjs/passport';
import { NotAddVariableException } from '@/environment/domain/exceptions/not-add-variable.exception';

@Controller(ENVIRONMENT_VARIABLE_ROUTE)
@ApiTags(ENVIRONMENT_ROUTE)
@ApiBearerAuth()
export class AddVariableController {
  constructor(private readonly addVariableUseCase: AddVariableUseCase) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async run(
    @Request() request,
    @Body() addVariableHttpDto: AddVariableHttpDto,
  ) {
    try {
      const { id: userId } = request.user;
      return await this.addVariableUseCase.run({
        userId,
        ...addVariableHttpDto,
      });
    } catch (error) {
      if (error instanceof NotAddVariableException) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
