import { Injectable, Transactional } from '@/shared/dependencies';
import { LinkWorkspaceDto } from './link-workspace.dto';
import { TokenService } from '@/workspace/domain/services/token.service';
import { WorkspaceRepository } from '@/workspace/domain/repositories/workspace.repository';
import { WorkspaceNoExistException } from '@/workspace/domain/exceptions/workspace-no.exist.exception';

@Injectable()
export class LinkWorkspaceUseCase {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly tokenService: TokenService<{
      workspace: string;
      users?: string[];
    }>,
  ) {}

  @Transactional()
  async run(linkWorkspaceDto: LinkWorkspaceDto): Promise<string> {
    const { workspace: id, users, exp } = linkWorkspaceDto;
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new WorkspaceNoExistException(id);
    }

    const token = await this.tokenService.encrypt(
      { workspace: id, users },
      exp,
    );

    await this.workspaceRepository.updateHash(id, token);

    return Buffer.from(token).toString('base64url');
  }
}
