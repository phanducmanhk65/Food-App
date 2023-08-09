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
import { Express } from 'express';
import { Goard } from '../middleware/goard';
import { UploadedFile } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary.service';
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService,
    private readonly cloundinaryService: CloudinaryService) {}

  // tạo món
  @Post('/create')
  @UseGuards(Goard)
  create(@Body() dish: {productline: string, name: string, price: number, imageUrl: string}, @Request() req) {
    if(dish.productline && dish.name && dish.price && dish.imageUrl) {    
      return this.dishService.create(dish, req.idUser);
    } else {
      return "Thiếu thông tin về món";
    }
  }
  // danh sách món để khách hàng chọn món
  @Get('/alldish')
  @UseGuards(Goard)
  findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }
  // danh sách món theo nhà hàng
  @Get("/findByRes")
  @UseGuards(Goard)
  findDishByRes(@Request() req) {
    return this.dishService.findDishbyRes(req.idUser);
  }
  // chi tiết món ăn theo id món
  @Get('detail/:id')
  get(@Param('id') id) {
    if(id) {
      return this.dishService.findOne(id);
    } else {
      return "Thiếu id món trong query API";
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

  @Delete('/delete/:id')
  @UseGuards(Goard)
  deleteUser(@Param('id') id: number,@Request() req) {
    return this.dishService.delete(req.idUser,id );
  }

  @Post("/uploadimage")
  @UseInterceptors(FileInterceptor("file",))
   uploadimage(@UploadedFile() file: Express.Multer.File) {
    this.cloundinaryService.uploadFile(file);
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
