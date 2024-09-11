import { IsNotEmpty, IsString } from 'class-validator';

export class ActiveUserSocketDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  urlPhoto: string;

  @IsString()
  @IsNotEmpty()
  workspaceId: string;
}
