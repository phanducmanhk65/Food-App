import { Module } from '@nestjs/common';
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
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Manh2812002",
    database: "foodapp",
    entities,
    synchronize: true,
  }), RestaurantModule, DishModule, ProductLineModule, UserModule, OrderModule, OrderDetailModule, DeliverInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
