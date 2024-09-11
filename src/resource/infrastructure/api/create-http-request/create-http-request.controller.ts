import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HTTP_REQUEST_ROUTE, PROJECT_RESOURCE_ROUTE } from '../../routes';
import { CreateHttpRequestUseCase } from '@/resource/applitacion/create-http-request-use-case/create-http-request-use-case';
import { CreateHttpRequesHttpDto } from './create-http-request.dto';
import { CreateResourceUseCase } from '@/resource/applitacion/create-resource-use-case/create-resource-use-case';
import { FindResourceUseCase } from '@/resource/applitacion/find-resource-use-case/find-resource-use-case';

@Controller(HTTP_REQUEST_ROUTE)
@ApiTags(PROJECT_RESOURCE_ROUTE)
export class CreateHttpRequestController {
  constructor(
    private readonly createHttpRequestUseCase: CreateHttpRequestUseCase,
    private readonly createResourceUseCase: CreateResourceUseCase,
    private readonly findResourceUseCase: FindResourceUseCase,
  ) {}

  @Post()
  async run(@Body() createHttpRequestHttpDto: CreateHttpRequesHttpDto) {
    try {
      const parentResource = await this.findResourceUseCase.run({
        resourceId: createHttpRequestHttpDto.parentResourceId,
        resourceTypeNames: ['project', 'folder'],
      });

      const resource = await this.createResourceUseCase.run({
        name: createHttpRequestHttpDto.name,
        order: createHttpRequestHttpDto.order,
        resourceTypeName: 'request',
        workspaceId: parentResource.workspaceId,
        parentResourceId: parentResource.id,
      });

      return this.createHttpRequestUseCase.run({
        url: createHttpRequestHttpDto.url,
        resourceId: resource.id,
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
