import { Controller, Get, Post, Body,Put,Patch, Delete, Param, UseGuards, Request } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-user.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { Goard } from "../middleware/goard"; 

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

    @Post('/create')
    @UseGuards(Goard)
    create(@Body() restaurant: {name: string, address: string, phoneNumber: string, latitude: number, longitude: number}
    , @Request() req) {
        const data = new CreateRestaurantDto(req.idUser, restaurant.name, restaurant.address, restaurant.phoneNumber, restaurant.latitude, restaurant.longitude);
        return this.restaurantService.create(data);

    }

    @Get('/myrestaurant')
    @UseGuards(Goard)
    findMyRestaurant(@Request() req) {
        return this.restaurantService.findMyRestaurant(req.idUser);

    }

    @Put('/updateres/:idR')
    @UseGuards(Goard)
    update(@Param('idR') idR: number,@Request() req, @Body() updateRes: {name: string, address: string, phoneNumber: string, latitude: number, longitude: number}) {
        return this.restaurantService.update(req.idUser,idR ,updateRes )
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
@Get('/search')
async search(@Query('name') name?: string): Promise<Restaurant[]> {
  return this.restaurantService.findByRestaurantName(name);
}
