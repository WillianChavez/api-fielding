export type ResourceTypeName = 'request' | 'folder' | 'project' | 'environment';
export interface PrimitiveResourceType {
  id: string;
  name: ResourceTypeName;
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
