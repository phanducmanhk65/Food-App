import { Injectable } from '@nestjs/common';
import { Order } from './order.entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepo.findOne({ where: { id } });
  }

  async create(order: Order): Promise<Order> {
    return await this.orderRepo.save(order);
  }

  async update(order: Order): Promise<UpdateResult> {
    return await this.orderRepo.update(order.id, { ...order });
  }

  async delete(id): Promise<DeleteResult> {
    return await this.orderRepo.delete(id);
  }
}
