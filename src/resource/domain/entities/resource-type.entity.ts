export interface PrimitiveResourceType {
  id: string;
  name: string;
}

export class ResourceType {
  constructor(private attributes: PrimitiveResourceType) {}

  static create({ id, name }: PrimitiveResourceType): ResourceType {
    return new ResourceType({ id, name });
  }

  toValue(): PrimitiveResourceType {
    return this.attributes;
  }
}
