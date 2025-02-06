// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads into DTO instances
    whitelist: true, // Strip properties not in the DTO
    forbidNonWhitelisted: true, // Throw error if there are any extra properties
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
