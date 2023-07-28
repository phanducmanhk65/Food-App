import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DishService {
  constructor(@InjectRepository(Dish)
  private readonly dishRepository: Repository<Dish>){}
  
  create(createDishDto: CreateDishDto) {
    return this.dishRepository.save(createDishDto);
  }

  findAll() {
    return this.dishRepository.find();
  }

  findOne(id: number) {
    return this.dishRepository.findOneBy({id});
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return this.dishRepository.update(id,updateDishDto);
  }

  remove(id: number) {
    return this.dishRepository.delete(id);
  }
}
