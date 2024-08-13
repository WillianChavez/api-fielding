import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListCollaboratorUseCase } from 'src/workspace/application/list-collaborator-use-case/list-collaborator-use-case';
import { ListCollaboratorHttpDto } from './list-collaborator-http.dto';
import {
  CollaboratorResource,
  CollaboratorResourceJson,
} from './list-collaborator.resource';
import { COLLABORATOR_ROUTE, WORKSPACE_ROUTE } from 'src/workspace/routes';

@Controller(COLLABORATOR_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class ListCollaboratorController {
  constructor(
    private readonly listCollaboratorUseCase: ListCollaboratorUseCase,
  ) {}

  @Get()
  async run(
    @Query() listCollaboratorHttpDto: ListCollaboratorHttpDto,
  ): Promise<CollaboratorResourceJson[]> {
    try {
      const collaborators = await this.listCollaboratorUseCase.run(
        listCollaboratorHttpDto,
      );
      return CollaboratorResource.collectionToJson(collaborators);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
