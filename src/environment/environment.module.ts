import { Module } from '@nestjs/common';
import { CreateEnvironmentUserController } from './infrastructure/api/create-environment-user/create-environment-user.controller';
import { CreateEnvironmentUserUseCase } from './application/create-environment-user-use-case/create-environment-user-use-case';
import { SequelizeModule } from '@nestjs/sequelize';
import EnvironmentModel from './infrastructure/models/enviroment.model';
import EnvironmentVariableModel from './infrastructure/models/environment.variable.model';
import { RelationalEnvironmentRepository } from './infrastructure/repositories/relational.environment.repository';
import { EnvironmentRepository } from './domain/repositories/environment.repository';
import { WorkspaceModule } from '@/workspace/workspace.module';
import { UserModule } from '@/user/user.module';
import CollaboratorModel from '@/workspace/infrastructure/models/collaborator.model';
import ResourceModel from '@/resource/infrastructure/models/resource.model';
import EnvironmentResourceModel from './infrastructure/models/environment.resource.model';
import EnvironmentCollaboratorModel from './infrastructure/models/environment.collaborator.model';
import { AddVariableController } from './infrastructure/api/add-variable/add-variable.controller';
import { AddVariableUseCase } from './application/add-variable-use-case/add-variable-use-case';

@Module({
  imports: [
    WorkspaceModule,
    UserModule,
    SequelizeModule.forFeature([
      EnvironmentModel,
      CollaboratorModel,
      ResourceModel,
      EnvironmentVariableModel,
      EnvironmentResourceModel,
      EnvironmentCollaboratorModel,
    ]),
  ],
  controllers: [CreateEnvironmentUserController, AddVariableController],
  providers: [
    AddVariableUseCase,
    CreateEnvironmentUserUseCase,
    RelationalEnvironmentRepository,
    {
      provide: EnvironmentRepository,
      useExisting: RelationalEnvironmentRepository,
    },
  ],
  exports: [CreateEnvironmentUserUseCase],
})
export class EnvironmentModule {}
