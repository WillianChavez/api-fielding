import {
  Body,
  Controller,
  ParseFilePipeBuilder,
  Put,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { USER_ROUTE } from '../../routes/user.route';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EditUserHttpDto } from './edit-user-http.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageFilter } from '@/shared/storage/config/storage.filter';
import { DeleteFileOnErrorFilter } from '@/shared/storage/filters/delete-file-on-error.filter';

@Controller(USER_ROUTE)
@ApiTags(USER_ROUTE)
export class EditUserController {
  constructor() {}

  @UseFilters(DeleteFileOnErrorFilter)
  @UseInterceptors(
    FileInterceptor('avatar', { fileFilter: StorageFilter.filterImage() }),
  )
  @Put('edit/me')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async run(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 2097152 }) //2MB
        .build(),
    )
    avatar: Express.Multer.File,
    @Body() editUserHttpDto: EditUserHttpDto,
  ) {
    console.log(avatar);
    console.log(editUserHttpDto);
  }
}
