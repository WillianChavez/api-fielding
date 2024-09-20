import { CollaboratorMapper } from './infrastructure/mappers/collaborator.mapper';
import { CollaboratorRepository } from './domain/repositories/collaborator.repository';
import { CreateWorkspaceController } from './infrastructure/api/create-workspace/create-workspace.controller';
import { CreateWorkspaceResource } from './infrastructure/api/create-workspace/create-workspace.resource';
import { CreateWorkspaceUseCase } from './application/create-workspace-use-case/create-workspace-use-case';
import { CryptService } from '@/shared/auth/services/crypt.service';
import { DeleteMemberController } from './infrastructure/api/delete-member/delete-member.controller';
import { DeleteMemberUseCase } from './application/delete-member-use-case/delete-member-use-case';
import { LinkWorkspaceController } from './infrastructure/api/link-workspace/link-workspace.controller';
import { LinkWorkspaceUseCase } from './application/link-workspace-use-case/link-workspace-use-case';
import { ListCollaboratorController } from './infrastructure/api/list-collaborator/list-collaborator.controller';
import { ListCollaboratorUseCase } from './application/list-collaborator-use-case/list-collaborator-use-case';
import { ListRolCollaboratorController } from './infrastructure/api/list-rol-collaborator/list-rol-collaborator.controller';
import { ListWorkspaceController } from './infrastructure/api/list-workspace/list-workspace.controller';
import { ListWorkspaceResource } from './infrastructure/api/list-workspace/list-workspace.resource';
import { ListWorkspaceUseCase } from './application/list-workspace-use-case/list-workspace-use-case';
import { MemberMapper } from './infrastructure/mappers/member.mapper';
import { Module } from '@nestjs/common';
import { RelationalCollaboratorRepository } from './infrastructure/respositories/relational.collaborator.repository';
import { RelationalRoleRepository } from './infrastructure/respositories/relational.role.repository';
import { RelationalWorkspaceRepository } from './infrastructure/respositories/relational.workspace.repository';
import { RoleRepository } from './domain/repositories/role.repository';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedRol } from './infrastructure/seeders/rol.seed';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from './domain/services/token.service';
import { UpdateRolMemberController } from './infrastructure/api/update-rol-member/update-rol-member.controller';
import { UpdateRolMemberResource } from './infrastructure/api/update-rol-member/update-rol-member.resource';
import { UpdateRolMemberUseCase } from './application/update-rol-member-use-case/update-rol-member-use-case';
import { UserMapper } from './infrastructure/mappers/user.mapper';
import { WorkspaceMapper } from './infrastructure/mappers/workspace.mapper';
import { WorkspaceRepository } from './domain/repositories/workspace.repository';
import CollaboratorModel from './infrastructure/models/collaborator.model';
import PermissionModel from './infrastructure/models/permission.model';
import RoleModel from './infrastructure/models/role.model';
import RolePermissionModel from './infrastructure/models/role.permission.model';
import UserModel from '@/user/infrastructure/models/user.model';
import WorkspaceModel from './infrastructure/models/workspace.model';
import { ListRoleCollaboratorUseCase } from './application/list-role-collaborator-use-case/list-role-collaborator-use-case';
@Module({
  controllers: [
    CreateWorkspaceController,
    LinkWorkspaceController,
    ListRolCollaboratorController,
    ListCollaboratorController,
    ListWorkspaceController,
    UpdateRolMemberController,
    DeleteMemberController,
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
    CryptService,
    DeleteMemberUseCase,
    LinkWorkspaceUseCase,
    ListCollaboratorUseCase,
    ListRoleCollaboratorUseCase,
    ListWorkspaceResource,
    ListWorkspaceUseCase,
    MemberMapper,
    RelationalCollaboratorRepository,
    RelationalRoleRepository,
    RelationalWorkspaceRepository,
    UpdateRolMemberResource,
    UpdateRolMemberUseCase,
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
    {
      provide: TokenService,
      useClass: CryptService,
    },
  ],
  exports: [
    CreateWorkspaceUseCase,
    ListCollaboratorUseCase,
    DeleteMemberUseCase,
    WorkspaceRepository,
  ],
})
export class WorkspaceModule {}
