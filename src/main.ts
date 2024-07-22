import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerInit } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  swaggerInit(app);
  await app.listen(3000);
}
bootstrap();
