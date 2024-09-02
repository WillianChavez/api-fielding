import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateHttpRequesHttpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  order: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  workspaceId: number;

  @ApiProperty({ required: false })
  @IsString()
  url?: string;

  @ApiProperty({ required: false })
  @IsString()
  parentResourceId?: number;
}
