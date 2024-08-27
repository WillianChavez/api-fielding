import { v4 as uuidv4 } from 'uuid';

export type RequestableType = 'http-request' | 'websocket-request';

export interface PrimitiveRequest<T extends RequestableType> {
  resourceId: string;
  requestableId: string;
  requestableType: T;
  id: string;
}

export interface CreateRequest<T extends RequestableType>
  extends Omit<PrimitiveRequest<T>, 'id'> {
  id?: string;
}

export class Request<T extends RequestableType> {
  constructor(private attributes: PrimitiveRequest<T>) {}

  static create<T extends RequestableType>({
    id = uuidv4(),
    resourceId,
    requestableId,
    requestableType,
  }: CreateRequest<T>): Request<T> {
    return new Request<T>({
      id,
      resourceId,
      requestableId,
      requestableType,
    });
  }

  toValue(): PrimitiveRequest<T> {
    return this.attributes;
  }

  get id(): string {
    return this.attributes.id;
  }
}
