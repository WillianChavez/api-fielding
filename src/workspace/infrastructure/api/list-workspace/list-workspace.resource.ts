import { PrimitiveWorkspace } from '@/workspace/domain/entities/workspace.entity';
import { Injectable } from '@nestjs/common';

export interface ListWorkspaceResourceJson {
  id: string;
  name: string;
  count_collaborators: number;
}

@Injectable()
export class ListWorkspaceResource {
  toJson(workspace: PrimitiveWorkspace): ListWorkspaceResourceJson {
    return {
      id: workspace.id,
      name: workspace.name,
      count_collaborators: workspace.count_collaborators,
    };
  }
  collectionToJson(
    collection: PrimitiveWorkspace[],
  ): ListWorkspaceResourceJson[] {
    return collection.map((item) => this.toJson(item));
  }
}
