import { v4 as uuidv4 } from 'uuid';
import { PrimitiveResourceType } from './resource-type.entity';

export interface PrimitiveResource {
  id: string;
  resourceType: PrimitiveResourceType;
  order: number;
  name: string;
  description?: string;
  parentResourceId?: number;
  resources?: Resource[];
}

export interface CreateResource extends Omit<PrimitiveResource, 'id'> {}

export class Resource {
  constructor(private attributes: PrimitiveResource) {}

  static create(createResource: CreateResource): Resource {
    return new Resource({
      id: uuidv4(),
      ...createResource,
    });
  }

  toValue(): PrimitiveResource {
    return this.attributes;
  }
}
