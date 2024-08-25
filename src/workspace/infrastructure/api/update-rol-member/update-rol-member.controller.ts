import { COLLABORATOR_ROUTE, WORKSPACE_ROUTE } from '@/workspace/routes';
import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { UpdateRolMemberUseCase } from '@/workspace/application/update-rol-member-use-case/update-rol-member-use-case';
import { ApiTags } from '@nestjs/swagger';
import { RoleNoExistException } from '@/workspace/domain/exceptions/role-no.exist.exception';
import { UserNoExistException } from '@/workspace/domain/exceptions/user-no.exist.exception';
import {
  UpdateRolCollaboratorBodyHttpDto,
  UpdateRolCollaboratorParamHttpDto,
} from './update-rol-member-http.dto';
import {
  UpdateRolMemberResource,
  UpdateRolMemberResourceJson,
} from './update-rol-member.resource';

@Controller(COLLABORATOR_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class UpdateRolMemberController {
  constructor(
    private readonly updateRolMemberResource: UpdateRolMemberResource,
    private readonly updateRolMemberUseCase: UpdateRolMemberUseCase,
  ) {}

  @Put(':workspace/:user')
  async run(
    @Param()
    updateRoleCollaboratorHttpParamDto: UpdateRolCollaboratorParamHttpDto,
    @Body() updateRoleCollaboratorHttpBodyDto: UpdateRolCollaboratorBodyHttpDto,
  ): Promise<UpdateRolMemberResourceJson> {
    try {
      const { collaborator } = await this.updateRolMemberUseCase.run({
        ...updateRoleCollaboratorHttpParamDto,
        ...updateRoleCollaboratorHttpBodyDto,
      });
      return this.updateRolMemberResource.toJson(collaborator);
    } catch (error) {
      if (
        error instanceof RoleNoExistException ||
        error instanceof UserNoExistException
      ) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
