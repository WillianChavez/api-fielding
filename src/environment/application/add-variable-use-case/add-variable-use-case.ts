import { Injectable, Transactional } from '@shared-dependencies';
import { AddVariableDto } from './add-variable.dto';
import { EnvironmentRepository } from '@/environment/domain/repositories/environment.repository';
import { Variable } from '@/environment/domain/entities/variable.entity';
import { NotAddVariableException } from '@/environment/domain/exceptions/not-add-variable.exception';

@Injectable()
export class AddVariableUseCase {
  constructor(private readonly environmentRepository: EnvironmentRepository) {}

  @Transactional()
  async run(addVariableDto: AddVariableDto) {
    const { environmentId, userId, variables } = addVariableDto;

    const isUserOwner = await this.environmentRepository.belongToUser(
      userId,
      environmentId,
    );

    if (!isUserOwner) throw new NotAddVariableException();

    const variablesCreated =
      await this.environmentRepository.createOrUpdateVariables(
        environmentId,
        variables.map((variable) => Variable.create(variable)),
      );

    return variablesCreated.map((variable) => variable.toValue());
  }
}
