import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 공통적으로 주소창에서 시작되는 문자열 
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
