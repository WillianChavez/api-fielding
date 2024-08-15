export interface PrimitiveResourceType {
  id: number;
  name: string;
}

export class ResourceType {
  constructor(private attributes: PrimitiveResourceType) {}

  static create(attributes: PrimitiveResourceType): ResourceType {
    return new ResourceType(attributes);
  }

  toValue(): PrimitiveResourceType {
    return this.attributes;
  }
}
