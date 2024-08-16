import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveHttpRequest {
  id: string;
  url?: string;
  methodId: string;
}

export class HttpRequest {
  constructor(private attributes: PrimitiveHttpRequest) {}

  static create(attributes: { url: string; methodId: string }): HttpRequest {
    return new HttpRequest({
      id: uuidv4(),
      url: attributes.url,
      methodId: attributes.methodId,
    });
  }

  toValue(): PrimitiveHttpRequest {
    return this.attributes;
  }
}
