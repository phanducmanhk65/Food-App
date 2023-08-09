/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,UseGuards,
  Put,
  Query, UseInterceptors, Request
} from '@nestjs/common';
import { Dish } from './dish.entity/dish.entity';
import { DishDto } from './dish.dto';
import { DishService } from './dish.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import * as AWS from 'aws-sdk';
import { Goard } from '../middleware/goard';
import { UploadedFile } from '@nestjs/common';
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('/create')
  @UseGuards(Goard)
  create(@Body() dish: {productline: string, name: string, price: number, imageUrl: string}, @Request() req) {
    if(dish.productline && dish.name && dish.price && dish.imageUrl) {    
      return this.dishService.create(dish, req.idUser);
    } else {
      return "Thiếu thông tin về món";
    }
  }
  @Get('/alldish')
  @UseGuards(Goard)
  findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }
  
  @Get("/findByRes")
  @UseGuards(Goard)
  findDishByRes(@Request() req) {
    return this.dishService.findDishbyRes(req.idUser);
  }

  @Get('detail/:id')
  get(@Param('id') id) {
    if(id) {
      return this.dishService.findOne(id);
    }
  }

 

  @Put('/update')
  @UseGuards(Goard)
  update(@Body() dish: Dish, @Request() req) {
    if(dish) {   
     return this.dishService.update(req.idUser, dish);
    } else {
      return "Thiếu dữ liệu dish để update";
    }
  }

  @Delete('/delete/:idD')
  @UseGuards(Goard)
  deleteUser(@Param('idD') idD: number,@Request() req) {
    return this.dishService.delete(req.idUser,idD );
  }

  @Post("/uploadimage")
  @UseInterceptors(FileInterceptor("file",))
  async uploadimage(@UploadedFile() file) {


    return "success";
  }
 
  @Get('/search')
  async search(
    @Query('idRestaurant') idRestaurant?: string,
    @Query('name') name?: string,
    @Query('productline') productline?: string,
  ) {
    return this.dishService.findByRestaurantAndDishName(
      idRestaurant,
      name,
      productline,
    );
  }

}
