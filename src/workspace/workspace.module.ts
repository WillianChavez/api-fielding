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
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedRol } from './infrastructure/seeders/rol.seed';
import { ListRolCollaboratorController } from './infrastructure/api/list-rol-collaborator/list-rol-collaborator.controller';
import { ListRolCollaboratorUseCase } from './application/list-rol-collaborator-use-case/list-rol-collaborator-use-case';
import UserModel from 'src/auth/infrastructure/models/user.model';
import { CreateWorkspaceResource } from './infrastructure/api/create-workspace/create-workspace.resource';

@Module({
  controllers: [
    CreateWorkspaceController,
    ListRolCollaboratorController,
    ListCollaboratorController,
  ],
  imports: [
    SequelizeModule.forFeature([
      CollaboratorModel,
      PermissionModel,
      RoleModel,
      RolePermissionModel,
      UserModel,
      WorkspaceModel,
    ]),
    SeederModule.forFeature([SeedRol]),
  ],
  providers: [
    CollaboratorMapper,
    CreateWorkspaceResource,
    CreateWorkspaceUseCase,
    ListCollaboratorUseCase,
    ListRolCollaboratorUseCase,
    RelationalCollaboratorRepository,
    RelationalRoleRepository,
    RelationalWorkspaceRepository,
    UserMapper,
    WorkspaceMapper,
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
