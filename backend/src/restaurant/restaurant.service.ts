import { Injectable } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class RestaurantService {
    constructor( @InjectRepository(Restaurant)

   private readonly Restaurantrepository: Repository<Restaurant>) {
       
    }
    create(createRestaurantDto: CreateRestaurantDto) {
        // console.log(createRestaurantDto.)
        return this.Restaurantrepository.save(createRestaurantDto)
    }

    findAll() {
        return this.Restaurantrepository.find();
    }

    findOne(id:number): Promise<Restaurant> {
        return this.Restaurantrepository.findOneBy({id})
    }

    update(id:number, updateRestaurantDto: UpdateRestaurantDto) {
        return this.Restaurantrepository.update(id, updateRestaurantDto);
    }

    remove(id: number) {
        this.Restaurantrepository.delete(id);
    }
}