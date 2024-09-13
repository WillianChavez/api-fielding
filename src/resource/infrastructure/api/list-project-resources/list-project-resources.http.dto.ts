import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ListProjectResourcesHttpDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  workspaceId: string;
}
