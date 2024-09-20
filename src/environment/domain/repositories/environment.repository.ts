import { Environment } from '../entities/enviroment.entity';

export abstract class EnvironmentRepository {
  abstract createEnvironmentUser(
    enviroment: Environment,
    workspaceId: string,
  ): Promise<Environment | null>;
}
