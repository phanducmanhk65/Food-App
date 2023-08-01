import { Inject,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpCode, HttpStatus} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EventGateway } from '../event.gateway';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { CreateOrderWithDetailDto } from './dto/create-order-orderdetail.dto';
import { CreateOrderDetailDto } from '../order-detail/dto/create-order-detail.dto';
import { Goard } from '../middleware/goard';
import { userInfo } from 'os';
import { OrderGateway } from './order.gateway';
@Controller('order')
export class OrderController {
  constructor(private readonly eventGateway: EventGateway, private readonly orderService: OrderService,
    private readonly orderdetailService: OrderDetailService,
    private readonly orderGateWay: OrderGateway
    ) {}
  
  // người dùng tạo order()
  @Post('/create')
 async create(@Body()createOrderWithDetail: CreateOrderWithDetailDto) {
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
  let data = {id:saveorder.id, idRestaurant: saveorder.idRestaurant};
  this.orderGateWay.server.emit('approveneworder', data);

 }
 return {saveorder, saveorderDetail};

  }

  @Get('getone/:id')
  findOne(@Param('id') id: string, @Request() userInfo) {
    let idU = userInfo.idUser;
    return this.orderService.findOne(+id, +idU);
  }
  

// tìm order theo nhà hàng
  @Get('/findorderres')
  @UseGuards(Goard)
  findOrderByRes(@Body('status') status: number, @Request() userInfo  ) {
    if(userInfo.idUser) {
    return this.orderService.findOrderByRes(+userInfo.idUser, status)
    } else {
      throw new HttpException("Chưa đăng nhập!",HttpStatus.FORBIDDEN);
    }
  }

// tìm order theo shipper
  @Get('/findOrdership')
  @UseGuards(Goard)
  findOrderByShip(@Param('id') id: string, @Body('status') status: number, @Request() userInfo  ) {
    if(userInfo.idUser) {
    return this.orderService.findOrderByShipper(+id, status);
    } else {
      throw new HttpException("Chưa đăng nhập!",HttpStatus.FORBIDDEN);
    }
  }

// tìm order theo khách hàng
  @Get('/findOrderCus/:id')
  @UseGuards(Goard)
  findOrderByCus(@Param('id') id: string, @Body('status') status: number ) {
    return this.orderService.findOrderByCustomer(+id, status);
  }

// lấy status của order
  @Get('/orderstatus')
  @UseGuards(Goard)
  async getOrderStatus(@Request() userInfo, @Body('idOrder')idOrder: number) {
    let idU = userInfo.idUser;
    const status = await this.orderService.getOrderStatus(idOrder, idU);
    return (status >= 0) ? status : "Bạn không có đơn hàng này";
    
  }

//cập nhật trạng thái order
  @Patch('/updateorder')
  @UseGuards(Goard)
  update(@Body('status') status: number, @Body('idOrder')idOrder: number, @Request() userInfo) {
    this.orderService.update(+idOrder,userInfo.idUser, status);
    if(status == 1) {
      let data = {idOrder: +idOrder, idRestaurant: userInfo.idUser}
      this.orderGateWay.server.emit('restaurantapprove',data);
    } 
  }

  // @Delete('delete/:id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }


}
