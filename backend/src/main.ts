import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';



async function bootstrap() {
  dotenv.config();
  console.log('DATABASEHOST:', process.env.DATABASEHOST);
  console.log('PORT:', process.env.PORT);
  console.log('USER:', process.env.USER);
  console.log('PASSWORD:', process.env.PASSWORD);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FoodApp')
    .setDescription('Sotatek')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
