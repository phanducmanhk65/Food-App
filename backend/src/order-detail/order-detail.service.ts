import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailService {
  constructor(@InjectRepository(OrderDetail)
  private readonly ordetailRepository : Repository<OrderDetail>
  ){}
  create(createOrderDetailDto: CreateOrderDetailDto) {
    return this.ordetailRepository.save(createOrderDetailDto);
  }

  findAll() {
    return this.ordetailRepository.find();
  }

  findOne(id: number) {
    return this.ordetailRepository.findOneBy({id});
  }
  findOrderDetail(id: number) {
    return this.ordetailRepository.createQueryBuilder('order-detail').where('idOrder = :id', {id: id}).getMany();

  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.ordetailRepository.update(id,updateOrderDetailDto)
  }

  remove(id: number) {
    return this.ordetailRepository.delete(id);
  }
}
