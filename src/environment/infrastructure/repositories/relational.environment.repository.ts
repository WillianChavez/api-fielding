import { Environment } from '@/environment/domain/entities/enviroment.entity';
import { EnvironmentRepository } from '@/environment/domain/repositories/environment.repository';
import EnvironmentModel from '../models/enviroment.model';
import { InjectModel } from '@nestjs/sequelize';
import CollaboratorModel from '@/workspace/infrastructure/models/collaborator.model';
import { EnvironmentUser } from '@/environment/domain/entities/environment-user.entity';
import { Variable } from '@/environment/domain/entities/variable.entity';
import EnvironmentVariableModel from '../models/environment.variable.model';

export class RelationalEnvironmentRepository extends EnvironmentRepository {
  constructor(
    @InjectModel(EnvironmentModel)
    private readonly environmentModel: typeof EnvironmentModel,
    @InjectModel(EnvironmentVariableModel)
    private readonly environmentVariableModel: typeof EnvironmentVariableModel,
    @InjectModel(CollaboratorModel)
    private readonly collaboratorModel: typeof CollaboratorModel,
  ) {
    super();
  }
  async createEnvironmentUser(
    environment: Environment,
    workspaceId: string,
  ): Promise<Environment | null> {
    const { name, collaborator, id } = environment.toValue();

    const collaboratorModel = await this.collaboratorModel.findOne({
      where: [{ user_id: collaborator.userId, workspace_id: workspaceId }],
    });

    const environmentModel = await this.environmentModel.create({ id, name });

    await environmentModel.$add('collaborator', collaboratorModel);

    await environmentModel.reload();

    if (!environmentModel || !collaboratorModel) return null;

    return Environment.from({
      id: environmentModel.id,
      name: environmentModel.name,
      collaborator: EnvironmentUser.from({
        id: collaboratorModel.id,
        userId: collaboratorModel.user_id,
      }).toValue(),
    });
  }

  async belongToUser(userId: string, environmentId: string): Promise<boolean> {
    const environmentModel = await this.environmentModel.findOne({
      where: { id: environmentId },
      include: [
        {
          model: CollaboratorModel,
          where: { user_id: userId },
        },
      ],
    });

    return !!environmentModel;
  }

  async createOrUpdateVariables(
    environmentId: string,
    variables: Variable[],
  ): Promise<Variable[] | null> {
    const variablesModel = variables
      .map((variable) => variable.toValue())
      .map(({ id, name, currentValue, initialValue, active }) => ({
        id,
        name,
        current_value: currentValue,
        initial_value: initialValue,
        environment_id: environmentId,
        active,
      }));

    await this.environmentVariableModel.bulkCreate(variablesModel, {
      updateOnDuplicate: ['current_value', 'initial_value', 'name', 'active'],
    });

    return variables;
  }
}
