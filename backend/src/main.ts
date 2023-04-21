import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:'https://a83f-186-49-44-203.ngrok-free.app',
    
    credentials:true
  });
  await app.listen(3000);
}
bootstrap();
