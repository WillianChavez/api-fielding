import { CollaboratorRepository } from '@/workspace/domain/repositories/collaborator.repository';
import { Injectable, Transactional } from '@/shared/dependencies';
import { PrimitiveMember } from '@/workspace/domain/entities/member.entity';
import { RoleNoExistException } from '@/workspace/domain/exceptions/role-no.exist.exception';
import { RoleRepository } from '@/workspace/domain/repositories/role.repository';
import { UpdateRolCollaboratorDto } from './update-rol-member.dto';
import { UserNoExistException } from '@/workspace/domain/exceptions/user-no.exist.exception';

@Injectable()
export class UpdateRolMemberUseCase {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  @Transactional()
  async run(
    updateRolCollaboratorDto: UpdateRolCollaboratorDto,
  ): Promise<{ collaborator: PrimitiveMember }> {
    const { role, user } = updateRolCollaboratorDto;

    const roleExist = await this.roleRepository.findById(role);

    if (!roleExist) throw new RoleNoExistException(role);

    const collaborator = await this.collaboratorRepository.updateRole(
      updateRolCollaboratorDto,
    );

    if (!collaborator) throw new UserNoExistException(user);

    return { collaborator: collaborator.toValue() };
  }
}
