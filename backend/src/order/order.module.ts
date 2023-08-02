import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { OrderDetail } from '../order-detail/entities/order-detail.entity';
import { OrderGateway } from './order.gateway';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { DeliverInfoService } from '../deliver-info/deliver-info.service';
@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderDetail, User]),],
  controllers: [OrderController],
  providers: [OrderService, UserService, OrderDetailService,DeliverInfoService, OrderGateway ]
})
export class OrderModule {}
