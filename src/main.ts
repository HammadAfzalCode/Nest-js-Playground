import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out extra fields not defined in DTO
      forbidNonWhitelisted: true, // Throws an error if unknown fields are sent
      transform: true, // Automatically transforms payloads to DTO instances
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
