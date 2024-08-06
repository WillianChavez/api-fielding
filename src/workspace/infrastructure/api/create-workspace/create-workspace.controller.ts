import {
  BadRequestException,
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
import { RoleNoHaveException } from 'src/workspace/domain/exceptions/role-no.have.exception';

@Controller(WORKSPACE_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class CreateWorkspaceController {
  constructor(private createWorkspaceUseCase: CreateWorkspaceUseCase) {}

  @Post()
  async run(@Body() createWorkspaceDto: CreateWorkspaceHttpDto) {
    try {
      const workspace =
        await this.createWorkspaceUseCase.run(createWorkspaceDto);
      return workspace;
    } catch (error) {
      if (error instanceof RoleNoExistException) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof RoleNoHaveException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
