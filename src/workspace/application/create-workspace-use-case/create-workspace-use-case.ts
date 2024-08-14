import { Injectable } from 'src/shared/dependencies/injectable';
import { WorkspaceRepository } from 'src/workspace/domain/repositories/workspace.repository';
import { CreateWorkspaceDto } from './create-workspace.dto';
import {
  PrimitiveWorkspace,
  Workspace,
} from 'src/workspace/domain/entities/workspace.entity';
import {
  Collaborator,
  CollaboratorRole,
} from 'src/workspace/domain/entities/collaborator.entity';
import { RoleRepository } from 'src/workspace/domain/repositories/role.repository';
import { RoleNoExistException } from 'src/workspace/domain/exceptions/role-no.exist.exception';
import { Transactional } from './../../../shared/dependencies/transactional';
import { RoleNoHaveException } from 'src/workspace/domain/exceptions/role-no.have.exception';

@Injectable()
export class CreateWorkspaceUseCase {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  @Transactional()
  async run(
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<{ workspace: PrimitiveWorkspace }> {
    const rolesIds = createWorkspaceDto?.collaborators.map(
      (collaborator) => collaborator.role,
    );
    const idsInvalid = await this.roleRepository.findExistByIds(rolesIds);

    if (idsInvalid.length > 0) {
      throw new RoleNoExistException(idsInvalid.join(', '));
    }

    const haveRoleAdmin = await this.roleRepository.findExistNameByIds(
      CollaboratorRole.ADMIN,
      rolesIds,
    );

    if (!haveRoleAdmin) {
      throw new RoleNoHaveException(CollaboratorRole.ADMIN);
    }

    const collaborators = createWorkspaceDto?.collaborators?.map(
      (collaborator) => {
        return Collaborator.create({
          role: collaborator.role,
          user: collaborator.id,
        });
      },
    );
    const workspace = Workspace.create({
      name: createWorkspaceDto.name,
      collaborators: collaborators,
    });

    const workspaceCreated: Workspace =
      await this.workspaceRepository.create(workspace);

    return { workspace: workspaceCreated.toValue() };
  }
}
