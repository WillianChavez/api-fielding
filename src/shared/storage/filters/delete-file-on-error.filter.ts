import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { StorageService } from '../domain/services/storage.service';
import { Request, Response } from 'express';

@Catch(HttpException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  constructor(private readonly storageService: StorageService<Buffer>) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const getFiles = (files?: Express.Multer.File[]): Express.Multer.File[] => {
      if (!files) return [];
      return Array.isArray(files) ? files : Object.values(files);
    };
    const files = getFiles(request.files as Express.Multer.File[]);

    files.forEach(async (file) => {
      await this.storageService.delete(file.path);
    });

    if (request.file) this.storageService.delete(request.file.path);

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
