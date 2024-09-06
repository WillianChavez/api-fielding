import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ListProjectResourcesHttpDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  workspaceId: string;
}
