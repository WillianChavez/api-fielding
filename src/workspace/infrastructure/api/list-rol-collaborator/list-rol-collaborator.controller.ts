import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListRolCollaboratorUseCase } from 'src/workspace/application/list-rol-collaborator-use-case/list-rol-collaborator-use-case';
import { ROLE_ROUTE, WORKSPACE_ROUTE } from 'src/workspace/routes';

@Controller(ROLE_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class ListRolCollaboratorController {
  constructor(
    private readonly listRolCollaboratorUseCase: ListRolCollaboratorUseCase,
  ) {}

  @Get()
  async run() {
    return this.listRolCollaboratorUseCase.run();
  }
}
