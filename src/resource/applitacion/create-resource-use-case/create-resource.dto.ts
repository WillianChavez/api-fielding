import { ResourceTypeName } from '@/resource/domain/entities/resource-type.entity';

export interface CreateResourceDto {
  order: number;
  name: string;
  resourceTypeName: ResourceTypeName;
  description?: string;
  parentResourceId?: number;
  workspaceId: number;
}
