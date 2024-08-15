export interface PrimitiveRequest {
  id: string;
  resource_id: string;
  requestable_id: string;
  requestable_type: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class Request {
  constructor(private attributes: PrimitiveRequest) {}

  static create(attributes: PrimitiveRequest): Request {
    return new Request(attributes);
  }

  toValue(): PrimitiveRequest {
    return this.attributes;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.attributes.updated_at = updatedAt;
  }

  setDeletedAt(deletedAt: Date): void {
    this.attributes.deleted_at = deletedAt;
  }

  get id(): string {
    return this.attributes.id;
  }
}
