import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ENVIRONMENT_ROUTE, ENVIRONMENT_USER_ROUTE } from '../../routes';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEnvironmentUserHttpDto } from './create-environment-user-http.dto';
import { CreateEnvironmentUserUseCase } from '@/environment/application/create-environment-user-use-case/create-environment-user-use-case';
import { WorkspaceNoExistException } from '@/workspace/domain/exceptions/workspace-no.exist.exception';
import { UserNoExistException } from '@/user/domain/exceptions/user-no-exist.exception';
import { AuthGuard } from '@nestjs/passport';
import { NotCreateEnvironmentException } from '@/environment/domain/exceptions/not-create-environment.exception';

@Controller(ENVIRONMENT_USER_ROUTE)
@ApiTags(ENVIRONMENT_ROUTE)
@ApiBearerAuth()
export class CreateEnvironmentUserController {
  constructor(
    private readonly createEnvironmentUserUseCase: CreateEnvironmentUserUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async run(
    @Request() request,
    @Body() createEnvironmentUser: CreateEnvironmentUserHttpDto,
  ) {
    try {
      const { id: userId } = request.user;
      return await this.createEnvironmentUserUseCase.run({
        ...createEnvironmentUser,
        userId,
      });
    } catch (error) {
      if (
        error instanceof WorkspaceNoExistException ||
        error instanceof UserNoExistException
      )
        throw new NotFoundException(error.message);

      if (error instanceof NotCreateEnvironmentException)
        throw new BadRequestException(error.message);

      throw new InternalServerErrorException(error);
    }
  }
}
