import { HttpRequest, Method } from '@/resource/domain/entities';
import { RequestHttpRepository } from '@/resource/domain/respositories';
import HttpRequestModel from '../models/http-request.model';
import { InjectModel } from '@nestjs/sequelize';
import MethodModel from '../models/method.model';
import { Injectable } from '@shared-dependencies';

@Injectable()
export class RelationalRequestHttpRepository extends RequestHttpRepository {
  constructor(
    @InjectModel(HttpRequestModel)
    private readonly httpRequestModel: typeof HttpRequestModel,

    @InjectModel(MethodModel)
    private readonly methodModel: typeof MethodModel,
  ) {
    super();
  }

  async create(httpRequest: HttpRequest): Promise<HttpRequest> {
    const { url, methodId } = httpRequest.toValue();

    const resHttpRequestSaved = await this.httpRequestModel.create({
      url,
      methodId: methodId,
    });

    const newHttpRequest = HttpRequest.create({
      id: resHttpRequestSaved.id,
      url: resHttpRequestSaved.url,
      methodId: resHttpRequestSaved.methodId,
    });

    return newHttpRequest;
  }
  async findMethodById(id: string): Promise<Method | null> {
    const resMethod = await this.methodModel.findOne({
      where: { id },
    });

    if (!resMethod) return null;

    const method = Method.create({
      id: resMethod.id,
      name: resMethod.name,
    });

    return method;
  }
  async findMethodByName(name: string): Promise<Method | null> {
    const resMethod = await this.methodModel.findOne({
      where: { name },
    });

    if (!resMethod) return null;

    const method = Method.create({
      id: resMethod.id,
      name: resMethod.name,
    });

    return method;
  }
}
