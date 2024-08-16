import { v4 as uuidv4 } from 'uuid';
export interface PrimitiveRequest {
  id: string;
  resourceId: string;
  requestableId: string;
  requestableType: string;
}

export interface createRequest extends Omit<PrimitiveRequest, 'id'> {}

export class Request {
  constructor(private attributes: PrimitiveRequest) {}

  static create(attributes: createRequest): Request {
    return new Request({
      id: uuidv4(),
      resourceId: attributes.resourceId,
      requestableId: attributes.requestableId,
      requestableType: attributes.requestableType,
    });
  }

  toValue(): PrimitiveRequest {
    return this.attributes;
  }

  get id(): string {
    return this.attributes.id;
  }
}
