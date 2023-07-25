import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';

@Module({
  providers: [OrderDetailService],
  controllers: [OrderDetailController]
})
export class OrderDetailModule {}
