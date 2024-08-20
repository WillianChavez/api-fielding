import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ListWorkspaceHttpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  user: string;
}
