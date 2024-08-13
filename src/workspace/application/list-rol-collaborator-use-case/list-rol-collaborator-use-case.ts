import { Injectable } from 'src/shared/dependencies';
import { PrimitiveRole } from '../../domain/entities/role.entity';
import { RoleRepository } from '../../domain/repositories/role.repository';

@Injectable()
export class ListRolCollaboratorUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async run(): Promise<PrimitiveRole[]> {
    const response = await this.roleRepository.findAll();
    const roles = response.map((role) => role.toValue());
    return roles;
  }
}
