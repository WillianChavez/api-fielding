import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateHttpRequesHttpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  order: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  parentResourceId: string;
}
