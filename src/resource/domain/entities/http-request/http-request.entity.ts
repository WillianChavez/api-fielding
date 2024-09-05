import { v4 as uuidv4 } from 'uuid';

export interface CreateHttpRequest {
  id?: string;
  url?: string;
  methodId: string;
}

export interface PrimitiveHttpRequest extends CreateHttpRequest {
  id: string;
}

export class HttpRequest {
  constructor(private attributes: PrimitiveHttpRequest) {}

  static create({
    id = uuidv4(),
    url,
    methodId,
  }: CreateHttpRequest): HttpRequest {
    return new HttpRequest({
      id,
      url,
      methodId,
    });
  }

  toValue(): PrimitiveHttpRequest {
    return this.attributes;
  }
}
