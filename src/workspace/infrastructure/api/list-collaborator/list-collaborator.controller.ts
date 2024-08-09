import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListCollaboratorUseCase } from 'src/workspace/application/list-collaborator-use-case/list-collaborator-use-case';
import { COLLABORATOR_ROUTE } from 'src/workspace/routes/workspace.route';
import { ListCollaboratorHttpDto } from './list-collaborator-http.dto';
import { PrimitiveUser } from 'src/workspace/domain/entities/user.entity';

@Controller(COLLABORATOR_ROUTE)
@ApiTags(COLLABORATOR_ROUTE)
export class ListCollaboratorController {
  constructor(
    private readonly listCollaboratorUseCase: ListCollaboratorUseCase,
  ) {}

  @Get()
  async listCollaborator(
    @Query() listCollaboratorHttpDto: ListCollaboratorHttpDto,
  ): Promise<PrimitiveUser[]> {
    try {
      return await this.listCollaboratorUseCase.run(listCollaboratorHttpDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
