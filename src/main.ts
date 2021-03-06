import { NestFactory } from '@nestjs/core';
import AppModule from './app/app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  app.use(morgan('tiny'));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
