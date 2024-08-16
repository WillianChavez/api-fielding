import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ListCollaboratorQueryHttpDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}

export class ListCollaboratorParamHttpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  user: string;
}
