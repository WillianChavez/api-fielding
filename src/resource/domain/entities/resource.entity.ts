import { v4 as uuidv4 } from 'uuid';
import { PrimitiveResourceType } from './resource-type.entity';

export interface CreateResource {
  id?: string;
  resourceType: PrimitiveResourceType;
  order: number;
  name: string;
  description?: string;
  parentResourceId?: number;
  resources?: Resource[];
}

export interface PrimitiveResource extends CreateResource {
  id: string;
}
export class Resource {
  constructor(private attributes: PrimitiveResource) {}

  static create({
    id = uuidv4(),
    resourceType,
    order,
    name,
    description,
    parentResourceId,
    resources,
  }: CreateResource): Resource {
    return new Resource({
      id,
      resourceType,
      order,
      name,
      description,
      parentResourceId,
      resources,
    });
  }

  toValue(): PrimitiveResource {
    return this.attributes;
  }
}
