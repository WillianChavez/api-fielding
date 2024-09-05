import { Resource } from '@/resource/domain/entities';
import { ResourceRepository } from '@/resource/domain/respositories';
import { ListResourcesDto } from './list-resources.dto';

export class ListResourcesUseCase {
  constructor(private resourceRepository: ResourceRepository) {}

  async run(dto: ListResourcesDto): Promise<Resource[]> {
    const { workspaceId, typesResources } = dto;
    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    const resourcesType = await this.resourceRepository.listResourcesType({
      name: typesResources,
    });

    const resourcesTypeIds = resourcesType.map(
      (resourceType) => resourceType.toValue().id,
    );

    const resources: Resource[] = await this.resourceRepository.list({
      workspaceId,
      idTypesResource: resourcesTypeIds,
    });
    return resources;
  }
}
