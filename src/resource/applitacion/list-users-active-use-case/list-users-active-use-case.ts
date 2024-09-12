import { UserActiveRepository } from '@/resource/domain/respositories/user-active.repository';
import { Injectable } from '@shared-dependencies';
import { ListUsersActiveDto } from './list-users-active.dto';

@Injectable()
export class ListUsersActiveUseCase {
  constructor(private readonly userActiveRepository: UserActiveRepository) {}

  async run(listUsersActive: ListUsersActiveDto) {
    const { workspaceId } = listUsersActive;
    const usersActive =
      await this.userActiveRepository.findAllById(workspaceId);
    return usersActive.map((user) => user.toValue());
  }
}
