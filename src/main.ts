import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //Setup Swagger
  const options = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Create, Update, Get, Delete task APIs')
    .setVersion('1.0')
    // .addTag('task-mgmt')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  const port = 8000;
  await app.listen(port);

  logger.log(`Application listening on ${port}`);
}
bootstrap();
