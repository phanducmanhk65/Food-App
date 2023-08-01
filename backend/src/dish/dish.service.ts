/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Dish } from './dish.entity/dish.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DishDto } from './dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepo: Repository<Dish>,
  ) {}

  async findAll(): Promise<Dish[]> {
    return await this.dishRepo.find();
  }

  async findOne(id: number): Promise<Dish> {
    return await this.dishRepo.findOne({ where: { id } });
  }

   create(dish: DishDto) {
    return  this.dishRepo.save(dish);
  }

  async update(dish: Dish): Promise<UpdateResult> {
    return await this.dishRepo.update(dish.id, { ...dish });
  }

  async delete(id): Promise<DeleteResult> {
    return await this.dishRepo.delete(id);
  }

  // async findByRestaurantAndDishName(
  //   idRestaurant?: string,
  //   name?: string,
  //   productline?: string,
  // ): Promise<Dish[]> {
  //   let whereCondition: any = {};

  //   if (idRestaurant) {
  //     whereCondition.restaurant = Like(`%${idRestaurant}%`);
  //   }

  //   if (name) {
  //     whereCondition.name = Like(`%${name}%`);
  //   }

  //   if (productline) {
  //     whereCondition.productline = Like(`%${productline}%`);
  //   }

  //   return await this.dishRepo.find({
  //     where: whereCondition,
  //     select: ['name', 'price', 'productline', 'idRestaurant'],
  //   });
  // }
}