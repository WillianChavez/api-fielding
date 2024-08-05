import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateWorkspaceUseCase } from 'src/workspace/application/create-workspace-use-case/create-workspace-use-case';
import { WORKSPACE_ROUTE } from 'src/workspace/routes/workspace.route';
import { CreateWorkspaceHttpDto } from './create-workspace-http.dto';
import { RoleNoExistException } from 'src/workspace/domain/exceptions/role-no.exist.exception';

@Controller(WORKSPACE_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class CreateWorkspaceController {
  constructor(private createWorkspaceUseCase: CreateWorkspaceUseCase) {}

  @Post()
  async create(@Body() createWorkspaceDto: CreateWorkspaceHttpDto) {
    try {
      const workspace =
        await this.createWorkspaceUseCase.execute(createWorkspaceDto);
      return workspace;
    } catch (error) {
      if (error instanceof RoleNoExistException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
