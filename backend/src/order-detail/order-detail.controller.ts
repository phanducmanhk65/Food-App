import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('orderdetail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post('/create')
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(createOrderDetailDto);
  }

  @Get('/all')
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get('getone/:id')
  findOne(@Param('id') id: string) {
    return this.orderDetailService.findOne(+id);
  }
  @Get('/findOrderDetail/:id') 
  findOrderDetail(@Param('id') id: number) {
    return this.orderDetailService.findOrderDetail(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailService.update(+id, updateOrderDetailDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderDetailService.remove(+id);
  }
}
