import { CollaboratorRepository } from 'src/workspace/domain/repositories/collaborator.repository';
import { Injectable } from 'src/shared/dependencies/injectable';
import { InjectModel } from '@nestjs/sequelize';
import { Member } from '@/workspace/domain/entities/member.entity';
import { MemberMapper } from '../mappers/member.mapper';
import { Op } from 'sequelize';
import { User } from 'src/workspace/domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import CollaboratorModel from '../models/collaborator.model';
import RoleModel from '../models/role.model';
import UserModel from '@/user/infrastructure/models/user.model';
import WorkspaceModel from '../models/workspace.model';

@Injectable()
export class RelationalCollaboratorRepository extends CollaboratorRepository {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly memberMapper: MemberMapper,
    @InjectModel(CollaboratorModel)
    private readonly collaboratorModel: typeof CollaboratorModel,
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {
    super();
  }
  async findAllByUser(user: string, name?: string): Promise<User[]> {
    let filter = {};

    if (name) filter = { name: { [Op.iLike]: `%${name}%` } };

    const usersWorkspace = await this.collaboratorModel.findAll({
      subQuery: false,
      include: [
        {
          model: WorkspaceModel,
          required: true,
          include: [
            {
              model: this.collaboratorModel,
              where: { user_id: user },
              attributes: [],
            },
          ],
        },
      ],
      attributes: ['user_id'],
    });

    const usersCollaborators = await this.userModel.findAll({
      where: {
        id: {
          [Op.ne]: user,
          [Op.in]: usersWorkspace.map((user) => user.user_id),
        },
        ...filter,
      },
      attributes: ['id', 'name', 'email'],
    });

    return usersCollaborators.map((collaborator) =>
      this.userMapper.toDomain(collaborator),
    );
  }

  async findExistUserByIds(ids: string[]): Promise<string[]> {
    const users = await this.userModel.findAll({
      where: {
        id: ids,
      },
      attributes: ['id'],
    });
    return ids.filter((id) => !users.find((user) => user.id === id));
  }

  async updateRole(options: {
    user: string;
    role: string;
    workspace: string;
  }): Promise<Member | null> {
    const { user, role, workspace } = options;

    const member = await this.collaboratorModel.findOne({
      include: [UserModel, RoleModel],
      where: {
        user_id: user,
        workspace_id: workspace,
      },
    });

    if (!member) return null;

    await member.update({ role_id: role });

    await member.reload();

    return this.memberMapper.toDomain(member);
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);

    if (!user) return null;

    return this.userMapper.toDomain(user);
  }

  async deleteMember(options: {
    workspace: string;
    user: string;
  }): Promise<boolean> {
    const { workspace, user } = options;

    const member = await this.collaboratorModel.findOne({
      where: {
        user_id: user,
        workspace_id: workspace,
      },
    });

    if (!member) return false;

    await member.destroy();

    return true;
  }
}
