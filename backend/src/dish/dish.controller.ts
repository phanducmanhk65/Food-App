/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, UseInterceptors 
} from '@nestjs/common';
import { Dish } from './dish.entity/dish.entity';
import { DishDto } from './dish.dto';
import { DishService } from './dish.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';

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

  @Post("/uploadimage")
  @UseInterceptors(FileInterceptor("file",{
    storage: diskStorage({
      destination: "./imagedish",
      filename: (req, file, cb)=> {
        cb(null, `${file.originalname}`)
      }
    })
  }))
  async uploadimage() {

    return "success";
  }
  // @Get('/search')
  // async search(
  //   @Query('idRestaurant') idRestaurant?: number,
  //   @Query('name') name?: string,
  //   @Query('productline') productline?: string,
  // ) {
  //   return this.dishService.findByRestaurantAndDishName(name, productline);
  // }
}
