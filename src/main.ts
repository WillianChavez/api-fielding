/* eslint-disable prettier/prettier */
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerInit } from './config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  swaggerInit(app);

  const port = configService.get<number>('port', 3000);
  const url = configService.get<string>('url', 'http://localhost');

  await app.listen(port);
  console.log(`Application is running on: ${url}`);
}
bootstrap();
