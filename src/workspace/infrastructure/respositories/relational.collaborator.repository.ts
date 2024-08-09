import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/workspace/domain/entities/user.entity';
import { CollaboratorRepository } from 'src/workspace/domain/repositories/collaborator.repository';
import CollaboratorModel from '../models/collaborator.model';
import RoleModel from '../models/role.model';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from 'src/shared/dependencies/injectable';
import { Op } from 'sequelize';

@Injectable()
export class RelationalCollaboratorRepository extends CollaboratorRepository {
  constructor(
    private readonly userMapper: UserMapper,
    @InjectModel(CollaboratorModel)
    private readonly collaboratorModel: typeof CollaboratorModel,
  ) {
    super();
  }
  async findAllByUser(user: string, name?: string): Promise<User[]> {
    let filter = {};

    if (name) filter = { name: { [Op.iLike]: `%${name}%` } };

    const workspaces = await this.collaboratorModel.findAll({
      where: {
        user_id: user,
      },
      attributes: ['workspace_id'],
    });

    const usersCollaborators = await this.collaboratorModel.findAll({
      where: {
        workspace_id: workspaces.map((workspace) => workspace.workspace_id),
        [Op.not]: {
          user_id: user,
        },
        ...filter,
      },
      include: [RoleModel],
    });

    return usersCollaborators.map((collaborator) =>
      this.userMapper.toDomain(collaborator),
    );
  }
}
