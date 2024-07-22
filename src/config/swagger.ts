import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface SwaggerOptions {
  title: string;
  description: string;
  version: string;
  tag: string;
  path: string;
}
export function swaggerInit(app: NestApplication, options?: SwaggerOptions) {
  const config = new DocumentBuilder()
    .setTitle(options?.title || 'API')
    .setDescription(options?.description || 'API description')
    .setVersion(options?.version || '1.0')
    .addTag(options?.tag || 'API')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(options?.path || 'api', app, document);
}
