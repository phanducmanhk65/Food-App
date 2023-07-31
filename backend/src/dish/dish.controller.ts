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
import { DishDto } from './dish.dto';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get('/all')
  findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Get('detail/:id')
  get(@Param() params) {
    return this.dishService.findOne(params.id);
  }

  @Post('/create')
  create(@Body() dish: DishDto) {
    return this.dishService.create(dish);
  }

  @Put('/update/:id')
  update(@Param('id') id: number, @Body() dish: Dish) {
    dish.id = id;
    return this.dishService.update(dish);
  }

  @Delete('/delete/:id')
  deleteUser(@Param() params) {
    return this.dishService.delete(params.id);
  }
  @Get('/search')
  async search(
    @Query('idRestaurant') idRestaurant?: number,
    @Query('name') name?: string,
    @Query('productline') productline?: string,
  ) {
    return this.dishService.findByRestaurantAndDishName(name, productline);
  }
}
