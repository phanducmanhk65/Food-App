import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ){}
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto);
  }

  findAll() {
    return this.orderRepository.find();
  }
  findOne(id: number) {
    return this.orderRepository.findOneBy({id});
  }
  //lấy danh sách order theo nhà hàng
  findOrderByRes(id: number, status: number) {
    return this.orderRepository.createQueryBuilder('order').where('status =: stt', {stt: status}).andWhere('idRestaurant =: idR', {idR: id}).getMany();
  }
  
  //lấy danh sách order theo shipper
  findOrderByShipper(id: number, status: number) {
    return this.orderRepository.createQueryBuilder('order').where('status =: stt', {stt: status}).andWhere('idShipper =: idS', {idS: id}).getMany();

  }

  // lấy danh sách order theo người dùng
  findOrderByCustomer(id: number, status: number) {
    return this.orderRepository.createQueryBuilder('order').where('status =: stt', {stt: status}).andWhere('idCustomer =: idC', {idC: id}).getMany();

  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepository.delete({id});
  }
}
