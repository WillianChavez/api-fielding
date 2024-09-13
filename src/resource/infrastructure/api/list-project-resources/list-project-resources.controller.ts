import { Controller, Get, Param } from '@nestjs/common';
import { PROJECT_RESOURCE_ROUTE } from '../../routes';
import { ApiTags } from '@nestjs/swagger';
import { ListResourcesUseCase } from '@/resource/applitacion/list-resources-use-case/list-resources-use-case';
import { ListProjectResourcesHttpDto } from './list-project-resources.http.dto';

@Controller(PROJECT_RESOURCE_ROUTE)
@ApiTags(PROJECT_RESOURCE_ROUTE)
export class ListProjectResourcesController {
  constructor(private readonly listResourceUseCase: ListResourcesUseCase) {}

  @Get(':workspaceId')
  async run(@Param() params: ListProjectResourcesHttpDto) {
    const resources = await this.listResourceUseCase.run({
      typesResources: ['project', 'folder', 'request'],
      workspaceId: params.workspaceId,
    });

    return resources;
  }
}
