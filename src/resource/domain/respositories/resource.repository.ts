import {
  ResourceType,
  ResourceTypeName,
} from '../entities/resource-type.entity';
import { Resource } from '../entities/resource.entity';
import { Request, RequestableType } from '../entities/request.entity';

export abstract class ResourceRepository {
  abstract create(resource: Resource): Promise<Resource>;
  abstract findResourceTypeById(id: string): Promise<ResourceType | null>;
  abstract findResourceTypeByName(
    name: ResourceTypeName,
  ): Promise<ResourceType | null>;
  abstract findById(id: string): Promise<Resource | null>;
  abstract createRequest<T extends RequestableType>(
    request: Request<T>,
  ): Promise<Request<T>>;
}
