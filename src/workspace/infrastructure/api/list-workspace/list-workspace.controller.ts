import { WORKSPACE_ROUTE } from '@/workspace/routes';
import { ListWorkspaceHttpDto } from './list-workspace-http.dto';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListWorkspaceUseCase } from '@/workspace/application/list-workspace-use-case/list-workspace-use-case';
import {
  ListWorkspaceResource,
  ListWorkspaceResourceJson,
} from './list-workspace.resource';

@Controller(WORKSPACE_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class ListWorkspaceController {
  constructor(
    private readonly listWorkspaceUseCase: ListWorkspaceUseCase,
    private readonly listWorkspaceResource: ListWorkspaceResource,
  ) {}

  @Get(':user')
  async run(
    @Param() listWorkspaceHttpDto: ListWorkspaceHttpDto,
  ): Promise<ListWorkspaceResourceJson[]> {
    const workspaces =
      await this.listWorkspaceUseCase.run(listWorkspaceHttpDto);

    return this.listWorkspaceResource.collectionToJson(workspaces);
  }
}
