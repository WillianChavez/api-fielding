import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RESOURCE_ROUTE } from '../../routes';
import { CreateHttpRequestUseCase } from '@/resource/applitacion/create-http-request-use-case/create-http-request-use-case';
import { CreateHttpRequestDto } from './create-http-request.dto';
import { CreateResourceUseCase } from '@/resource/applitacion/create-resource-use-case/create-resource-use-case';

@Controller(RESOURCE_ROUTE)
@ApiTags(RESOURCE_ROUTE)
export class CreateHttpRequestController {
  constructor(
    private readonly createHttpRequestUseCase: CreateHttpRequestUseCase,
    private readonly createResourceUseCase: CreateResourceUseCase,
  ) {}

  @Post()
  async run(@Body() createHttpRequestDto: CreateHttpRequestDto) {
    try {
      const resource = await this.createResourceUseCase.run({
        name: createHttpRequestDto.name,
        order: createHttpRequestDto.order,
        resourceTypeId: createHttpRequestDto.resourceTypeId,
      });

      return this.createHttpRequestUseCase.run({
        methodId: createHttpRequestDto.methodId,
        url: createHttpRequestDto.url,
        resourceId: resource.id,
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
