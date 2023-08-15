import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config();
  console.log('DATABASEHOST:', process.env.DATABASEHOST);
  console.log('PORT:', process.env.PORT);
  console.log('USER:', process.env.USER);
  console.log('PASSWORD:', process.env.PASSWORD);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001', // The allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // The allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // The allowed request headers
    credentials: true, // Enable sending cookies and authorization headers with requests
  };

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('FoodApp')
    .setDescription('Sotatek')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
