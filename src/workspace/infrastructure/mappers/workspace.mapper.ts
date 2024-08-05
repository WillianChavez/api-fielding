import { Workspace } from 'src/workspace/domain/entities/workspace.entity';
import { Injectable } from 'src/shared/dependencies/injectable';

@Injectable()
export class WorkspaceMapper {
  toPersistence(workspace: Workspace): object {
    const workspaceData = workspace.toValue();
    const collaborators = workspaceData?.collaborators?.map((collaborator) => {
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
    };
  }
}
