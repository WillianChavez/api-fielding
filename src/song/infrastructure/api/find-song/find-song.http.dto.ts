import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindSongHttpDto {
  @IsUUID('all')
  @ApiProperty()
  id: string;
}
