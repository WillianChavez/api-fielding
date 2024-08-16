import { PrimitiveWorkspace } from '@/workspace/domain/entities/workspace.entity';
import { WorkspaceRepository } from '@/workspace/domain/repositories/workspace.repository';
import { ListWorkspaceDto } from './list-workspace.dto';
import { Injectable } from '@/shared/dependencies';

@Injectable()
export class ListWorkspaceUseCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async run(listWorkspaceDto: ListWorkspaceDto): Promise<PrimitiveWorkspace[]> {
    const workspaces =
      await this.workspaceRepository.listByUser(listWorkspaceDto);

    return workspaces.map((workspace) => workspace.toValue());
  }
}
