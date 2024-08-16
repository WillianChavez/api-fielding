import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class CollaboratorItem {
  @IsUUID()
  id: string;
  @IsUUID()
  role: string;
}
export class CreateWorkspaceHttpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name!: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
      },
    },
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CollaboratorItem)
  @ArrayUnique((item) => item.id)
  @ArrayUnique((item) => item.role)
  collaborators!: CollaboratorItem[];
}
