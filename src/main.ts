import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips non-whitelisted properties
    transform: true, // automatically transform payloads to be objects typed according to their DTO classes
    forbidNonWhitelisted: true, // throw an error if non-whitelisted values are provided
    // You can add more options as needed
  }));

  await app.listen(3000);
}
bootstrap();
