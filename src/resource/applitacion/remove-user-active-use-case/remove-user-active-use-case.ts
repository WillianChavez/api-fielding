import { Injectable } from '@shared-dependencies';
import { RemoveUserActiveDto } from './remove-user-active.dto';
import { UserActiveRepository } from '@/resource/domain/respositories/user-active.repository';

@Injectable()
export class RemoveUserActiveUseCase {
  constructor(private readonly userActiveRepository: UserActiveRepository) {}
  async run(removeUserActiveDto: RemoveUserActiveDto) {
    const { workspaceId, id } = removeUserActiveDto;

    await this.userActiveRepository.deleteByUser(workspaceId, id);

    return (await this.userActiveRepository.findAllById(workspaceId)).map(
      (user) => user.toValue(),
    );
  }
}
