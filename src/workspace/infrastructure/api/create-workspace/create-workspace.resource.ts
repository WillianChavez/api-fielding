import { Injectable } from 'src/shared/dependencies';
import { PrimitiveCollaborator } from 'src/workspace/domain/entities/collaborator.entity';
import { PrimitiveWorkspace } from 'src/workspace/domain/entities/workspace.entity';

export interface CreateWorkspaceResourceJson {
  id: string;
  name: string;
  count_collaborators: number;
  collaborators: PrimitiveCollaborator[];
}

@Injectable()
export class CreateWorkspaceResource {
  toJson(workspace: PrimitiveWorkspace): CreateWorkspaceResourceJson {
    return {
      id: workspace.id,
      name: workspace.name,
      count_collaborators: workspace.count_collaborators,
      collaborators: workspace.collaborators.map((collaborator) =>
        collaborator.toValue(),
      ),
    };
  }
}
