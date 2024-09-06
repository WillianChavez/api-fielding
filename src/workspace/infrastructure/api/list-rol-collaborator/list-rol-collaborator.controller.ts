import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListRoleCollaboratorUseCase } from 'src/workspace/application/list-role-collaborator-use-case/list-role-collaborator-use-case';
import { ROLE_ROUTE, WORKSPACE_ROUTE } from 'src/workspace/routes';

@Controller(ROLE_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class ListRolCollaboratorController {
  constructor(
    private readonly listRoleCollaboratorUseCase: ListRoleCollaboratorUseCase,
  ) {}

  @Get()
  async run() {
    return this.listRoleCollaboratorUseCase.run();
  }
}
