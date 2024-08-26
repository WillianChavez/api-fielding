import { Injectable } from '@shared-dependencies';
import { ResourceRepository } from 'src/resource/domain/respositories/resource.repository';
import { CreateResourceDto } from './create-resource.dto';
import {
  PrimitiveResource,
  Resource,
} from 'src/resource/domain/entities/resource.entity';
import { ResourceTypeNoExistException } from 'src/resource/domain/exceptions/resource-type-no-exist.exception';

@Injectable()
export class CreateResourceUseCase {
  constructor(private resourceRepository: ResourceRepository) {}

  async run(createResourceDto: CreateResourceDto): Promise<PrimitiveResource> {
    const { resourceTypeId, name, order, description, parentResourceId } =
      createResourceDto;

    const resourceType =
      await this.resourceRepository.findResourceTypeById(resourceTypeId);

    if (!resourceType) throw new ResourceTypeNoExistException(resourceTypeId);

    const resource: Resource = Resource.create({
      name,
      order,
      description,
      resourceType: resourceType.toValue(),
      parentResourceId,
    });

    const resourceSaved: Resource =
      await this.resourceRepository.create(resource);

    return resourceSaved.toValue();
  }
}
