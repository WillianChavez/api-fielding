import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateRolCollaboratorParamHttpDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  workspace: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  user: string;
}

export class UpdateRolCollaboratorBodyHttpDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  role: string;
}
