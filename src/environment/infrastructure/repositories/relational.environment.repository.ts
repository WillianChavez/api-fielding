import { Environment } from '@/environment/domain/entities/enviroment.entity';
import { EnvironmentRepository } from '@/environment/domain/repositories/environment.repository';
import EnvironmentModel from '../models/enviroment.model';
import { InjectModel } from '@nestjs/sequelize';
import CollaboratorModel from '@/workspace/infrastructure/models/collaborator.model';
import { EnvironmentUser } from '@/environment/domain/entities/environment-user.entity';

export class RelationalEnvironmentRepository extends EnvironmentRepository {
  constructor(
    @InjectModel(EnvironmentModel)
    private readonly environmentModel: typeof EnvironmentModel,
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

    return new Environment({
      id: environmentModel.id,
      name: environmentModel.name,
      collaborator: new EnvironmentUser({
        id: collaboratorModel.id,
        userId: collaboratorModel.user_id,
      }).toValue(),
    });
  }
}
