import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config cookies
  app.use(cookieParser());

  // Enable Cors
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  // Prefix
  app.setGlobalPrefix('/v1/api');

  // Config validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3003);
}
bootstrap();
