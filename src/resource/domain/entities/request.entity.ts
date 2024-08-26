import { v4 as uuidv4 } from 'uuid';

export type RequestableType = 'http-request';
export interface createRequest {
  resourceId: string;
  requestableId: string;
  requestableType: RequestableType;
  id?: string;
}

// optional id
export interface PrimitiveRequest extends createRequest {
  id: string;
}

export class Request {
  constructor(private attributes: PrimitiveRequest) {}

  static create({
    id = uuidv4(),
    resourceId,
    requestableId,
    requestableType,
  }: createRequest): Request {
    return new Request({
      id,
      resourceId,
      requestableId,
      requestableType,
    });
  }

  toValue(): PrimitiveRequest {
    return this.attributes;
  }

  get id(): string {
    return this.attributes.id;
  }
}
