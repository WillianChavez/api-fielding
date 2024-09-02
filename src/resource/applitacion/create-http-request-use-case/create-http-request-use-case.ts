import { ResourceNoExistException } from 'src/resource/domain/exceptions';

import {
  HttpRequest,
  Method,
  PrimitiveHttpRequest,
  Request,
} from 'src/resource/domain/entities';

import {
  HttpRequestRepository,
  ResourceRepository,
} from 'src/resource/domain/respositories';

import { CreateHttpRequestDto } from './create-http-request.dto';
import { RequestableType } from '@/resource/domain/entities/request.entity';

export class CreateHttpRequestUseCase {
  constructor(
    private httpRequestRepository: HttpRequestRepository,
    private readonly resourceRepository: ResourceRepository,
  ) {}

  async run(dto: CreateHttpRequestDto): Promise<PrimitiveHttpRequest> {
    const { methodId, resourceId, url } = dto;

    let method: Method;
    if (methodId) {
      method = await this.httpRequestRepository.findMethodById(methodId);
    } else {
      method = await this.httpRequestRepository.findMethodByName('GET');
    }

    const resource = await this.resourceRepository.findById(resourceId);
    if (!resource) throw new ResourceNoExistException(resourceId);

    const httpRequest = HttpRequest.create({
      url,
      methodId: method.toValue().id,
    });

    const httpRequestCreated =
      await this.httpRequestRepository.create(httpRequest);

    const { id: httpRequestId } = httpRequestCreated.toValue();

    const requestableType: RequestableType = 'http-request';

    const request = Request.create<typeof requestableType>({
      requestableId: httpRequestId,
      requestableType: requestableType,
      resourceId,
    });

    await this.resourceRepository.createRequest(request);

    return httpRequestCreated.toValue();
  }
}
