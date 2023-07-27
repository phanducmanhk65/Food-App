import { Inject,Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EventGateway } from '../event.gateway';
@Controller('order')
export class OrderController {
  constructor(private readonly eventGateway: EventGateway, private readonly orderService: OrderService) {}
  
  @Post('/create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  // @Get('/all')
  // findAll() {
  //   return this.orderService.findAll();
  // }

  @Get('getone/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

// tìm order theo nhà hàng
  @Get('/findorderres/:id')
  findOrderByRes(@Param('id') id: string, @Body('status') status: number  ) {
    return this.orderService.findOrderByRes(+id, status)
  }

// tìm order theo shipper
  @Get('/findOrdership/:id')
  findOrderByShip(@Param('id') id: string, @Body('status') status: number ) {
    return this.orderService.findOrderByShipper(+id, status);
  }

// tìm order theo khách hàng
  @Get('/findOrderCus/:id')
  findOrderByCus(@Param('id') id: string, @Body('status') status: number ) {
    return this.orderService.findOrderByCustomer(+id, status);
  }

// lấy realtime status cho order
  @Get('/orderstatus/:id')
  async getOrderStatus(@Param('id') id: number) {
    const status = await this.orderService.getOrderStatus(id);
    this.eventGateway.server.emit('status', status);
    
  }

//cập nhật order
  @Patch()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }


}
