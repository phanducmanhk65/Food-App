import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Dish } from './dish.entity/dish.entity';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Get('detail/:id')
  get(@Param() params) {
    return this.dishService.findOne(params.id);
  }

  @Post()
  create(@Body() dish: Dish) {
    console.log(dish);
    return this.dishService.create(dish);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dish: Dish) {
    dish.id = id;
    return this.dishService.update(dish);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.dishService.delete(params.id);
  }
  @Get('search')
  async search(
    @Query('restaurant') restaurant?: string,
    @Query('name') name?: string,
  ) {
    return this.dishService.findByRestaurantAndDishName(restaurant, name);
  }
}
