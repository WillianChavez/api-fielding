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

@Module({
  controllers: [CreateWorkspaceController],
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
    RelationalWorkspaceRepository,
    RelationalRoleRepository,
    WorkspaceMapper,
    {
      provide: WorkspaceRepository,
      useExisting: RelationalWorkspaceRepository,
    },
    {
      provide: RoleRepository,
      useExisting: RelationalRoleRepository,
    },
  ],
  exports: [CreateWorkspaceUseCase],
})
export class WorkspaceModule {}
