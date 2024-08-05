import { Transactional } from 'sequelize-transactional-decorator';
import { Injectable } from 'src/shared/dependencies/injectable';
import { WorkspaceRepository } from 'src/workspace/domain/repositories/workspace.repository';
import { CreateWorkspaceDto } from './create-workspace.dto';
import {
  PrimitiveWorkspace,
  Workspace,
} from 'src/workspace/domain/entities/workspace.entity';
import { Collaborator } from 'src/workspace/domain/entities/collaborator.entity';
import { RoleRepository } from 'src/workspace/domain/repositories/role.repository';
import { RoleNoExistException } from 'src/workspace/domain/exceptions/role-no.exist.exception';

@Injectable()
export class CreateWorkspaceUseCase {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  @Transactional()
  async execute(
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<{ workspace: PrimitiveWorkspace }> {
    const idsInvalid = await this.roleRepository.findExistByIds(
      createWorkspaceDto?.collaborators?.map(
        (collaborator) => collaborator.role,
      ),
    );
    if (idsInvalid.length > 0) {
      throw new RoleNoExistException(idsInvalid.join(', '));
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
      collaborators,
    });

    const workspaceCreated: Workspace =
      await this.workspaceRepository.create(workspace);

    return { workspace: workspaceCreated.toValue() };
  }
}
