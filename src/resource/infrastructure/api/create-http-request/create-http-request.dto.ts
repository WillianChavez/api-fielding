import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateHttpRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  methodId: string;

  @ApiProperty()
  @IsString()
  url?: string;

  @ApiProperty()
  @IsInt()
  order: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  resourceTypeId: string;
}
