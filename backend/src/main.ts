import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';



async function bootstrap() {
  dotenv.config();
  console.log('DATABASEHOST:', process.env.DATABASEHOST);
  console.log('PORT:', process.env.PORT);
  console.log('USER:', process.env.USER);
  console.log('PASSWORD:', process.env.PASSWORD);
  const corsOptions = {
    origin: ['http://localhost:3001/', 'https://tuanbc-sotatek-frontend.vercel.app/'], // The allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // The allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // The allowed request headers
    credentials: true, 
    websockets: true,
   // Enable sending cookies and authorization headers with requests
  };
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  app.useWebSocketAdapter(new IoAdapter(app))
  await app.listen(3000);
}
bootstrap();