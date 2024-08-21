import { COLLABORATOR_ROUTE, WORKSPACE_ROUTE } from '@/workspace/routes';
import {
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteMemberHttpDto } from './delete-member-http.dto';
import { DeleteMemberUseCase } from '@/workspace/application/delete-member-use-case/delete-member-use-case';
import { UserNoExistException } from '@/workspace/domain/exceptions/user-no.exist.exception';
import { WorkspaceNoExistException } from '@/workspace/domain/exceptions/workspace-no.exist.exception';

@Controller(COLLABORATOR_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class DeleteMemberController {
  constructor(private readonly deleteMemberUseCase: DeleteMemberUseCase) {}

  @Delete(':workspace/:user')
  async run(@Param() deleteMemberHttpDto: DeleteMemberHttpDto) {
    try {
      await this.deleteMemberUseCase.run(deleteMemberHttpDto);

      return { message: 'User deleted from workspace' };
    } catch (error) {
      if (
        error instanceof UserNoExistException ||
        error instanceof WorkspaceNoExistException
      )
        throw new NotFoundException(error.message);

      throw new InternalServerErrorException(error);
    }
  }
}
