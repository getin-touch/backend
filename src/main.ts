import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import MainModule from './main.module';
import config from './config';

async function bootstrap() {
  const { port, swagger } = config();
  const app = await NestFactory.create(MainModule, { cors: true });
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(swagger.title)
      .setDescription(swagger.description)
      .setVersion(swagger.version)
      .addTag(swagger.tag)
      .build(),
  );

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  await app.listen(port);
}

bootstrap();
