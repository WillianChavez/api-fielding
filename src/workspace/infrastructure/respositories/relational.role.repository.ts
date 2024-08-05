import { RoleRepository } from 'src/workspace/domain/repositories/role.repository';
import RoleModel from '../models/role.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from 'src/shared/dependencies/injectable';

@Injectable()
export class RelationalRoleRepository extends RoleRepository {
  constructor(
    @InjectModel(RoleModel) private readonly roleModel: typeof RoleModel,
  ) {
    super();
  }

  async findExistByIds(ids: string[]): Promise<string[]> {
    if (!ids || ids.length === 0) return [];
    const roles = await this.roleModel.findAll({ where: { id: ids } });
    return ids.filter((roleId) => !roles.find((role) => role.id === roleId));
  }
}
