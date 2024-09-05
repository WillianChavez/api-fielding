import { v4 as uuidv4 } from 'uuid';
import { PrimitiveResourceType } from './resource-type.entity';

export interface CreateResource {
  id?: string;
  resourceType: PrimitiveResourceType;
  order: number;
  name: string;
  description?: string;
  parentResourceId?: string;
  resources?: Resource[];
  workspaceId: string;
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
    workspaceId,
  }: CreateResource): Resource {
    return new Resource({
      id,
      resourceType,
      order,
      name,
      description,
      parentResourceId,
      resources,
      workspaceId,
    });
  }

  toValue(): PrimitiveResource {
    return this.attributes;
  }
}
