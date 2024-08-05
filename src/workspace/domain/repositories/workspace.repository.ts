import { Workspace } from '../entities/workspace.entity';
export abstract class WorkspaceRepository {
  abstract create(workspace: Workspace): Promise<Workspace>;
}
