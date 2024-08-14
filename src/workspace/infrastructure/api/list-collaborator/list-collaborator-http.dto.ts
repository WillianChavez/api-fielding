import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ListCollaboratorHttpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
