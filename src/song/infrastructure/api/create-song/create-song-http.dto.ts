import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongHttpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  artist!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  album!: string;
}
