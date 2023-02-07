import { NestFactory } from '@nestjs/core';
import { StreamingModule } from './streaming.module';

async function bootstrap() {
  const app = await NestFactory.create(StreamingModule);
  await app.listen(3000);
}
bootstrap();
