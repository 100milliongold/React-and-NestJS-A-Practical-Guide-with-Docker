import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 공통적으로 주소창에서 시작되는 문자열 
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // somewhere in your initialization file
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
  await app.listen(3000);
}
bootstrap();
