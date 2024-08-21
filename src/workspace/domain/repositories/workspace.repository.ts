import { Workspace } from '../entities/workspace.entity';
export abstract class WorkspaceRepository {
  abstract create(workspace: Workspace): Promise<Workspace>;
  abstract listByUser(options: { user: string }): Promise<Workspace[]>;
  abstract findById(id: string): Promise<Workspace | null>;
}
