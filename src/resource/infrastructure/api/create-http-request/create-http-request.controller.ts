import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HTTP_REQUEST_ROUTE, RESOURCE_ROUTE } from '../../routes';
import { CreateHttpRequestUseCase } from '@/resource/applitacion/create-http-request-use-case/create-http-request-use-case';
import { CreateHttpRequesHttpDto } from './create-http-request.dto';
import { CreateResourceUseCase } from '@/resource/applitacion/create-resource-use-case/create-resource-use-case';

@Controller(HTTP_REQUEST_ROUTE)
@ApiTags(RESOURCE_ROUTE)
export class CreateHttpRequestController {
  constructor(
    private readonly createHttpRequestUseCase: CreateHttpRequestUseCase,
    private readonly createResourceUseCase: CreateResourceUseCase,
  ) {}

  @Post()
  async run(@Body() createHttpRequestHttpDto: CreateHttpRequesHttpDto) {
    try {
      const resource = await this.createResourceUseCase.run({
        name: createHttpRequestHttpDto.name,
        order: createHttpRequestHttpDto.order,
        resourceTypeName: 'request',
        workspaceId: createHttpRequestHttpDto.workspaceId,
      });

      return this.createHttpRequestUseCase.run({
        url: createHttpRequestHttpDto.url,
        resourceId: resource.id,
      });
    } catch (error) {
      console.log(error);
      return new BadRequestException(error.message);
    }
  }
}
