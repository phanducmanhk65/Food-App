import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('/all')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('getone/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
  @Get('/findorderres/:id')
  findOrderByRes(@Param('id') id: string, @Body('status') status: number  ) {
    return this.orderService.findOrderByRes(+id, status)
  }

  

  @Get('/findOrdership/:id')
  findOrderByShip(@Param('id') id: string, @Body('status') status: number ) {
    return this.orderService.findOrderByShipper(+id, status);
  }

  @Get('/findOrderCus/:id')
  findOrderByCus(@Param('id') id: string, @Body('status') status: number ) {
    return this.orderService.findOrderByCustomer(+id, status);
  }

  @Patch()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
