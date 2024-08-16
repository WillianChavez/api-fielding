import { Collaborator } from './../../../domain/entities/collaborator.entity';
import { Workspace } from './../../../domain/entities/workspace.entity';

describe('CreateWorkspaceUseCase', () => {
  it('should create a workspace', async () => {
    const workspace = Workspace.create({
      name: 'workspace name',
      collaborators: [
        Collaborator.create({
          user: 'identifier of user',
          role: 'identifier of role',
        }),
      ],
    });

    expect(workspace.toValue().count_collaborators).toBe(1);
  });
});
