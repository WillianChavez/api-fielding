import { Environment } from '../entities/enviroment.entity';
import { Variable } from '../entities/variable.entity';

export abstract class EnvironmentRepository {
  abstract createEnvironmentUser(
    enviroment: Environment,
    workspaceId: string,
  ): Promise<Environment | null>;

  abstract createOrUpdateVariables(
    enviromentId: string,
    variables: Variable[],
  ): Promise<Variable[] | null>;

  abstract belongToUser(
    userId: string,
    environmentId: string,
  ): Promise<boolean>;
}
