import { HttpRequest } from '../entities/http-request/http-request.entity';
import { Method } from '../entities/http-request/method.entity';

export abstract class RequestHttpRepository {
  abstract create(httpRequest: HttpRequest): Promise<HttpRequest>;
  abstract findMethodById(id: string): Promise<Method | null>;
  abstract findMethodByName(name: string): Promise<Method | null>;
}
