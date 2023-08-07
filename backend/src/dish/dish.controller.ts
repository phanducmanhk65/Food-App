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
import { Goard } from '../middleware/goard';
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('/create')
  @UseGuards(Goard)
  create(@Body() dish: {productline: string, name: string, price: number, imageUrl: string}, @Request() req) {
    return this.dishService.create(dish, req.idUser);
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
  get(@Param() params) {
    return this.dishService.findOne(params.id);
  }

 

  @Put('/update')
  @UseGuards(Goard)
  update(@Body() dish: Dish, @Request() req) {
    return this.dishService.update(req.idUser, dish);
  }

  @Delete('/delete/:id')
  @UseGuards(Goard)
  deleteUser(@Param('id') id: number,@Request() req) {
    return this.dishService.delete(req.idUser,id );
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
