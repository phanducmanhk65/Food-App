/* eslint-disable prettier/prettier */
import { Module, MiddlewareConsumer , NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './typeorm/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DishModule } from './dish/dish.module';
import { ProductLineModule } from './product-line/product-line.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { DeliverInfoModule } from './deliver-info/deliver-info.module';
import { ConfigModule } from '@nestjs/config';
import { EventGateway } from './event.gateway';
import { LoginMiddleware } from './middleware/login.middleware';
import { JwtModule } from '@nestjs/jwt';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports:[  
    JwtModule.register({
    secret: 'user123', // Replace 'your_secret_key' with your actual secret key
    signOptions: { expiresIn: '5h' }, // Example: Token expires in 1 hour
  }),

  ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DATABASEHOST,
    port: parseInt(process.env.PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    entities,
    synchronize: true,
  }), RestaurantModule, DishModule, ProductLineModule, UserModule, OrderModule, OrderDetailModule, DeliverInfoModule, VoucherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('/order')
  }

}
