import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSongHttpDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

  @IsString()
  @IsNotEmpty()
  album!: string;
}
