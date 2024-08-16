import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListCollaboratorUseCase } from 'src/workspace/application/list-collaborator-use-case/list-collaborator-use-case';
import {
  ListCollaboratorParamHttpDto,
  ListCollaboratorQueryHttpDto,
} from './list-collaborator-http.dto';

import { COLLABORATOR_ROUTE, WORKSPACE_ROUTE } from 'src/workspace/routes';

@Controller(COLLABORATOR_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class ListCollaboratorController {
  constructor(
    private readonly listCollaboratorUseCase: ListCollaboratorUseCase,
  ) {}

  @Get(':user')
  async run(
    @Param() listCollaboratorParamHttpDto: ListCollaboratorParamHttpDto,
    @Query() listCollaboratorHttpDto: ListCollaboratorQueryHttpDto,
  ) {
    try {
      const collaborators = await this.listCollaboratorUseCase.run({
        ...listCollaboratorParamHttpDto,
        ...listCollaboratorHttpDto,
      });
      return collaborators.map((collaborator) => collaborator);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
