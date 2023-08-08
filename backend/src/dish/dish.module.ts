/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { Dish } from './dish.entity/dish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  providers: [DishService, ],
  controllers: [DishController],
})
export class DishModule {}
