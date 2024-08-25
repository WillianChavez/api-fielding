import { Injectable } from 'src/shared/dependencies/injectable';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/workspace/domain/entities/role.entity';
import { RoleRepository } from 'src/workspace/domain/repositories/role.repository';
import RoleModel from '../models/role.model';

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

  async findExistNameByIds(name: string, ids: string[]): Promise<boolean> {
    const roles = await this.roleModel.findAll({
      where: { id: ids, name },
    });

    return roles.length > 0;
  }

  async findAll(): Promise<Role[]> {
    const response = await this.roleModel.findAll();

    const roles = response.map((role) => {
      return Role.create({ name: role.name, id: role.id });
    });

    return roles;
  }

  async findById(id: string): Promise<Role> {
    const role = await this.roleModel.findByPk(id);

    if (!role) return null;

    return new Role({ name: role.name, id: role.id });
  }
}
