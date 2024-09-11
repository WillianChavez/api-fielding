import { Injectable } from '@shared-dependencies';
import { JoinUserActiveDto } from './join-user-active.dto';

@Injectable()
export class JoinUserActiveUseCase {
  private activesUsers: JoinUserActiveDto[] = [];
  async run(
    joinUserActiveDto: JoinUserActiveDto,
  ): Promise<JoinUserActiveDto[]> {
    const { workspaceId, id } = joinUserActiveDto;

    const user = this.activesUsers.find(
      (user) => user.id === id && user.workspaceId === workspaceId,
    );

    const filterWorkspace = (user) => user.workspaceId === workspaceId;

    if (user) return this.activesUsers.filter(filterWorkspace);

    this.activesUsers.push(joinUserActiveDto);

    return this.activesUsers.filter(filterWorkspace);
  }
}
