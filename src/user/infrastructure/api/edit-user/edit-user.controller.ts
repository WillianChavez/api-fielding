import {
  Body,
  Controller,
  ParseFilePipeBuilder,
  Put,
  Request,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { USER_ROUTE } from '../../routes/user.route';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EditUserHttpDto } from './edit-user-http.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageFilter } from '@/shared/storage/config/storage.filter';
import { DeleteFileOnErrorFilter } from '@/shared/storage/filters/delete-file-on-error.filter';
import { AuthGuard } from '@nestjs/passport';
import { EditUserUseCase } from '@/user/application/edit-user-use-case/edit-user-use-case';
import {
  EditUserHttpResourceJson,
  EditUserResource,
} from './edit-user.resource';
import { StorageService } from '@/shared/storage/domain/services/storage.service';

@Controller(USER_ROUTE)
@ApiTags(USER_ROUTE)
export class EditUserController {
  constructor(
    private readonly editUserUseCase: EditUserUseCase,
    private readonly editUserResource: EditUserResource,
    private readonly storageService: StorageService<Buffer>,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @UseFilters(DeleteFileOnErrorFilter)
  @UseInterceptors(
    FileInterceptor('avatar', { fileFilter: StorageFilter.filterImage() }),
  )
  @Put('edit/me')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
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
    @Request() request,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 2097152 }) //2MB
        .build(),
    )
    avatar: Express.Multer.File,
    @Body() editUserHttpDto: EditUserHttpDto,
  ): Promise<EditUserHttpResourceJson> {
    const { id, urlPhoto } = request.user;

    if (urlPhoto && avatar)
      await this.storageService.delete(`./uploads/${urlPhoto}`);

    const { user } = await this.editUserUseCase.run({
      id,
      urlPhoto: avatar?.filename,
      ...editUserHttpDto,
    });

    return this.editUserResource.toJson(user);
  }
}
