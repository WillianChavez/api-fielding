import { Module } from '@nestjs/common';
import { CreateWorkspaceController } from './infrastructure/api/create-workspace/create-workspace.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import WorkspaceModel from './infrastructure/models/workspace.model';
import RolePermissionModel from './infrastructure/models/role.permission.model';
import RoleModel from './infrastructure/models/role.model';
import PermissionModel from './infrastructure/models/permission.model';
import CollaboratorModel from './infrastructure/models/collaborator.model';
import { RelationalWorkspaceRepository } from './infrastructure/respositories/relational.workspace.repository';
import { WorkspaceRepository } from './domain/repositories/workspace.repository';
import { CreateWorkspaceUseCase } from './application/create-workspace-use-case/create-workspace-use-case';
import { WorkspaceMapper } from './infrastructure/mappers/workspace.mapper';
import { RoleRepository } from './domain/repositories/role.repository';
import { RelationalRoleRepository } from './infrastructure/respositories/relational.role.repository';
import { CollaboratorMapper } from './infrastructure/mappers/collaborator.mapper';
import { UserMapper } from './infrastructure/mappers/user.mapper';
import { CollaboratorRepository } from './domain/repositories/collaborator.repository';
import { RelationalCollaboratorRepository } from './infrastructure/respositories/relational.collaborator.repository';
import { ListCollaboratorController } from './infrastructure/api/list-collaborator/list-collaborator.controller';
import { ListCollaboratorUseCase } from './application/list-collaborator-use-case/list-collaborator-use-case';

@Module({
  controllers: [CreateWorkspaceController, ListCollaboratorController],
  imports: [
    SequelizeModule.forFeature([
      WorkspaceModel,
      RolePermissionModel,
      RoleModel,
      PermissionModel,
      CollaboratorModel,
    ]),
  ],
  providers: [
    CreateWorkspaceUseCase,
    ListCollaboratorUseCase,
    RelationalWorkspaceRepository,
    RelationalRoleRepository,
    RelationalCollaboratorRepository,
    WorkspaceMapper,
    CollaboratorMapper,
    UserMapper,
    {
      provide: WorkspaceRepository,
      useExisting: RelationalWorkspaceRepository,
    },
    {
      provide: RoleRepository,
      useExisting: RelationalRoleRepository,
    },
    {
      provide: CollaboratorRepository,
      useExisting: RelationalCollaboratorRepository,
    },
  ],
  exports: [CreateWorkspaceUseCase, ListCollaboratorUseCase],
})
export class WorkspaceModule {}
