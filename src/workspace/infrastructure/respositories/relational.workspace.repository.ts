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
    //TODO: Default user collaborator
    /*    workspace.addCollaborator(
      Collaborator.create({
        role: 'c10ebdbb-9d4c-4f3a-9ae9-cb72bebf983e',
        user: 'c10ebdbb-9d4c-4f3a-9ae9-cb72bebf983e',
      }),
    ); */

    console.log(workspace);

    await this.workspaceModel.create(
      this.workspaceMapper.toPersistence(workspace),
      { include: [CollaboratorModel] },
    );
    return workspace;
  }
}
