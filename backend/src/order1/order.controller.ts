import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Dish } from 'src/dish1/dish.dto';
import { Order } from './order.entity/order.entity';

@Controller('order')
export class OrderController {
  dishService: any;

  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get('detail/:id')
  get(@Param() params) {
    return this.orderService.findOne(params.id);
  }

  @Post()
  create(@Body() order: Order) {
    return this.orderService.create(order);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() order: Order) {
    order.id = id;
    return this.orderService.update(order);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.orderService.delete(params.id);
  }
}
