/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body,Patch, Delete, Param } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-user.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService){};

    @Post('/create')
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        // console.log
        return this.restaurantService.create(createRestaurantDto);
    }

    @Get('/all')
    findAll() {
        return this.restaurantService.findAll();
    }

    @Get('/findone/:id')
    findOne(@Param('id') id: number) {
        return this.restaurantService.findOne(+id);
    }

    @Patch('/updateres/:id')
    update(@Param('id') id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        return this.restaurantService.update(id,updateRestaurantDto);
    }

    @Delete('/deleteres/:id')
    remove(@Param('id') id:number) {
         this.restaurantService.remove(+id);
         return "Xóa thành công "+ id;
}
}