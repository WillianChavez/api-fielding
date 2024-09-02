import { Injectable } from '@shared-dependencies';
import { ResourceRepository } from 'src/resource/domain/respositories/resource.repository';
import { CreateResourceDto } from './create-resource.dto';
import {
  PrimitiveResource,
  Resource,
} from 'src/resource/domain/entities/resource.entity';

@Injectable()
export class CreateResourceUseCase {
  constructor(private resourceRepository: ResourceRepository) {}

  async run(createResourceDto: CreateResourceDto): Promise<PrimitiveResource> {
    const {
      resourceTypeName,
      name,
      order,
      description,
      parentResourceId,
      workspaceId,
    } = createResourceDto;

    const resourceType =
      await this.resourceRepository.findResourceTypeByName(resourceTypeName);

    const resource: Resource = Resource.create({
      name,
      order,
      description,
      resourceType: resourceType.toValue(),
      parentResourceId,
      workspaceId,
    });

    const resourceSaved: Resource =
      await this.resourceRepository.create(resource);

    return resourceSaved.toValue();
  }
}
