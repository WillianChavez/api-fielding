import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/workspace/domain/entities/user.entity';
import { CollaboratorRepository } from 'src/workspace/domain/repositories/collaborator.repository';
import CollaboratorModel from '../models/collaborator.model';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from 'src/shared/dependencies/injectable';
import { Op } from 'sequelize';
import WorkspaceModel from '../models/workspace.model';
import UserModel from 'src/auth/infrastructure/models/user.model';

@Injectable()
export class RelationalCollaboratorRepository extends CollaboratorRepository {
  constructor(
    private readonly userMapper: UserMapper,
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
}
