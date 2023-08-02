/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Inject,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpCode, HttpStatus} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { CreateOrderWithDetailDto } from './dto/create-order-orderdetail.dto';
import { CreateOrderDetailDto } from '../order-detail/dto/create-order-detail.dto';
import { Goard } from '../middleware/goard';
import { OrderGateway } from './order.gateway';
import { CreateDeliverInfoDto } from '../deliver-info/dto/create-deliver-info.dto';
import { UserService } from '../user/user.service';
import { DeliverInfoService } from '../deliver-info/deliver-info.service';
@Controller('order')
export class OrderController {
  constructor(private readonly userService: UserService, private readonly orderService: OrderService,
    private readonly orderdetailService: OrderDetailService,
    private readonly orderGateWay: OrderGateway,
    private readonly deliverService : DeliverInfoService
    ) {}
  
  // người dùng tạo order()
  @Post('/create')
  @UseGuards(Goard)
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
  @Get('/findorderres/:status')
  @UseGuards(Goard)
  findOrderByRes(@Param('status') status: number, @Request() userInfo  ) {
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
  @Get('/orderstatus/:idOrder')
  @UseGuards(Goard)
  async getOrderStatus(@Request() userInfo, @Param('idOrder')idOrder: number) {
    let idU = userInfo.idUser;
    const status = await this.orderService.getOrderStatus(idOrder, idU);
    return (status >= 0) ? status : "Bạn không có đơn hàng này";
    
  }

//cập nhật trạng thái order
  @Patch('/updateorder')
  @UseGuards(Goard)
  async update(@Body('status') status: number, @Body('idOrder')idOrder: number, @Request() userInfo) {
    this.orderService.update(+idOrder,userInfo.idUser, status);
    if(status == 1) {
      let data = {idOrder: +idOrder, idRestaurant: userInfo.idUser}
      this.orderGateWay.server.emit('restaurantapprove',data);
    } else if(status == 2) {
      const shipper = await this.userService.findById(userInfo.idUser);
      let data = new CreateDeliverInfoDto(shipper.id,shipper.name, +shipper.phoneNumber);
      this.deliverService.create(data);
    } 
  }

  // @Delete('delete/:id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }


}
