import { Injectable, Transactional } from '@shared-dependencies';
import { CreateEnvironmentUserDto } from './create-environment.dto';
import { EnvironmentRepository } from '@/environment/domain/repositories/environment.repository';
import { EnvironmentUser } from '@/environment/domain/entities/environment-user.entity';
import { Environment } from '@/environment/domain/entities/enviroment.entity';
import { WorkspaceRepository } from '@/workspace/domain/repositories/workspace.repository';
import { WorkspaceNoExistException } from '@/workspace/domain/exceptions/workspace-no.exist.exception';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { UserNoExistException } from '@/user/domain/exceptions/user-no-exist.exception';
import { NotCreateEnvironmentException } from '@/environment/domain/exceptions/not-create-environment.exception';

@Injectable()
export class CreateEnvironmentUserUseCase {
  constructor(
    private readonly environmentRepository: EnvironmentRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  @Transactional()
  async run(
    createEnvironmentUser: CreateEnvironmentUserDto,
  ): Promise<{ id: string; name: string }> {
    const { userId, workspaceId, name } = createEnvironmentUser;

    const workspaceExist = await this.workspaceRepository.findById(workspaceId);

    if (!workspaceExist) throw new WorkspaceNoExistException(workspaceId);

    const userExist = await this.userRepository.findById(userId);

    if (!userExist) throw new UserNoExistException(userId);

    const environmentUser = EnvironmentUser.create({ userId });
    const environment = Environment.create({
      name,
      collaborator: environmentUser.toValue(),
    });

    const environmentCreated =
      await this.environmentRepository.createEnvironmentUser(
        environment,
        workspaceId,
      );

    if (!environmentCreated) throw new NotCreateEnvironmentException();

    return {
      id: environmentCreated.id,
      name: environmentCreated.name,
    };
  }
}
