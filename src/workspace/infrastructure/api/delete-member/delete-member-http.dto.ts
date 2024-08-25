import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteMemberHttpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  workspace: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  user: string;
}
