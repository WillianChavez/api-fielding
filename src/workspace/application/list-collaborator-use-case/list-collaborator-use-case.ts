import { CollaboratorRepository } from 'src/workspace/domain/repositories/collaborator.repository';
import { ListCollaboratorDto } from './list-collaborator.dto';
import { PrimitiveUser } from 'src/workspace/domain/entities/user.entity';
import { Injectable } from 'src/shared/dependencies/injectable';

@Injectable()
export class ListCollaboratorUseCase {
  constructor(private collaboratorRepository: CollaboratorRepository) {}

  async run(
    listCollaboratorDto: ListCollaboratorDto,
  ): Promise<PrimitiveUser[]> {
    const collaborators = await this.collaboratorRepository.findAllByUser(
      listCollaboratorDto.user,
      listCollaboratorDto.name,
    );

    return collaborators.map((collaborator) => collaborator.toValue());
  }
}
