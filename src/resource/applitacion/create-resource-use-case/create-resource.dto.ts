export interface CreateResourceDto {
  order: number;
  name: string;
  resourceTypeId: string;
  description?: string;
  parentResourceId?: number;
}
