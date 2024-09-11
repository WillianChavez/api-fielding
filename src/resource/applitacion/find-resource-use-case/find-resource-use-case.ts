import { PrimitiveResource } from '@/resource/domain/entities';
import { ResourceTypeName } from '@/resource/domain/entities/resource-type.entity';
import { ResourceRepository } from '@/resource/domain/respositories';
import { Injectable } from '@shared-dependencies';

@Injectable()
export class FindResourceUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async run(dto: {
    resourceId?: string;
    resourceTypeNames?: ResourceTypeName[];
  }): Promise<PrimitiveResource> {
    const resource = await this.resourceRepository.findOne({
      id: dto.resourceId,
      resourceTypeNames: dto.resourceTypeNames,
    });

    if (!resource) {
      throw new Error('Resource not found');
    }

    return resource.toValue();
  }
}
