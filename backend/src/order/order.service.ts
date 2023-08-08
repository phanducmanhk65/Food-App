/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ){}
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto);
  }

  
  findAll() {
    return this.orderRepository.find();
  }
  findOne(id: number, idUser: number) {
  
    return this.orderRepository.createQueryBuilder('order').where('idRestaurant = :id OR idCustomer = :id OR idShipper = :id', {id: idUser}).andWhere('id = :id', {id: id}).getOne();
  }
  //lấy danh sách order theo nhà hàng
  findOrderByRes(id: number, status: number) {
    return this.orderRepository.createQueryBuilder('order').where('status = :stt', {stt: status}).andWhere('idRestaurant = :idR', {idR: id}).getMany();
  }
  // lấy detail order theo nhà hàng
  findOrderDetail(id: number) {
    return this.orderRepository.createQueryBuilder('order-detail').where('id = :id', {id: id}).getOne();

  }
  
  //lấy danh sách order theo shipper 
  findOrderByShipper(id: number, status: number) {
    return this.orderRepository.createQueryBuilder('order').where('status = :stt', {stt: status}).andWhere('idShipper = :idS', {idS: id}).getMany();

  }

  // lấy danh sách order theo người dùng
  findOrderByCustomer(id: number, status: number) {
    return this.orderRepository.createQueryBuilder('order').where('status = :stt', {stt: status}).andWhere('idCustomer = :idC', {idC: id}).getMany();
   
  }
  // lấy trạng thái đơn hàng

  async getOrderStatus(id: number, idU: number): Promise<number|null> {
   
    try {
      const order = await this.orderRepository
        .createQueryBuilder('order')
        .where('id = :id', { id: id }).andWhere('idCustomer = :idU', {idU: idU})
        .getOne();
  
      return order ? order.status : -1;
    } catch (error) {
      // Handle the error
      console.error('Error while fetching order status:', error.message);
      return null;
    }
   }

   async update(id: number,idU: number, status: number) {
    const isexist =await this.orderRepository.createQueryBuilder('order').where('id = :id', {id:id}).andWhere('idRestaurant = :idU OR idShipper = :idU', {idU: idU}).getOne();
    if(isexist.idCustomer){
      return this.orderRepository.createQueryBuilder().update('order').set({status: status}).where('id = :id', {id:id}).execute();
    } else {
      return "khoo"
    }
    
  }

  // remove(id: number) { 
  //   return this.orderRepository.delete({id});
  // }
}
