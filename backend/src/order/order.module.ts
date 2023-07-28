import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EventGateway } from '../event.gateway';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { OrderDetail } from '../order-detail/entities/order-detail.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderDetail]),],
  controllers: [OrderController],
  providers: [OrderService, EventGateway, OrderDetailService ]
})
export class OrderModule {}
