import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PROJECT_RESOURCE_ROUTE } from '../../routes';
import { CreateResourceUseCase } from '@/resource/applitacion/create-resource-use-case/create-resource-use-case';
import { CreateProjectHttpDto } from './create-project.http.dto';

@Controller(PROJECT_RESOURCE_ROUTE)
@ApiTags(PROJECT_RESOURCE_ROUTE)
export class CreateProjectController {
  constructor(private readonly createResourceUseCase: CreateResourceUseCase) {}

  @Post()
  async run(@Body() createProjectHttpDto: CreateProjectHttpDto) {
    const { name, workspaceId, order } = createProjectHttpDto;

    const resource = await this.createResourceUseCase.run({
      name,
      order,
      resourceTypeName: 'project',
      workspaceId,
    });

    return resource;
  }
}
