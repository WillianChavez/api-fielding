import { Workspace } from 'src/workspace/domain/entities/workspace.entity';
import { WorkspaceRepository } from 'src/workspace/domain/repositories/workspace.repository';
import WorkspaceModel from '../models/workspace.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from 'src/shared/dependencies/injectable';

import { WorkspaceMapper } from '../mappers/workspace.mapper';
import CollaboratorModel from '../models/collaborator.model';

@Injectable()
export class RelationalWorkspaceRepository extends WorkspaceRepository {
  constructor(
    @InjectModel(WorkspaceModel)
    private readonly workspaceModel: typeof WorkspaceModel,
    private readonly workspaceMapper: WorkspaceMapper,
  ) {
    super();
  }

  async create(workspace: Workspace): Promise<Workspace> {
    await this.workspaceModel.create(
      this.workspaceMapper.toPersistence(workspace),
      { include: [CollaboratorModel] },
    );
    return workspace;
  }

  async listByUser(options: { user: string }): Promise<Workspace[]> {
    const { user } = options;
    const workspaces = await this.workspaceModel.findAll({
      include: [
        {
          model: CollaboratorModel,
          where: { user_id: user },
        },
      ],
    });

    return workspaces.map((workspace) =>
      this.workspaceMapper.toDomain(workspace),
    );
  }

  async findById(id: string): Promise<Workspace | null> {
    const workspace = await this.workspaceModel.findByPk(id, {
      include: [CollaboratorModel],
    });

    if (!workspace) return null;

    return this.workspaceMapper.toDomain(workspace);
  }
}
