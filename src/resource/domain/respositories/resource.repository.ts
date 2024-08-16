import { ResourceType } from '../entities/resource-type.entity';
import { Resource } from '../entities/resource.entity';
import { Request } from '../entities/request.entity';

export abstract class ResourceRepository {
  abstract create(resource: Resource): Promise<Resource>;
  abstract findResourceTypeById(id: string): Promise<ResourceType | null>;
  abstract findById(id: string): Promise<Resource | null>;
  abstract createRequest(request: Request): Promise<Request>;
}
