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

  async findDishbyRes(idR: number) {
    return await this.dishRepo.createQueryBuilder('dish').where('idRestaurant = :idR', {idR: idR}).getMany();
    //return idR;
    // return a;
  }

  async findOne(id: number): Promise<Dish> {
    return await this.dishRepo.findOne({ where: { id } });
  }

   create(dish: {productline: string, name: string, price: number, imageUrl: string}, idUser: number) {
    const newDish = {productline: dish.productline, name: dish.name, price: dish.price, idRestaurant: idUser, imageUrl: dish.imageUrl}
    return  this.dishRepo.save(newDish);
  }

  async update(idU: number, dish: Dish){
    const isOwner = await this.dishRepo.createQueryBuilder('dish').where('idRestaurant = :idR', {idR: idU}).andWhere('id = :idD', {idD: dish.id}).getOne();
    if(isOwner) {
    return await this.dishRepo.update(dish.id, { ...dish });
    } else {
      return "Bạn không có quyền chỉnh sửa món này"
    }
    
  }

  async delete(idU: number, id: number){
    const isOwner = await this.dishRepo.createQueryBuilder('dish').where('idRestaurant = :idR', {idR: idU}).andWhere('id = :idD', {idD: id}).getOne();
    if(isOwner) {
      return await this.dishRepo.delete(id);
    } else {
      return "Bạn không có quyền xóa món này"
    }
  }

  async findByRestaurantAndDishName(
    idRestaurant?: string,
    name?: string,
    productline?: string,
  ): Promise<Dish[]> {
    const whereCondition: any = {};

    if (idRestaurant) {
      whereCondition.idRestaurant = Like(`%${idRestaurant}%`);
    }

    if (name) {
      whereCondition.name = Like(`%${name}%`);
    }

    if (productline) {
      whereCondition.productline = Like(`%${productline}%`);
    }

    return await this.dishRepo.find({
      where: whereCondition,
      select: ['id','name', 'price', 'productline', 'idRestaurant'],
    });
  }
}