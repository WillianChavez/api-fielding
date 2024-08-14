import { Workspace } from 'src/workspace/domain/entities/workspace.entity';
import { Injectable } from 'src/shared/dependencies/injectable';
import WorkspaceModel from '../models/workspace.model';
import { BaseMapper } from 'src/workspace/domain/mappers/base.mapper';
import { CollaboratorMapper } from './collaborator.mapper';

@Injectable()
export class WorkspaceMapper extends BaseMapper<Workspace, WorkspaceModel> {
  constructor(private readonly collaboratorMapper: CollaboratorMapper) {
    super();
  }
  toDomain(model: WorkspaceModel): Workspace {
    return new Workspace({
      id: model.id,
      name: model.name,
      count_collaborators: model.count_collaborators,
      collaborators: model.collaborators.map((collaborator) =>
        this.collaboratorMapper.toDomain(collaborator),
      ),
    });
  }
  toPersistence(workspace: Workspace): WorkspaceModel {
    const workspaceData = workspace.toValue();
    const collaborators = workspaceData.collaborators?.map((collaborator) => {
      const collaboratorData = collaborator.toValue();
      return {
        id: collaboratorData.id,
        role_id: collaboratorData.role,
        user_id: collaboratorData.user,
        workspace_id: workspaceData.id,
      };
    });

    return {
      id: workspaceData.id,
      name: workspaceData.name,
      count_collaborators: workspaceData.count_collaborators,
      collaborators,
    } as WorkspaceModel;
  }
}
