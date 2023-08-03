/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-user.dto";
import { Like, Repository } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class RestaurantService {
    constructor( @InjectRepository(Restaurant)

   private readonly Restaurantrepository: Repository<Restaurant>) {
       
    }
    create(createRestaurantDto: CreateRestaurantDto) {
        return this.Restaurantrepository.save(createRestaurantDto)
    }

    findMyRestaurant(idU: number) {
        return this.Restaurantrepository.createQueryBuilder('restaurant').where('idUser = :idU', {idU: idU}).getMany();
    }


    async update(idU: number, id:number, updateRestaurantDto: {name: string, address: string, phoneNumber: string, latitude: number, longitude: number}) {
        const isOwner = await this.Restaurantrepository.createQueryBuilder('restaurant').where('idUser = :idU', {idU: idU}).andWhere('id = :id', {id: id}).getOne();
        if(isOwner) {
            return this.Restaurantrepository.update(id, updateRestaurantDto)
        } else {
            return "Bạn không có quyền chỉnh sửa thông tin nhà hàng này";
        }
        
    }

    async remove(idU: number, id: number) {
        const isOwner = await this.Restaurantrepository.createQueryBuilder('restaurant').where('idUser = :idU', {idU: idU}).andWhere('id = :id', {id: id}).getOne();
        if(isOwner) {
            this.Restaurantrepository.delete(id);
            return "Xóa nhà hàng thành công";
        } else {
            return "Bạn không có quyền xóa thông tin nhà hàng này";
        }
    }
    async findByRestaurantName(name?: string): Promise<Restaurant[]> {
        const whereCondition: any = {};
    
        if (name) {
          whereCondition.name = Like(`%${name}%`);
        }
    
        return await this.Restaurantrepository.find({
          where: whereCondition,
          select: ['id', 'name', 'address', 'phoneNumber'],
        });
      }
}