import { HttpRequest } from '../entities/http-request/http-request.entity';
import { Method } from '../entities/http-request/method.entity';
import { Resource } from '../entities/resource.entity';

export abstract class HttpRequestRepository {
  abstract create(httpRequest: HttpRequest): Promise<HttpRequest>;
  abstract findMethodById(id: string): Promise<Method | null>;
  abstract findMethodByName(name: string): Promise<Method | null>;
  abstract findResourceById(id: string): Promise<Resource | null>;
}
