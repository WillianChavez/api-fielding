import { ResourceTypeName } from '@/resource/domain/entities/resource-type.entity';

export interface ListResourcesDto {
  workspaceId: string;
  typesResources: ResourceTypeName[];
}
