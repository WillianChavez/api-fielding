import { ResourceType } from '../entities/resource-type.entity';
import { Resource } from '../entities/resource.entity';

export abstract class ResourceRepository {
  abstract create(resource: Resource): Promise<Resource>;
  abstract findResourceTypeById(id: string): Promise<ResourceType | null>;
}
