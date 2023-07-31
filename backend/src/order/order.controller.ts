import { Inject,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EventGateway } from '../event.gateway';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { CreateOrderWithDetailDto } from './dto/create-order-orderdetail.dto';
import { CreateOrderDetailDto } from '../order-detail/dto/create-order-detail.dto';
import { Goard } from '../middleware/goard';
@Controller('order')
export class OrderController {
  constructor(private readonly eventGateway: EventGateway, private readonly orderService: OrderService,
    private readonly orderdetailService: OrderDetailService
    ) {}
  
  // người dùng tạo order
  @Post('/create')
 async create(@Body()createOrderWithDetail: CreateOrderWithDetailDto ) {
 const order = createOrderWithDetail.order;
 const orderdetails = createOrderWithDetail.orderDetails;
 let saveorder = await this.orderService.create(order);
 let saveorderDetail: CreateOrderDetailDto[] = [];
 for(const orderdetail of orderdetails) {
  let idDish = orderdetail.idDish;
  let price = orderdetail.price;
  let quantity = orderdetail.quantity;
  let neworderDetail = new CreateOrderDetailDto(saveorder.id, idDish, price, quantity);
  
  let saveorderdt = await this.orderdetailService.create(neworderDetail);
  saveorderDetail.push(saveorderdt);
 }
 return {saveorder, saveorderDetail};

  }

  @Get('getone/:id')
  findOne(@Param('id') id: string, @Request() userInfo) {
    let idU = userInfo.idUser;
    return this.orderService.findOne(+id, +idU);
  }
  

// tìm order theo nhà hàng
  @Get('/findorderres/:id')
  @UseGuards(Goard)
  findOrderByRes(@Param('id') id: string, @Body('status') status: number  ) {
    return this.orderService.findOrderByRes(+id, status)
  }

// tìm order theo shipper
  @Get('/findOrdership/:id')
  @UseGuards(Goard)
  findOrderByShip(@Param('id') id: string, @Body('status') status: number ) {
    return this.orderService.findOrderByShipper(+id, status);
  }

// tìm order theo khách hàng
  @Get('/findOrderCus/:id')
  @UseGuards(Goard)
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
