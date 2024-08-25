import { CollaboratorRepository } from '@/workspace/domain/repositories/collaborator.repository';
import { DeleteMemberDto } from './delete-member.dto';
import { UserNoExistException } from '@/workspace/domain/exceptions/user-no.exist.exception';
import { Injectable, Transactional } from '@/shared/dependencies';
import { WorkspaceRepository } from '@/workspace/domain/repositories/workspace.repository';
import { WorkspaceNoExistException } from '@/workspace/domain/exceptions/workspace-no.exist.exception';

@Injectable()
export class DeleteMemberUseCase {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  @Transactional()
  async run(deleteMemberDto: DeleteMemberDto): Promise<void> {
    const { user, workspace } = deleteMemberDto;

    const existWorkspace = await this.workspaceRepository.findById(workspace);

    if (!existWorkspace) throw new WorkspaceNoExistException(workspace);

    const wasMemberDeleted =
      await this.collaboratorRepository.deleteMember(deleteMemberDto);

    if (!wasMemberDeleted)
      throw new UserNoExistException(`${user} in the workspace`);
  }
}
