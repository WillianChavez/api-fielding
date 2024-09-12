import { ActiveUser } from '@/resource/domain/entities/active-user.entity';
import { UserActiveRepository } from '@/resource/domain/respositories/user-active.repository';

export class MemoryUserActiveRepository extends UserActiveRepository {
  private activesUsers: Map<string, ActiveUser[]> = new Map();

  async create(resource: ActiveUser): Promise<ActiveUser> {
    const { workspaceId, id } = resource.toValue();

    const usersInWorkspace = this.activesUsers.get(workspaceId) || [];

    const userExist = usersInWorkspace.find((user) => user.toValue().id === id);

    if (userExist) this.deleteByUser(workspaceId, id);

    usersInWorkspace.push(resource);
    this.activesUsers.set(workspaceId, usersInWorkspace);

    return resource;
  }

  delete(id: string): Promise<void> {
    if (!this.activesUsers.has(id)) return;

    this.activesUsers.delete(id);
  }

  async deleteByUser(id: string, userId: string): Promise<void> {
    const usersInWorkspace = this.activesUsers.get(id) || [];

    const userExist = usersInWorkspace.find(
      (user) => user.toValue().id === userId,
    );

    if (!userExist) return;

    usersInWorkspace.splice(usersInWorkspace.indexOf(userExist, 1));

    this.activesUsers.set(id, usersInWorkspace);
  }

  async findAllById(id: string): Promise<ActiveUser[]> {
    return this.activesUsers.get(id) || [];
  }
}
