import { Injectable } from '@nestjs/common';
import { Dish } from './dish.entity/dish.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async create(dish: Dish): Promise<Dish> {
    return await this.dishRepo.save(dish);
  }

  async update(dish: Dish): Promise<UpdateResult> {
    return await this.dishRepo.update(dish.id, { ...dish });
  }

  async delete(id): Promise<DeleteResult> {
    return await this.dishRepo.delete(id);
  }

  async findByRestaurantAndDishName(
    restaurant?: string,
    name?: string,
  ): Promise<Dish[]> {
    let whereCondition: any = {};

    if (restaurant) {
      whereCondition.restaurant = Like(`%${restaurant}%`);
    }

    if (name) {
      whereCondition.name = Like(`%${name}%`);
    }

    return await this.dishRepo.find({
      where: whereCondition,
      select: ['name', 'price', 'productline', 'restaurant', 'status'],
    });
  }
}
