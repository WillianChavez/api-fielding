import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class VariableItem {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  initialValue: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currentValue: string;
}
export class AddVariableHttpDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  environmentId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        initialValue: {
          type: 'string',
        },
        currentValue: {
          type: 'string',
        },
        active: {
          type: 'boolean',
        },
      },
    },
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => VariableItem)
  variables: VariableItem[];
}
