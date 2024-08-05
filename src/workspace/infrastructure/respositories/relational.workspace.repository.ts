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
    /*   workspace.addCollaborator(
      Collaborator.create({
        role: '436b8f8d-5d8d-4a01-a6c8-5890b2a3a54c',
        user: '85bb26a0-b4be-402e-a481-790f66318ca1',
      }),
    ); */

    await this.workspaceModel.create(
      this.workspaceMapper.toPersistence(workspace),
      { include: [CollaboratorModel] },
    );
    return workspace;
  }

  update(id: string, workspace: Workspace): Promise<Workspace> {
    throw new Error(`Method not implemented. ${id} ${workspace}`);
  }
  delete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
  findAll(): Promise<Workspace[]> {
    throw new Error('Method not implemented.');
  }
  findAllByCollaboratorId(collaboratorId: string): Promise<Workspace[]> {
    throw new Error(`'Method not implemented.' ${collaboratorId}`);
  }
  findOne(id: string): Promise<Workspace> {
    throw new Error(`Method not implemented. ${id}`);
  }
  findByName(name: string): Promise<Workspace> {
    throw new Error(`Method not implemented. ${name}`);
  }
}
