import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LinkWorkspaceHttpDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  workspace: string;
}

export class LinkWorkspaceQueryHttpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '/invited/{token}' })
  uri: string;
}
