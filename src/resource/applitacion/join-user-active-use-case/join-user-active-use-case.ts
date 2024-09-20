import { Injectable } from '@shared-dependencies';
import { JoinUserActiveDto } from './join-user-active.dto';
import { UserActiveRepository } from '@/resource/domain/respositories/user-active.repository';
import { ActiveUser } from '@/resource/domain/entities/active-user.entity';

@Injectable()
export class JoinUserActiveUseCase {
  constructor(private readonly userActiveRepository: UserActiveRepository) {}
  async run(joinUserActiveDto: JoinUserActiveDto) {
    const { id, workspaceId } = joinUserActiveDto;

    const userExist = await this.userActiveRepository.find(workspaceId, id);

    if (userExist)
      await this.userActiveRepository.deleteByUser(workspaceId, id);

    const user = ActiveUser.create(joinUserActiveDto);

    const userCreated = await this.userActiveRepository.create(user);

    return userCreated.toValue();
  }
}
